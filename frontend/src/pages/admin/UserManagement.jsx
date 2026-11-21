import { useState, useMemo } from 'react';
import './admin-users.css';

// Dữ liệu mẫu chuẩn xác từ Figma Spec
const INITIAL_USERS = [
  {
    id: 'USR-001',
    username: 'admin.nam',
    fullname: 'Nguyễn Hoàng Nam',
    role: 'super-admin',
    roleLabel: 'SUPER ADMIN',
    email: 'nam.nh@huce.edu.vn',
    verified: true,
    status: 'active',
    createdAt: '12/01/2024',
    avatarClass: 'admin-avatar-bg',
    initials: 'NHN',
  },
  {
    id: 'USR-002',
    username: 'sv21020015',
    fullname: 'Đặng Mai Anh',
    role: 'student',
    roleLabel: 'SINH VIÊN',
    email: 'maianh.d@student.huce.edu.vn',
    verified: true,
    status: 'active',
    createdAt: '15/09/2025',
    avatarClass: 'student-avatar-1',
    initials: 'DMA',
  },
  {
    id: 'USR-003',
    username: 'sv21020088',
    fullname: 'Bùi Quang Huy',
    role: 'student',
    roleLabel: 'SINH VIÊN',
    email: 'huy.bq@student.huce.edu.vn',
    verified: true,
    status: 'active',
    createdAt: '18/09/2025',
    avatarClass: 'student-avatar-2',
    initials: 'BQH',
  },
  {
    id: 'USR-004',
    username: 'gv.thuthao',
    fullname: 'Trần Thị Thu Thảo',
    role: 'teacher',
    roleLabel: 'GIẢNG VIÊN',
    email: 'thao.ttt@huce.edu.vn',
    verified: true,
    status: 'active',
    createdAt: '05/03/2024',
    avatarClass: 'teacher-avatar-bg',
    initials: 'TTT',
  },
  {
    id: 'USR-005',
    username: 'sv20010992',
    fullname: 'Lê Quốc Bảo',
    role: 'student',
    roleLabel: 'SINH VIÊN',
    email: 'bao.lq@student.huce.edu.vn',
    verified: false,
    status: 'banned',
    createdAt: '10/10/2023',
    avatarClass: 'banned-avatar-bg',
    initials: 'LQB',
  },
  {
    id: 'USR-006',
    username: 'gv.minhkhoa',
    fullname: 'Vũ Minh Khoa',
    role: 'teacher',
    roleLabel: 'GIẢNG VIÊN',
    email: 'khoa.vm@huce.edu.vn',
    verified: false,
    status: 'pending',
    createdAt: '20/11/2026',
    avatarClass: 'pending-avatar-bg',
    initials: 'VMK',
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedIds, setSelectedIds] = useState([]);
  const [perPage, setPerPage] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  // State cho Modal Tạo mới / Chỉnh sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    role: 'student',
    status: 'active',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Tính toán nhanh số liệu KPI
  const kpiData = useMemo(() => {
    const total = 48250 + (users.length - INITIAL_USERS.length);
    const active = users.filter((u) => u.status === 'active').length;
    const banned = users.filter((u) => u.status === 'banned').length;
    const pending = users.filter((u) => u.status === 'pending').length;
    return {
      total: total.toLocaleString('vi-VN'),
      active: (46820 + (active - 4)).toLocaleString('vi-VN'),
      banned: (320 + (banned - 1)).toLocaleString('vi-VN'),
      pending: (1110 + (pending - 1)).toLocaleString('vi-VN'),
    };
  }, [users]);

  // Bộ lọc danh sách
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Tìm kiếm từ khóa
      const matchSearch =
        u.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Lọc vai trò
      const matchRole =
        roleFilter === 'all' ||
        (roleFilter === 'admin' && u.role === 'super-admin') ||
        u.role === roleFilter;

      // Lọc trạng thái
      const matchStatus =
        statusFilter === 'all' || u.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Chọn checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredUsers.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Khóa / Mở khóa tài khoản
  const handleToggleLock = (user) => {
    const nextStatus = user.status === 'banned' ? 'active' : 'banned';
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, status: nextStatus } : u
      )
    );
    showToast(
      nextStatus === 'banned'
        ? `Đã khóa tài khoản ${user.username}`
        : `Đã mở khóa tài khoản ${user.username}`
    );
  };

  // Xóa tài khoản
  const handleDeleteUser = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa tài khoản của "${name}" khỏi hệ thống?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      showToast(`Đã xóa tài khoản "${name}" thành công.`);
    }
  };

  // Thao tác hàng loạt (Bulk actions)
  const handleBulkLock = () => {
    setUsers((prev) =>
      prev.map((u) =>
        selectedIds.includes(u.id) ? { ...u, status: 'banned' } : u
      )
    );
    showToast(`Đã khóa ${selectedIds.length} tài khoản.`);
    setSelectedIds([]);
  };

  const handleBulkUnlock = () => {
    setUsers((prev) =>
      prev.map((u) =>
        selectedIds.includes(u.id) ? { ...u, status: 'active' } : u
      )
    );
    showToast(`Đã mở khóa ${selectedIds.length} tài khoản.`);
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa ${selectedIds.length} tài khoản đã chọn?`)) {
      setUsers((prev) => prev.filter((u) => !selectedIds.includes(u.id)));
      showToast(`Đã xóa ${selectedIds.length} tài khoản.`);
      setSelectedIds([]);
    }
  };

  // Mở Modal Tạo mới
  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setFormData({
      fullname: '',
      username: '',
      email: '',
      role: 'student',
      status: 'active',
    });
    setIsModalOpen(true);
  };

  // Mở Modal Chỉnh sửa
  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role === 'super-admin' ? 'admin' : user.role,
      status: user.status,
    });
    setIsModalOpen(true);
  };

  // Lưu Form Modal
  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formData.fullname.trim() || !formData.username.trim() || !formData.email.trim()) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    if (editingUser) {
      // Cập nhật
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                fullname: formData.fullname,
                username: formData.username,
                email: formData.email,
                role: formData.role === 'admin' ? 'super-admin' : formData.role,
                roleLabel:
                  formData.role === 'admin'
                    ? 'SUPER ADMIN'
                    : formData.role === 'teacher'
                    ? 'GIẢNG VIÊN'
                    : 'SINH VIÊN',
                status: formData.status,
              }
            : u
        )
      );
      showToast(`Đã cập nhật thông tin tài khoản ${formData.username}.`);
    } else {
      // Tạo mới
      const newInitials = formData.fullname
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 3)
        .toUpperCase();

      const newUser = {
        id: `USR-${String(users.length + 1).padStart(3, '0')}`,
        username: formData.username,
        fullname: formData.fullname,
        role: formData.role === 'admin' ? 'super-admin' : formData.role,
        roleLabel:
          formData.role === 'admin'
            ? 'SUPER ADMIN'
            : formData.role === 'teacher'
            ? 'GIẢNG VIÊN'
            : 'SINH VIÊN',
        email: formData.email,
        verified: true,
        status: formData.status,
        createdAt: 'Hôm nay',
        avatarClass:
          formData.role === 'admin'
            ? 'admin-avatar-bg'
            : formData.role === 'teacher'
            ? 'teacher-avatar-bg'
            : 'student-avatar-1',
        initials: newInitials || 'NEW',
      };

      setUsers([newUser, ...users]);
      showToast(`Đã tạo tài khoản "${formData.username}" thành công.`);
    }

    setIsModalOpen(false);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setStatusFilter('all');
    setSortBy('latest');
    showToast('Đã đặt lại tất cả bộ lọc.');
  };

  return (
    <div className="admin-users-container">
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
      <div className="users-page-header">
        <div className="users-page-header__left">
          <h1 className="users-page-header__title">Quản lý tài khoản</h1>
          <p className="users-page-header__subtitle">
            Quản trị danh sách người dùng, phân quyền truy cập và giám sát trạng thái tài khoản trên hệ thống.
          </p>
        </div>

        <div className="users-page-header__actions">
          {/* Nút Xuất Excel */}
          <button
            type="button"
            className="btn-export-excel"
            onClick={() => showToast('Đang tạo và tải xuống file Excel danh sách tài khoản...')}
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

          {/* Nút Thêm tài khoản */}
          <button
            type="button"
            className="btn-create-user"
            onClick={handleOpenCreateModal}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Thêm tài khoản</span>
          </button>
        </div>
      </div>

      {/* 2. Khung thống kê nhanh (KPI cards) */}
      <div className="users-kpi-row">
        {/* Card 1: Tổng tài khoản */}
        <div className="users-kpi-card">
          <div className="users-kpi-card__inner">
            <div className="users-kpi-card__meta">
              <span className="users-kpi-card__label">TỔNG TÀI KHOẢN</span>
              <span className="users-kpi-card__number">{kpiData.total}</span>
            </div>
            <div className="users-kpi-card__icon-box total">
              <svg width="22" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Đang hoạt động */}
        <div className="users-kpi-card">
          <div className="users-kpi-card__inner">
            <div className="users-kpi-card__meta">
              <span className="users-kpi-card__label">ĐANG HOẠT ĐỘNG</span>
              <span className="users-kpi-card__number">{kpiData.active}</span>
            </div>
            <div className="users-kpi-card__icon-box active">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Bị khóa */}
        <div className="users-kpi-card">
          <div className="users-kpi-card__inner">
            <div className="users-kpi-card__meta">
              <span className="users-kpi-card__label">BỊ KHÓA</span>
              <span className="users-kpi-card__number">{kpiData.banned}</span>
            </div>
            <div className="users-kpi-card__icon-box banned">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4: Chờ kích hoạt */}
        <div className="users-kpi-card">
          <div className="users-kpi-card__inner">
            <div className="users-kpi-card__meta">
              <span className="users-kpi-card__label">CHỜ KÍCH HOẠT</span>
              <span className="users-kpi-card__number">{kpiData.pending}</span>
            </div>
            <div className="users-kpi-card__icon-box pending">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Thanh công cụ tìm kiếm và lọc */}
      <div className="users-toolbar">
        {/* Tìm kiếm chính */}
        <div className="users-toolbar__search">
          <span className="users-toolbar__search-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            className="users-toolbar__search-input"
            placeholder="Tìm kiếm theo tên tài khoản, email, MSSV/MSGV..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Cụm bộ lọc dropdowns */}
        <div className="users-toolbar__filters">
          {/* Bộ lọc vai trò */}
          <select
            className="users-select-box"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">Tất cả vai trò</option>
            <option value="admin">Quản trị viên</option>
            <option value="teacher">Giảng viên</option>
            <option value="student">Sinh viên</option>
          </select>

          {/* Bộ lọc trạng thái */}
          <select
            className="users-select-box"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="banned">Bị khóa</option>
            <option value="pending">Chờ kích hoạt</option>
          </select>

          {/* Bộ lọc sắp xếp */}
          <select
            className="users-select-box"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="name">Tên A-Z</option>
          </select>

          <div className="users-toolbar__divider" />

          {/* Button lọc áp dụng */}
          <button
            type="button"
            className="btn-filter-apply"
            onClick={() => showToast(`Đã áp dụng bộ lọc: Tìm thấy ${filteredUsers.length} tài khoản.`)}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span>Lọc ({filteredUsers.length})</span>
          </button>

          {/* Button đặt lại bộ lọc */}
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

      {/* Bulk Selection Bar (Khi có mục được tick chọn) */}
      {selectedIds.length > 0 && (
        <div className="users-bulk-bar">
          <span>Đã chọn <strong>{selectedIds.length}</strong> tài khoản:</span>
          <div className="users-bulk-actions">
            <button
              type="button"
              className="users-bulk-btn lock"
              onClick={handleBulkLock}
            >
              Khóa tài khoản đã chọn
            </button>
            <button
              type="button"
              className="users-bulk-btn unlock"
              onClick={handleBulkUnlock}
            >
              Mở khóa tài khoản đã chọn
            </button>
            <button
              type="button"
              className="users-bulk-btn delete"
              onClick={handleBulkDelete}
            >
              Xóa đã chọn
            </button>
          </div>
        </div>
      )}

      {/* 4. Bảng danh sách tài khoản */}
      <div className="users-table-card">
        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th style={{ width: '50px' }} className="center">
                  <input
                    type="checkbox"
                    className="users-checkbox"
                    checked={
                      filteredUsers.length > 0 &&
                      selectedIds.length === filteredUsers.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={{ width: '68px' }}>AVATAR</th>
                <th style={{ minWidth: '220px' }}>TÀI KHOẢN / HỌ TÊN</th>
                <th style={{ minWidth: '210px' }}>EMAIL / SỐ ĐIỆN THOẠI</th>
                <th style={{ minWidth: '140px' }}>NGÀY TẠO</th>
                <th style={{ width: '136px' }} className="center">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    Không tìm thấy tài khoản nào khớp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isChecked = selectedIds.includes(user.id);
                  const isBanned = user.status === 'banned';
                  const isSuperAdmin = user.role === 'super-admin';

                  return (
                    <tr
                      key={user.id}
                      className={`${isBanned ? 'row-banned' : ''} ${isSuperAdmin ? 'row-super-admin' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="center">
                        <input
                          type="checkbox"
                          className="users-checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectRow(user.id)}
                        />
                      </td>

                      {/* Avatar */}
                      <td>
                        <div className={`user-avatar-wrap ${user.avatarClass}`}>
                          <span>{user.initials}</span>
                          <span
                            className={`user-avatar-dot ${
                              user.status === 'active'
                                ? 'active'
                                : user.status === 'banned'
                                ? 'banned'
                                : 'pending'
                            }`}
                          />
                        </div>
                      </td>

                      {/* Tài khoản / Họ tên */}
                      <td>
                        <div className="user-name-cell">
                          <div className="user-name-cell__top">
                            <span
                              className={`user-username ${
                                isBanned ? 'banned-strike' : ''
                              }`}
                            >
                              {user.username}
                            </span>
                            <span
                              className={`user-role-badge ${
                                isSuperAdmin
                                  ? 'super-admin'
                                  : user.role === 'teacher'
                                  ? 'teacher'
                                  : 'student'
                              }`}
                            >
                              {user.roleLabel}
                            </span>
                          </div>
                          <span className="user-fullname">{user.fullname}</span>
                        </div>
                      </td>

                      {/* Email / Số điện thoại */}
                      <td>
                        <div className="user-contact-cell">
                          <span className="user-email-text">{user.email}</span>
                          <span className="user-status-icon">
                            {isSuperAdmin && (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="#0051D5">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            )}
                            {!isSuperAdmin && user.verified && (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="#069669">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            )}
                            {isBanned && (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#76777D" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                              </svg>
                            )}
                            {!user.verified && !isBanned && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C6C6CD" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                              </svg>
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Ngày tạo */}
                      <td>
                        <span className="user-date-text">{user.createdAt}</span>
                      </td>

                      {/* Thao tác */}
                      <td className="center">
                        <div className="user-actions-group">
                          {/* Nút Khóa / Mở khóa */}
                          <button
                            type="button"
                            className={`btn-user-action ${
                              isBanned ? 'lock-banned' : 'lock-active'
                            }`}
                            title={isBanned ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                            onClick={() => handleToggleLock(user)}
                          >
                            {isBanned ? (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                              </svg>
                            ) : (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                              </svg>
                            )}
                          </button>

                          {/* Nút Chỉnh sửa */}
                          <button
                            type="button"
                            className="btn-user-action edit"
                            title="Chỉnh sửa thông tin"
                            onClick={() => handleOpenEditModal(user)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>

                          {/* Nút Xóa */}
                          <button
                            type="button"
                            className="btn-user-action delete"
                            title="Xóa tài khoản"
                            onClick={() => handleDeleteUser(user.id, user.fullname)}
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

        {/* 6. Phân trang chuẩn */}
        <div className="users-pagination">
          <div className="users-pagination__left">
            <span className="users-pagination__info">
              Hiển thị 1 - {filteredUsers.length} trên tổng số {kpiData.total} tài khoản
            </span>

            <div className="users-pagination__per-page">
              <span className="users-pagination__per-page-label">Số mục:</span>
              <select
                className="users-pagination__select"
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
              >
                <option value="10">10 / trang</option>
                <option value="20">20 / trang</option>
                <option value="50">50 / trang</option>
              </select>
            </div>
          </div>

          <div className="users-pagination__right">
            {/* Nút Trước */}
            <button
              type="button"
              className="users-page-nav-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Trước</span>
            </button>

            {/* Các nút trang số */}
            <div className="users-page-numbers">
              <button
                type="button"
                className={`users-page-num-btn ${currentPage === 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                type="button"
                className={`users-page-num-btn ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                type="button"
                className={`users-page-num-btn ${currentPage === 3 ? 'active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <span className="users-page-dots">...</span>
              <button
                type="button"
                className="users-page-num-btn"
                onClick={() => setCurrentPage(4825)}
              >
                4825
              </button>
            </div>

            {/* Nút Sau */}
            <button
              type="button"
              className="users-page-nav-btn"
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

      {/* Modal Thêm mới / Chỉnh sửa tài khoản */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingUser ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}
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
                  <label className="form-label">Họ và tên *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ví dụ: Nguyễn Văn An"
                    required
                    value={formData.fullname}
                    onChange={(e) =>
                      setFormData({ ...formData, fullname: e.target.value })
                    }
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Tên đăng nhập (MSSV/MSGV) *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="sv21020099"
                      required
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Vai trò hệ thống *</label>
                    <select
                      className="form-input"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    >
                      <option value="student">Sinh viên</option>
                      <option value="teacher">Giảng viên</option>
                      <option value="admin">Quản trị viên (Super Admin)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Địa chỉ Email nhà trường *</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="user@student.huce.edu.vn"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Trạng thái tài khoản</label>
                  <select
                    className="form-input"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="active">Đang hoạt động</option>
                    <option value="banned">Bị khóa / Cấm truy cập</option>
                    <option value="pending">Chờ kích hoạt</option>
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
                  className="btn-create-user"
                >
                  {editingUser ? 'Lưu thay đổi' : 'Tạo tài khoản'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

