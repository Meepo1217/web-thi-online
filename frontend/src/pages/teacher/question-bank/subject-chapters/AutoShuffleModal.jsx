import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconShuffle,
  IconClose,
  IconCheck,
  IconAlertTriangle,
  IconFolder,
  IconSliders,
  IconChevronRight,
  IconPlus,
} from '../../../../components/ui/icons';
import DestinationFolderModal from './DestinationFolderModal';
import './auto-shuffle-modal.css';

/**
 * AutoShuffleModal
 * Modal cấu hình và thực hiện Trộn đề thi tự động từ Ngân hàng câu hỏi
 * - Sắp xếp theo dạng danh sách từ trên xuống
 * - Bỏ ô nhập số lượng mã đề xáo trộn (mặc định tạo 4 mã đề 101, 102, 103, 104)
 * - Tích hợp Popup chọn thư mục & duyệt chi tiết từng chương trong Quản lý đề thi
 * - Bỏ nút switch toggle "Đang bật" theo yêu cầu
 */
export default function AutoShuffleModal({ isOpen, onClose, chapters = [], subject = {} }) {
  const navigate = useNavigate();

  // Basic exam settings
  const [examTitle, setExamTitle] = useState('Đề kiểm tra định kỳ Toán học 12');
  const [targetQuestions, setTargetQuestions] = useState(40);
  const [duration, setDuration] = useState(45);

  // Vị trí lưu đề trong Quản lý đề thi (Thư mục & Chương)
  // Mặc định để trống, không hiển thị mục đã chọn trước đó theo yêu cầu
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [isFolderPickerOpen, setIsFolderPickerOpen] = useState(false);

  // Danh sách các chương đang hiển thị trong ma trận (có thể thêm chương mới trực tiếp)
  const [activeChaptersList, setActiveChaptersList] = useState(chapters);
  const [isAddingMatrixChapter, setIsAddingMatrixChapter] = useState(false);
  const [newMatrixChapterTitle, setNewMatrixChapterTitle] = useState('');
  const [newMatrixChapterCount, setNewMatrixChapterCount] = useState(30);

  useEffect(() => {
    if (chapters && chapters.length > 0) {
      setActiveChaptersList(chapters);
    }
  }, [chapters]);

  // Chapters selection & question counts
  // e.g. { 'chap-1': { selected: true, count: 12 }, ... }
  const [chapterConfigs, setChapterConfigs] = useState({});

  // Bloom taxonomy breakdown
  const [bloomDistribution, setBloomDistribution] = useState({
    nhanBiet: 12,
    thongHieu: 14,
    vanDung: 10,
    vanDungCao: 4,
  });

  // Success state
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedExamData, setGeneratedExamData] = useState(null);

  // Initialize chapter counts when modal opens or chapters change
  useEffect(() => {
    if (isOpen) {
      // Để trống vị trí lưu đề khi mở modal, cảnh báo nếu không chọn
      setDestinationLocation(null);
      setLocationError(false);
      setIsSuccess(false);

      if (chapters.length > 0) {
        const initialConfigs = {};
        const defaultPerChapter = Math.floor(targetQuestions / chapters.length) || 10;
        const remainder = targetQuestions % chapters.length;

        chapters.forEach((chap, idx) => {
          const allocated = defaultPerChapter + (idx < remainder ? 1 : 0);
          initialConfigs[chap.id] = {
            selected: true,
            count: Math.min(allocated, chap.questionCount || 0),
          };
        });
        setChapterConfigs(initialConfigs);
      }
    }
  }, [isOpen, chapters, targetQuestions]);

  // Total questions currently selected across chapters
  const totalChapterQuestions = useMemo(() => {
    return Object.entries(chapterConfigs).reduce((sum, [chapId, conf]) => {
      if (conf?.selected) {
        return sum + (Number(conf.count) || 0);
      }
      return sum;
    }, 0);
  }, [chapterConfigs]);

  // Validation: Check if any chapter has input > available questions
  const overlimitErrors = useMemo(() => {
    const errors = {};
    activeChaptersList.forEach((chap) => {
      const conf = chapterConfigs[chap.id];
      if (conf?.selected) {
        const count = Number(conf.count) || 0;
        if (count > (chap.questionCount || 0)) {
          errors[chap.id] = `Vượt quá kho câu hỏi (Tối đa ${chap.questionCount} câu)`;
        }
      }
    });
    return errors;
  }, [activeChaptersList, chapterConfigs]);

  const hasAnyOverlimit = Object.keys(overlimitErrors).length > 0;

  // Tạo thêm chương mới trực tiếp trong ma trận
  const handleCreateMatrixChapter = () => {
    if (!newMatrixChapterTitle.trim()) return;
    const raw = newMatrixChapterTitle.trim();
    const nextOrder = activeChaptersList.length + 1;
    const romanNums = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    const roman = romanNums[nextOrder - 1] || `${nextOrder}`;
    const formatted =
      raw.startsWith('Chương') || raw.startsWith('Chuyên đề') ? raw : `Chương ${roman}: ${raw}`;
    const count = Number(newMatrixChapterCount) || 30;

    const newChap = {
      id: `chap-${Date.now()}`,
      order: nextOrder,
      title: formatted,
      questionCount: count,
      status: 'active',
    };

    setActiveChaptersList((prev) => [...prev, newChap]);
    setChapterConfigs((prev) => ({
      ...prev,
      [newChap.id]: {
        selected: true,
        count: Math.min(10, count),
      },
    }));

    setNewMatrixChapterTitle('');
    setIsAddingMatrixChapter(false);
  };

  // Calculate Bloom percentages based on total target questions
  const bloomStats = useMemo(() => {
    const totalBloom =
      Number(bloomDistribution.nhanBiet || 0) +
      Number(bloomDistribution.thongHieu || 0) +
      Number(bloomDistribution.vanDung || 0) +
      Number(bloomDistribution.vanDungCao || 0);

    const base = totalBloom > 0 ? totalBloom : 1;
    return {
      total: totalBloom,
      nhanBietPct: Math.round(((bloomDistribution.nhanBiet || 0) / base) * 100),
      thongHieuPct: Math.round(((bloomDistribution.thongHieu || 0) / base) * 100),
      vanDungPct: Math.round(((bloomDistribution.vanDung || 0) / base) * 100),
      vanDungCaoPct: Math.round(((bloomDistribution.vanDungCao || 0) / base) * 100),
    };
  }, [bloomDistribution]);

  // Handle Chapter Checkbox toggle
  const handleToggleChapter = (chapId) => {
    setChapterConfigs((prev) => {
      const current = prev[chapId] || { selected: false, count: 0 };
      const nextSelected = !current.selected;
      return {
        ...prev,
        [chapId]: {
          ...current,
          selected: nextSelected,
          count: nextSelected && current.count === 0 ? 10 : current.count,
        },
      };
    });
  };

  // Handle Chapter Question Count input change
  const handleChapterCountChange = (chapId, val) => {
    const num = val === '' ? '' : Math.max(0, parseInt(val, 10) || 0);
    setChapterConfigs((prev) => ({
      ...prev,
      [chapId]: {
        ...(prev[chapId] || { selected: true }),
        count: num,
      },
    }));
  };

  // Handle Bloom question input change
  const handleBloomChange = (level, val) => {
    const num = val === '' ? 0 : Math.max(0, parseInt(val, 10) || 0);
    setBloomDistribution((prev) => ({
      ...prev,
      [level]: num,
    }));
  };

  // Handle Form Submission: Generate Shuffled Exam & Save
  const handleProceedShuffle = () => {
    if (hasAnyOverlimit) {
      alert('Vui lòng điều chỉnh lại số lượng câu hỏi không vượt quá kho câu hỏi có sẵn!');
      return;
    }

    if (!examTitle.trim()) {
      alert('Vui lòng nhập tên đề thi!');
      return;
    }

    // Cảnh báo nếu chưa chọn thư mục / chương lưu đề
    if (!destinationLocation || !destinationLocation.folderTitle) {
      setLocationError(true);
      alert('⚠️ Vui lòng chọn vị trí lưu đề thi trong Quản lý đề thi!');
      return;
    }

    if (totalChapterQuestions === 0) {
      alert('Vui lòng chọn ít nhất 1 câu hỏi từ các chương để tạo đề!');
      return;
    }

    // Auto-create folder in localStorage if needed
    try {
      const storedFolders = JSON.parse(localStorage.getItem('created_exam_folders') || '[]');
      if (!storedFolders.includes(destinationLocation.folderTitle)) {
        storedFolders.push(destinationLocation.folderTitle);
        localStorage.setItem('created_exam_folders', JSON.stringify(storedFolders));
      }
    } catch (e) {}

    const fullDestPath = destinationLocation.chapterTitle
      ? `${destinationLocation.folderTitle} > ${destinationLocation.chapterTitle}`
      : destinationLocation.folderTitle;

    // Create 1 single exam entity (Chỉ cần 1 đề thi để lưu)
    const newExam = {
      id: `EXAM-${Date.now()}`,
      code: `#EXAM-MAT-${Math.floor(100 + Math.random() * 900)}`,
      title: examTitle.trim(),
      description: `Đề thi xáo trộn tự động gồm ${totalChapterQuestions} câu trắc nghiệm từ ${
        Object.values(chapterConfigs).filter((c) => c.selected && c.count > 0).length
      } chuyên đề.`,
      duration: `${duration} phút`,
      questionCount: totalChapterQuestions,
      level: 'VẬN DỤNG',
      levelType: 'van-dung',
      tags: ['Đề trộn tự động', subject.title || 'Toán học 12'],
      author: 'Giảng viên',
      date: 'Hôm nay',
      usageCount: 0,
      folder: destinationLocation.folderTitle,
      chapter: destinationLocation.chapterTitle || 'Tất cả chương',
      fullPath: fullDestPath,
      chapterBreakdown: chapterConfigs,
      bloomBreakdown: bloomDistribution,
    };

    // Save to localStorage so Exam Management list can load it
    try {
      const storedExams = JSON.parse(localStorage.getItem('created_exams_list') || '[]');
      storedExams.unshift(newExam);
      localStorage.setItem('created_exams_list', JSON.stringify(storedExams));
    } catch (e) {}

    setGeneratedExamData(newExam);
    setIsSuccess(true);
  };

  const handleNavigateToExams = () => {
    onClose();
    navigate('/teacher/exams/math');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="asm-overlay" onClick={onClose}>
        <div className="asm-container" onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="asm-header">
            <div className="asm-header-left">
              <div className="asm-header-icon">
                <IconShuffle width={18} height={18} color="#FFFFFF" />
              </div>
              <div>
                <h2 className="asm-title">Trộn đề thi tự động từ Ngân hàng câu hỏi</h2>
                <p className="asm-subtitle">
                  Môn: <strong>{subject.title || 'Toán học 12'}</strong> ({subject.code || 'MATH-12'})
                </p>
              </div>
            </div>
            <button className="asm-close-btn" onClick={onClose} title="Đóng">
              <IconClose width={14} height={14} color="#64748B" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="asm-body">
            {isSuccess && generatedExamData ? (
              /* Success View */
              <div className="asm-success-card">
                <div className="asm-success-icon-wrap">
                  <IconCheck width={28} height={28} color="#16A34A" />
                </div>
                <h3 className="asm-success-title">Đã trộn đề thi thành công!</h3>
                <p className="asm-success-desc">
                  Hệ thống đã tự động trộn thành công <strong>1 đề thi</strong> với tổng cộng <strong>{generatedExamData.questionCount} câu hỏi</strong> chuẩn ma trận. Đề thi đã được lưu vào vị trí: <strong>"{generatedExamData.fullPath}"</strong> trong Quản lý đề thi.
                </p>

                <div className="asm-footer-actions" style={{ marginTop: '16px' }}>
                  <button type="button" className="asm-btn-cancel" onClick={onClose}>
                    Đóng
                  </button>
                  <button
                    type="button"
                    className="asm-btn-submit"
                    onClick={handleNavigateToExams}
                  >
                    <IconFolder width={14} height={14} color="#FFFFFF" />
                    <span>Xem trong Quản lý đề thi</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Configuration Form */
              <>
                {/* SECTION 1: Thông số cơ bản của đề thi (Dạng danh sách xếp từ trên xuống) */}
                <div className="asm-basic-section">
                  <div className="asm-basic-title">
                    <IconSliders width={15} height={15} color="#0051D5" />
                    <span>1. Thông số cơ bản của đề thi</span>
                  </div>

                  <div className="asm-form-list">
                    {/* 1. Tên đề thi */}
                    <div className="asm-form-group">
                      <label className="asm-label">
                        Tên đề thi <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="asm-input"
                        value={examTitle}
                        onChange={(e) => setExamTitle(e.target.value)}
                        placeholder="Ví dụ: Đề kiểm tra 1 tiết Đại số & Giải tích"
                      />
                    </div>

                    {/* 2. Số câu hỏi mong muốn trong đề */}
                    <div className="asm-form-group">
                      <label className="asm-label">
                        Số câu hỏi mong muốn trong đề <span className="required">*</span>
                      </label>
                      <input
                        type="number"
                        className="asm-input"
                        value={targetQuestions}
                        min={1}
                        max={200}
                        onChange={(e) => setTargetQuestions(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      />
                    </div>

                    {/* 3. Thời gian làm bài */}
                    <div className="asm-form-group">
                      <label className="asm-label">
                        Thời gian làm bài <span className="required">*</span>
                      </label>
                      <select
                        className="asm-select"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                      >
                        <option value={15}>15 phút</option>
                        <option value={45}>45 phút (1 tiết)</option>
                        <option value={60}>60 phút</option>
                        <option value={90}>90 phút (Thi thử THPT)</option>
                        <option value={120}>120 phút</option>
                      </select>
                    </div>

                    {/* 4. Thư mục lưu đề trong Quản lý đề thi (Để trống mặc định, cảnh báo nếu ko chọn) */}
                    <div className="asm-form-group">
                      <label className="asm-label">
                        Vị trí lưu đề trong Quản lý đề thi <span className="required">*</span>
                      </label>
                      
                      <div
                        className={`asm-dest-picker ${locationError ? 'has-error' : ''}`}
                        onClick={() => {
                          setIsFolderPickerOpen(true);
                          setLocationError(false);
                        }}
                        title="Bấm để chọn thư mục và chương lưu đề thi"
                      >
                        <div className="asm-dest-picker-left">
                          <div className={`asm-dest-icon-box ${!destinationLocation?.folderTitle ? 'empty' : ''}`}>
                            <IconFolder width={16} height={16} color={destinationLocation?.folderTitle ? '#0051D5' : '#94A3B8'} />
                          </div>
                          <div className="asm-dest-info">
                            {destinationLocation?.folderTitle ? (
                              <>
                                <span className="asm-dest-path">
                                  📁 {destinationLocation.folderTitle}
                                  {destinationLocation.chapterTitle ? ` > 📄 ${destinationLocation.chapterTitle}` : ' (Thư mục gốc)'}
                                </span>
                                <span className="asm-dest-sub">
                                  Vị trí đã chọn • Bấm để thay đổi thư mục & chương
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="asm-dest-path empty-placeholder">
                                  Chưa chọn vị trí lưu đề
                                </span>
                                <span className="asm-dest-sub">
                                  Bấm vào đây để chọn thư mục & chương trong Quản lý đề thi
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="asm-dest-btn-change"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsFolderPickerOpen(true);
                            setLocationError(false);
                          }}
                        >
                          <span>{destinationLocation?.folderTitle ? 'Thay đổi' : 'Chọn vị trí lưu'}</span>
                          <IconChevronRight width={12} height={12} color="#0051D5" />
                        </button>
                      </div>

                      {/* Cảnh báo nếu không chọn */}
                      {locationError && (
                        <div className="asm-warning-text" style={{ paddingLeft: '4px', marginTop: '6px' }}>
                          <IconAlertTriangle width={13} height={13} color="#BA1A1A" />
                          <span>⚠️ Vui lòng chọn vị trí lưu đề thi trong Quản lý đề thi!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECTION 2 (Figma Section 3): Ma trận câu hỏi & Cài đặt xáo trộn */}
                <div className="asm-matrix-section">
                  {/* Header (Đã bỏ switch toggle "Đang bật" theo yêu cầu) */}
                  <div className="asm-matrix-header">
                    <div className="asm-matrix-title-group">
                      {/* Green icon box #85F8C4 */}
                      <div className="asm-matrix-green-icon">
                        <IconShuffle width={18} height={18} color="#069669" />
                      </div>

                      <div className="asm-matrix-title-col">
                        <div className="asm-matrix-title-row">
                          <h3 className="asm-matrix-heading">Ma trận câu hỏi & Cài đặt xáo trộn</h3>
                          <span className="asm-matrix-badge">TỰ ĐỘNG XÁO TRỘN</span>
                        </div>
                        <p className="asm-matrix-desc">
                          Thiết lập tỷ lệ câu hỏi theo chuyên đề và mức độ nhận thức (Bloom) để hệ thống tự động sinh đề
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 1. Chọn số câu theo từng Chương / Chuyên đề (Sắp xếp theo dạng danh sách từ trên xuống) */}
                  <div className="asm-sub-block">
                    <div className="asm-sub-header">
                      <div className="asm-sub-title-wrap">
                        <IconFolder width={16} height={16} color="#0051D5" />
                        <h4 className="asm-sub-title">1. Chọn số câu theo từng Chương / Chuyên đề</h4>
                      </div>

                      <div className="asm-sub-counter">
                        <span className="asm-sub-counter-label">ĐÃ CHỌN:</span>
                        <span
                          className={`asm-sub-counter-badge ${
                            totalChapterQuestions !== targetQuestions ? 'warning' : ''
                          }`}
                        >
                          {totalChapterQuestions} / {targetQuestions} CÂU
                        </span>
                      </div>
                    </div>

                    {/* Danh sách các chương xếp từ trên xuống (Full width list) */}
                    <div className="asm-chapters-list">
                      {activeChaptersList.map((chap) => {
                        const conf = chapterConfigs[chap.id] || { selected: false, count: 0 };
                        const errorMsg = overlimitErrors[chap.id];

                        return (
                          <div key={chap.id} className="asm-chapter-item-container">
                            <div
                              className={`asm-chapter-card ${conf.selected ? 'selected' : ''} ${
                                errorMsg ? 'has-error' : ''
                              }`}
                            >
                              <div className="asm-chap-left">
                                <input
                                  type="checkbox"
                                  className="asm-checkbox"
                                  checked={conf.selected}
                                  onChange={() => handleToggleChapter(chap.id)}
                                />
                                <div className="asm-chap-info">
                                  <span className="asm-chap-name" title={chap.title}>
                                    {chap.title}
                                  </span>
                                  <span className="asm-chap-avail">
                                    Có sẵn: {chap.questionCount || 0} câu
                                  </span>
                                </div>
                              </div>

                              <div className="asm-chap-input-wrap">
                                <input
                                  type="number"
                                  className={`asm-chap-input ${errorMsg ? 'error' : ''}`}
                                  value={conf.count}
                                  min={0}
                                  disabled={!conf.selected}
                                  onChange={(e) => handleChapterCountChange(chap.id, e.target.value)}
                                />
                                <span className="asm-chap-unit">câu</span>
                              </div>
                            </div>

                            {/* Overlimit Warning Message */}
                            {errorMsg && (
                              <div className="asm-warning-text">
                                <IconAlertTriangle width={13} height={13} color="#BA1A1A" />
                                <span>⚠️ {errorMsg}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Nút & Box tạo chương mới ngay trong phần chương */}
                      {!isAddingMatrixChapter ? (
                        <button
                          type="button"
                          className="asm-btn-add-chapter-inline"
                          onClick={() => setIsAddingMatrixChapter(true)}
                        >
                          <IconPlus width={13} height={13} color="#0051D5" />
                          <span>+ Tạo thêm chương mới vào danh sách ma trận</span>
                        </button>
                      ) : (
                        <div className="asm-inline-add-chapter-box">
                          <div className="asm-inline-add-chapter-inputs">
                            <input
                              type="text"
                              className="asm-inline-input-title"
                              placeholder="Nhập tên chương học mới (ví dụ: Số phức và Oxyz)..."
                              value={newMatrixChapterTitle}
                              autoFocus
                              onChange={(e) => setNewMatrixChapterTitle(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCreateMatrixChapter()}
                            />
                            <div className="asm-inline-input-count-wrap">
                              <label>Kho câu hỏi:</label>
                              <input
                                type="number"
                                className="asm-inline-input-count"
                                value={newMatrixChapterCount}
                                min={1}
                                onChange={(e) =>
                                  setNewMatrixChapterCount(
                                    Math.max(1, parseInt(e.target.value, 10) || 1)
                                  )
                                }
                              />
                              <span>câu</span>
                            </div>
                          </div>
                          <div className="asm-inline-add-chapter-actions">
                            <button
                              type="button"
                              className="asm-btn-cancel-inline"
                              onClick={() => {
                                setIsAddingMatrixChapter(false);
                                setNewMatrixChapterTitle('');
                              }}
                            >
                              Hủy
                            </button>
                            <button
                              type="button"
                              className="asm-btn-save-inline"
                              onClick={handleCreateMatrixChapter}
                            >
                              Lưu chương
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Phân bổ theo cấp độ nhận thức (Bloom) */}
                  <div className="asm-sub-block">
                    <div className="asm-sub-header">
                      <div className="asm-sub-title-wrap">
                        <IconSliders width={15} height={15} color="#0051D5" />
                        <h4 className="asm-sub-title">2. Phân bổ theo cấp độ nhận thức (Bloom)</h4>
                      </div>

                      <div className="asm-sub-counter">
                        <span className="asm-sub-counter-label">TỔNG MỨC ĐỘ:</span>
                        <span className="asm-sub-counter-badge">
                          {bloomStats.total} CÂU ({bloomStats.nhanBietPct + bloomStats.thongHieuPct + bloomStats.vanDungPct + bloomStats.vanDungCaoPct}%)
                        </span>
                      </div>
                    </div>

                    {/* 4 Columns for Bloom Taxonomy */}
                    <div className="asm-bloom-grid">
                      {/* Nhận biết */}
                      <div className="asm-bloom-card level-nhan-biet">
                        <div className="asm-bloom-header">
                          <span className="asm-bloom-name">Nhận biết</span>
                          <span className="asm-bloom-badge">{bloomStats.nhanBietPct}%</span>
                        </div>
                        <div className="asm-bloom-body">
                          <input
                            type="number"
                            className="asm-bloom-input"
                            value={bloomDistribution.nhanBiet}
                            min={0}
                            onChange={(e) => handleBloomChange('nhanBiet', e.target.value)}
                          />
                          <span className="asm-chap-unit">câu</span>
                        </div>
                        <div className="asm-bloom-bar-container">
                          <div
                            className="asm-bloom-bar"
                            style={{ width: `${Math.min(100, bloomStats.nhanBietPct)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Thông hiểu */}
                      <div className="asm-bloom-card level-thong-hieu">
                        <div className="asm-bloom-header">
                          <span className="asm-bloom-name">Thông hiểu</span>
                          <span className="asm-bloom-badge">{bloomStats.thongHieuPct}%</span>
                        </div>
                        <div className="asm-bloom-body">
                          <input
                            type="number"
                            className="asm-bloom-input"
                            value={bloomDistribution.thongHieu}
                            min={0}
                            onChange={(e) => handleBloomChange('thongHieu', e.target.value)}
                          />
                          <span className="asm-chap-unit">câu</span>
                        </div>
                        <div className="asm-bloom-bar-container">
                          <div
                            className="asm-bloom-bar"
                            style={{ width: `${Math.min(100, bloomStats.thongHieuPct)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Vận dụng */}
                      <div className="asm-bloom-card level-van-dung">
                        <div className="asm-bloom-header">
                          <span className="asm-bloom-name">Vận dụng</span>
                          <span className="asm-bloom-badge">{bloomStats.vanDungPct}%</span>
                        </div>
                        <div className="asm-bloom-body">
                          <input
                            type="number"
                            className="asm-bloom-input"
                            value={bloomDistribution.vanDung}
                            min={0}
                            onChange={(e) => handleBloomChange('vanDung', e.target.value)}
                          />
                          <span className="asm-chap-unit">câu</span>
                        </div>
                        <div className="asm-bloom-bar-container">
                          <div
                            className="asm-bloom-bar"
                            style={{ width: `${Math.min(100, bloomStats.vanDungPct)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Vận dụng cao */}
                      <div className="asm-bloom-card level-vd-cao">
                        <div className="asm-bloom-header">
                          <span className="asm-bloom-name">Vận dụng cao</span>
                          <span className="asm-bloom-badge">{bloomStats.vanDungCaoPct}%</span>
                        </div>
                        <div className="asm-bloom-body">
                          <input
                            type="number"
                            className="asm-bloom-input"
                            value={bloomDistribution.vanDungCao}
                            min={0}
                            onChange={(e) => handleBloomChange('vanDungCao', e.target.value)}
                          />
                          <span className="asm-chap-unit">câu</span>
                        </div>
                        <div className="asm-bloom-bar-container">
                          <div
                            className="asm-bloom-bar"
                            style={{ width: `${Math.min(100, bloomStats.vanDungCaoPct)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Modal Footer */}
          {!isSuccess && (
            <div className="asm-footer">
              <div className="asm-footer-stat">
                <span>Tổng số câu đã chọn:</span>
                <strong>{totalChapterQuestions} câu</strong>
                {totalChapterQuestions !== targetQuestions && (
                  <span style={{ color: '#D97706', fontSize: '12px' }}>
                    (Khác với mục tiêu ban đầu: {targetQuestions} câu)
                  </span>
                )}
              </div>

              <div className="asm-footer-actions">
                <button type="button" className="asm-btn-cancel" onClick={onClose}>
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  className="asm-btn-submit"
                  disabled={hasAnyOverlimit || totalChapterQuestions === 0}
                  onClick={handleProceedShuffle}
                >
                  <IconShuffle width={15} height={15} color="#FFFFFF" />
                  <span>Tiến hành trộn đề & Lưu</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Destination Folder & Chapter Explorer Popup */}
      <DestinationFolderModal
        isOpen={isFolderPickerOpen}
        onClose={() => setIsFolderPickerOpen(false)}
        currentLocation={destinationLocation}
        onConfirmLocation={(loc) => {
          setDestinationLocation(loc);
          setLocationError(false);
        }}
      />
    </>
  );
}
