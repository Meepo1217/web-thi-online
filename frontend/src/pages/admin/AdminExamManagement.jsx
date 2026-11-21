import { useState, useMemo } from 'react';
import './admin-exams.css';

// Dữ liệu mẫu chuẩn xác từ Figma Spec
const INITIAL_EXAMS = [
  {
    id: 'EX-001',
    code: 'MATH-2026',
    name: 'Khảo sát môn Toán THPT Quốc Gia 2026',
    subject: 'Toán học',
    questions: 50,
    duration: 90,
    attempts: 12850,
    startDate: '08:00 15/10/2026',
    endDate: '17:00 25/10/2026',
    status: 'active',
    statusLabel: 'Đang diễn ra',
  },
  {
    id: 'EX-002',
    code: 'HSA-2026',
    name: 'Thi thử Đánh giá năng lực ĐHQG Hà Nội (HSA)',
    subject: 'ĐGNL Tổng hợp',
    questions: 150,
    duration: 195,
    attempts: 9640,
    startDate: '07:30 01/11/2026',
    endDate: '18:00 05/11/2026',
    status: 'active',
    statusLabel: 'Đang diễn ra',
  },
  {
    id: 'EX-003',
    code: 'ENG-B1',
    name: 'Tiếng Anh B1 Chuẩn đầu ra ĐH (VSTEP)',
    subject: 'Ngoại ngữ',
    questions: 60,
    duration: 120,
    attempts: 8320,
    startDate: '08:00 20/11/2026',
    endDate: '17:00 22/11/2026',
    status: 'active',
    statusLabel: 'Đang diễn ra',
  },
  {
    id: 'EX-004',
    code: 'OOP-CPP',
    name: 'Lập trình Hướng đối tượng & C++',
    subject: 'Công nghệ thông tin',
    questions: 40,
    duration: 60,
    attempts: 6740,
    startDate: '09:00 05/12/2026',
    endDate: '16:30 10/12/2026',
    status: 'upcoming',
    statusLabel: 'Sắp tới',
  },
  {
    id: 'EX-005',
    code: 'CALC-01',
    name: 'Giải tích 1 & Đại số tuyến tính',
    subject: 'Toán cao cấp',
    questions: 50,
    duration: 90,
    attempts: 5980,
    startDate: '08:00 12/12/2026',
    endDate: '17:00 18/12/2026',
    status: 'upcoming',
    statusLabel: 'Sắp tới',
  },
  {
    id: 'EX-006',
    code: 'PHI-01',
    name: 'Triết học Mác - Lênin',
    subject: 'Lý luận chính trị',
    questions: 60,
    duration: 60,
    attempts: 5410,
    startDate: '13:30 20/12/2026',
    endDate: '17:00 24/12/2026',
    status: 'locked',
    statusLabel: 'Bị khóa',
  },
];

