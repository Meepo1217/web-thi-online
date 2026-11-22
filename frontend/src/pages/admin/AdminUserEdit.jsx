import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './admin-user-edit.css';

// Dữ liệu người dùng mẫu chuẩn từ Figma Auto Layout Spec
const DEFAULT_USER = {
  id: 'USR-003',
  username: 'huybui1725',
  fullname: 'Bùi Quang Huy',
  initials: 'HB',
  email: 'huybui1725@gmail.com',
  phone: '0354928675',
  classRoom: '68PM3',
  role: 'Thí sinh',
  gender: 'Nam',
  status: 'active', // 'active' | 'banned'
  isOnline: true,
  createdAt: '15/09/2024 08:30:15',
  updatedAt: '24/10/2026 14:22:05',
};

const MOCK_USERS_DATABASE = {
  'USR-001': {
    id: 'USR-001',
    username: 'admin.nam',
    fullname: 'Nguyễn Hoàng Nam',
    initials: 'NHN',
    email: 'nam.nh@huce.edu.vn',
    phone: '0912345678',
    classRoom: 'Khoa CNTT',
    role: 'Quản trị viên',
    gender: 'Nam',
    status: 'active',
    isOnline: true,
    createdAt: '12/01/2024 09:15:00',
    updatedAt: '20/10/2026 16:30:00',
  },
  'USR-002': {
    id: 'USR-002',
    username: 'sv21020015',
    fullname: 'Đặng Mai Anh',
    initials: 'DMA',
    email: 'maianh.d@student.huce.edu.vn',
    phone: '0987654321',
    classRoom: '66PM1',
    role: 'Thí sinh',
    gender: 'Nữ',
    status: 'active',
    isOnline: false,
    createdAt: '15/09/2025 10:20:00',
    updatedAt: '22/10/2026 11:05:00',
  },
  'USR-003': DEFAULT_USER,
};

