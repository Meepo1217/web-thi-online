import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';

/**
 * Register - Trang Đăng ký tài khoản chung cho cả Học sinh / Sinh viên và Giảng viên
 * Chuẩn Figma pixel-perfect với thanh chuyển đổi Role Minimalist
 */
export default function Register() {
  const navigate = useNavigate();

  // Role: 'student' (Học sinh/Sinh viên) hoặc 'teacher' (Giảng viên)
  const [role, setRole] = useState('student');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [identifierCode, setIdentifierCode] = useState(''); // MSSV hoặc MGV
  const [department, setDepartment] = useState(''); // Khoa / Bộ môn (nếu là giảng viên)
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
    return score;
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !identifierCode.trim() || !password || !confirmPassword) {
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

    // Giả lập đăng ký thành công
    setTimeout(() => {
      setIsLoading(false);
      setAlertInfo({
        type: 'success',
        message: `Đăng ký thông tin thành công! Đang chuyển đến bước xác thực mã OTP...`
      });
      setTimeout(() => {
        navigate(`/verify-otp?email=${encodeURIComponent(email)}&role=${role}`);
      }, 700);
    }, 700);
  };

  const handleSSORegister = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAlertInfo({
        type: 'success',
        message: `Đang liên kết tài khoản ${provider}... Chuyển hướng thành công!`
      });
      setTimeout(() => {
        if (role === 'student') {
          navigate('/student');
        } else {
          navigate('/teacher/dashboard');
        }
      }, 700);
    }, 800);
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
                  {role === 'student' ? 'Đăng ký Học viên' : 'Đăng ký Giảng viên'}
                </span>
              </div>
            </div>

            {/* 2. Tiêu đề */}
            <div className="auth-header-section">
              <h1 className="auth-heading">Tạo tài khoản EduQuiz</h1>
              <p className="auth-subtext">
                {role === 'student'
                  ? 'Đăng ký tài khoản để tham gia các kỳ thi trực tuyến và xem kết quả đánh giá'
                  : 'Đăng ký tài khoản cán bộ để tạo đề thi, quản lý môn học và giám sát thí sinh'}
              </p>
            </div>

            {/* 3. Role Selector Tabs */}
            <div className="auth-role-tabs-container">
              <span className="auth-role-tabs-label">Chọn đối tượng đăng ký:</span>
              <div className="auth-role-tabs">
                <button
                  type="button"
                  className={`auth-role-tab-btn ${role === 'student' ? 'active' : ''}`}
                  onClick={() => { setRole('student'); setAlertInfo(null); }}
                >
                  <span>👨‍🎓</span>
                  <span>Học sinh / Sinh viên</span>
                </button>
                <button
                  type="button"
                  className={`auth-role-tab-btn ${role === 'teacher' ? 'active' : ''}`}
                  onClick={() => { setRole('teacher'); setAlertInfo(null); }}
                >
                  <span>👨‍🏫</span>
                  <span>Giảng viên / Cán bộ</span>
                </button>
              </div>
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

            {/* 4. Form Đăng ký */}
            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Field 1: Họ và tên */}
              <div className="auth-form-group">
                <div className="auth-form-label-row">
                  <label htmlFor="reg-name" className="auth-form-label">
                    Họ và tên
                  </label>
                  <span className="auth-form-tag">Bắt buộc</span>
                </div>
                <div className="auth-input-container">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <input
                    id="reg-name"
                    type="text"
                    className="auth-input-field"
                    placeholder={role === 'student' ? 'Ví dụ: Nguyễn Văn An' : 'Ví dụ: TS. Nguyễn Văn An'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Email */}
              <div className="auth-form-group">
                <div className="auth-form-label-row">
                  <label htmlFor="reg-email" className="auth-form-label">
                    {role === 'student' ? 'Email học viện / cá nhân' : 'Email công vụ / học viện'}
                  </label>
                  <span className="auth-form-tag blue">Xác minh OTP</span>
                </div>
                <div className="auth-input-container">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <input
                    id="reg-email"
                    type="email"
                    className="auth-input-field"
                    placeholder={
                      role === 'student'
                        ? 'nguyenvanan@hubt.edu.vn hoặc @gmail.com'
                        : 'gv.nguyenan@hubt.edu.vn'
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="auth-field-hint">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0051D5" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span>
                    {role === 'student'
                      ? 'Ưu tiên sử dụng email trường cấp (.edu.vn) để tự động duyệt hồ sơ'
                      : 'Giảng viên sử dụng email trường để nhận quyền quản lý đề thi'}
                  </span>
                </div>
              </div>

              {/* Field 3: Mã số SV hoặc Mã Giảng viên */}
              <div className="auth-form-group">
                <div className="auth-form-label-row">
                  <label htmlFor="reg-code" className="auth-form-label">
                    {role === 'student' ? 'Mã số sinh viên / CCCD' : 'Mã số Giảng viên / Cán bộ (MGV)'}
                  </label>
                  <span className="auth-form-tag">{role === 'student' ? 'Duyệt tự động' : 'Xác thực'}</span>
                </div>
                <div className="auth-input-container">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                      <line x1="7" y1="8" x2="17" y2="8"></line>
                      <line x1="7" y1="12" x2="13" y2="12"></line>
                      <circle cx="15.5" cy="14.5" r="1.5"></circle>
                    </svg>
                  </span>
                  <input
                    id="reg-code"
                    type="text"
                    className="auth-input-field"
                    placeholder={role === 'student' ? 'VD: 21020015 hoặc Căn cước công dân' : 'VD: MGV-10822 hoặc Mã cán bộ'}
                    value={identifierCode}
                    onChange={(e) => setIdentifierCode(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Field phụ cho Giảng viên: Khoa / Bộ môn */}
              {role === 'teacher' && (
                <div className="auth-form-group">
                  <div className="auth-form-label-row">
                    <label htmlFor="reg-dept" className="auth-form-label">
                      Khoa / Viện / Bộ môn
                    </label>
                  </div>
                  <div className="auth-input-container">
                    <span className="auth-input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </span>
                    <input
                      id="reg-dept"
                      type="text"
                      className="auth-input-field"
                      placeholder="VD: Khoa Công nghệ thông tin - Bộ môn Phần mềm"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Field 4: Mật khẩu */}
              <div className="auth-form-group">
                <div className="auth-form-label-row">
                  <label htmlFor="reg-pass" className="auth-form-label">
                    Mật khẩu
                  </label>
                  <span className="auth-form-tag">
                    {passwordStrength === 0 && 'Độ mạnh'}
                    {passwordStrength === 1 && 'Yếu'}
                    {passwordStrength === 2 && 'Trung bình'}
                    {passwordStrength === 3 && 'Khá'}
                    {passwordStrength === 4 && 'Rất mạnh'}
                  </span>
                </div>
                <div className="auth-input-container">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    id="reg-pass"
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input-field"
                    placeholder="Tối thiểu 8 ký tự, có số và ký tự đặc biệt"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-btn-toggle-password"
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

                {/* Thanh 4 mức độ đo độ mạnh mật khẩu */}
                <div className="auth-strength-bar-wrap">
                  <div className={`auth-strength-segment ${passwordStrength >= 1 ? (passwordStrength === 1 ? 'active-weak' : passwordStrength === 2 ? 'active-fair' : passwordStrength === 3 ? 'active-good' : 'active-strong') : ''}`}></div>
                  <div className={`auth-strength-segment ${passwordStrength >= 2 ? (passwordStrength === 2 ? 'active-fair' : passwordStrength === 3 ? 'active-good' : 'active-strong') : ''}`}></div>
                  <div className={`auth-strength-segment ${passwordStrength >= 3 ? (passwordStrength === 3 ? 'active-good' : 'active-strong') : ''}`}></div>
                  <div className={`auth-strength-segment ${passwordStrength >= 4 ? 'active-strong' : ''}`}></div>
                </div>
              </div>

              {/* Field 5: Xác nhận mật khẩu */}
              <div className="auth-form-group">
                <div className="auth-form-label-row">
                  <label htmlFor="reg-confirm" className="auth-form-label">
                    Xác nhận mật khẩu *
                  </label>
                </div>
                <div className="auth-input-container">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    id="reg-confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="auth-input-field"
                    placeholder="Nhập lại mật khẩu vừa tạo"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-btn-toggle-password"
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

              {/* Checkbox Thỏa thuận điều khoản */}
              <label className="auth-remember-label" style={{ alignItems: 'flex-start', marginTop: '2px' }}>
                <input
                  type="checkbox"
                  className="auth-remember-checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  style={{ marginTop: '3px' }}
                />
                <span className="auth-remember-text" style={{ fontSize: '12.5px', lineHeight: '18px' }}>
                  Tôi cam kết thông tin học thuật trên là chính xác và tuân thủ Quy chế thi trực tuyến EduQuiz.
                </span>
              </label>

              {/* Submit button */}
              <button
                type="submit"
                className="btn-auth-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Đang xử lý đăng ký...</span>
                ) : (
                  <>
                    <span>Đăng ký tài khoản {role === 'student' ? 'Học viên' : 'Giảng viên'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Phân cách Social SSO */}
            <div className="auth-social-divider">
              <div className="auth-divider-line"></div>
              <span className="auth-divider-badge">HOẶC ĐĂNG KÝ VỚI</span>
            </div>

            {/* Hàng nút SSO */}
            <div className="auth-sso-row">
              <button
                type="button"
                className="btn-auth-sso"
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

              <button
                type="button"
                className="btn-auth-sso"
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
          </div>

          {/* Footer chuyển sang Đăng nhập */}
          <div className="auth-footer-strip">
            <span>Đã có tài khoản {role === 'student' ? 'học viên' : 'giảng viên'}?</span>
            <Link to="/login" className="auth-footer-link">
              <span>Đăng nhập ngay</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>

        {/* Chân trang bảo đảm học thuật */}
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
              <span>Chuẩn Bộ GD&ĐT</span>
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

