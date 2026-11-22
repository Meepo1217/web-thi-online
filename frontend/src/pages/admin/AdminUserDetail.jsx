import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './admin-user-detail.css';

// Dữ liệu người dùng mẫu chuẩn từ Figma
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

// Dữ liệu tra cứu thêm nếu người dùng chuyển từ bảng UserManagement sang
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

export default function AdminUserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Khởi tạo thông tin người dùng từ param hoặc default Figma
  const [userData, setUserData] = useState(() => {
    if (userId && MOCK_USERS_DATABASE[userId]) {
      return MOCK_USERS_DATABASE[userId];
    }
    return DEFAULT_USER;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
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

  // Bắt đầu chỉnh sửa
  const handleStartEdit = () => {
    setFormData({ ...userData });
    setIsEditing(true);
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  // Lưu chỉnh sửa
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setUserData({
      ...formData,
      updatedAt: new Date().toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    });
    setIsEditing(false);
    showToast('Đã lưu các thay đổi thông tin người dùng thành công!');
  };

  // Xóa tài khoản
  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    showToast(`Đã xóa vĩnh viễn tài khoản ${userData.username}!`);
    setTimeout(() => {
      navigate('/admin/users');
    }, 1200);
  };

  const isBanned = userData.status === 'banned';

  return (
    <div className="admin-user-detail-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="detail-toast">
          {toastMessage}
        </div>
      )}

      {/* 1. Header Trang & Breadcrumb */}
      <div className="user-detail-header">
        <div className="user-detail-header__left">
          <Link to="/admin/users" className="user-detail-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Quay lại Quản lý tài khoản</span>
          </Link>
          <h1 className="user-detail-title">Hồ sơ người dùng</h1>
        </div>
      </div>

      {/* 2. Section - Card 1: User Profile Header Card (896x130px) */}
      <div className="user-profile-header-card">
        <div className="user-profile-header__left">
          {/* Avatar with Online/Active Badge */}
          <div className="user-avatar-container">
            <div className="user-avatar-large">
              {userData.initials}
            </div>
            <div
              className={`user-avatar-status-badge ${isBanned ? 'banned' : ''}`}
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
          <div className="user-meta-info">
            <div className="user-meta-name-row">
              <h2 className="user-profile-username">{userData.username}</h2>
            </div>
            <div className="user-meta-code-row">
              <span className="user-code-badge">{userData.id}</span>
              <button
                type="button"
                className="btn-copy-code"
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

        {/* Quick Action Buttons */}
        <div className="user-profile-header__actions">
          {/* Nút Khóa / Mở khóa */}
          <button
            type="button"
            className={`btn-action-outline ${isBanned ? 'btn-unban-action' : 'btn-ban-action'}`}
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

          {/* Nút Chỉnh sửa */}
          <button
            type="button"
            className="btn-action-outline"
            onClick={() => navigate(`/admin/users/edit/${userData.id}`)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>Chỉnh sửa</span>
          </button>

          {/* Nút Xóa */}
          <button
            type="button"
            className="btn-action-outline btn-delete-action"
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

      {/* 3. Section - Card 2: Main Personal Info & Details Card (896x530px) */}
      <form onSubmit={handleSaveEdit} className="user-profile-details-card">
        {/* Header phân đoạn */}
        <div className="details-card-header">
          <div className="details-card-header__left">
            <span className="details-card-header__icon">
              <svg width="14" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <h3 className="details-card-title">Thông tin tài khoản</h3>
          </div>
          {isEditing && (
            <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600 }}>
              Đang ở chế độ chỉnh sửa thông tin
            </span>
          )}
        </div>

        {/* Grid 2 cột - 8 trường dữ liệu */}
        <div className="details-form-grid">
          {/* 1. Email */}
          <div className="form-field-item">
            <label className="form-field-label">Email</label>
            {isEditing ? (
              <input
                type="email"
                className="form-field-box editable"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            ) : (
              <div className="form-field-box">{userData.email}</div>
            )}
          </div>

          {/* 2. Số điện thoại */}
          <div className="form-field-item">
            <label className="form-field-label">Số điện thoại</label>
            {isEditing ? (
              <input
                type="tel"
                className="form-field-box editable"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            ) : (
              <div className="form-field-box">{userData.phone}</div>
            )}
          </div>

          {/* 3. Lớp */}
          <div className="form-field-item">
            <label className="form-field-label">Lớp</label>
            {isEditing ? (
              <input
                type="text"
                className="form-field-box editable"
                value={formData.classRoom}
                onChange={(e) => setFormData({ ...formData, classRoom: e.target.value })}
              />
            ) : (
              <div className="form-field-box">{userData.classRoom}</div>
            )}
          </div>

          {/* 4. Vai trò */}
          <div className="form-field-item">
            <label className="form-field-label">Vai trò</label>
            {isEditing ? (
              <select
                className="form-field-select editable"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="Thí sinh">Thí sinh</option>
                <option value="Sinh viên">Sinh viên</option>
                <option value="Giảng viên">Giảng viên</option>
                <option value="Quản trị viên">Quản trị viên</option>
              </select>
            ) : (
              <div className="form-field-box">{userData.role}</div>
            )}
          </div>

          {/* 5. Giới tính (3 Radio Buttons) */}
          <div className="form-field-item">
            <label className="form-field-label">Giới tính</label>
            <div className="gender-options-row">
              {['Nam', 'Nữ', 'Khác'].map((opt) => (
                <label key={opt} className="gender-option-label">
                  <input
                    type="radio"
                    name="gender"
                    value={opt}
                    checked={isEditing ? formData.gender === opt : userData.gender === opt}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="gender-radio-custom"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 6. Trạng thái */}
          <div className="form-field-item">
            <label className="form-field-label">Trạng thái</label>
            {isEditing ? (
              <select
                className="form-field-select editable"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Đang hoạt động</option>
                <option value="banned">Bị khóa</option>
              </select>
            ) : (
              <div className="status-indicator-box">
                <span className={`status-dot ${isBanned ? 'banned' : ''}`} />
                <span className={`status-text ${isBanned ? 'banned' : ''}`}>
                  {isBanned ? 'Bị khóa' : 'Đang hoạt động'}
                </span>
              </div>
            )}
          </div>

          {/* 7. Ngày tạo */}
          <div className="form-field-item">
            <label className="form-field-label">Ngày tạo</label>
            <div className="timestamp-text">{userData.createdAt}</div>
          </div>

          {/* 8. Cập nhật lần cuối */}
          <div className="form-field-item">
            <label className="form-field-label">Cập nhật lần cuối</label>
            <div className="timestamp-text">{userData.updatedAt}</div>
          </div>
        </div>

        {/* Footer Buttons khi đang ở chế độ chỉnh sửa */}
        {isEditing && (
          <div className="details-card-footer">
            <button
              type="button"
              className="btn-cancel-edit"
              onClick={handleCancelEdit}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="btn-save-changes"
            >
              Lưu thay đổi
            </button>
          </div>
        )}
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

