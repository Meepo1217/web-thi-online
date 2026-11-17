import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './student-login.css';

/**
 * StudentLogin - Trang Đăng nhập dành riêng cho Học sinh / Sinh viên
 * Chuẩn Figma pixel-perfect theo thiết kế Auto Layout
 */
export default function StudentLogin() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('sv21020015@eduquiz.vn');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setAlertInfo({
        type: 'error',
        message: 'Vui lòng nhập đầy đủ Email/Mã sinh viên và Mật khẩu.'
      });
      return;
    }

    setIsLoading(true);
    setAlertInfo(null);

    // Giả lập xác thực đăng nhập
    setTimeout(() => {
      setIsLoading(false);
      setAlertInfo({
        type: 'success',
        message: 'Đăng nhập thành công! Đang chuyển hướng vào hệ thống...'
      });
      setTimeout(() => {
        navigate('/student');
      }, 700);
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/student');
    }, 800);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Vui lòng liên hệ Phòng Đào tạo hoặc Quản trị viên nhà trường để được cấp lại mật khẩu qua email sinh viên.');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Tài khoản sinh viên được đồng bộ tự động từ hệ thống quản lý đào tạo HUBT. Nếu bạn chưa có tài khoản, vui lòng liên hệ phòng Công tác sinh viên.');
  };

  return (
    <div className="student-login-wrapper">
      <div className="student-login-card">
        {/* Phần thân thẻ đăng nhập */}
        <div className="student-login-body">
          {/* 1. Brand Emblem & Academic Identifier */}
          <div className="student-login-brand-row">
            <Link to="/" className="student-brand-left" title="Trang chủ EduQuiz">
              <div className="student-brand-emblem-box">E</div>
              <span className="student-brand-text">EduQuiz</span>
            </Link>

            <div className="student-academic-pill">
              <span className="student-pill-dot"></span>
              <span className="student-pill-label">Dành cho Sinh viên</span>
            </div>
          </div>

          {/* 2. Tiêu đề chào mừng */}
          <div className="student-login-header-section">
            <h1 className="student-login-heading">Đăng nhập vào EduQuiz</h1>
            <p className="student-login-subtext">Hệ thống khảo thí & thi trắc nghiệm trực tuyến</p>
          </div>

          {/* Thông báo Alert phản hồi */}
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

          {/* 3. Form Đăng nhập */}
          <form className="student-login-form" onSubmit={handleSubmit}>
            {/* Input: Email / MSSV */}
            <div className="student-form-group">
              <label htmlFor="student-id" className="student-form-label">
                Email hoặc Mã số học sinh / sinh viên
              </label>
              <div className="student-input-container">
                <span className="student-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input
                  id="student-id"
                  type="text"
                  className="student-input-field"
                  placeholder="VD: sv21020015@eduquiz.vn hoặc MSSV"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Input: Mật khẩu */}
            <div className="student-form-group">
              <label htmlFor="student-password" className="student-form-label">
                Mật khẩu
              </label>
              <div className="student-input-container">
                <span className="student-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  id="student-password"
                  type={showPassword ? 'text' : 'password'}
                  className="student-input-field"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Hiện hoặc ẩn mật khẩu"
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Utilities: Ghi nhớ & Quên mật khẩu */}
            <div className="student-utilities-row">
              <label className="student-remember-label">
                <input
                  type="checkbox"
                  className="student-remember-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="student-remember-text">Ghi nhớ đăng nhập</span>
              </label>

              <a href="#forgot" onClick={handleForgotPassword} className="student-forgot-link">
                Quên mật khẩu?
              </a>
            </div>

            {/* Nút bấm Submit: Đăng nhập */}
            <button
              type="submit"
              className="btn-student-login-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Đang xác thực...</span>
              ) : (
                <>
                  <span>Đăng nhập</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* 4. Social Authentication Divider */}
          <div className="student-social-divider">
            <div className="student-divider-line"></div>
            <span className="student-divider-badge">HOẶC ĐĂNG NHẬP VỚI</span>
          </div>

          {/* 5. Nút đăng nhập SSO Google */}
          <button
            type="button"
            className="btn-google-sso"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>Đăng nhập với Google Edu</span>
          </button>

          {/* Chuyển đổi nhanh vai trò Giảng viên */}
          <div style={{ textAlign: 'center', marginTop: '4px' }}>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Bạn là Giảng viên / Giám thị?{' '}
              <Link to="/teacher/dashboard" style={{ color: '#0051D5', fontWeight: 600, textDecoration: 'none' }}>
                Vào Cổng Giảng viên &rarr;
              </Link>
            </span>
          </div>
        </div>

        {/* 6. Footer Đăng ký tài khoản */}
        <div className="student-registration-footer">
          <span>Chưa có tài khoản sinh viên?</span>
          <a href="#register" onClick={handleRegister} className="student-register-link">
            Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  );
}