export default function AdminUserEdit() {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Nạp dữ liệu ban đầu
  const [userData, setUserData] = useState(() => {
    if (userId && MOCK_USERS_DATABASE[userId]) {
      return MOCK_USERS_DATABASE[userId];
    }
    return DEFAULT_USER;
  });

  // State các trường chỉnh sửa
  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    phone: userData.phone,
    classRoom: userData.classRoom,
    role: userData.role,
    gender: userData.gender,
    status: userData.status,
    newPassword: '',
    confirmPassword: '',
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sao chép mã người dùng
  const handleCopyCode = () => {
    navigator.clipboard.writeText(userData.id);
    showToast(`Đã sao chép mã ${userData.id} vào bộ nhớ tạm!`);
  };

  // Khóa / Mở khóa tài khoản
  const handleToggleBan = () => {
    const newStatus = userData.status === 'active' ? 'banned' : 'active';
    setUserData((prev) => ({ ...prev, status: newStatus }));
    setFormData((prev) => ({ ...prev, status: newStatus }));
    showToast(
      newStatus === 'banned'
        ? `Đã khóa tài khoản ${userData.username}.`
        : `Đã mở khóa tài khoản ${userData.username}.`
    );
  };

  // Xóa tài khoản
  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    showToast(`Đã xóa vĩnh viễn tài khoản ${userData.username}!`);
    setTimeout(() => {
      navigate('/admin/users');
    }, 1200);
  };

  // Lưu biểu mẫu
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu nếu có nhập
    if (formData.newPassword) {
      if (formData.newPassword.length < 8) {
        showToast('Mật khẩu mới phải có ít nhất 8 ký tự!');
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        showToast('Xác nhận mật khẩu mới không khớp!');
        return;
      }
    }

    const nowStr = new Date().toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    setUserData((prev) => ({
      ...prev,
      username: formData.username,
      phone: formData.phone,
      classRoom: formData.classRoom,
      role: formData.role,
      gender: formData.gender,
      status: formData.status,
      updatedAt: nowStr,
    }));

    showToast(`Cập nhật thông tin tài khoản ${formData.username} thành công!`);

    setTimeout(() => {
      navigate(`/admin/users/${userData.id}`);
    }, 1200);
  };

  const isBanned = userData.status === 'banned';

  return (
    <div className="admin-user-edit-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="user-edit-toast">
          {toastMessage}
        </div>
      )}

      {/* 1. Header Trang & Breadcrumb */}
      <div className="user-edit-header">
        <Link to={`/admin/users/${userData.id}`} className="user-edit-back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Quay lại Hồ sơ người dùng</span>
        </Link>
        <h1 className="user-edit-title">Cập nhật tài khoản</h1>
      </div>

      {/* 2. Section - Card 1: User Profile Header Card (896x130px) */}
      <div className="user-edit-header-card">
        <div className="user-edit-header__left">
          {/* Avatar with Online/Active Badge */}
          <div className="user-edit-avatar-container">
            <div className="user-edit-avatar-large">
              {userData.initials}
            </div>
            <div
              className={`user-edit-avatar-status-badge ${isBanned ? 'banned' : ''}`}
              title={isBanned ? 'Đã bị khóa' : 'Đang hoạt động'}
            >
              {isBanned ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>

          {/* User Code & Username */}
          <div className="user-edit-meta-info">
            <div className="user-edit-username-row">
              <h2 className="user-edit-username-text">{userData.username}</h2>
            </div>
            <div className="user-edit-code-row">
              <span className="user-edit-code-badge">{userData.id}</span>
              <button
                type="button"
                className="btn-edit-copy-code"
                title="Sao chép mã người dùng"
                onClick={handleCopyCode}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons: Ban, View Profile, Delete */}
        <div className="user-edit-header__actions">
          {/* Nút Khóa / Mở khóa */}
          <button
            type="button"
            className={`btn-edit-header-action ${isBanned ? 'unban-action' : 'ban-action'}`}
            onClick={handleToggleBan}
          >
            {isBanned ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                </svg>
                <span>Mở khóa</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Khóa tài khoản</span>
              </>
            )}
          </button>

          {/* Nút Xem hồ sơ */}
          <button
            type="button"
            className="btn-edit-header-action"
            onClick={() => navigate(`/admin/users/${userData.id}`)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>Xem hồ sơ</span>
          </button>

          {/* Nút Xóa */}
          <button
            type="button"
            className="btn-edit-header-action delete-action"
            onClick={() => setShowDeleteModal(true)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Xóa</span>
          </button>
        </div>
      </div>

      {/* 3. Section - Card 2: Main Personal Info & Password Form (896x947px) */}
      <form onSubmit={handleSubmit} className="user-edit-main-card">
        {/* Sub-section 1: Personal Information (605px) */}
        <div className="user-edit-sub-section">
          {/* Header phân đoạn */}
          <div className="user-edit-sub-header">
            <div className="user-edit-sub-header__left">
              <span className="user-edit-sub-header__symbol">
                <svg width="12" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <h3 className="user-edit-sub-header__title">Thông tin tài khoản</h3>
            </div>
          </div>

          {/* Grid 2 cột trường thông tin cá nhân */}
          <div className="user-edit-form-grid">
            {/* 1. Tên đăng nhập */}
            <div className="user-edit-field">
              <label className="user-edit-label">Tên đăng nhập</label>
              <input
                type="text"
                className="user-edit-input"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            {/* 2. Địa chỉ Email */}
            <div className="user-edit-field">
              <label className="user-edit-label">Địa chỉ Email</label>
              <input
                type="email"
                className="user-edit-input read-only"
                value={formData.email}
                readOnly
                title="Email đăng ký của người dùng không thể tự do thay đổi"
              />
            </div>

            {/* 3. Số điện thoại */}
            <div className="user-edit-field">
              <label className="user-edit-label">Số điện thoại</label>
              <input
                type="tel"
                className="user-edit-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* 4. Lớp */}
            <div className="user-edit-field">
              <label className="user-edit-label">Lớp</label>
              <input
                type="text"
                className="user-edit-input"
                value={formData.classRoom}
                onChange={(e) => setFormData({ ...formData, classRoom: e.target.value })}
              />
            </div>

            {/* 5. Vai trò */}
            <div className="user-edit-field">
              <label className="user-edit-label">Vai trò</label>
              <select
                className="user-edit-select"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="Thí sinh">Thí sinh</option>
                <option value="Sinh viên">Sinh viên</option>
                <option value="Giảng viên">Giảng viên</option>
                <option value="Quản trị viên">Quản trị viên</option>
              </select>
            </div>

            {/* 6. Giới tính (3 Radio Options) */}
            <div className="user-edit-field">
              <label className="user-edit-label">Giới tính</label>
              <div className="user-edit-radio-group">
                {['Nam', 'Nữ', 'Khác'].map((opt) => (
                  <label key={opt} className="user-edit-radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value={opt}
                      checked={formData.gender === opt}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="user-edit-radio-input"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 7. Trạng thái */}
            <div className="user-edit-field">
              <label className="user-edit-label">Trạng thái</label>
              <div className="user-edit-status-box">
                <span className={`user-edit-status-dot ${isBanned ? 'banned' : ''}`} />
                <span className={`user-edit-status-text ${isBanned ? 'banned' : ''}`}>
                  {isBanned ? 'Bị khóa' : 'Đang hoạt động'}
                </span>
              </div>
            </div>

            {/* 8. Ngày tạo */}
            <div className="user-edit-field">
              <label className="user-edit-label">Ngày tạo</label>
              <div className="user-edit-timestamp-text">{userData.createdAt}</div>
            </div>

            {/* 9. Cập nhật lần cuối */}
            <div className="user-edit-field" style={{ gridColumn: 'span 2' }}>
              <label className="user-edit-label">Cập nhật lần cuối</label>
              <div className="user-edit-timestamp-text">{userData.updatedAt}</div>
            </div>
          </div>
        </div>

        {/* Sub-section 2: Security & Password Change (340px) */}
        <div className="user-edit-security-section">
          {/* Header phân đoạn bảo mật */}
          <div className="user-edit-sub-header">
            <div className="user-edit-sub-header__left">
              <span className="user-edit-sub-header__symbol">
                <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <h3 className="user-edit-sub-header__title">Bảo mật & Đổi mật khẩu</h3>
            </div>
          </div>

          {/* Grid mật khẩu */}
          <div className="user-edit-password-grid">
            {/* Mật khẩu mới */}
            <div className="user-edit-field">
              <label className="user-edit-label">Mật khẩu mới</label>
              <div className="user-edit-password-input-wrap">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className="user-edit-password-input"
                  placeholder="Nhập mật khẩu mới..."
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
                <button
                  type="button"
                  className="btn-toggle-password-visibility"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  title={showNewPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showNewPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Xác nhận mật khẩu mới */}
            <div className="user-edit-field">
              <label className="user-edit-label">Xác nhận mật khẩu mới</label>
              <div className="user-edit-password-input-wrap">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="user-edit-password-input"
                  placeholder="Nhập lại mật khẩu mới..."
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <button
                  type="button"
                  className="btn-toggle-password-visibility"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  title={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showConfirmPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Security Policy Notice Note */}
          <div className="user-edit-security-notice">
            <span className="user-edit-security-notice__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </span>
            <p className="user-edit-security-notice__text">
              Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và chữ số để đảm bảo tính bảo mật.
            </p>
          </div>
        </div>

        {/* Form Action Footer Buttons (86px) */}
        <div className="user-edit-footer">
          <button
            type="button"
            className="btn-user-edit-cancel"
            onClick={() => navigate(`/admin/users/${userData.id}`)}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="btn-user-edit-save"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Lưu thay đổi</span>
          </button>
        </div>
      </form>

      {/* Modal xác nhận xóa người dùng */}
      {showDeleteModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '420px',
              width: '90%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ margin: '0 0 12px', fontSize: '18px', color: '#BA1A1A' }}>
              Xác nhận xóa tài khoản?
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>
              Hành động này sẽ xóa hoàn toàn tài khoản <strong>{userData.username}</strong> ({userData.id}) khỏi hệ thống và không thể khôi phục.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '13px',
                }}
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#BA1A1A',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '13px',
                }}
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
