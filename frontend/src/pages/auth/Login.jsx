import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './login.css';

/**
 * Login - Trang Đăng nhập hệ thống chung cho cả Giảng viên và Học sinh / Sinh viên
 * Tự động chuyển hướng đến Dashboard/Cổng tương ứng theo vai trò sau khi đăng nhập
 */
export default function Login({ defaultRole = 'student' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, login } = useAuth();

  // Role hiện tại được chọn trên form: 'student' hoặc 'teacher'
  const [selectedRole, setSelectedRole] = useState(defaultRole);

  // Mẫu tài khoản mặc định theo role
  const credentialsByRole = {
    student: {
      email: 'sv21020015@eduquiz.vn',
      pass: '123456',
      name: 'Nguyễn Văn An',
      badge: 'Cổng Sinh viên',
      subtext: 'Làm bài kiểm tra & tra cứu kết quả thi trực tuyến',
    },
    teacher: {
      email: 'teacher@hubt.edu.vn',
      pass: '123456',
      name: 'ThS. Nguyễn Văn A',
      badge: 'Cổng Giảng viên',
      subtext: 'Soạn đề thi, quản lý ngân hàng câu hỏi & coi thi',
    },
  };

  const [identifier, setIdentifier] = useState(credentialsByRole[defaultRole].email);
  const [password, setPassword] = useState(credentialsByRole[defaultRole].pass);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  // Nếu người dùng đã đăng nhập từ trước và truy cập vào /login -> Chuyển hướng theo role
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const targetPath = user.role === 'teacher' ? '/teacher/dashboard' : '/student';
      navigate(targetPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Khi chuyển tab role
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setIdentifier(credentialsByRole[role].email);
    setPassword(credentialsByRole[role].pass);
    setAlertInfo(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      setAlertInfo({
        type: 'error',
        message: 'Vui lòng nhập đầy đủ Email/Tên đăng nhập và Mật khẩu.',
      });
      return;
    }

    setIsLoading(true);
    setAlertInfo(null);

    // Xác định role dựa trên tab hoặc email
    let finalRole = selectedRole;
    if (identifier.toLowerCase().includes('teacher') || identifier.toLowerCase().includes('gv')) {
      finalRole = 'teacher';
    } else if (identifier.toLowerCase().includes('sv') || identifier.toLowerCase().includes('student')) {
      finalRole = 'student';
    }

    // Giả lập độ trễ xác thực
    setTimeout(() => {
      const loggedUser = login(finalRole, {
        email: identifier,
        name: credentialsByRole[finalRole].name,
      });

      setIsLoading(false);
      setAlertInfo({
        type: 'success',
        message: `Đăng nhập thành công với vai trò ${
          finalRole === 'teacher' ? '👨‍🏫 Giảng viên' : '👨‍🎓 Sinh viên'
        }! Đang chuyển hướng...`,
      });

      // Kiểm tra xem có trang redirect trước đó không (từ ProtectedRoute)
      const redirectPath =
        location.state?.from?.pathname ||
        (finalRole === 'teacher' ? '/teacher/dashboard' : '/student');

      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 500);
    }, 450);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login(selectedRole, {
        name: selectedRole === 'teacher' ? 'ThS. Nguyễn Văn A (Google)' : 'Nguyễn Văn An (Google)',
      });
      setIsLoading(false);
      const target = selectedRole === 'teacher' ? '/teacher/dashboard' : '/student';
      navigate(target, { replace: true });
    }, 600);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Vui lòng liên hệ Quản trị viên hệ thống để được hỗ trợ cấp lại mật khẩu.');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Tài khoản được cấp phát tự động từ hệ thống Quản lý Đào tạo. Vui lòng liên hệ Phòng Đào tạo.');
  };

  const currentMeta = credentialsByRole[selectedRole];

  return (
    <div className="student-login-wrapper">
      <div className="student-login-card">
        {/* Phần thân thẻ đăng nhập */}
        <div className="student-login-body">
          {/* 1. Brand Logo & Role Pill */}
          <div className="student-login-brand-row">
            <Link to="/login" className="student-brand-left" title="EduQuiz Platform">
              <div className="student-brand-emblem-box">E</div>
              <span className="student-brand-text">EduQuiz</span>
            </Link>

            <div className={`student-academic-pill ${selectedRole === 'teacher' ? 'login-badge-teacher' : 'login-badge-student'}`}>
              <span className="student-pill-dot"></span>
              <span className="student-pill-label">{currentMeta.badge}</span>
            </div>
          </div>

          {/* 2. Tiêu đề chào mừng */}
          <div className="student-login-header-section">
            <h1 className="student-login-heading">Đăng nhập vào EduQuiz</h1>
            <p className="student-login-subtext">{currentMeta.subtext}</p>
          </div>

          {/* 3. Tab chuyển đổi vai trò nhanh */}
          <div className="login-role-tabs">
            <button
              type="button"
              className={`login-role-tab-btn ${selectedRole === 'student' ? 'active role-student' : ''}`}
              onClick={() => handleSelectRole('student')}
            >
              <span>👨‍🎓</span>
              <span>Học sinh / Sinh viên</span>
            </button>
            <button
              type="button"
              className={`login-role-tab-btn ${selectedRole === 'teacher' ? 'active role-teacher' : ''}`}
              onClick={() => handleSelectRole('teacher')}
            >
              <span>👨‍🏫</span>
              <span>Giảng viên / Giáo viên</span>
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
                gap: '8px',
              }}
            >
              <span>{alertInfo.type === 'error' ? '⚠️' : '✅'}</span>
              <span>{alertInfo.message}</span>
            </div>
          )}

          {/* 4. Form Đăng nhập */}
          <form className="student-login-form" onSubmit={handleSubmit}>
            {/* Input Email / Tên đăng nhập */}
            <div className="student-form-group">
              <label htmlFor="login-identifier" className="student-form-label">
                {selectedRole === 'teacher'
                  ? 'Email hoặc Mã cán bộ giảng viên'
                  : 'Email hoặc Mã số học sinh / sinh viên'}
              </label>
              <div className="student-input-container">
                <span className="student-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input
                  id="login-identifier"
                  type="text"
                  className="student-input-field"
                  placeholder={selectedRole === 'teacher' ? 'VD: teacher@hubt.edu.vn' : 'VD: sv21020015@eduquiz.vn'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Input Mật khẩu */}
            <div className="student-form-group">
              <label htmlFor="login-password" className="student-form-label">
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
                  id="login-password"
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

            {/* Utilities */}
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

            {/* Nút Submit */}
            <button
              type="submit"
              className={`btn-student-login-submit ${selectedRole === 'teacher' ? 'submit-teacher' : 'submit-student'}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Đang xác thực...</span>
              ) : (
                <>
                  <span>
                    {selectedRole === 'teacher'
                      ? 'Đăng nhập Cổng Giảng viên'
                      : 'Đăng nhập Cổng Sinh viên'}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="student-social-divider">
            <div className="student-divider-line"></div>
            <span className="student-divider-badge">HOẶC ĐĂNG NHẬP VỚI</span>
          </div>

          {/* Nút Google SSO */}
          <button
            type="button"
            className="btn-google-sso"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
            </svg>
            <span>Đăng nhập với Google Edu ({selectedRole === 'teacher' ? 'Giảng viên' : 'Sinh viên'})</span>
          </button>
        </div>

        {/* Footer */}
        <div className="student-registration-footer">
          <span>Chưa có tài khoản {selectedRole === 'teacher' ? 'giảng viên' : 'sinh viên'}?</span>
          <a href="#register" onClick={handleRegister} className="student-register-link">
            Liên hệ hỗ trợ
          </a>
        </div>
      </div>
    </div>
  );
}
