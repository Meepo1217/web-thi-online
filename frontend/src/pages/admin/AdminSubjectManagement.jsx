import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin-subjects.css';

// Dữ liệu mẫu chuẩn xác từ Figma Spec
const INITIAL_SUBJECTS = [
  {
    id: 'SUB-001',
    code: 'MATH-101',
    name: 'Toán cao cấp 1 (Giải tích 1)',
    credits: 3,
    faculty: 'Khoa Toán - Tin',
    teacher: 'TS. Nguyễn Văn An',
    teacherEmail: 'an.nv@huce.edu.vn',
    avatarInitials: 'NA',
    avatarClass: 'avatar-blue-dark',
    examCount: 14,
    questionCount: 420,
    createdAt: '15/09/2025',
  },
  {
    id: 'SUB-002',
    code: 'IT-201',
    name: 'Lập trình C / C++',
    credits: 4,
    faculty: 'Công nghệ thông tin',
    teacher: 'ThS. Trần Thị Bích',
    teacherEmail: 'bich.tt@huce.edu.vn',
    avatarInitials: 'TB',
    avatarClass: 'avatar-indigo',
    examCount: 22,
    questionCount: 650,
    createdAt: '18/09/2025',
  },
  {
    id: 'SUB-003',
    code: 'PHYS-101',
    name: 'Vật lý đại cương 1',
    credits: 3,
    faculty: 'Khoa học cơ bản',
    teacher: 'PGS. TS. Lê Hoàng Nam',
    teacherEmail: 'nam.lh@huce.edu.vn',
    avatarInitials: 'HN',
    avatarClass: 'avatar-emerald',
    examCount: 18,
    questionCount: 510,
    createdAt: '20/09/2025',
  },
  {
    id: 'SUB-004',
    code: 'PHI-101',
    name: 'Triết học Mác - Lênin',
    credits: 3,
    faculty: 'Lý luận chính trị',
    teacher: 'TS. Phạm Minh Tuấn',
    teacherEmail: 'tuan.pm@huce.edu.vn',
    avatarInitials: 'ML',
    avatarClass: 'avatar-blue-dark',
    examCount: 12,
    questionCount: 380,
    createdAt: '22/09/2025',
  },
  {
    id: 'SUB-005',
    code: 'ENG-301',
    name: 'Tiếng Anh chuyên ngành',
    credits: 2,
    faculty: 'Ngoại ngữ',
    teacher: 'ThS. Hoàng Thu Thủy',
    teacherEmail: 'thuy.ht@huce.edu.vn',
    avatarInitials: 'EN',
    avatarClass: 'avatar-blue-light',
    examCount: 26,
    questionCount: 780,
    createdAt: '25/09/2025',
  },
  {
    id: 'SUB-006',
    code: 'IT-204',
    name: 'Cơ sở dữ liệu & SQL',
    credits: 3,
    faculty: 'Công nghệ thông tin',
    teacher: 'TS. Vũ Hải Đăng',
    teacherEmail: 'dang.vh@huce.edu.vn',
    avatarInitials: 'HĐ',
    avatarClass: 'avatar-purple',
    examCount: 19,
    questionCount: 540,
    createdAt: '28/09/2025',
  },
  {
    id: 'IT4043',
    code: 'IT4043',
    name: 'Học máy',
    credits: 3,
    faculty: 'Công nghệ thông tin',
    teacher: 'TS. Nguyễn Hoàng Nam',
    teacherEmail: 'nam.nh@huce.edu.vn',
    avatarInitials: 'HM',
    avatarClass: 'avatar-blue-dark',
    examCount: 16,
    questionCount: 53,
    createdAt: '30/09/2025',
  },
];

