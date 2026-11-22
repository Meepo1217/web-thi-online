import { useState, useRef } from 'react';
import './student-profile.css';

/**
 * StudentProfilePage - Màn hình Tài khoản cá nhân của Sinh viên / Học sinh
 * Thiết kế chuẩn pixel-perfect Figma Auto Layout
 */
export default function StudentProfilePage() {
  // State thông tin cá nhân
  const [fullName, setFullName] = useState('Nguyễn Văn An');
  const [email] = useState('nguyenvanan@huce.edu.vn');
  const [phone, setPhone] = useState('0912 345 678');
  const [dob, setDob] = useState('2004-08-15');
  const [gender, setGender] = useState('male'); // 'male' | 'female' | 'other'
  const studentCode = 'SV2026-0812';

  // State đổi mật khẩu
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State tiện ích
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Sao chép Mã số sinh viên
  const handleCopyStudentCode = () => {
    navigator.clipboard.writeText(studentCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Chọn ảnh đại diện
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      setFeedback({ type: 'success', message: 'Đã cập nhật ảnh đại diện mới!' });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  // Hủy thay đổi
  const handleCancel = () => {
    setFullName('Nguyễn Văn An');
    setPhone('0912 345 678');
    setDob('2004-08-15');
    setGender('male');
    setNewPassword('');
    setConfirmPassword('');
    setFeedback({ type: 'info', message: 'Đã khôi phục thông tin ban đầu.' });
    setTimeout(() => setFeedback(null), 2500);
  };

  // Lưu thay đổi
  const handleSave = (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu nếu có nhập
    if (newPassword || confirmPassword) {
      if (newPassword.length < 8) {
        setFeedback({ type: 'error', message: 'Mật khẩu mới phải có tối thiểu 8 ký tự!' });
        return;
      }
      if (newPassword !== confirmPassword) {
        setFeedback({ type: 'error', message: 'Xác nhận mật khẩu mới không khớp!' });
        return;
      }
    }

    // Giả lập lưu thành công
    setFeedback({
      type: 'success',
      message: 'Lưu thay đổi hồ sơ cá nhân và bảo mật thành công!'
    });
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="student-profile-page">
      <div className="profile-container">

        {/* 1. Tiêu đề trang & Breadcrumb */}
        <div className="profile-header-title-box">
          <h1 className="profile-heading-1">Tài khoản cá nhân</h1>
          <p className="profile-subheading">
            Quản lý họ tên, thông tin liên lạc và bảo mật tài khoản sinh viên của bạn
          </p>
        </div>

        {/* Toast thông báo kết quả */}
        {feedback && (
          <div
            className="profile-feedback-toast"
            style={{
              background: feedback.type === 'error' ? '#FEF2F2' : feedback.type === 'info' ? '#EFF6FF' : '#ECFDF5',
              borderColor: feedback.type === 'error' ? '#FECACA' : feedback.type === 'info' ? '#BFDBFE' : '#A7F3D0',
              color: feedback.type === 'error' ? '#991B1B' : feedback.type === 'info' ? '#1E40AF' : '#065F46'
            }}
          >
            {feedback.type === 'error' ? (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* 2. CARD 1: User Profile Header Card */}
        <div className="profile-card-header">
          <div className="profile-user-left-group">
            {/* Avatar Circle Container */}
            <div className="profile-avatar-wrap">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    boxShadow: '0px 0px 0px 4px #F1F5F9, 0px 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              ) : (
                <div className="profile-avatar-box">
                  <span className="avatar-initials-text">NA</span>
                  <span className="avatar-subtag-text">SV</span>
                </div>
              )}

              {/* Nút bấm tải ảnh đại diện lên */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <button
                type="button"
                className="profile-avatar-edit-btn"
                title="Thay đổi ảnh đại diện"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* Chi tiết định danh cá nhân */}
            <div className="profile-user-info-col">
              <div className="profile-name-row">
                <h2 className="profile-name-text">{fullName}</h2>
                {/* Verified Badge */}
                <span className="verified-blue-badge" title="Tài khoản đã xác thực thông tin học viên">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>

              <div className="profile-email-row">
                <svg width="13" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{email}</span>
              </div>

              <div className="profile-code-row">
                <span className="profile-code-chip">{studentCode}</span>
                <button
                  type="button"
                  className={`profile-copy-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopyStudentCode}
                  title="Sao chép MSSV"
                >
                  {copied ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Đã chép</span>
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Trạng thái hoạt động bên phải */}
          <div className="profile-status-pill">
            <span className="profile-status-dot"></span>
            <span>Sinh viên chính quy</span>
          </div>
        </div>

        {/* 3. CARD 2: Main Personal Info & Password Form */}
        <form className="profile-card-form" onSubmit={handleSave}>
          
          {/* Sub-section 1: Personal Information */}
          <div className="profile-subsection-personal">
            <div className="subsection-header">
              <div className="subsection-title-row">
                <div className="subsection-title-left">
                  <span className="subsection-icon">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h3 className="subsection-heading">Thông tin cá nhân</h3>
                </div>
              </div>
              <p className="subsection-desc">
                Quản lý họ tên, số điện thoại và thông tin liên hệ của bạn
              </p>
            </div>

            {/* Grid 2 cột trường dữ liệu */}
            <div className="profile-fields-grid">
              {/* Họ và tên */}
              <div className="profile-field-item">
                <label className="profile-field-label">
                  <span>Họ và tên</span>
                  <span className="required-asterisk">*</span>
                </label>
                <div className="profile-input-wrap">
                  <input
                    type="text"
                    className="profile-input-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Nhập họ và tên đầy đủ"
                  />
                </div>
              </div>

              {/* Địa chỉ Email */}
              <div className="profile-field-item">
                <label className="profile-field-label">
                  <span>Địa chỉ Email</span>
                </label>
                <div className="profile-input-wrap">
                  <input
                    type="email"
                    className="profile-input-control readonly"
                    value={email}
                    disabled
                    readOnly
                  />
                </div>
                <span className="profile-input-helper">
                  Email định danh học vụ không thể thay đổi trực tiếp
                </span>
              </div>

              {/* Số điện thoại */}
              <div className="profile-field-item">
                <label className="profile-field-label">
                  <span>Số điện thoại</span>
                </label>
                <div className="profile-input-wrap">
                  <input
                    type="tel"
                    className="profile-input-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại liên hệ"
                  />
                </div>
              </div>

              {/* Ngày sinh */}
              <div className="profile-field-item">
                <label className="profile-field-label">
                  <span>Ngày sinh</span>
                </label>
                <div className="profile-input-wrap">
                  <input
                    type="date"
                    className="profile-input-control"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  <span className="calendar-icon-indicator">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Giới tính */}
              <div className="profile-field-item full-width">
                <label className="profile-field-label">
                  <span>Giới tính</span>
                </label>
                <div className="gender-radio-row">
                  <label className={`custom-radio-option ${gender === 'male' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                      className="custom-radio-input"
                    />
                    <div className="custom-radio-circle">
                      {gender === 'male' && <span className="custom-radio-dot"></span>}
                    </div>
                    <span className="custom-radio-text">Nam</span>
                  </label>

                  <label className={`custom-radio-option ${gender === 'female' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                      className="custom-radio-input"
                    />
                    <div className="custom-radio-circle">
                      {gender === 'female' && <span className="custom-radio-dot"></span>}
                    </div>
                    <span className="custom-radio-text">Nữ</span>
                  </label>

                  <label className={`custom-radio-option ${gender === 'other' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={gender === 'other'}
                      onChange={() => setGender('other')}
                      className="custom-radio-input"
                    />
                    <div className="custom-radio-circle">
                      {gender === 'other' && <span className="custom-radio-dot"></span>}
                    </div>
                    <span className="custom-radio-text">Khác</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-section 2: Security & Password Change */}
          <div className="profile-subsection-security">
            <div className="subsection-header">
              <div className="subsection-title-row">
                <div className="subsection-title-left">
                  <span className="subsection-icon">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h3 className="subsection-heading">Bảo mật & Đổi mật khẩu</h3>
                </div>
                {/* Chip khuyến nghị */}
                <div className="recommended-security-chip">
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Khuyên dùng</span>
                </div>
              </div>
              <p className="subsection-desc">
                Cập nhật mật khẩu để tăng tính bảo mật tài khoản nếu bạn cảm thấy bị lộ
              </p>
            </div>

            {/* Grid 2 cột mật khẩu */}
            <div className="profile-fields-grid">
              {/* Mật khẩu mới */}
              <div className="profile-field-item">
                <label className="profile-field-label">
                  <span>Mật khẩu mới</span>
                </label>
                <div className="profile-input-wrap">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="profile-input-control has-toggle"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới..."
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-eye-btn"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    tabIndex="-1"
                  >
                    {showNewPassword ? (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Xác nhận mật khẩu mới */}
              <div className="profile-field-item">
                <label className="profile-field-label">
                  <span>Xác nhận mật khẩu mới</span>
                </label>
                <div className="profile-input-wrap">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="profile-input-control has-toggle"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới..."
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-eye-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Khung ghi chú bảo mật Security Policy Notice */}
            <div className="security-notice-banner">
              <span className="security-notice-icon">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="security-notice-text">
                Mật khẩu cần tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và chữ số để đảm bảo tính an toàn tối đa.
              </p>
            </div>
          </div>

          {/* Sub-section 3: Action Footer Buttons */}
          <div className="profile-form-footer">
            <button
              type="button"
              className="btn-secondary-cancel"
              onClick={handleCancel}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn-primary-save"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

