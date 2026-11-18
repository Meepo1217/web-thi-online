import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './student-register.css';

/**
 * StudentRegister - Trang Đăng ký Học sinh / Sinh viên chuẩn Figma Auto Layout
 */
export default function StudentRegister() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  // Tính toán độ mạnh mật khẩu (4 mức độ)
  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score; // 0 to 4
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !studentId.trim() || !password || !confirmPassword) {
      setAlertInfo({
        type: 'error',
        message: 'Vui lòng điền đầy đủ tất cả các trường thông tin bắt buộc.'
      });
      return;
    }

    if (password.length < 8) {
      setAlertInfo({
        type: 'error',
        message: 'Mật khẩu phải có độ dài tối thiểu từ 8 ký tự trở lên.'
      });
      return;
    }

    if (password !== confirmPassword) {
      setAlertInfo({
        type: 'error',
        message: 'Mật khẩu xác nhận không trùng khớp với mật khẩu đã tạo.'
      });
      return;
    }

    if (!agreedTerms) {
      setAlertInfo({
        type: 'error',
        message: 'Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật học thuật.'
      });
      return;
    }

    setIsLoading(true);
    setAlertInfo(null);

    // Giả lập đăng ký tài khoản thành công
    setTimeout(() => {
      setIsLoading(false);
      setAlertInfo({
        type: 'success',
        message: 'Đăng ký tài khoản học viên thành công! Đang chuyển đến trang đăng nhập...'
      });
      setTimeout(() => {
        navigate('/login');
      }, 900);
    }, 700);
  };

  const handleSSORegister = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAlertInfo({
        type: 'success',
        message: `Đang kết nối tài khoản ${provider}... Chuyển hướng thành công!`
      });
      setTimeout(() => {
        navigate('/student');
      }, 700);
    }, 800);
  };

  return (
    <div className="student-register-wrapper">
      <div className="student-register-container">
        {/* Hai vệt sáng Ambient Decorative Glow phía sau */}
        <div className="register-glow-top-left"></div>
        <div className="register-glow-bottom-right"></div>

        {/* Khung thẻ Card trung tâm 512px */}
        <div className="student-register-card">
          {/* 1. Header Section */}
          <div className="student-register-header">
            {/* Badge & Brand Identity */}
            <div className="register-badge-pill">
              <span className="register-badge-dot"></span>
              <span className="register-badge-text">Cổng đăng ký học viên</span>
            </div>

            {/* EduQuiz Brand Logo */}
            <Link to="/" className="register-brand-logo-row" title="Về trang chủ EduQuiz">
              <div className="register-brand-icon-box">
                <svg width="22" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                </svg>
              </div>
              <div className="register-brand-info">
                <h2 className="register-brand-title">EduQuiz</h2>
                <span className="register-brand-sub">Academic Platform</span>
              </div>
            </Link>

            {/* Formal Academic Headline & Subtext */}
            <div className="register-headline-group">
              <h1 className="register-headline-title">Tạo tài khoản học viên</h1>
              <p className="register-headline-desc">
                Đăng ký tài khoản để tham gia các kỳ thi trực tuyến, theo dõi tiến độ học tập và xem kết quả đánh giá
              </p>
            </div>
          </div>

          {/* Alert thông báo phản hồi */}
          {alertInfo && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                lineHeight: '18px',
                background: alertInfo.type === 'error' ? '#FEE2E2' : '#DCFCE7',
                color: alertInfo.type === 'error' ? '#991B1B' : '#166534',
                border: `1px solid ${alertInfo.type === 'error' ? '#FCA5A5' : '#86EFAC'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{alertInfo.type === 'error' ? '⚠️' : '✅'}</span>
              <span>{alertInfo.message}</span>
            </div>
          )}

          {/* 2. Registration Form */}
          <form className="student-register-form" onSubmit={handleSubmit}>
            {/* Field 1: Họ và tên */}
            <div className="register-form-field">
              <div className="register-field-label-row">
                <label htmlFor="reg-fullname" className="register-field-label">
                  Họ và tên
                </label>
                <span className="register-field-tag">Bắt buộc</span>
              </div>
              <div className="register-input-wrap">
                <span className="register-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input
                  id="reg-fullname"
                  type="text"
                  className="register-input-field"
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* Field 2: Email học viện / cá nhân */}
            <div className="register-form-field">
              <div className="register-field-label-row">
                <label htmlFor="reg-email" className="register-field-label">
                  Email học viện / cá nhân
                </label>
                <span className="register-field-tag blue">Xác minh OTP</span>
              </div>
              <div className="register-input-wrap">
                <span className="register-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <input
                  id="reg-email"
                  type="email"
                  className="register-input-field"
                  placeholder="nguyenvanan@hubt.edu.vn hoặc @gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="register-field-hint">
                <span className="register-field-hint-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </span>
                <span>Ưu tiên sử dụng email trường cấp (.edu.vn) để tự động duyệt hồ sơ</span>
              </div>
            </div>

            {/* Field 3: Mã số sinh viên / CCCD */}
            <div className="register-form-field">
              <div className="register-field-label-row">
                <label htmlFor="reg-studentid" className="register-field-label">
                  Mã số sinh viên / CCCD
                </label>
                <span className="register-field-tag">Duyệt tự động</span>
              </div>
              <div className="register-input-wrap">
                <span className="register-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                    <line x1="7" y1="8" x2="17" y2="8"></line>
                    <line x1="7" y1="12" x2="13" y2="12"></line>
                    <circle cx="15.5" cy="14.5" r="1.5"></circle>
                  </svg>
                </span>
                <input
                  id="reg-studentid"
                  type="text"
                  className="register-input-field"
                  placeholder="VD: 21020015 hoặc Căn cước công dân"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Field 4: Mật khẩu & Thanh đo 4 mức độ */}
            <div className="register-form-field">
              <div className="register-field-label-row">
                <label htmlFor="reg-password" className="register-field-label">
                  Mật khẩu
                </label>
                <span className="register-field-tag">
                  {passwordStrength === 0 && 'Độ mạnh'}
                  {passwordStrength === 1 && 'Yếu'}
                  {passwordStrength === 2 && 'Trung bình'}
                  {passwordStrength === 3 && 'Khá'}
                  {passwordStrength === 4 && 'Rất mạnh'}
                </span>
              </div>
              <div className="register-input-wrap">
                <span className="register-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  className="register-input-field"
                  placeholder="Tối thiểu 8 ký tự, có số và ký tự đặc biệt"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="register-input-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Ẩn hiện mật khẩu"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>

              {/* Thanh hiển thị 4 mức độ mật khẩu chuẩn Figma */}
              <div className="register-strength-bar-wrap">
                <div className={`register-strength-segment ${passwordStrength >= 1 ? (passwordStrength === 1 ? 'active-weak' : passwordStrength === 2 ? 'active-fair' : passwordStrength === 3 ? 'active-good' : 'active-strong') : ''}`}></div>
                <div className={`register-strength-segment ${passwordStrength >= 2 ? (passwordStrength === 2 ? 'active-fair' : passwordStrength === 3 ? 'active-good' : 'active-strong') : ''}`}></div>
                <div className={`register-strength-segment ${passwordStrength >= 3 ? (passwordStrength === 3 ? 'active-good' : 'active-strong') : ''}`}></div>
                <div className={`register-strength-segment ${passwordStrength >= 4 ? 'active-strong' : ''}`}></div>
              </div>
            </div>

            {/* Field 5: Xác nhận mật khẩu */}
            <div className="register-form-field">
              <div className="register-field-label-row">
                <label htmlFor="reg-confirm-password" className="register-field-label">
                  Xác nhận mật khẩu *
                </label>
              </div>
              <div className="register-input-wrap">
                <span className="register-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="register-input-field"
                  placeholder="Nhập lại mật khẩu vừa tạo"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="register-input-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Ẩn hiện xác nhận mật khẩu"
                >
                  {showConfirmPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Field 6: Điều khoản & Thỏa thuận */}
            <label className="register-agreement-row">
              <input
                type="checkbox"
                className="register-agreement-checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
              />
              <span className="register-agreement-text">
                Tôi đồng ý với{' '}
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Điều khoản dịch vụ EduQuiz: Người dùng cam kết tính chính trực trong quá trình làm bài thi trực tuyến.'); }} className="register-agreement-link">
                  Điều khoản dịch vụ
                </a>{' '}
                và{' '}
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Chính sách bảo mật: Thông tin học viên được mã hóa theo chuẩn bảo mật học thuật quốc gia.'); }} className="register-agreement-link">
                  Chính sách bảo mật học thuật
                </a>{' '}
                của hệ thống EduQuiz
              </span>
            </label>

            {/* Primary Action Submit Button */}
            <button
              type="submit"
              className="btn-student-register-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Đang xử lý đăng ký...</span>
              ) : (
                <>
                  <span>Đăng ký tài khoản</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* 3. Social SSO Separator */}
          <div className="register-sso-separator">
            <div className="register-sso-line"></div>
            <span className="register-sso-badge">HOẶC ĐĂNG KÝ BẰNG</span>
          </div>

          {/* 4. Single Sign-On Buttons Row (Google & Microsoft 365) */}
          <div className="register-sso-buttons-row">
            {/* Google Workspace Button */}
            <button
              type="button"
              className="btn-sso-item"
              onClick={() => handleSSORegister('Google Workspace')}
              disabled={isLoading}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Google</span>
            </button>

            {/* Microsoft 365 Button */}
            <button
              type="button"
              className="btn-sso-item"
              onClick={() => handleSSORegister('Microsoft 365')}
              disabled={isLoading}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <rect x="1" y="1" width="10" height="10" fill="#F35325" />
                <rect x="13" y="1" width="10" height="10" fill="#81BC06" />
                <rect x="1" y="13" width="10" height="10" fill="#05A6F0" />
                <rect x="13" y="13" width="10" height="10" fill="#FFBA08" />
              </svg>
              <span>Microsoft 365</span>
            </button>
          </div>

          {/* 5. Chuyển sang Đăng nhập */}
          <div className="register-login-footer">
            <span>Đã có tài khoản sinh viên?</span>
            <Link to="/login" className="register-login-link">
              <span>Đăng nhập ngay</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>

        {/* 6. Academic Trust Assurance Footer */}
        <div className="register-trust-footer">
          <div className="register-trust-badges-row">
            <div className="register-trust-badge">
              <span className="register-trust-badge-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </span>
              <span>Bảo mật SSL 256-bit</span>
            </div>

            <span className="register-trust-dot">•</span>

            <div className="register-trust-badge">
              <span className="register-trust-badge-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span>Chuẩn Bộ GD&ĐT</span>
            </div>

            <span className="register-trust-dot">•</span>

            <div className="register-trust-badge">
              <span className="register-trust-badge-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <span>Xác thực danh tính học thuật</span>
            </div>
          </div>

          <div className="register-copyright-text">
            © 2026 EduQuiz Academic Platform • All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}
