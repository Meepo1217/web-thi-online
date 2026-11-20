import React, { useState, useMemo } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import ExamCard from './ExamCard';
import QuestionPagination from '../../question-bank/question-list/QuestionPagination';
import QuestionDeleteModal from '../../question-bank/question-delete/QuestionDeleteModal';
import SingleInputModal from '../../../../components/ui/SingleInputModal';
import {
  IconArrowRight,
  IconChevronRight,
  IconFolder,
  IconExport,
  IconSearch,
  IconChevronDown,
  IconClose,
  IconPlus,
  IconTrash,
} from '../../../../components/ui/icons';
import {
  EXAM_SUBJECT_INFO,
  EXAM_FILTER_OPTIONS,
  INITIAL_EXAMS,
} from './examListData';
import '../../question-bank/question-list/question-list.css';
import '../../question-bank/question-delete/question-delete.css';

/**
 * ExamList - Màn hình Danh sách đề thi (Level 3)
 * Kế thừa trực tiếp cấu trúc của QuestionList trong Question Bank
 * Route: /teacher/exams/:subjectId/list
 */
export default function ExamList() {
  const { subjectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Nhận thông tin môn học & chương truyền qua navigation state
  const subjectTitle = location.state?.subjectTitle || EXAM_SUBJECT_INFO.name;
  const chapterTitle = location.state?.chapterTitle || EXAM_SUBJECT_INFO.chapterTitle;

  const [exams, setExams] = useState(INITIAL_EXAMS);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [activeChips, setActiveChips] = useState([
    { id: 'subject', label: 'TOÁN 12', color: 'blue' },
  ]);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Modals state
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    exam: null,
    count: 1,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Toggle chọn một đề thi
  const handleToggleSelect = (examId) => {
    setSelectedIds((prev) =>
      prev.includes(examId)
        ? prev.filter((id) => id !== examId)
        : [...prev, examId]
    );
  };

  // Toggle chọn tất cả
  const handleToggleSelectAll = () => {
    if (selectedIds.length === exams.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(exams.map((e) => e.id));
    }
  };

  // Lọc theo level
  const handleLevelChange = (level) => {
    setFilterLevel(level);
    if (level === 'all') {
      setActiveChips((prev) => prev.filter((c) => c.id !== 'level'));
    } else {
      const found = EXAM_FILTER_OPTIONS.levels.find((l) => l.value === level);
      const label = found ? found.label.toUpperCase() : level.toUpperCase();
      setActiveChips((prev) => {
        const others = prev.filter((c) => c.id !== 'level');
        return [...others, { id: 'level', label, color: 'slate' }];
      });
    }
  };

  // Xóa chip lọc
  const handleRemoveChip = (chipId) => {
    setActiveChips((prev) => prev.filter((c) => c.id !== chipId));
    if (chipId === 'level') setFilterLevel('all');
  };

  // Mở modal xóa đề thi đơn lẻ
  const handleRequestDelete = (exam) => {
    setDeleteModalState({
      isOpen: true,
      exam,
      count: 1,
    });
  };

  // Mở modal xóa hàng loạt đã chọn
  const handleRequestBatchDelete = () => {
    if (selectedIds.length === 0) return;
    setDeleteModalState({
      isOpen: true,
      exam: {
        code: `${selectedIds.length} ĐỀ THI ĐÃ CHỌN`,
        linkedExamsCount: selectedIds.length,
        studentSubmissionsCount: '3,200',
      },
      count: selectedIds.length,
    });
  };

  // Xác nhận xóa
  const handleConfirmDelete = () => {
    if (deleteModalState.count > 1) {
      setExams((prev) => prev.filter((e) => !selectedIds.includes(e.id)));
      setSelectedIds([]);
    } else if (deleteModalState.exam?.id) {
      setExams((prev) => prev.filter((e) => e.id !== deleteModalState.exam.id));
      setSelectedIds((prev) => prev.filter((id) => id !== deleteModalState.exam.id));
    }
    setDeleteModalState({ isOpen: false, exam: null, count: 1 });
  };

  // Thêm đề thi mới nhanh
  const handleCreateExam = (examTitle) => {
    const nextIdx = exams.length + 1;
    const newExam = {
      id: `EXAM-12-${String(nextIdx).padStart(3, '0')}`,
      code: `#EXAM-12-${String(nextIdx).padStart(3, '0')}`,
      title: examTitle,
      description: 'Đề thi trắc nghiệm mới khởi tạo trong chuyên đề.',
      duration: '45 phút',
      questionCount: 40,
      level: 'VẬN DỤNG',
      levelType: 'van-dung',
      tags: ['Đề mới', 'Trắc nghiệm'],
      author: 'Bạn (Giảng viên)',
      date: 'Vừa xong',
      usageCount: 0,
    };
    setExams((prev) => [newExam, ...prev]);
    setIsCreateModalOpen(false);
  };

  // Lọc đề thi
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchSearch =
        !searchTerm ||
        exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchLevel =
        filterLevel === 'all' || exam.levelType === filterLevel;

      return matchSearch && matchLevel;
    });
  }, [exams, searchTerm, filterLevel]);

  return (
    <div className="ql-page-container">
      {/* 1. Thanh tiêu đề & Điều hướng (Kế thừa 100% QuestionListHeader) */}
      <div className="ql-header-section">
        {/* Breadcrumb and Context Navigation */}
        <div className="ql-breadcrumb-bar">
          <nav className="ql-breadcrumb-nav" aria-label="Breadcrumb">
            <Link to="/teacher/exams" className="ql-breadcrumb-link">
              Quản lý đề thi
            </Link>
            <span className="ql-breadcrumb-sep">
              <IconChevronRight width={5} height={8} color="#76777D" />
            </span>
            <Link to={`/teacher/exams/${subjectId || 'math'}`} className="ql-breadcrumb-link">
              {subjectTitle}
            </Link>
            <span className="ql-breadcrumb-sep">
              <IconChevronRight width={5} height={8} color="#76777D" />
            </span>
            <span className="ql-breadcrumb-current">Danh sách đề thi</span>
          </nav>

          {/* Sync Status Badge */}
          <div className="ql-sync-badge">
            <span className="ql-sync-dot" />
            <span className="ql-sync-text">{EXAM_SUBJECT_INFO.syncStatus}</span>
          </div>
        </div>

        {/* Main Header Banner & Quick Actions */}
        <div className="ql-main-banner">
          <div className="ql-banner-left">
            <div className="ql-title-row">
              <div className="ql-subject-icon-box">
                <IconFolder width={21} height={21} color="#0051D5" />
              </div>
              <h1 className="ql-page-title">
                Danh sách đề thi: {chapterTitle}
              </h1>
              <span className="ql-count-badge">
                {exams.length} ĐỀ THI
              </span>
            </div>
            <p className="ql-page-desc">{EXAM_SUBJECT_INFO.description}</p>
          </div>

          {/* Action Buttons Cluster */}
          <div className="ql-action-cluster">
            <button
              type="button"
              className="ql-btn ql-btn-soft"
              onClick={() => alert('Xuất danh sách đề thi ra tệp nén / PDF')}
            >
              <IconExport width={12} height={12} color="#76777D" />
              <span>Xuất kho đề</span>
            </button>

            <button
              type="button"
              className="ql-btn ql-btn-danger-outline"
              onClick={selectedIds.length > 0 ? handleRequestBatchDelete : () => handleRequestDelete(exams[0])}
              title="Xóa đề thi"
            >
              <IconTrash width={13} height={14} color="#BA1A1A" />
              <span>{selectedIds.length > 0 ? `Xóa (${selectedIds.length})` : 'Xóa đề thi'}</span>
            </button>

            <button
              type="button"
              className="ql-btn ql-btn-dark"
              onClick={() => setIsCreateModalOpen(true)}
              title="Khởi tạo đề thi mới"
            >
              <IconPlus width={10.5} height={10.5} color="#FFFFFF" />
              <span>Tạo đề thi mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Filter Bar: Tìm kiếm + Lọc mức độ */}
      <div className="ql-filter-container">
        <div className="ql-filter-top-row">
          <div className="ql-search-wrapper">
            <span className="ql-search-icon">
              <IconSearch width={15} height={15} color="#76777D" />
            </span>
            <input
              type="text"
              className="ql-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo mã đề (#EXAM-12-001), tên đề, chuyên đề..."
            />
          </div>

          <div className="ql-select-wrapper">
            <select
              className={`ql-select ${filterLevel !== 'all' ? 'ql-select--active' : ''}`}
              value={filterLevel}
              onChange={(e) => handleLevelChange(e.target.value)}
            >
              {EXAM_FILTER_OPTIONS.levels.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="ql-select-arrow">
              <IconChevronDown width={9} height={6} color="#76777D" />
            </span>
          </div>
        </div>

        {/* Active Chips Row */}
        {activeChips.length > 0 && (
          <div className="ql-chips-row">
            <span className="ql-chips-label">ĐANG LỌC:</span>
            {activeChips.map((chip) => (
              <div
                key={chip.id}
                className={`ql-chip ${chip.color === 'blue' ? 'ql-chip-blue' : 'ql-chip-slate'}`}
              >
                <span className="ql-chip-text">{chip.label}</span>
                <button
                  type="button"
                  className="ql-chip-remove"
                  onClick={() => handleRemoveChip(chip.id)}
                >
                  <IconClose width={8} height={8} color="currentColor" />
                </button>
              </div>
            ))}

            <button
              type="button"
              className="ql-clear-all-btn"
              onClick={() => {
                setActiveChips([]);
                setSearchTerm('');
                setFilterLevel('all');
              }}
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* 3. Canvas Danh sách đề thi */}
      <div className="ql-canvas">
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              isSelected={selectedIds.includes(exam.id)}
              onToggleSelect={handleToggleSelect}
              onViewDetail={(item) =>
                navigate(`/teacher/exams/${subjectId || 'math'}/detail/${item.id}`, {
                  state: { exam: item },
                })
              }
              onEdit={(item) =>
                navigate(`/teacher/exams/${subjectId || 'math'}/edit/${item.id}`, {
                  state: { exam: item },
                })
              }
              onDelete={handleRequestDelete}
            />
          ))
        ) : (
          <div className="ql-empty-state">
            <div className="ql-empty-icon">🔍</div>
            <h3 className="ql-empty-title">Không tìm thấy đề thi phù hợp</h3>
            <p className="ql-empty-desc">
              Vui lòng thử điều chỉnh từ khóa tìm kiếm hoặc mức độ lọc đề.
            </p>
          </div>
        )}
      </div>

      {/* 4. Phân trang */}
      {filteredExams.length > 0 && (
        <QuestionPagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredExams.length / pageSize) || 1}
          pageSize={pageSize}
          totalItems={filteredExams.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={() => {}}
        />
      )}

      {/* 5. Modal Tạo đề thi mới */}
      <SingleInputModal
        isOpen={isCreateModalOpen}
        title="Tạo đề thi mới"
        subtitle={`Khởi tạo đề thi mới thuộc chuyên mục: ${chapterTitle}`}
        label="TÊN ĐỀ THI"
        placeholder="Ví dụ: Đề kiểm tra 1 tiết Đại số hoặc Đề thi thử số 01"
        confirmText="Tạo đề thi"
        cancelText="Hủy bỏ"
        iconType="plus"
        onConfirm={handleCreateExam}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* 6. Modal Xác nhận xóa đề thi */}
      <QuestionDeleteModal
        isOpen={deleteModalState.isOpen}
        question={deleteModalState.exam || { code: 'EXAM-01' }}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalState({ isOpen: false, exam: null, count: 1 })}
      />
    </div>
  );
}
