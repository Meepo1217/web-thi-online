import React, { useState } from 'react';
import { useNavigate } from '../../../shims/react-router-dom';
import {
  IconClose,
  IconSave,
  IconEye,
  IconCheck,
  IconClock,
  IconCalendar,
  IconShuffle,
  IconFileText,
  IconSparkles,
  IconSearch,
  IconFilter,
  IconShield
} from '../../../components/ui/icons';
import { INITIAL_EXAMS } from '../exam-management/exam-list/examListData';
import './create-session.css';

const STORAGE_KEY = 'eduquiz_teacher_sessions';

export default function TeacherCreateSessionPage() {
  const navigate = useNavigate();

  // Active Tab: 1 (Thông tin ca thi & Chọn đề thi) | 2 (Cấu hình nâng cao)
  const [activeTab, setActiveTab] = useState(1);

  // Toast notification
  const [toastMessage, setToastMessage] = useState('');

  // Modal chọn đề thi từ Quản lý đề thi
  const [isExamPickerOpen, setIsExamPickerOpen] = useState(false);
  const [examSearchTerm, setExamSearchTerm] = useState('');

  // Modal preview
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Đề thi được chọn từ Quản lý đề thi (mặc định lấy đề đầu tiên)
  const [selectedExam, setSelectedExam] = useState(INITIAL_EXAMS[0]);

  // Form State - Tab 1 (General Info)
  const [generalInfo, setGeneralInfo] = useState({
    title: INITIAL_EXAMS[0]?.title || 'Kiểm tra chuyên đề: Lập trình Web với React & Laravel',
    room: 'HA6 - P.305',
    department: 'KHOA CÔNG NGHỆ THÔNG TIN',
    pinCode: '6868',
    mode: 'Trực tuyến',
    sessionType: 'official' // 'official' (Kỳ thi chính thức) | 'practice' (Khảo sát & Thi thử)
  });

  // Form State - Tab 2 (Timing & Advanced)
  const [timing, setTiming] = useState({
    duration: INITIAL_EXAMS[0]?.questionCount === 50 ? 90 : 45,
    isUnlimitedTime: false, // true khi là Thi thử và chọn không giới hạn thời gian
    questionsCount: INITIAL_EXAMS[0]?.questionCount || 40,
    autoSubmit: true,
    startTime: '2026-06-15T08:00',
    endTime: '2026-06-15T11:30',
    isUnlimitedEndTime: false, // true khi không giới hạn thời gian kết thúc ca thi
    allowRetake: true,
    maxAttempts: 1
  });

  // Form State - Tab 2 (Anti-Cheating) - Đã bỏ camera AI Proctoring
  const [security, setSecurity] = useState({
    fullScreenLock: true,
    blockTabSwitch: true,
    shuffleQuestions: true,
    periodicSnapshot: true,
    limitViolations: true,
    maxViolations: 3
  });

  // Form State - Tab 2 (Result Visibility & Review)
  const [resultVisibility, setResultVisibility] = useState({
    scorePublishRule: 'after_session', // 'immediate' | 'after_session' | 'manual'
    allowReviewQuestions: true,
    allowReviewSolutions: true
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Xử lý chọn đề thi từ Quản lý đề thi
  const handleSelectExam = (exam) => {
    setSelectedExam(exam);
    setGeneralInfo(prev => ({
      ...prev,
      title: exam.title
    }));

    // Tự động phân tích và đồng bộ thời lượng thi & số câu hỏi
    const parsedDuration = parseInt(exam.duration, 10) || 45;
    setTiming(prev => ({
      ...prev,
      duration: parsedDuration,
      questionsCount: exam.questionCount || 40
    }));

    setIsExamPickerOpen(false);
    showToast(`Đã chọn đề thi: "${exam.title}" và đồng bộ thời lượng!`);
  };

  // Lọc danh sách đề thi trong Modal picker
  const filteredExams = INITIAL_EXAMS.filter(ex => {
    if (!examSearchTerm.trim()) return true;
    const q = examSearchTerm.toLowerCase();
    return ex.title.toLowerCase().includes(q) || ex.code.toLowerCase().includes(q) || ex.author.toLowerCase().includes(q);
  });

  // Lưu nháp
  const handleSaveDraft = () => {
    const draftSession = {
      id: `SES-DRAFT-${Date.now().toString().slice(-4)}`,
      title: generalInfo.title || 'Ca thi chưa đặt tên',
      room: generalInfo.room || 'Phòng chờ',
      department: generalInfo.department,
      statusTime: 'BẢN NHÁP',
      date: new Date().toLocaleDateString('vi-VN'),
      duration: timing.isUnlimitedTime ? 'Không giới hạn' : `${timing.duration} phút`,
      isUnlimitedTime: timing.isUnlimitedTime,
      sessionType: generalInfo.sessionType,
      questions: `${timing.questionsCount} câu`,
      studentsCount: '45 thí sinh',
      submittedCount: 0,
      activeStudents: 0,
      invigilator: 'ThS. Nguyễn Văn A',
      mode: generalInfo.mode,
      category: 'draft',
      pinCode: generalInfo.pinCode,
      allowedClasses: ['12A1'],
      selectedExamId: selectedExam?.id,
      timing,
      security,
      resultVisibility
    };

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      localStorage.setItem(STORAGE_KEY, JSON.stringify([draftSession, ...existing]));
    } catch {
      // ignore
    }

    showToast('Đã lưu bản nháp ca thi thành công!');
  };

  // Xuất bản ca thi mới
  const handlePublish = (e) => {
    if (e) e.preventDefault();

    if (!generalInfo.title.trim() || !generalInfo.room.trim()) {
      setActiveTab(1);
      showToast('Vui lòng nhập tên bài thi và mã phòng thi!');
      return;
    }

    const newSession = {
      id: `SES-${Date.now().toString().slice(-4)}`,
      title: generalInfo.title,
      room: generalInfo.room,
      department: generalInfo.department,
      shift: 'CA 1',
      statusTime: `BẮT ĐẦU: ${timing.startTime.split('T')[1] || '08:00'}`,
      date: new Date(timing.startTime).toLocaleDateString('vi-VN') || new Date().toLocaleDateString('vi-VN'),
      duration: timing.isUnlimitedTime ? 'Không giới hạn' : `${timing.duration} phút`,
      isUnlimitedTime: timing.isUnlimitedTime,
      sessionType: generalInfo.sessionType,
      questions: `${timing.questionsCount} câu`,
      studentsCount: '45 thí sinh',
      submittedCount: 0,
      activeStudents: 0,
      invigilator: 'ThS. Nguyễn Văn A',
      mode: generalInfo.mode,
      category: 'upcoming',
      pinCode: generalInfo.pinCode,
      allowedClasses: ['12A1'],
      school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
      selectedExamId: selectedExam?.id,
      timing,
      security,
      resultVisibility
    };

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newSession, ...existing]));
    } catch {
      // ignore
    }

    // Điều hướng về danh sách ca thi
    navigate('/teacher/sessions');
  };

  return (
    <div className="create-session-page-wrapper">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          background: '#0051D5',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0, 81, 213, 0.3)',
          zIndex: 10000,
          fontWeight: 600,
          fontSize: '13.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <IconCheck width={16} height={16} color="#FFFFFF" />
          {toastMessage}
        </div>
      )}

      {/* 1. Subheader & Tab Navigation Bar */}
      <header className="cs-subheader">
        <div className="cs-subheader-inner">
          
          {/* Process Tabs: Đã bỏ tab 3 theo ảnh đính kèm */}
          <nav className="cs-process-tabs">
            <button
              type="button"
              className={`cs-tab-item ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => setActiveTab(1)}
            >
              <span>1. Thông tin ca thi & Chọn đề thi</span>
            </button>

            <button
              type="button"
              className={`cs-tab-item ${activeTab === 2 ? 'active' : ''}`}
              onClick={() => setActiveTab(2)}
            >
              <svg width="14" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Cấu hình nâng cao</span>
            </button>
          </nav>

          {/* Action Buttons Top Right */}
          <div className="cs-header-actions">
            <button
              type="button"
              className="cs-btn-cancel"
              onClick={() => navigate('/teacher/sessions')}
              title="Quay lại danh sách ca thi"
            >
              <IconClose width={11} height={11} color="currentColor" />
              <span>Hủy</span>
            </button>

            <button
              type="button"
              className="cs-btn-draft"
              onClick={handleSaveDraft}
              title="Lưu lại cấu hình nháp"
            >
              <IconSave width={12} height={12} color="currentColor" />
              <span>Lưu nháp</span>
            </button>

            <button
              type="button"
              className="cs-btn-preview"
              onClick={() => setShowPreviewModal(true)}
              title="Xem trước cấu hình ca thi"
            >
              <IconEye width={14} height={14} color="currentColor" />
              <span>Xem trước</span>
            </button>

            <button
              type="button"
              className="cs-btn-publish"
              onClick={handlePublish}
              title="Kích hoạt & Mở ca thi mới"
            >
              <IconCheck width={12} height={12} color="#FFFFFF" />
              <span>Xuất bản</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Canvas */}
      <main className="cs-main-canvas">

        {/* =========================================================================
            TAB 1: THÔNG TIN CHUNG & CHỌN ĐỀ THI TỪ QUẢN LÝ ĐỀ THI
            ========================================================================= */}
        {activeTab === 1 && (
          <section className="cs-section-card">
            <div className="cs-section-header">
              <div className="cs-header-left-group">
                <div className="cs-icon-box-primary">
                  <IconFileText width={20} height={20} color="#0051D5" />
                </div>
                <div className="cs-section-title-col">
                  <h2 className="cs-section-h2">1. Thông tin ca thi & Chọn đề thi</h2>
                  <p className="cs-section-sub">Liên kết đề thi từ thư viện Quản lý đề thi và cài đặt thông số phòng thi.</p>
                </div>
              </div>
              <span className="cs-section-badge blue">BẮT BUỘC</span>
            </div>

            {/* Khối chọn đề thi từ Quản lý đề thi */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="cs-form-label" style={{ fontSize: '13px' }}>
                  Đề thi được áp dụng từ Quản lý đề thi *
                </label>
                <button
                  type="button"
                  onClick={() => setIsExamPickerOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0051D5',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Xem danh sách đề thi ({INITIAL_EXAMS.length})
                </button>
              </div>

              {selectedExam ? (
                <div className="cs-exam-selected-card">
                  <div className="cs-exam-top-row">
                    <div className="cs-exam-title-badge">
                      <span className="cs-exam-code-tag">{selectedExam.code}</span>
                      <span className="cs-exam-title-text">{selectedExam.title}</span>
                    </div>

                    <button
                      type="button"
                      className="cs-btn-change-exam"
                      onClick={() => setIsExamPickerOpen(true)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Đổi đề thi khác
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsExamPickerOpen(true)}
                  style={{
                    width: '100%',
                    padding: '24px',
                    border: '2px dashed #0051D5',
                    borderRadius: '8px',
                    background: '#F8FAFF',
                    color: '#0051D5',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <IconFileText width={18} height={18} color="#0051D5" />
                  + Bấm vào đây để chọn đề thi từ Quản lý đề thi
                </button>
              )}
            </div>

            {/* Tên hiển thị ca thi */}
            <div className="cs-form-group">
              <label className="cs-form-label">Tên hiển thị ca thi / Môn học *</label>
              <input
                type="text"
                className="cs-form-input"
                value={generalInfo.title}
                onChange={(e) => setGeneralInfo({ ...generalInfo, title: e.target.value })}
                placeholder="VD: Kiểm tra chuyên đề: Lập trình Web với React & Laravel"
              />
            </div>

            {/* Thông tin phòng thi, khoa bộ môn, mã PIN & loại kỳ thi */}
            <div className="cs-form-grid-2">
              <div className="cs-form-group">
                <label className="cs-form-label">Phòng thi / Mã phòng *</label>
                <input
                  type="text"
                  className="cs-form-input"
                  value={generalInfo.room}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, room: e.target.value })}
                  placeholder="VD: HA6 - P.305"
                />
              </div>

              <div className="cs-form-group">
                <label className="cs-form-label">Khoa / Bộ môn phụ trách</label>
                <select
                  className="cs-form-input"
                  value={generalInfo.department}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, department: e.target.value })}
                >
                  <option value="KHOA CÔNG NGHỆ THÔNG TIN">KHOA CÔNG NGHỆ THÔNG TIN</option>
                  <option value="KHOA LÝ LUẬN CHÍNH TRỊ">KHOA LÝ LUẬN CHÍNH TRỊ</option>
                  <option value="KHOA ĐIỆN - ĐIỆN TỬ">KHOA ĐIỆN - ĐIỆN TỬ</option>
                  <option value="KHOA TIẾNG ANH & NGOẠI NGỮ">KHOA TIẾNG ANH & NGOẠI NGỮ</option>
                </select>
              </div>

              <div className="cs-form-group">
                <label className="cs-form-label">Mã PIN phòng thi</label>
                <input
                  type="text"
                  className="cs-form-input"
                  value={generalInfo.pinCode}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, pinCode: e.target.value })}
                  placeholder="VD: 6868"
                />
              </div>

              <div className="cs-form-group">
                <label className="cs-form-label">
                  Hình thức đánh giá / Loại kỳ thi <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <select
                  className="cs-form-input"
                  value={generalInfo.sessionType}
                  onChange={(e) => {
                    const nextType = e.target.value;
                    setGeneralInfo({ ...generalInfo, sessionType: nextType });
                    if (nextType === 'official') {
                      setTiming((prev) => ({
                        ...prev,
                        isUnlimitedTime: false,
                        duration: prev.duration || 45,
                        autoSubmit: true,
                      }));
                    }
                  }}
                >
                  <option value="official">Kỳ thi chính thức</option>
                  <option value="practice">Khảo sát & Thi thử nghiệm</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', width: '100%' }}>
              <button
                type="button"
                className="cs-btn-publish"
                onClick={() => setActiveTab(2)}
              >
                Tiếp tục: Cấu hình nâng cao →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================================
            TAB 2: CẤU HÌNH NÂNG CAO (Advanced Settings Modules - Đúng Figma)
            ========================================================================= */}
        {activeTab === 2 && (
          <>
            {/* ---------------------------------------------------------------------
                SECTION 1: Timing & Attempt Limits
                --------------------------------------------------------------------- */}
            <section className="cs-section-card">
              <div className="cs-section-header">
                <div className="cs-header-left-group">
                  <div className="cs-icon-box-primary">
                    <IconClock width={18} height={21} color="#0051D5" />
                  </div>
                  <div className="cs-section-title-col">
                    <h2 className="cs-section-h2">1. Thời gian & Giới hạn làm bài</h2>
                    <p className="cs-section-sub">Cấu hình thời lượng thi, khung giờ mở đề và cơ chế tự động nộp bài.</p>
                  </div>
                </div>
                <span className="cs-section-badge blue">BẮT BUỘC</span>
              </div>

              {/* Duration & Auto-submit Row (3 Boxes) */}
              <div className="cs-timing-row">
                {/* Duration */}
                <div className="cs-timing-box">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="cs-timing-label" style={{ margin: 0 }}>
                      <IconClock width={16} height={16} color="#0051D5" />
                      <span>Thời lượng làm bài</span>
                    </label>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12.5px',
                        color: '#0051D5',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={timing.isUnlimitedTime}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setTiming({ ...timing, isUnlimitedTime: checked, autoSubmit: !checked });
                          if (checked && generalInfo.sessionType === 'official') {
                            setGeneralInfo((prev) => ({ ...prev, sessionType: 'practice' }));
                            showToast('Đã chuyển loại kỳ thi sang "Khảo sát & Thi thử" để áp dụng không giới hạn thời gian');
                          }
                        }}
                        style={{ width: '16px', height: '16px', accentColor: '#0051D5', cursor: 'pointer' }}
                      />
                      <span>Không giới hạn</span>
                    </label>
                  </div>

                  <div className={`cs-input-with-suffix ${timing.isUnlimitedTime ? 'is-disabled' : ''}`}>
                    <input
                      type="number"
                      min="1"
                      disabled={timing.isUnlimitedTime}
                      className="cs-input-field"
                      value={timing.duration}
                      onChange={(e) => setTiming({ ...timing, duration: Math.max(1, Number(e.target.value) || 1) })}
                    />
                    <span className="cs-suffix-text">Phút</span>
                  </div>

                  <p className="cs-help-text" style={{ marginTop: '8px' }}>
                    {timing.isUnlimitedTime
                      ? 'Thí sinh được tự do làm bài không bị giới hạn số phút.'
                      : 'Đồng hồ đếm ngược kích hoạt khi thí sinh bắt đầu làm bài.'}
                  </p>
                </div>

                {/* Questions Count */}
                <div className="cs-timing-box">
                  <label className="cs-timing-label">
                    <IconFileText width={16} height={16} color="#0051D5" />
                    <span>Số lượng câu hỏi</span>
                  </label>
                  <div className="cs-input-with-suffix">
                    <input
                      type="number"
                      min="1"
                      className="cs-input-field"
                      value={timing.questionsCount}
                      onChange={(e) => setTiming({ ...timing, questionsCount: Number(e.target.value) })}
                    />
                    <span className="cs-suffix-text">Câu</span>
                  </div>
                  <p className="cs-help-text">Số lượng câu hỏi thí sinh cần hoàn thành.</p>
                </div>

                {/* Auto submit switch */}
                <div className="cs-timing-box" style={{ justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="cs-timing-label">
                      <IconSparkles width={16} height={16} color="#0051D5" />
                      <span>Tự động nộp bài</span>
                    </label>
                    <button
                      type="button"
                      disabled={timing.isUnlimitedTime}
                      className={`cs-switch-toggle ${timing.autoSubmit && !timing.isUnlimitedTime ? 'active' : ''}`}
                      onClick={() => !timing.isUnlimitedTime && setTiming({ ...timing, autoSubmit: !timing.autoSubmit })}
                      aria-label="Bật/Tắt tự động nộp bài"
                      style={{ opacity: timing.isUnlimitedTime ? 0.5 : 1, cursor: timing.isUnlimitedTime ? 'not-allowed' : 'pointer' }}
                    >
                      <span className="cs-switch-knob" />
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#45464D', lineHeight: '20px' }}>
                    {timing.isUnlimitedTime
                      ? 'Không áp dụng khi làm bài không giới hạn thời gian.'
                      : 'Khi hết 00:00, hệ thống tự động thu bài và niêm phong kết quả.'}
                  </p>
                </div>
              </div>

              {/* Schedule Range (Start & End Time) */}
              <div className="cs-schedule-row">
                <div className="cs-schedule-col">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', minHeight: '22px' }}>
                    <label className="cs-schedule-label" style={{ margin: 0 }}>
                      <IconCalendar width={16} height={16} color="#0051D5" />
                      <span>Thời gian bắt đầu làm bài</span>
                    </label>
                  </div>
                  <div className="cs-schedule-input-box">
                    <input
                      type="datetime-local"
                      className="cs-schedule-datetime"
                      value={timing.startTime}
                      onChange={(e) => setTiming({ ...timing, startTime: e.target.value })}
                    />
                  </div>
                  <p className="cs-help-text">Thí sinh chỉ được vào phòng từ thời điểm này.</p>
                </div>

                <div className="cs-schedule-col">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', minHeight: '22px' }}>
                    <label className="cs-schedule-label" style={{ margin: 0 }}>
                      <IconClock width={16} height={16} color="#BA1A1A" />
                      <span style={{ color: '#BA1A1A' }}>Thời gian kết thúc ca thi</span>
                    </label>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12.5px',
                        color: '#0051D5',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={timing.isUnlimitedEndTime || false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setTiming({ ...timing, isUnlimitedEndTime: checked });
                        }}
                        style={{ width: '16px', height: '16px', accentColor: '#0051D5', cursor: 'pointer' }}
                      />
                      <span>Không giới hạn</span>
                    </label>
                  </div>
                  <div className={`cs-schedule-input-box ${timing.isUnlimitedEndTime ? 'is-disabled' : ''}`}>
                    <input
                      type="datetime-local"
                      disabled={timing.isUnlimitedEndTime}
                      className="cs-schedule-datetime"
                      value={timing.endTime}
                      onChange={(e) => setTiming({ ...timing, endTime: e.target.value })}
                    />
                  </div>
                  <p className="cs-help-text">
                    {timing.isUnlimitedEndTime
                      ? 'Ca thi mở vô thời hạn, không tự động đóng cổng làm bài.'
                      : 'Cổng làm bài tự động khóa sau mốc này.'}
                  </p>
                </div>
              </div>

              {/* Retake & Multi-Attempt Config */}
              <div className="cs-retake-card">
                <div className="cs-retake-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconShuffle width={18} height={18} color="#0051D5" />
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1C30' }}>
                        Cho phép thi lại / Nhiều lần làm bài
                      </div>
                      <div style={{ fontSize: '13px', color: '#45464D' }}>
                        Cấu hình số lần thí sinh được phép nộp lại bài thi trong ca này.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`cs-switch-toggle ${timing.allowRetake ? 'active' : ''}`}
                    onClick={() => setTiming({ ...timing, allowRetake: !timing.allowRetake })}
                    aria-label="Bật/Tắt cho phép thi lại"
                  >
                    <span className="cs-switch-knob" />
                  </button>
                </div>

                {timing.allowRetake && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '432px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#0B1C30' }}>
                        Số lần thi tối đa:
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#0051D5', cursor: 'pointer', fontWeight: 600 }}>
                        <input
                          type="checkbox"
                          checked={timing.isUnlimitedAttempts || false}
                          onChange={(e) => setTiming({ ...timing, isUnlimitedAttempts: e.target.checked })}
                          style={{ accentColor: '#0051D5', cursor: 'pointer' }}
                        />
                        <span>Không giới hạn số lần</span>
                      </label>
                    </div>

                    <div className={`cs-input-with-suffix ${timing.isUnlimitedAttempts ? 'is-disabled' : ''}`}>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        disabled={timing.isUnlimitedAttempts}
                        className="cs-input-field"
                        value={timing.maxAttempts || 2}
                        onChange={(e) => setTiming({ ...timing, maxAttempts: Number(e.target.value) })}
                      />
                      <span className="cs-suffix-text">Lần</span>
                    </div>
                    <p className="cs-help-text">
                      {timing.isUnlimitedAttempts
                        ? 'Thí sinh có thể nộp lại bài thi nhiều lần tùy ý.'
                        : 'Số lần tối đa thí sinh được phép nộp lại bài thi.'}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* ---------------------------------------------------------------------
                SECTION 2: Anti-Cheating (Đã loại bỏ Camera & AI Proctoring theo ảnh)
                --------------------------------------------------------------------- */}
            <section className="cs-section-card">
              <div className="cs-section-header">
                <div className="cs-header-left-group">
                  <div className="cs-icon-box-danger">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BA1A1A" strokeWidth="2.2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="cs-section-title-col">
                    <h2 className="cs-section-h2">2. Giám sát chống gian lận & Bảo mật</h2>
                    <p className="cs-section-sub">Bảo vệ tính minh bạch của kỳ thi với công nghệ phát hiện gian lận tự động.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="cs-section-badge deep-blue">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px' }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    BẢO MẬT CAO
                  </span>
                </div>
              </div>

              {/* Security Options Grid (Đã loại bỏ tùy chọn Giám sát camera & AI) */}
              <div className="cs-security-grid">
                
                {/* Option 1: Full-screen */}
                <div className="cs-security-item">
                  <div className="cs-security-left">
                    <div className="cs-sec-icon-box">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0051D5" strokeWidth="2">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      </svg>
                    </div>
                    <div className="cs-sec-content">
                      <div className="cs-sec-title-row">
                        <span className="cs-sec-title">Khóa toàn màn hình</span>
                        <span className="cs-sec-badge">Khuyên dùng</span>
                      </div>
                      <span className="cs-sec-desc">Bắt buộc thí sinh phải làm bài ở chế độ toàn màn hình.</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="cs-checkbox-custom"
                    checked={security.fullScreenLock}
                    onChange={(e) => setSecurity({ ...security, fullScreenLock: e.target.checked })}
                  />
                </div>

                {/* Option 2: Tab switch block */}
                <div className="cs-security-item">
                  <div className="cs-security-left">
                    <div className="cs-sec-icon-box">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0051D5" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="9" y1="3" x2="9" y2="21" />
                      </svg>
                    </div>
                    <div className="cs-sec-content">
                      <div className="cs-sec-title-row">
                        <span className="cs-sec-title">Chặn chuyển tab & mở app khác</span>
                        <span className="cs-sec-badge">Nghiêm ngặt</span>
                      </div>
                      <span className="cs-sec-desc">Cảnh báo và ghi nhận vi phạm khi chuyển tab hoặc ứng dụng khác.</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="cs-checkbox-custom"
                    checked={security.blockTabSwitch}
                    onChange={(e) => setSecurity({ ...security, blockTabSwitch: e.target.checked })}
                  />
                </div>

                {/* Option 3: Shuffle */}
                <div className="cs-security-item">
                  <div className="cs-security-left">
                    <div className="cs-sec-icon-box">
                      <IconShuffle width={18} height={18} color="#0051D5" />
                    </div>
                    <div className="cs-sec-content">
                      <div className="cs-sec-title-row">
                        <span className="cs-sec-title">Xáo trộn câu hỏi & đáp án</span>
                        <span className="cs-sec-badge gray">Mặc định</span>
                      </div>
                      <span className="cs-sec-desc">Mỗi thí sinh nhận một mã đề hoán vị ngẫu nhiên khác nhau.</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="cs-checkbox-custom"
                    checked={security.shuffleQuestions}
                    onChange={(e) => setSecurity({ ...security, shuffleQuestions: e.target.checked })}
                  />
                </div>

                {/* Option 4: Snapshot */}
                <div className="cs-security-item">
                  <div className="cs-security-left">
                    <div className="cs-sec-icon-box">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0051D5" strokeWidth="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                    <div className="cs-sec-content">
                      <div className="cs-sec-title-row">
                        <span className="cs-sec-title">Chụp ảnh màn hình định kỳ</span>
                        <span className="cs-sec-badge">Tự động</span>
                      </div>
                      <span className="cs-sec-desc">Hệ thống tự động chụp màn hình mỗi 30 giây để lưu nhật ký.</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="cs-checkbox-custom"
                    checked={security.periodicSnapshot}
                    onChange={(e) => setSecurity({ ...security, periodicSnapshot: e.target.checked })}
                  />
                </div>

                {/* Option 5: Violation Limits */}
                <div className="cs-security-item" style={{ gridColumn: 'span 2' }}>
                  <div className="cs-security-left">
                    <div className="cs-sec-icon-box">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BA1A1A" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                      </svg>
                    </div>
                    <div className="cs-sec-content">
                      <div className="cs-sec-title-row">
                        <span className="cs-sec-title">Số lần gian lận tối đa trước khi khóa bài</span>
                      </div>
                      <span className="cs-sec-desc">Khi số lần vi phạm vượt ngưỡng này, bài thi tự động bị thu và khóa ngay lập tức.</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={security.maxViolations}
                      onChange={(e) => setSecurity({ ...security, maxViolations: Number(e.target.value) })}
                      style={{
                        width: '54px',
                        height: '32px',
                        textAlign: 'center',
                        fontSize: '15px',
                        fontWeight: 600,
                        border: '1px solid rgba(198, 198, 205, 0.6)',
                        borderRadius: '4px'
                      }}
                    />
                    <input
                      type="checkbox"
                      className="cs-checkbox-custom"
                      checked={security.limitViolations}
                      onChange={(e) => setSecurity({ ...security, limitViolations: e.target.checked })}
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* ---------------------------------------------------------------------
                SECTION 3: Result Visibility & Review Policy
                --------------------------------------------------------------------- */}
            <section className="cs-section-card">
              <div className="cs-section-header">
                <div className="cs-header-left-group">
                  <div className="cs-icon-box-primary">
                    <IconEye width={20} height={20} color="#0051D5" />
                  </div>
                  <div className="cs-section-title-col">
                    <h2 className="cs-section-h2">3. Hiển thị kết quả & Xem lại bài thi</h2>
                    <p className="cs-section-sub">Thiết lập quyền xem điểm số và xem lại câu trả lời sau khi nộp bài.</p>
                  </div>
                </div>
              </div>

              <div className="cs-results-row">
                {/* Score publication */}
                <div className="cs-result-col">
                  <label className="cs-result-group-title">Khi nào thí sinh được xem điểm số?</label>
                  
                  <div
                    className={`cs-radio-box ${resultVisibility.scorePublishRule === 'immediate' ? 'active' : ''}`}
                    onClick={() => setResultVisibility({ ...resultVisibility, scorePublishRule: 'immediate' })}
                  >
                    <input
                      type="radio"
                      name="scorePublishRule"
                      checked={resultVisibility.scorePublishRule === 'immediate'}
                      onChange={() => {}}
                    />
                    <span>Ngay sau khi nộp bài</span>
                  </div>

                  <div
                    className={`cs-radio-box ${resultVisibility.scorePublishRule === 'after_session' ? 'active' : ''}`}
                    onClick={() => setResultVisibility({ ...resultVisibility, scorePublishRule: 'after_session' })}
                  >
                    <input
                      type="radio"
                      name="scorePublishRule"
                      checked={resultVisibility.scorePublishRule === 'after_session'}
                      onChange={() => {}}
                    />
                    <span>Sau khi ca thi kết thúc (Khuyên dùng)</span>
                  </div>

                  <div
                    className={`cs-radio-box ${resultVisibility.scorePublishRule === 'manual' ? 'active' : ''}`}
                    onClick={() => setResultVisibility({ ...resultVisibility, scorePublishRule: 'manual' })}
                  >
                    <input
                      type="radio"
                      name="scorePublishRule"
                      checked={resultVisibility.scorePublishRule === 'manual'}
                      onChange={() => {}}
                    />
                    <span>Chỉ công bố khi giảng viên duyệt</span>
                  </div>
                </div>

                {/* Review Solution */}
                <div className="cs-result-col">
                  <label className="cs-result-group-title">Quyền xem lại bài thi & Đáp án:</label>
                  
                  <label className="cs-check-item-box">
                    <span>Cho phép xem lại danh sách câu đúng / sai</span>
                    <input
                      type="checkbox"
                      className="cs-checkbox-custom"
                      checked={resultVisibility.allowReviewQuestions}
                      onChange={(e) => setResultVisibility({ ...resultVisibility, allowReviewQuestions: e.target.checked })}
                    />
                  </label>

                  <label className="cs-check-item-box">
                    <span>Cho phép xem lời giải chi tiết & đáp án</span>
                    <input
                      type="checkbox"
                      className="cs-checkbox-custom"
                      checked={resultVisibility.allowReviewSolutions}
                      onChange={(e) => setResultVisibility({ ...resultVisibility, allowReviewSolutions: e.target.checked })}
                    />
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '16px' }}>
                <button
                  type="button"
                  className="cs-btn-draft"
                  onClick={() => setActiveTab(1)}
                >
                  ← Quay lại: Thông tin ca thi
                </button>

                <button
                  type="button"
                  className="cs-btn-publish"
                  onClick={handlePublish}
                >
                  <IconCheck width={12} height={12} color="#FFFFFF" />
                  Kích hoạt & Mở ca thi ngay
                </button>
              </div>
            </section>
          </>
        )}

      </main>

      {/* =========================================================================
          MODAL CHỌN ĐỀ THI TỪ QUẢN LÝ ĐỀ THI
          ========================================================================= */}
      {isExamPickerOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11, 28, 48, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '16px'
          }}
          onClick={() => setIsExamPickerOpen(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div style={{ padding: '18px 24px', background: '#F8F9FF', borderBottom: '1px solid #E5EEFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0B1C30' }}>
                  Chọn đề thi từ Quản lý đề thi
                </h3>
                <span style={{ fontSize: '12.5px', color: '#64748B' }}>
                  Chọn một đề thi từ ngân hàng đề để kích hoạt ca thi trực tuyến
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsExamPickerOpen(false)}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <IconClose width={12} height={12} color="#475569" />
              </button>
            </div>

            {/* Search Box */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#F8F9FF', border: '1px solid #DCE9FF', borderRadius: '6px' }}>
                <IconSearch width={16} height={16} color="#64748B" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã đề, tên đề thi hoặc tác giả..."
                  value={examSearchTerm}
                  onChange={(e) => setExamSearchTerm(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13.5px' }}
                />
              </div>
            </div>

            {/* List Exams */}
            <div style={{ padding: '16px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredExams.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px', color: '#64748B' }}>
                  Không tìm thấy đề thi nào phù hợp với từ khóa.
                </div>
              ) : (
                filteredExams.map((exam) => {
                  const isCurrent = selectedExam?.id === exam.id;
                  return (
                    <div
                      key={exam.id}
                      onClick={() => handleSelectExam(exam)}
                      style={{
                        padding: '14px 16px',
                        border: isCurrent ? '2px solid #0051D5' : '1px solid #E2E8F0',
                        borderRadius: '8px',
                        background: isCurrent ? '#EFF6FF' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ background: '#0051D5', color: '#FFFFFF', padding: '1px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                            {exam.code}
                          </span>
                          <strong style={{ fontSize: '14px', color: '#0B1C30' }}>
                            {exam.title}
                          </strong>
                        </div>
                        <div style={{ fontSize: '12.5px', color: '#64748B' }}>
                          {exam.description}
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px', fontSize: '12px', color: '#475569' }}>
                          <span>⏱️ {exam.duration}</span>
                          <span>•</span>
                          <span>📝 {exam.questionCount} câu</span>
                          <span>•</span>
                          <span style={{ color: '#0051D5', fontWeight: 600 }}>{exam.level}</span>
                          <span>•</span>
                          <span>Tác giả: {exam.author}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        style={{
                          padding: '6px 14px',
                          background: isCurrent ? '#0051D5' : '#EFF4FF',
                          color: isCurrent ? '#FFFFFF' : '#0051D5',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                      >
                        {isCurrent ? '✓ Đang chọn' : 'Chọn đề này'}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Modal */}
            <div style={{ padding: '12px 24px', background: '#F8F9FF', borderTop: '1px solid #E5EEFF', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setIsExamPickerOpen(false)}
                style={{ padding: '7px 16px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Preview nhanh cấu hình */}
      {showPreviewModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11, 28, 48, 0.6)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '16px'
          }}
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '560px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#0B1C30' }}>
                Tóm tắt thông số ca thi
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: '#334155' }}>
              <div><strong>Đề thi liên kết:</strong> {selectedExam?.code} - {selectedExam?.title}</div>
              <div><strong>Hình thức đánh giá:</strong> {generalInfo.sessionType === 'official' ? 'Kỳ thi chính thức (Có giới hạn thời gian)' : timing.isUnlimitedTime ? 'Khảo sát & Thi thử (Không giới hạn thời gian)' : 'Khảo sát & Thi thử (Có giới hạn thời gian)'}</div>
              <div><strong>Tên ca thi:</strong> {generalInfo.title}</div>
              <div><strong>Phòng thi:</strong> {generalInfo.room} ({generalInfo.department})</div>
              <div><strong>Thời lượng:</strong> {timing.isUnlimitedTime ? 'Không giới hạn thời gian (Tự do làm bài)' : `${timing.duration} phút`} ({timing.questionsCount} câu hỏi)</div>
              {timing.allowRetake && (
                <div><strong>Số lần thi:</strong> {timing.isUnlimitedAttempts ? 'Không giới hạn số lần' : `${timing.maxAttempts} lần`}</div>
              )}
              <div><strong>Thời gian mở phòng:</strong> {timing.startTime.replace('T', ' ')}</div>
              <div><strong>Thời gian đóng phòng:</strong> {timing.isUnlimitedEndTime ? 'Không giới hạn (Vô thời hạn)' : timing.endTime.replace('T', ' ')}</div>
              <div><strong>Khóa toàn màn hình:</strong> {security.fullScreenLock ? 'Có' : 'Không'}</div>
              <div><strong>Xáo trộn câu hỏi & đáp án:</strong> {security.shuffleQuestions ? 'Bật' : 'Tắt'}</div>
              <div><strong>Mã PIN phòng:</strong> {generalInfo.pinCode}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => setShowPreviewModal(false)}
                style={{ padding: '8px 16px', background: '#F1F5F9', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  handlePublish();
                }}
                className="cs-btn-publish"
              >
                Xuất bản ngay
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
