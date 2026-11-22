import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IconSearch,
  IconPlus,
  IconEdit,
  IconTrash,
  IconDownload,
  IconUser,
  IconCheck,
  IconEye,
} from '../../../components/ui/icons';
import { INITIAL_STUDENTS, AVAILABLE_CLASSES } from './studentData';
import StudentFormModal from './StudentFormModal';
import StudentDeleteModal from './StudentDeleteModal';
import StudentDetailModal from './StudentDetailModal';
import './student-management.css';

const STORAGE_KEY = 'eduquiz_teacher_students';

/**
 * StudentManagement - Trang quản lý danh sách sinh viên / học sinh
 * Hỗ trợ các nghiệp vụ cơ bản:
 * - Xem danh sách sinh viên theo bảng chuẩn học thuật
 * - Tìm kiếm theo tên, MSSV, email
 * - Lọc theo Lớp học và Trạng thái
 * - Thêm sinh viên mới (Add)
 * - Chỉnh sửa thông tin sinh viên (Edit)
 * - Xóa đơn lẻ và Xóa hàng loạt sinh viên (Delete)
 * - Thống kê KPI tự động và lưu trữ localStorage
 */
export default function StudentManagement() {
  // Khởi tạo danh sách sinh viên từ localStorage hoặc dữ liệu mẫu
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  // Lưu tự động vào localStorage khi có thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      console.error('Lỗi lưu trữ dữ liệu sinh viên:', e);
    }
  }, [students]);

  // Bộ lọc & Tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Quản lý chọn checkbox nhiều sinh viên
  const [selectedIds, setSelectedIds] = useState([]);

  // Modal Thêm / Sửa
  const [formModalState, setFormModalState] = useState({
    isOpen: false,
    student: null, // null nếu là Thêm mới
  });

  // Modal Xóa
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    student: null, // null nếu là Xóa hàng loạt
  });

  // Modal Xem chi tiết
  const [detailModalState, setDetailModalState] = useState({
    isOpen: false,
    student: null,
  });

  // Toast thông báo
  const [alertInfo, setAlertInfo] = useState(null);

  const showAlert = (type, message) => {
    setAlertInfo({ type, message });
    setTimeout(() => {
      setAlertInfo(null);
    }, 3500);
  };

  // Thống kê KPI
  const kpis = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => s.status === 'active').length;
    const classes = new Set(students.map((s) => s.className)).size;
    const totalScore = students.reduce((acc, s) => acc + (Number(s.avgScore) || 0), 0);
    const avg = total > 0 ? (totalScore / total).toFixed(2) : '0.00';

    return { total, active, classes, avg };
  }, [students]);

  // Lọc danh sách sinh viên
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        !searchTerm.trim() ||
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.mssv.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchClass = selectedClass === 'all' || s.className === selectedClass;
      const matchStatus = selectedStatus === 'all' || s.status === selectedStatus;

      return matchSearch && matchClass && matchStatus;
    });
  }, [students, searchTerm, selectedClass, selectedStatus]);

  // Toggle chọn checkbox 1 sinh viên
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Toggle chọn tất cả sinh viên đang lọc
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredStudents.length && filteredStudents.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map((s) => s.id));
    }
  };

  // Xử lý Thêm mới sinh viên
  const handleOpenAddModal = () => {
    setFormModalState({ isOpen: true, student: null });
  };

  // Xử lý Chỉnh sửa sinh viên
  const handleOpenEditModal = (student) => {
    setFormModalState({ isOpen: true, student });
  };

  // Lưu thông tin từ Modal (Thêm hoặc Sửa)
  const handleFormSubmit = (formData) => {
    if (formModalState.student) {
      // Cập nhật sinh viên đã có
      setStudents((prev) =>
        prev.map((s) =>
          s.id === formModalState.student.id
            ? { ...s, ...formData }
            : s
        )
      );
      showAlert('success', `Đã cập nhật thông tin sinh viên ${formData.name} thành công!`);
    } else {
      // Thêm mới sinh viên
      const newStudent = {
        ...formData,
        id: `ST-${Date.now()}`,
        examCount: 0,
        avgScore: 0,
        joinedDate: new Date().toLocaleDateString('vi-VN'),
      };
      setStudents((prev) => [newStudent, ...prev]);
      showAlert('success', `Đã thêm thành công sinh viên mới: ${formData.name} (${formData.mssv})!`);
    }

    setFormModalState({ isOpen: false, student: null });
  };

  // Mở modal xem chi tiết sinh viên
  const handleOpenDetailModal = (student) => {
    setDetailModalState({ isOpen: true, student });
  };

  // Mở modal xóa 1 sinh viên
  const handleOpenDeleteModal = (student) => {
    setDeleteModalState({ isOpen: true, student });
  };

  // Mở modal xóa hàng loạt đã chọn
  const handleOpenBatchDeleteModal = () => {
    if (selectedIds.length === 0) return;
    setDeleteModalState({ isOpen: true, student: null });
  };

  // Xác nhận xóa sinh viên
  const handleConfirmDelete = () => {
    if (deleteModalState.student) {
      // Xóa đơn lẻ
      const target = deleteModalState.student;
      setStudents((prev) => prev.filter((s) => s.id !== target.id));
      setSelectedIds((prev) => prev.filter((id) => id !== target.id));
      showAlert('success', `Đã xóa sinh viên ${target.name} khỏi danh sách.`);
    } else {
      // Xóa hàng loạt
      const count = selectedIds.length;
      setStudents((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
      setSelectedIds([]);
      showAlert('success', `Đã xóa thành công ${count} sinh viên đã chọn.`);
    }

    setDeleteModalState({ isOpen: false, student: null });
  };

  // Xuất danh sách sinh viên
  const handleExport = () => {
    showAlert('success', `Đang kết xuất danh sách ${filteredStudents.length} sinh viên ra file Excel / CSV...`);
  };

  const getInitials = (name) => {
    if (!name) return 'SV';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const isAllSelected =
    filteredStudents.length > 0 && selectedIds.length === filteredStudents.length;

  return (
    <div className="st-page-container">
      {/* 1. Breadcrumb navigation */}
      <nav className="st-breadcrumb-nav" aria-label="Breadcrumb">
        <Link to="/teacher/dashboard" className="st-breadcrumb-link">
          Trang chủ Giảng viên
        </Link>
        <span className="st-breadcrumb-sep">/</span>
        <span className="st-breadcrumb-current">Danh sách sinh viên</span>
      </nav>

      {/* 2. Page Header Banner & Actions */}
      <div className="st-header-banner">
        <div className="st-header-left">
          <h1 className="st-page-title">Quản lý sinh viên & thí sinh</h1>
          <p className="st-page-subtitle">
            Theo dõi danh sách học sinh, phân lớp đào tạo, kết quả thi và thông tin hồ sơ học thuật
          </p>
        </div>

        <div className="st-header-actions">
          <button
            type="button"
            className="st-btn-export"
            onClick={handleExport}
            title="Xuất file Excel danh sách sinh viên"
          >
            <IconDownload width={14} height={14} color="#0051D5" />
            <span>Xuất danh sách</span>
          </button>

          <button
            type="button"
            className="st-btn-add"
            onClick={handleOpenAddModal}
            title="Thêm một sinh viên mới vào lớp"
          >
            <IconPlus width={14} height={14} color="#FFFFFF" />
            <span>+ Thêm sinh viên mới</span>
          </button>
        </div>
      </div>

      {/* Thông báo Alert Toast */}
      {alertInfo && (
        <div
          style={{
            marginBottom: '16px',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '14px',
            background: alertInfo.type === 'error' ? '#FEE2E2' : '#DCFCE7',
            color: alertInfo.type === 'error' ? '#991B1B' : '#166534',
            border: `1px solid ${alertInfo.type === 'error' ? '#FCA5A5' : '#86EFAC'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>{alertInfo.type === 'error' ? '⚠️' : '✅'}</span>
          <span>{alertInfo.message}</span>
        </div>
      )}

      {/* 3. KPI Statistics Strip */}
      <div className="st-kpi-grid">
        <div className="st-kpi-card">
          <div className="st-kpi-icon-box" style={{ background: '#EFF4FF', color: '#0051D5' }}>
            <IconUser width={20} height={20} color="#0051D5" />
          </div>
          <div className="st-kpi-info">
            <span className="st-kpi-value">{kpis.total}</span>
            <span className="st-kpi-label">Tổng số sinh viên</span>
          </div>
        </div>

        <div className="st-kpi-card">
          <div className="st-kpi-icon-box" style={{ background: '#DCFCE7', color: '#166534' }}>
            <IconCheck width={20} height={20} color="#166534" />
          </div>
          <div className="st-kpi-info">
            <span className="st-kpi-value">{kpis.active}</span>
            <span className="st-kpi-label">Đang học tập</span>
          </div>
        </div>

        <div className="st-kpi-card">
          <div className="st-kpi-icon-box" style={{ background: '#F3E8FF', color: '#7C3AED' }}>
            🎓
          </div>
          <div className="st-kpi-info">
            <span className="st-kpi-value">{kpis.classes}</span>
            <span className="st-kpi-label">Lớp học quản lý</span>
          </div>
        </div>
      </div>

      {/* 4. Filter & Search Toolbar */}
      <div className="st-filter-toolbar">
        <div className="st-filter-left">
          <div className="st-search-box">
            <IconSearch width={16} height={16} color="#76777D" />
            <input
              type="text"
              placeholder="Tìm kiếm theo Tên, MSSV, Email sinh viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="st-search-input"
            />
          </div>
        </div>

        <div className="st-filter-right">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="st-filter-select"
          >
            <option value="all">Tất cả lớp học</option>
            {AVAILABLE_CLASSES.map((cls) => (
              <option key={cls} value={cls}>
                Lớp {cls}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="st-filter-select"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang học</option>
            <option value="reserved">Bảo lưu</option>
            <option value="suspended">Đình chỉ</option>
          </select>

          {(searchTerm || selectedClass !== 'all' || selectedStatus !== 'all') && (
            <button
              type="button"
              className="st-btn-clear-filter"
              onClick={() => {
                setSearchTerm('');
                setSelectedClass('all');
                setSelectedStatus('all');
              }}
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Thanh thao tác hàng loạt khi có chọn sinh viên */}
      {selectedIds.length > 0 && (
        <div className="st-batch-bar">
          <span>
            Đã chọn <strong>{selectedIds.length}</strong> sinh viên trong danh sách
          </span>
          <button
            type="button"
            className="st-btn-batch-delete"
            onClick={handleOpenBatchDeleteModal}
          >
            <IconTrash width={13} height={13} color="#BA1A1A" />
            <span>Xóa {selectedIds.length} sinh viên đã chọn</span>
          </button>
        </div>
      )}

      {/* 5. Data Table */}
      <div className="st-table-wrapper">
        <table className="st-table">
          <thead>
            <tr>
              <th style={{ width: '40px', textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleToggleSelectAll}
                  disabled={filteredStudents.length === 0}
                />
              </th>
              <th>Sinh viên / Thí sinh</th>
              <th>Mã sinh viên</th>
              <th>Lớp</th>
              <th>Giới tính</th>
              <th>Số điện thoại</th>
              <th>Trạng thái</th>
              <th style={{ textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="8">
                  <div className="st-empty-state">
                    <span className="st-empty-icon">🔍</span>
                    <h3 className="st-empty-title">Không tìm thấy sinh viên nào</h3>
                    <p className="st-empty-desc">
                      Thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh lại bộ lọc lớp học.
                    </p>
                    <button
                      type="button"
                      className="st-btn-add"
                      onClick={handleOpenAddModal}
                    >
                      + Thêm sinh viên mới ngay
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((st) => {
                const isSelected = selectedIds.includes(st.id);

                return (
                  <tr key={st.id} style={{ background: isSelected ? '#EFF4FF' : undefined }}>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(st.id)}
                      />
                    </td>
                    <td>
                      <div className="st-student-cell">
                        <div
                          className="st-avatar st-clickable-name"
                          style={{ background: st.avatarColor || '#0051D5' }}
                          onClick={() => handleOpenDetailModal(st)}
                          title="Bấm để xem chi tiết hồ sơ sinh viên"
                        >
                          {getInitials(st.name)}
                        </div>
                        <div className="st-student-meta">
                          <span
                            className="st-student-name st-clickable-name"
                            onClick={() => handleOpenDetailModal(st)}
                            title="Bấm để xem chi tiết hồ sơ sinh viên"
                          >
                            {st.name}
                          </span>
                          <span className="st-student-email">{st.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="st-mssv-badge">{st.mssv}</span>
                    </td>
                    <td>
                      <span className="st-class-badge">{st.className}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', color: '#475569' }}>{st.gender}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', color: '#475569' }}>
                        {st.phone || 'Chưa cập nhật'}
                      </span>
                    </td>
                    <td>
                      <span className={`st-status-pill status-${st.status}`}>
                        <span className="st-status-dot" />
                        <span>
                          {st.status === 'active'
                            ? 'Đang học'
                            : st.status === 'reserved'
                            ? 'Bảo lưu'
                            : 'Đình chỉ'}
                        </span>
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="st-actions-cell" style={{ justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="st-action-btn st-action-btn--view"
                          onClick={() => handleOpenDetailModal(st)}
                          title={`Xem chi tiết hồ sơ của ${st.name}`}
                        >
                          <IconEye width={14} height={14} color="#475569" />
                        </button>

                        <button
                          type="button"
                          className="st-action-btn st-action-btn--edit"
                          onClick={() => handleOpenEditModal(st)}
                          title={`Chỉnh sửa thông tin của ${st.name}`}
                        >
                          <IconEdit width={13} height={13} color="#0051D5" />
                        </button>

                        <button
                          type="button"
                          className="st-action-btn st-action-btn--delete"
                          onClick={() => handleOpenDeleteModal(st)}
                          title={`Xóa sinh viên ${st.name}`}
                        >
                          <IconTrash width={13} height={13} color="#BA1A1A" />
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

      {/* 6. Modal Thêm / Sửa sinh viên */}
      <StudentFormModal
        isOpen={formModalState.isOpen}
        onClose={() => setFormModalState({ isOpen: false, student: null })}
        onSubmit={handleFormSubmit}
        initialData={formModalState.student}
      />

      {/* 7. Modal Xác nhận xóa sinh viên */}
      <StudentDeleteModal
        isOpen={deleteModalState.isOpen}
        student={deleteModalState.student}
        selectedCount={selectedIds.length}
        onClose={() => setDeleteModalState({ isOpen: false, student: null })}
        onConfirm={handleConfirmDelete}
      />

      {/* 8. Modal Xem chi tiết sinh viên */}
      <StudentDetailModal
        isOpen={detailModalState.isOpen}
        student={detailModalState.student}
        onClose={() => setDetailModalState({ isOpen: false, student: null })}
        onEdit={(student) => handleOpenEditModal(student)}
      />
    </div>
  );
}
