import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './admin-user-create.css';

export default function AdminUserCreate() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State các trường thông tin
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    classRoom: '',
    role: 'Thí sinh',
    gender: 'Nam',
    password: '',
    confirmPassword: '',
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Xử lý chọn ảnh đại diện
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Kích thước ảnh tối đa là 2MB!');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý submit form tạo tài khoản
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Kiểm tra trường bắt buộc
    if (!formData.username.trim()) {
      showToast('Vui lòng nhập tên đăng nhập!');
      return;
    }

    if (!formData.email.trim()) {
      showToast('Vui lòng nhập địa chỉ Email!');
      return;
    }

    if (!formData.password) {
      showToast('Vui lòng nhập mật khẩu cho tài khoản mới!');
      return;
    }

    if (formData.password.length < 8) {
      showToast('Mật khẩu phải có ít nhất 8 ký tự!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    // 2. Tạo ID mẫu người dùng mới
    const newUserId = `USR-${Math.floor(100 + Math.random() * 900)}`;

    showToast(`Đã tạo tài khoản "${formData.username}" (${newUserId}) thành công!`);

    // 3. Chuyển hướng về trang danh sách sau 1 giây
    setTimeout(() => {
      navigate('/admin/users');
    }, 1200);
  };

  return (
    <div className="admin-user-create-container">
      {/* Toast thông báo */}
      {toastMessage && (
        <div className="user-create-toast">
          {toastMessage}
        </div>
      )}

      {/* 1. Header Trang & Breadcrumb */}
      <div className="user-create-header">
        <Link to="/admin/users" className="user-create-back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Quay lại Quản lý tài khoản</span>
        </Link>
        <h1 className="user-create-title">Tạo tài khoản</h1>
      </div>

      {/* 2. Main Card: Form Container (896x914px) */}
      <form onSubmit={handleSubmit} className="user-create-card">
        {/* Sub-section 1: Personal Information (485px) */}
        <div className="user-create-sub-section">
          {/* Header phân đoạn & Avatar Upload */}
          <div className="user-create-sub-header">
            <div className="user-create-sub-header__title-row">
              <span className="user-create-sub-header__symbol">
                <svg width="12" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <h3 className="user-create-sub-header__title">Thông tin tài khoản</h3>
            </div>

            {/* Cụm tải lên Avatar 171x80px */}
            <div className="user-create-avatar-row">
              <div className="user-create-avatar-preview">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="user-create-avatar-img"
                  />
                ) : (
                  <div className="user-create-avatar-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#787878" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Nút Choose file */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="btn-choose-file"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose file
                </button>
              </div>
            </div>
          </div>

          {/* Grid trường thông tin 2 cột */}
          <div className="user-create-form-grid">
            {/* 1. Tên đăng nhập */}
            <div className="user-create-field">
              <label className="user-create-label">Tên đăng nhập</label>
              <input
                type="text"
                className="user-create-input"
                placeholder="Nhập tên đăng nhập"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            {/* 2. Địa chỉ Email */}
            <div className="user-create-field">
              <label className="user-create-label">Địa chỉ Email</label>
              <input
                type="email"
                className="user-create-input"
                placeholder="Nhập Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {/* 3. Số điện thoại */}
            <div className="user-create-field">
              <label className="user-create-label">Số điện thoại</label>
              <input
                type="tel"
                className="user-create-input"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* 4. Lớp */}
            <div className="user-create-field">
              <label className="user-create-label">Lớp</label>
              <input
                type="text"
                className="user-create-input"
                placeholder="Nhập lớp"
                value={formData.classRoom}
                onChange={(e) => setFormData({ ...formData, classRoom: e.target.value })}
              />
            </div>

            {/* 5. Vai trò */}
            <div className="user-create-field">
              <label className="user-create-label">Vai trò</label>
              <select
                className="user-create-select"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="Thí sinh">Thí sinh</option>
                <option value="Sinh viên">Sinh viên</option>
                <option value="Giảng viên">Giảng viên</option>
                <option value="Quản trị viên">Quản trị viên</option>
              </select>
            </div>

            {/* 6. Giới tính (3 Radio options) */}
            <div className="user-create-field">
              <label className="user-create-label">Giới tính</label>
              <div className="user-create-radio-group">
                {['Nam', 'Nữ', 'Khác'].map((opt) => (
                  <label key={opt} className="user-create-radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value={opt}
                      checked={formData.gender === opt}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="user-create-radio-input"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sub-section 2: Security & Password (340px) */}
        <div className="user-create-security-section">
          {/* Header phân đoạn Mật khẩu */}
          <div className="user-create-security-header">
            <span className="user-create-security-header__symbol">
              <svg width="15" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <h3 className="user-create-security-header__title">Mật khẩu</h3>
          </div>

          {/* Grid 2 cột mật khẩu */}
          <div className="user-create-password-grid">
            {/* Mật khẩu mới */}
            <div className="user-create-field">
              <label className="user-create-label">Mật khẩu</label>
              <div className="user-create-password-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="user-create-password-input"
                  placeholder="Nhập mật khẩu mới..."
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? (
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

            {/* Xác nhận mật khẩu */}
            <div className="user-create-field">
              <label className="user-create-label">Xác nhận mật khẩu</label>
              <div className="user-create-password-input-wrap">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="user-create-password-input"
                  placeholder="Nhập lại mật khẩu mới..."
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
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
          <div className="user-create-security-notice">
            <span className="user-create-security-notice__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </span>
            <p className="user-create-security-notice__text">
              Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và chữ số để đảm bảo tính bảo mật.
            </p>
          </div>
        </div>

        {/* Form Action Footer Buttons (87px) */}
        <div className="user-create-footer">
          <button
            type="button"
            className="btn-user-create-cancel"
            onClick={() => navigate('/admin/users')}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="btn-user-create-submit"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Tạo tài khoản</span>
          </button>
        </div>
      </form>
    </div>
  );
}
