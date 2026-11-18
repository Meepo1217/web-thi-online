import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';

/**
 * Login - Trang Đăng nhập chung cho cả Học sinh / Sinh viên và Giảng viên
 * Chuẩn Figma pixel-perfect với thanh chuyển đổi Role Minimalist
 */
export default function Login() {
  const navigate = useNavigate();

  // Role: 'student' (Học sinh / Sinh viên) hoặc 'teacher' (Giảng viên)
  const [role, setRole] = useState('student');

  const [identifier, setIdentifier] = useState('sv21020015@eduquiz.vn');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  // Khi chuyển tab Role, tự động đổi gợi ý tài khoản mẫu
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setAlertInfo(null);
    if (newRole === 'student') {
      setIdentifier('sv21020015@eduquiz.vn');
      setPassword('123456');
    } else {
      setIdentifier('gv.nguyenan@eduquiz.vn');
      setPassword('123456');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      setAlertInfo({
        type: 'error',
        message: 'Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu.'
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
        message: `Đăng nhập thành công với vai trò ${role === 'student' ? 'Học sinh/Sinh viên' : 'Giảng viên'}! Đang chuyển hướng...`
      });

      setTimeout(() => {
        if (role === 'student') {
          navigate('/student');
        } else {
          navigate('/teacher/dashboard');
        }
      }, 700);
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'student') {
        navigate('/student');
      } else {
        navigate('/teacher/dashboard');
      }
    }, 700);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Vui lòng liên hệ Quản trị viên hệ thống hoặc Phòng Đào tạo để được cấp lại mật khẩu qua email trường.');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Ambient Glows */}
        <div className="auth-glow-top-left"></div>
        <div className="auth-glow-bottom-right"></div>

        {/* Card trung tâm */}
        <div className="auth-card">
          <div className="auth-card-body">
            {/* 1. Header Brand & Pill */}
            <div className="auth-brand-row">
              <Link to="/" className="auth-brand-left" title="Trang chủ EduQuiz">
                <div className="auth-brand-emblem-box">
                  <svg width="20" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                  </svg>
                </div>
                <div className="auth-brand-info">
                  <h2 className="auth-brand-title">EduQuiz</h2>
                  <span className="auth-brand-subtitle">Academic Platform</span>
                </div>
              </Link>

              <div className="auth-badge-pill">
                <span className="auth-badge-dot"></span>
                <span className="auth-badge-label">
                  {role === 'student' ? 'Dành cho Sinh viên' : 'Dành cho Giảng viên'}
                </span>
              </div>
            </div>

            {/* 2. Tiêu đề chào mừng */}
            <div className="auth-header-section">
              <h1 className="auth-heading">Đăng nhập vào EduQuiz</h1>
              <p className="auth-subtext">
                {role === 'student'
                  ? 'Hệ thống khảo thí & thi trắc nghiệm trực tuyến cho sinh viên'
                  : 'Cổng quản lý ngân hàng câu hỏi, tạo đề thi & giám sát phòng thi'}
              </p>
            </div>

            {/* 3. Thanh chuyển đổi vai trò (Role Selector Tabs chuẩn Figma) */}
            <div className="auth-role-tabs-container">
              <span className="auth-role-tabs-label">Chọn vai trò đăng nhập:</span>
              <div className="auth-role-tabs">
                <button
                  type="button"
                  className={`auth-role-tab-btn ${role === 'student' ? 'active' : ''}`}
                  onClick={() => handleRoleChange('student')}
                >
                  <span>👨‍🎓</span>
                  <span>Học sinh / Sinh viên</span>
                </button>
                <button
                  type="button"
                  className={`auth-role-tab-btn ${role === 'teacher' ? 'active' : ''}`}
                  onClick={() => handleRoleChange('teacher')}
                >
                  <span>👨‍🏫</span>
                  <span>Giảng viên / Giám thị</span>
                </button>
              </div>
            </div>

            {/* Thanh tài khoản mẫu thử nhanh (Quick demo) */}
            <div className="auth-demo-bar">
              <span>💡 Tài khoản mẫu: <strong>{role === 'student' ? 'Sinh viên' : 'Giảng viên'}</strong></span>
              <button
                type="button"
                className="btn-auth-demo-chip"
                onClick={() => {
                  if (role === 'student') {
                    setIdentifier('sv21020015@eduquiz.vn');
                    setPassword('123456');
                  } else {
                    setIdentifier('gv.nguyenan@eduquiz.vn');
                    setPassword('123456');
                  }
                }}
              >
                Tự động điền
              </button>
            </div>

            {/* Thông báo Alert */}
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

            {/* 4. Form Đăng nhập */}
            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Input: Tài khoản / Email */}
              <div className="auth-form-group">
                <div className="auth-form-label-row">
                  <label htmlFor="auth-id" className="auth-form-label">
                    {role === 'student'
                      ? 'Email hoặc Mã số học sinh / sinh viên'
                      : 'Email giảng viên hoặc Mã cán bộ'}
                  </label>
                  <span className="auth-form-tag blue">Bắt buộc</span>
                </div>
                <div className="auth-input-container">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <input
                    id="auth-id"
                    type="text"
                    className="auth-input-field"
                    placeholder={
                      role === 'student'
                        ? 'VD: sv21020015@eduquiz.vn hoặc MSSV'
                        : 'VD: gv.nguyenan@eduquiz.vn hoặc MGV'
                    }
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* Input: Mật khẩu */}
              <div className="auth-form-group">
                <div className="auth-form-label-row">
                  <label htmlFor="auth-password" className="auth-form-label">
                    Mật khẩu
                  </label>
                </div>
                <div className="auth-input-container">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input-field"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-btn-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Ẩn hiện mật khẩu"
                    title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
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
              </div>

              {/* Tiện ích: Ghi nhớ & Quên mật khẩu */}
              <div className="auth-utilities-row">
                <label className="auth-remember-label">
                  <input
                    type="checkbox"
                    className="auth-remember-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="auth-remember-text">Ghi nhớ đăng nhập</span>
                </label>

                <a href="#forgot" onClick={handleForgotPassword} className="auth-forgot-link">
                  Quên mật khẩu?
                </a>
              </div>

              {/* Nút bấm Submit */}
              <button
                type="submit"
                className="btn-auth-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Đang xác thực tài khoản...</span>
                ) : (
                  <>
                    <span>Đăng nhập {role === 'student' ? 'Sinh viên' : 'Giảng viên'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* 5. Phân cách Social SSO */}
            <div className="auth-social-divider">
              <div className="auth-divider-line"></div>
              <span className="auth-divider-badge">HOẶC TIẾP TỤC VỚI</span>
            </div>

            {/* 6. Hàng nút SSO */}
            <div className="auth-sso-row">
              <button
                type="button"
                className="btn-auth-sso"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Google Edu</span>
              </button>

              <button
                type="button"
                className="btn-auth-sso"
                onClick={handleGoogleLogin}
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
          </div>

          {/* 7. Footer chuyển sang Đăng ký */}
          <div className="auth-footer-strip">
            <span>Chưa có tài khoản {role === 'student' ? 'học viên' : 'giảng viên'}?</span>
            <Link to="/register" className="auth-footer-link">
              <span>Đăng ký ngay</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>

        {/* 8. Chân trang Bảo đảm bảo mật học thuật */}
        <div className="auth-trust-footer">
          <div className="auth-trust-badges">
            <div className="auth-trust-badge-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Bảo mật SSL 256-bit</span>
            </div>
            <span className="auth-trust-dot">•</span>
            <div className="auth-trust-badge-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Chuẩn khảo thí Bộ GD&ĐT</span>
            </div>
            <span className="auth-trust-dot">•</span>
            <div className="auth-trust-badge-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Xác thực danh tính học thuật</span>
            </div>
          </div>
          <div className="auth-copyright">
            © 2026 EduQuiz Academic Examination Platform • All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}