export default function AdminSubjectManagement() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedIds, setSelectedIds] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal tạo / chỉnh sửa môn học
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    credits: 3,
    faculty: 'Công nghệ thông tin',
    teacher: '',
    teacherEmail: '',
  });

  // Hiển thị Toast tiện ích
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Tính toán KPI
  const kpiData = useMemo(() => {
    return {
      total: 48, // Chuẩn Figma Spec
      activeFaculties: 8,
      totalCredits: subjects.reduce((sum, s) => sum + s.credits, 0),
    };
  }, [subjects]);

  // Bộ lọc và sắp xếp
  const filteredSubjects = useMemo(() => {
    return subjects
      .filter((sub) => {
        const query = searchTerm.toLowerCase().trim();
        if (!query) {
          return true;
        }
        return (
          sub.name.toLowerCase().includes(query) ||
          sub.code.toLowerCase().includes(query) ||
          sub.faculty.toLowerCase().includes(query) ||
          sub.teacher.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') {
          return a.name.localeCompare(b.name, 'vi');
        }
        if (sortBy === 'code-asc') {
          return a.code.localeCompare(b.code);
        }
        if (sortBy === 'credits-desc') {
          return b.credits - a.credits;
        }
        return b.id.localeCompare(a.id);
      });
  }, [subjects, searchTerm, sortBy]);

  // Danh sách hiển thị theo trang
  const paginatedSubjects = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredSubjects.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredSubjects, currentPage, rowsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredSubjects.length / rowsPerPage));

  // Checkbox lựa chọn
  const isAllSelected =
    paginatedSubjects.length > 0 &&
    paginatedSubjects.every((s) => selectedIds.includes(s.id));

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedSubjects.map((s) => s.id));
    }
  };

  const handleToggleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Xóa đơn môn học
  const handleDeleteSubject = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa môn học "${name}"?`)) {
      setSubjects((prev) => prev.filter((s) => s.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      showToast(`Đã xóa môn học "${name}" thành công.`);
    }
  };

  // Xóa hàng loạt
  const handleBulkDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} môn học đã chọn?`)) {
      setSubjects((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
      showToast(`Đã xóa ${selectedIds.length} môn học.`);
      setSelectedIds([]);
    }
  };

  // Mở modal thêm mới
  const handleOpenCreateModal = () => {
    setEditingSubject(null);
    setFormData({
      code: `SUB-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      credits: 3,
      faculty: 'Công nghệ thông tin',
      teacher: '',
      teacherEmail: '',
    });
    setIsModalOpen(true);
  };

  // Mở modal sửa
  const handleOpenEditModal = (subject) => {
    setEditingSubject(subject);
    setFormData({
      code: subject.code,
      name: subject.name,
      credits: subject.credits,
      faculty: subject.faculty,
      teacher: subject.teacher,
      teacherEmail: subject.teacherEmail,
    });
    setIsModalOpen(true);
  };

  // Lưu môn học (Tạo hoặc Cập nhật)
  const handleSaveSubject = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      alert('Vui lòng nhập đầy đủ Mã môn học và Tên môn học.');
      return;
    }

    if (editingSubject) {
      // Cập nhật
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === editingSubject.id
            ? {
                ...s,
                code: formData.code,
                name: formData.name,
                credits: Number(formData.credits),
                faculty: formData.faculty,
                teacher: formData.teacher || s.teacher,
                teacherEmail: formData.teacherEmail || s.teacherEmail,
              }
            : s
        )
      );
      showToast(`Đã cập nhật môn học "${formData.name}".`);
    } else {
      // Thêm mới
      const initials = formData.teacher
        ? formData.teacher
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(-2)
            .toUpperCase()
        : 'MH';

      const newSubject = {
        id: `SUB-${String(subjects.length + 1).padStart(3, '0')}`,
        code: formData.code,
        name: formData.name,
        credits: Number(formData.credits),
        faculty: formData.faculty,
        teacher: formData.teacher || 'Chưa phân công',
        teacherEmail: formData.teacherEmail || 'gv@huce.edu.vn',
        avatarInitials: initials,
        avatarClass: 'avatar-blue-dark',
        examCount: 0,
        questionCount: 0,
        createdAt: 'Hôm nay',
      };

      setSubjects([newSubject, ...subjects]);
      showToast(`Đã tạo môn học mới "${formData.name}".`);
    }

    setIsModalOpen(false);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSortBy('latest');
    showToast('Đã đặt lại bộ lọc.');
  };

  return (
    <div className="admin-subjects-container">
      {/* Toast thông báo */}
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

      {/* 1. Header Trang & Actions */}
      <div className="subjects-page-header">
        <div className="subjects-page-header__left">
          <h1 className="subjects-page-header__title">Quản lý môn học</h1>
          <p className="subjects-page-header__subtitle">
            Quản trị danh mục môn học, phân bổ số tín chỉ và giảng viên / trưởng bộ môn phụ trách khảo thí.
          </p>
        </div>

        <div className="subjects-page-header__actions">
          {/* Nút Xuất Excel */}
          <button
            type="button"
            className="btn-export-excel"
            onClick={() => showToast('Đang tạo và tải xuống file Excel danh mục môn học...')}
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

          {/* Nút Thêm môn học */}
          <button
            type="button"
            className="btn-create-subject"
            onClick={handleOpenCreateModal}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Thêm môn học</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Highlights / Thống kê Tổng số môn học (130px) */}
      <div className="subjects-kpi-container">
        {/* Card 1: Tổng số môn học (Primary Metric Card theo Figma) */}
        <div className="subjects-kpi-card">
          <div className="subjects-kpi-meta">
            <span className="subjects-kpi-label">TỔNG SỐ MÔN HỌC</span>
            <div className="subjects-kpi-value-row">
              <span className="subjects-kpi-number">{kpiData.total}</span>
              <span className="subjects-kpi-unit">môn học</span>
            </div>
          </div>
          <div className="subjects-kpi-icon-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
        </div>

        {/* Card 2: Khoa / Bộ môn phụ trách */}
        <div className="subjects-kpi-card subjects-kpi-card--secondary">
          <div className="subjects-kpi-meta">
            <span className="subjects-kpi-label">KHOA & BỘ MÔN</span>
            <div className="subjects-kpi-value-row">
              <span className="subjects-kpi-number">{kpiData.activeFaculties}</span>
              <span className="subjects-kpi-unit">đơn vị</span>
            </div>
          </div>
          <div className="subjects-kpi-icon-box subjects-kpi-icon-box--green">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Thanh công cụ tìm kiếm và lọc */}
      <div className="subjects-toolbar-card">
        <div className="subjects-search-wrapper">
          <div className="subjects-search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="subjects-search-input"
              placeholder="Tìm kiếm theo tên hoặc mã môn học..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            type="button"
            className="btn-search-primary"
            onClick={() => showToast(`Tìm thấy ${filteredSubjects.length} môn học.`)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Tìm kiếm</span>
          </button>
        </div>

        <div className="subjects-filter-group">
          {/* Bộ lọc thời gian / sắp xếp */}
          <select
            className="subjects-filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">Mới nhất</option>
            <option value="name-asc">Tên môn học (A - Z)</option>
            <option value="code-asc">Mã môn học (A - Z)</option>
            <option value="credits-desc">Số tín chỉ giảm dần</option>
          </select>

          {/* Nút đặt lại */}
          {(searchTerm || sortBy !== 'latest') && (
            <button
              type="button"
              className="btn-reset-filters"
              onClick={handleResetFilters}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2.5 2v6h6M21.5 22v-6h-6" />
                <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.3" />
              </svg>
              <span>Đặt lại</span>
            </button>
          )}
        </div>
      </div>

      {/* Bulk action toolbar khi có checkbox được chọn */}
      {selectedIds.length > 0 && (
        <div className="subjects-bulk-bar">
          <span>
            Đã chọn <strong>{selectedIds.length}</strong> môn học
          </span>
          <div className="subjects-bulk-actions">
            <button
              type="button"
              className="btn-bulk-delete"
              onClick={handleBulkDelete}
            >
              Xóa các mục đã chọn
            </button>
          </div>
        </div>
      )}

      {/* 4. Subject Management Table View */}
      <div className="subjects-table-card">
        <div className="subjects-table-wrapper">
          <table className="subjects-table">
            <thead>
              <tr>
                <th className="col-checkbox">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={isAllSelected}
                    onChange={handleToggleSelectAll}
                    aria-label="Chọn tất cả"
                  />
                </th>
                <th className="col-subject-name">TÊN MÔN HỌC</th>
                <th className="col-teacher">TRƯỞNG BỘ MÔN / GIẢNG VIÊN PHỤ TRÁCH</th>
                <th className="col-actions">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSubjects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="subjects-empty-row">
                    Không tìm thấy môn học nào phù hợp với điều kiện tìm kiếm.
                  </td>
                </tr>
              ) : (
                paginatedSubjects.map((sub) => {
                  const isSelected = selectedIds.includes(sub.id);
                  return (
                    <tr
                      key={sub.id}
                      className={isSelected ? 'row-selected' : ''}
                    >
                      {/* Checkbox */}
                      <td className="col-checkbox">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectRow(sub.id)}
                          aria-label={`Chọn môn học ${sub.name}`}
                        />
                      </td>

                      {/* Tên môn học */}
                      <td>
                        <div className="subject-meta-container">
                          <div className="subject-name-row">
                            <span
                              className="subject-name-text"
                              title="Nhấn để xem thông tin chi tiết và danh sách chương"
                              onClick={() => navigate(`/admin/subjects/${sub.id}`)}
                            >
                              {sub.name}
                            </span>
                          </div>
                          <div className="subject-sub-meta">
                            <span className="subject-code-badge">{sub.code}</span>
                            <span className="subject-credits-badge">{sub.credits} tín chỉ</span>
                            <span>• {sub.faculty}</span>
                          </div>
                        </div>
                      </td>

                      {/* Trưởng bộ môn / Giảng viên */}
                      <td>
                        <div className="subject-teacher-container">
                          <div className={`teacher-avatar-circle ${sub.avatarClass || 'avatar-blue-dark'}`}>
                            {sub.avatarInitials}
                          </div>
                          <div className="teacher-info">
                            <span className="teacher-name-text">{sub.teacher}</span>
                            <span className="teacher-email-text">{sub.teacherEmail}</span>
                          </div>
                        </div>
                      </td>

                      {/* Thao tác */}
                      <td>
                        <div className="subject-actions-cell">
                          {/* Nút Chỉnh sửa */}
                          <button
                            type="button"
                            className="btn-table-action btn-edit-action"
                            title="Chỉnh sửa môn học"
                            onClick={() => handleOpenEditModal(sub)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>

                          {/* Nút Xóa */}
                          <button
                            type="button"
                            className="btn-table-action btn-delete-action"
                            title="Xóa môn học"
                            onClick={() => handleDeleteSubject(sub.id, sub.name)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

        {/* 5. Academic Table Pagination Footer */}
        <div className="subjects-pagination-footer">
          <div className="pagination-status-group">
            <span className="pagination-status-text">
              Hiển thị 1 - {paginatedSubjects.length} trên tổng số {filteredSubjects.length} môn học
            </span>

            <div className="pagination-rows-selector">
              <span className="pagination-rows-label">Số dòng:</span>
              <select
                className="pagination-rows-select"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={6}>6 / trang</option>
                <option value={10}>10 / trang</option>
                <option value={20}>20 / trang</option>
                <option value={50}>50 / trang</option>
              </select>
            </div>
          </div>

          <div className="pagination-buttons-group">
            {/* First Page */}
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              title="Trang đầu"
            >
              «
            </button>

            {/* Prev Page */}
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              title="Trang trước"
            >
              ‹
            </button>

            {/* Page 1 */}
            <button
              type="button"
              className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>

            {totalPages >= 2 && (
              <button
                type="button"
                className={`pagination-btn ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
            )}

            {totalPages >= 3 && (
              <button
                type="button"
                className={`pagination-btn ${currentPage === 3 ? 'active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
            )}

            {totalPages >= 4 && (
              <button
                type="button"
                className={`pagination-btn ${currentPage === 4 ? 'active' : ''}`}
                onClick={() => setCurrentPage(4)}
              >
                4
              </button>
            )}

            {totalPages > 5 && <span className="pagination-ellipsis">...</span>}

            {totalPages > 4 && (
              <button
                type="button"
                className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}

            {/* Next Page */}
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              title="Trang tiếp"
            >
              ›
            </button>

            {/* Last Page */}
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              title="Trang cuối"
            >
              »
            </button>
          </div>
        </div>
      </div>

      {/* 6. Modal Tạo / Chỉnh sửa môn học */}
      {isModalOpen && (
        <div className="subject-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="subject-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="subject-modal-header">
              <h2>{editingSubject ? 'Chỉnh sửa môn học' : 'Thêm môn học mới'}</h2>
              <button
                type="button"
                className="subject-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSubject}>
              <div className="subject-modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Mã môn học <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="VD: MATH-101"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value.toUpperCase() })
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Số tín chỉ <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="form-input"
                      value={formData.credits}
                      onChange={(e) =>
                        setFormData({ ...formData, credits: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Tên môn học <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="VD: Toán cao cấp 1 (Giải tích 1)"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Khoa / Bộ môn phụ trách</label>
                  <select
                    className="form-select"
                    value={formData.faculty}
                    onChange={(e) =>
                      setFormData({ ...formData, faculty: e.target.value })
                    }
                  >
                    <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                    <option value="Khoa Toán - Tin">Khoa Toán - Tin</option>
                    <option value="Khoa học cơ bản">Khoa học cơ bản</option>
                    <option value="Lý luận chính trị">Lý luận chính trị</option>
                    <option value="Ngoại ngữ">Ngoại ngữ</option>
                    <option value="Khoa Xây dựng">Khoa Xây dựng</option>
                    <option value="Khoa Kinh tế">Khoa Kinh tế</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Trưởng bộ môn / Giảng viên</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="VD: TS. Nguyễn Văn An"
                      value={formData.teacher}
                      onChange={(e) =>
                        setFormData({ ...formData, teacher: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Email liên hệ</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="VD: an.nv@huce.edu.vn"
                      value={formData.teacherEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, teacherEmail: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="subject-modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-primary">
                  {editingSubject ? 'Lưu thay đổi' : 'Tạo môn học'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

