import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

/**
 * Login - Trang Đăng nhập chung cho cả Học sinh / Sinh viên và Giảng viên
 * Chuẩn Figma pixel-perfect với thanh chuyển đổi Role Minimalist
 */
export default function Login({ defaultRole = 'student' }) {
  const navigate = useNavigate();
  const authContext = useAuth ? useAuth() : null;
  const login = authContext?.login;

  // Role: 'student' (Học sinh / Sinh viên) hoặc 'teacher' (Giảng viên)
  const [role, setRole] = useState(defaultRole);

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
    } else if (newRole === 'teacher') {
      setIdentifier('gv.nguyenan@eduquiz.vn');
      setPassword('123456');
    } else if (newRole === 'admin') {
      setIdentifier('admin@huce.edu.vn');
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

    // Xác thực tài khoản
    setTimeout(() => {
      setIsLoading(false);
      let activeRole = role;
      if (identifier.includes('admin') || role === 'admin') {
        activeRole = 'admin';
      }

      if (login) {
        login(activeRole, {
          email: identifier,
          name: activeRole === 'admin'
            ? 'Quản trị viên'
            : activeRole === 'teacher'
            ? 'ThS. Nguyễn Văn A'
            : 'Nguyễn Văn An'
        });
      }

      setAlertInfo({
        type: 'success',
        message: `Đăng nhập thành công với vai trò ${
          activeRole === 'admin'
            ? 'Quản trị viên'
            : activeRole === 'teacher'
            ? 'Giảng viên'
            : 'Học sinh/Sinh viên'
        }! Đang chuyển hướng...`
      });

      setTimeout(() => {
        if (activeRole === 'admin') {
          navigate('/admin/dashboard');
        } else if (activeRole === 'teacher') {
          navigate('/teacher/dashboard');
        } else {
          navigate('/student');
        }
      }, 700);
    }, 500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (login) {
        login(role, {
          email: role === 'teacher' ? 'gv.nguyenan@eduquiz.vn' : 'sv21020015@eduquiz.vn',
          name: role === 'teacher' ? 'ThS. Nguyễn Văn A' : 'Nguyễn Văn An'
        });
      }
      navigate(role === 'teacher' ? '/teacher/dashboard' : '/student');
    }, 800);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Vui lòng liên hệ Quản trị viên hệ thống hoặc phòng Đào tạo nhà trường để được cấp lại mật khẩu qua email học vụ.');
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-main-card">
        <div className="auth-card-body">

          {/* 1. Header: Brand Logo & Chip Học thuật */}
          <div className="auth-header-strip">
            <Link to="/" className="auth-brand-logo" title="Trang chủ EduQuiz">
              <div className="auth-brand-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                </svg>
              </div>
              <div className="auth-brand-title">
                <span>HUCE</span>
                <span className="auth-brand-highlight">EXAM</span>
              </div>
            </Link>

            <div className={`auth-role-pill ${role}`}>
              <span className="auth-role-dot"></span>
              <span className="auth-role-text">
                {role === 'admin'
                  ? 'Dành cho Quản trị viên'
                  : role === 'student'
                  ? 'Dành cho Sinh viên'
                  : 'Dành cho Giảng viên'}
              </span>
            </div>
          </div>

          {/* 2. Tiêu đề chào mừng */}
          <div className="auth-welcome-block">
            <h1 className="auth-welcome-title">Đăng nhập tài khoản</h1>
            <p className="auth-welcome-sub">
              Hệ thống Khảo thí & Thi trắc nghiệm trực tuyến tập trung
            </p>
          </div>

          {/* 3. Thanh chuyển đổi vai trò (Role Selector Tabs chuẩn Figma) */}
          <div className="auth-role-tabs-wrap">
            <span className="auth-role-tabs-label">Chọn vai trò đăng nhập:</span>
            <div className="auth-role-tabs-container">
              <button
                type="button"
                className={`auth-role-tab-btn ${role === 'student' ? 'active' : ''}`}
                onClick={() => handleRoleChange('student')}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a10.993 10.993 0 01-1.25 4.88c-.378.892-.619 1.879-.619 2.87a1 1 0 001 1h11.238a1 1 0 001-1c0-.991-.241-1.978-.619-2.87a10.993 10.993 0 01-1.25-4.88l2.644-1.131a1 1 0 000-1.84l-7-3z" />
                </svg>
                <span>Sinh viên</span>
              </button>

              <button
                type="button"
                className={`auth-role-tab-btn ${role === 'teacher' ? 'active' : ''}`}
                onClick={() => handleRoleChange('teacher')}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>Giảng viên</span>
              </button>

              <button
                type="button"
                className={`auth-role-tab-btn ${role === 'admin' ? 'active' : ''}`}
                onClick={() => handleRoleChange('admin')}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Quản trị viên</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Credentials Info */}
          <div className="auth-demo-hint-box">
            <span>💡 Tài khoản mẫu: <strong>{role === 'admin' ? 'Quản trị viên' : role === 'student' ? 'Sinh viên' : 'Giảng viên'}</strong></span>
            <code>{identifier} / {password}</code>
          </div>

          {/* Alert thông báo phản hồi */}
          {alertInfo && (
            <div className={`auth-alert-box ${alertInfo.type}`}>
              {alertInfo.type === 'error' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              )}
              <span>{alertInfo.message}</span>
            </div>
          )}

          {/* 4. Form Đăng nhập */}
          <form className="auth-form-fields" onSubmit={handleSubmit}>
            {/* Input Identifier */}
            <div className="auth-field-group">
              <label className="auth-field-label">
                <span>{role === 'student' ? 'Email học viên hoặc Mã sinh viên' : 'Email giảng viên hoặc Mã cán bộ'}</span>
                <span className="auth-field-required">*</span>
              </label>
              <div className="auth-input-wrapper">
                <input
                  type="text"
                  className="auth-input-control"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={role === 'student' ? 'Ví dụ: sv21020015@eduquiz.vn' : 'Ví dụ: gv.nguyenan@eduquiz.vn'}
                  required
                />
                <div className="auth-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
            </div>

            {/* Input Password */}
            <div className="auth-field-group">
              <div className="auth-field-header-row">
                <label className="auth-field-label">
                  <span>Mật khẩu</span>
                  <span className="auth-field-required">*</span>
                </label>
                <a href="#forgot" onClick={handleForgotPassword} className="auth-forgot-link">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="auth-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu của bạn..."
                  required
                />
                <button
                  type="button"
                  className="auth-eye-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox Remember Me */}
            <div className="auth-options-row">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="auth-checkbox-input"
                />
                <span className="auth-checkbox-custom"></span>
                <span className="auth-checkbox-text">Ghi nhớ đăng nhập trên thiết bị này</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Đang xử lý đăng nhập...</span>
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
          © 2026 HUCE EXAM Academic Examination Platform • All Rights Reserved
        </div>
      </div>
    </div>
  );
}