export default function AdminExamManagement() {
  const [exams, setExams] = useState(INITIAL_EXAMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [perPage, setPerPage] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  // State Modal Tạo mới & Chỉnh sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    subject: 'Toán học',
    questions: 50,
    duration: 90,
    startDate: '08:00 01/12/2026',
    endDate: '17:00 10/12/2026',
    status: 'active',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Tính toán nhanh số liệu KPI
  const kpiData = useMemo(() => {
    const total = 1420 + (exams.length - INITIAL_EXAMS.length);
    const active = exams.filter((e) => e.status === 'active').length;
    const locked = exams.filter((e) => e.status === 'locked').length;
    return {
      total: total.toLocaleString('vi-VN'),
      attempts: '128,450',
      active: 24 + (active - 3),
      locked: 12 + (locked - 1),
    };
  }, [exams]);

  // Bộ lọc danh sách
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchSearch =
        exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === 'all' || exam.status === statusFilter;

      const matchSubject =
        subjectFilter === 'all' || exam.subject === subjectFilter;

      return matchSearch && matchStatus && matchSubject;
    });
  }, [exams, searchTerm, statusFilter, subjectFilter]);

  // Khóa / Mở khóa đề thi
  const handleToggleLock = (exam) => {
    const nextStatus = exam.status === 'locked' ? 'active' : 'locked';
    const nextLabel = nextStatus === 'locked' ? 'Bị khóa' : 'Đang diễn ra';

    setExams((prev) =>
      prev.map((e) =>
        e.id === exam.id
          ? { ...e, status: nextStatus, statusLabel: nextLabel }
          : e
      )
    );

    showToast(
      nextStatus === 'locked'
        ? `Đã khóa kỳ thi: ${exam.name}`
        : `Đã mở khóa kỳ thi: ${exam.name}`
    );
  };

  // Xóa đề thi
  const handleDeleteExam = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa đề thi "${name}"? Thao tác này không thể hoàn tác.`)) {
      setExams((prev) => prev.filter((e) => e.id !== id));
      showToast(`Đã xóa đề thi "${name}" thành công.`);
    }
  };

  // Mở modal tạo mới
  const handleOpenCreateModal = () => {
    setEditingExam(null);
    setFormData({
      name: '',
      code: `EXAM-${Math.floor(100 + Math.random() * 900)}`,
      subject: 'Toán học',
      questions: 50,
      duration: 90,
      startDate: '08:00 01/12/2026',
      endDate: '17:00 10/12/2026',
      status: 'active',
    });
    setIsModalOpen(true);
  };

  // Mở modal chỉnh sửa
  const handleOpenEditModal = (exam) => {
    setEditingExam(exam);
    setFormData({
      name: exam.name,
      code: exam.code,
      subject: exam.subject,
      questions: exam.questions,
      duration: exam.duration,
      startDate: exam.startDate,
      endDate: exam.endDate,
      status: exam.status,
    });
    setIsModalOpen(true);
  };

  // Lưu Form Modal
  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      alert('Vui lòng điền đầy đủ tên đề thi và mã đề.');
      return;
    }

    if (editingExam) {
      // Cập nhật
      setExams((prev) =>
        prev.map((item) =>
          item.id === editingExam.id
            ? {
                ...item,
                name: formData.name,
                code: formData.code,
                subject: formData.subject,
                questions: Number(formData.questions),
                duration: Number(formData.duration),
                startDate: formData.startDate,
                endDate: formData.endDate,
                status: formData.status,
                statusLabel:
                  formData.status === 'locked'
                    ? 'Bị khóa'
                    : formData.status === 'upcoming'
                    ? 'Sắp tới'
                    : 'Đang diễn ra',
              }
            : item
        )
      );
      showToast(`Đã cập nhật thông tin đề thi ${formData.code}.`);
    } else {
      // Thêm mới
      const newExam = {
        id: `EX-${String(exams.length + 1).padStart(3, '0')}`,
        code: formData.code,
        name: formData.name,
        subject: formData.subject,
        questions: Number(formData.questions),
        duration: Number(formData.duration),
        attempts: 0,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        statusLabel:
          formData.status === 'locked'
            ? 'Bị khóa'
            : formData.status === 'upcoming'
            ? 'Sắp tới'
            : 'Đang diễn ra',
      };

      setExams([newExam, ...exams]);
      showToast(`Đã tạo đề thi mới "${formData.name}" thành công.`);
    }

    setIsModalOpen(false);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSubjectFilter('all');
    showToast('Đã đặt lại tất cả bộ lọc tìm kiếm.');
  };

  return (
    <div className="admin-exams-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#0B1C30',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            zIndex: 9999,
            fontSize: '13.5px',
            fontWeight: 500,
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* 1. Header Trang & Breadcrumb */}
      <div className="exams-page-header">
        <div className="exams-page-header__left">
          <h1 className="exams-page-header__title">Quản lý đề thi</h1>
          <p className="exams-page-header__subtitle">
            Quản trị danh sách đề thi trực tuyến, giám sát ca thi và thống kê lượt thí sinh tham gia.
          </p>
        </div>

        <div className="exams-page-header__actions">
          {/* Nút Xuất Excel */}
          <button
            type="button"
            className="btn-export-excel"
            onClick={() => showToast('Đang tạo và tải xuống file Excel danh sách đề thi...')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="16" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>Xuất Excel</span>
          </button>

          {/* Nút Tạo đề thi mới */}
          <button
            type="button"
            className="btn-create-exam"
            onClick={handleOpenCreateModal}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Tạo đề thi mới</span>
          </button>
        </div>
      </div>

      {/* 2. Khung thống kê nhanh (KPI cards) */}
      <div className="exams-kpi-row">
        {/* Card 1: Tổng số đề thi */}
        <div className="exams-kpi-card">
          <div className="exams-kpi-card__top">
            <span className="exams-kpi-card__label">TỔNG SỐ ĐỀ THI</span>
            <div className="exams-kpi-card__icon-box total-exams">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
          </div>
          <div className="exams-kpi-card__bottom">
            <span className="exams-kpi-card__number">{kpiData.total}</span>
            <span className="exams-kpi-card__unit">đề thi</span>
          </div>
        </div>

        {/* Card 2: Tổng số lượt thi */}
        <div className="exams-kpi-card">
          <div className="exams-kpi-card__top">
            <span className="exams-kpi-card__label">TỔNG SỐ LƯỢT THI</span>
            <div className="exams-kpi-card__icon-box total-attempts">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <div className="exams-kpi-card__bottom">
            <span className="exams-kpi-card__number">{kpiData.attempts}</span>
            <span className="exams-kpi-card__unit">lượt</span>
          </div>
        </div>

        {/* Card 3: Đang diễn ra */}
        <div className="exams-kpi-card">
          <div className="exams-kpi-card__top">
            <span className="exams-kpi-card__label">ĐANG DIỄN RA</span>
            <div className="exams-kpi-card__icon-box active-exams">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          </div>
          <div className="exams-kpi-card__bottom">
            <span className="exams-kpi-card__number active-color">{kpiData.active}</span>
            <span className="exams-kpi-card__unit">kỳ thi</span>
          </div>
        </div>

        {/* Card 4: Đề bị khóa */}
        <div className="exams-kpi-card">
          <div className="exams-kpi-card__top">
            <span className="exams-kpi-card__label">ĐỀ BỊ KHÓA</span>
            <div className="exams-kpi-card__icon-box locked-exams">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>
          <div className="exams-kpi-card__bottom">
            <span className="exams-kpi-card__number locked-color">{kpiData.locked}</span>
            <span className="exams-kpi-card__unit">đề thi</span>
          </div>
        </div>
      </div>

      {/* 3. Thanh công cụ tìm kiếm và lọc */}
      <div className="exams-toolbar">
        {/* Tìm kiếm chính */}
        <div className="exams-toolbar__search-wrap">
          <div className="exams-toolbar__search-box">
            <span className="exams-toolbar__search-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              className="exams-toolbar__search-input"
              placeholder="Tìm kiếm theo tên đề thi, mã đề, môn học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn-search-submit"
            onClick={() => showToast(`Tìm kiếm: ${filteredExams.length} đề thi phù hợp`)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Tìm kiếm</span>
          </button>
        </div>

        {/* Cụm bộ lọc dropdowns */}
        <div className="exams-toolbar__filters">
          {/* Bộ lọc trạng thái */}
          <select
            className="exams-select-box"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang diễn ra</option>
            <option value="upcoming">Sắp tới</option>
            <option value="locked">Bị khóa</option>
          </select>

          {/* Bộ lọc môn học */}
          <select
            className="exams-select-box"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="all">Tất cả môn học</option>
            <option value="Toán học">Toán học</option>
            <option value="ĐGNL Tổng hợp">ĐGNL Tổng hợp</option>
            <option value="Ngoại ngữ">Ngoại ngữ</option>
            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
            <option value="Toán cao cấp">Toán cao cấp</option>
            <option value="Lý luận chính trị">Lý luận chính trị</option>
          </select>

          {/* Nút đặt lại */}
          <button
            type="button"
            className="btn-filter-reset"
            onClick={handleResetFilters}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span>Đặt lại</span>
          </button>
        </div>
      </div>

      {/* 4. Bảng danh sách đề thi */}
      <div className="exams-table-card">
        <div className="exams-table-wrap">
          <table className="exams-table">
            <thead>
              <tr>
                <th style={{ width: '280px' }}>TÊN ĐỀ THI / KỲ THI</th>
                <th style={{ width: '96px' }}>SỐ CÂU</th>
                <th style={{ width: '134px' }}>THỜI LƯỢNG</th>
                <th style={{ width: '95px' }}>LƯỢT THI</th>
                <th style={{ width: '152px' }}>THỜI GIAN THI</th>
                <th style={{ width: '152px' }} className="right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    Không tìm thấy đề thi nào khớp với điều kiện tìm kiếm.
                  </td>
                </tr>
              ) : (
                filteredExams.map((exam) => {
                  const isLocked = exam.status === 'locked';

                  return (
                    <tr
                      key={exam.id}
                      className={isLocked ? 'row-locked' : ''}
                    >
                      {/* Tên đề thi */}
                      <td>
                        <div className="exam-title-cell">
                          <span className="exam-title-text">{exam.name}</span>
                          <div className="exam-meta-sub">
                            <span className="exam-code-badge">{exam.code}</span>
                            <span>•</span>
                            <span>{exam.subject}</span>
                          </div>
                        </div>
                      </td>

                      {/* Số câu */}
                      <td>
                        <span className="exam-questions-pill">
                          {exam.questions} câu
                        </span>
                      </td>

                      {/* Thời lượng */}
                      <td>
                        <div className="exam-duration-cell">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span className="exam-duration-text">{exam.duration} phút</span>
                        </div>
                      </td>

                      {/* Lượt thi */}
                      <td>
                        <div className="exam-attempts-cell">
                          <span className="exam-attempts-number">
                            {exam.attempts.toLocaleString('vi-VN')}
                          </span>
                          <span className="exam-attempts-unit">thí sinh</span>
                        </div>
                      </td>

                      {/* Thời gian thi */}
                      <td>
                        <div className="exam-time-cell">
                          <span className="exam-time-start">BĐ: {exam.startDate}</span>
                          <span className="exam-time-end">KT: {exam.endDate}</span>
                        </div>
                      </td>

                      {/* Thao tác */}
                      <td className="right">
                        <div className="exam-actions-group">
                          {/* Nút Khóa / Mở đề */}
                          <button
                            type="button"
                            className="btn-exam-action status-btn"
                            title={isLocked ? 'Mở khóa đề thi' : 'Tạm dừng / Khóa đề'}
                            onClick={() => handleToggleLock(exam)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              {isLocked ? (
                                <>
                                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </>
                              ) : (
                                <>
                                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                  <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                                </>
                              )}
                            </svg>
                          </button>

                          {/* Nút Chỉnh sửa */}
                          <button
                            type="button"
                            className="btn-exam-action edit-btn"
                            title="Chỉnh sửa thông số đề thi"
                            onClick={() => handleOpenEditModal(exam)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>

                          {/* Nút Xóa */}
                          <button
                            type="button"
                            className="btn-exam-action delete-btn"
                            title="Xóa đề thi"
                            onClick={() => handleDeleteExam(exam.id, exam.name)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Phân trang chuẩn */}
        <div className="exams-pagination">
          <div className="exams-pagination__left">
            <span className="exams-pagination__info">
              Hiển thị 1 - {filteredExams.length} trên tổng số {kpiData.total} đề thi
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#45464D' }}>Số mục:</span>
              <select
                className="exams-pagination__select"
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
              >
                <option value="10">10 / trang</option>
                <option value="20">20 / trang</option>
                <option value="50">50 / trang</option>
              </select>
            </div>
          </div>

          <div className="exams-pagination__right">
            <button
              type="button"
              className="exams-page-nav-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Trước</span>
            </button>

            <button
              type="button"
              className={`exams-page-btn ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button
              type="button"
              className={`exams-page-btn ${currentPage === 2 ? 'active' : ''}`}
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button
              type="button"
              className={`exams-page-btn ${currentPage === 3 ? 'active' : ''}`}
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>
            <span style={{ padding: '0 4px', color: '#64748B' }}>...</span>
            <button
              type="button"
              className="exams-page-btn"
              onClick={() => setCurrentPage(142)}
            >
              142
            </button>

            <button
              type="button"
              className="exams-page-nav-btn"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <span>Sau</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Thêm mới / Chỉnh sửa đề thi */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingExam ? 'Chỉnh sửa đề thi' : 'Tạo đề thi mới'}
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveModal}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Tên kỳ thi / Đề thi *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ví dụ: Thi kết thúc học phần Giải tích 1"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Mã đề / Mã kỳ thi *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="MATH-2026"
                      required
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Môn học *</label>
                    <select
                      className="form-input"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    >
                      <option value="Toán học">Toán học</option>
                      <option value="ĐGNL Tổng hợp">ĐGNL Tổng hợp</option>
                      <option value="Ngoại ngữ">Ngoại ngữ</option>
                      <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                      <option value="Toán cao cấp">Toán cao cấp</option>
                      <option value="Lý luận chính trị">Lý luận chính trị</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Số câu hỏi</label>
                    <input
                      type="number"
                      className="form-input"
                      min="5"
                      max="200"
                      value={formData.questions}
                      onChange={(e) =>
                        setFormData({ ...formData, questions: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Thời lượng thi (Phút)</label>
                    <input
                      type="number"
                      className="form-input"
                      min="15"
                      max="300"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Thời gian bắt đầu</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="08:00 15/10/2026"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Thời gian kết thúc</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="17:00 25/10/2026"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Trạng thái kỳ thi</label>
                  <select
                    className="form-input"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="active">Đang diễn ra</option>
                    <option value="upcoming">Sắp tới</option>
                    <option value="locked">Bị khóa / Tạm dừng</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-export-excel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="btn-create-exam"
                >
                  {editingExam ? 'Lưu thay đổi' : 'Tạo đề thi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
