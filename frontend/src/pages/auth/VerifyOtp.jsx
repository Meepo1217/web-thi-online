import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './verify-otp.css';

/**
 * VerifyOtp - Trang Nhập mã xác thực OTP (Bước 2 của Đăng ký)
 * Chuẩn Figma pixel-perfect (Auto Layout 512px, Stepper 3 bước, 6 ô PIN)
 */
export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  // Đọc email & role từ query parameters hoặc state
  const queryParams = new URLSearchParams(location.search);
  const targetEmail = queryParams.get('email') || 'sv21020015@eduquiz.vn';
  const userRole = queryParams.get('role') || 'student';

  // Quản lý 6 ô nhập mã PIN
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  // Bộ đếm ngược thời gian gửi lại OTP (59 giây)
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  // Khởi động đếm ngược
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Tự động focus vào ô đầu tiên khi trang mở
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Xử lý khi gõ từng ký tự vào ô số
  const handleDigitChange = (index, value) => {
    // Chỉ nhận ký tự số
    const cleanVal = value.replace(/[^0-9]/g, '');

    const newDigits = [...digits];
    newDigits[index] = cleanVal ? cleanVal[cleanVal.length - 1] : '';
    setDigits(newDigits);

    // Nếu vừa nhập xong, tự động nhảy sang ô tiếp theo
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Xử lý phím Backspace để lùi về ô trước
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Hỗ trợ dán (Paste) mã 6 chữ số
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^[0-9]{6}$/.test(pastedData)) {
      const newDigits = pastedData.split('');
      setDigits(newDigits);
      inputRefs.current[5]?.focus();
    }
  };

  // Xử lý gửi lại mã OTP
  const handleResend = () => {
    if (!canResend) return;
    setDigits(['', '', '', '', '', '']);
    setCountdown(59);
    setCanResend(false);
    setAlertInfo({
      type: 'success',
      message: 'Mã xác thực OTP mới đã được gửi tới email của bạn!'
    });
    inputRefs.current[0]?.focus();
  };

  // Xử lý xác nhận OTP
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = digits.join('');

    if (enteredOtp.length < 6) {
      setAlertInfo({
        type: 'error',
        message: 'Vui lòng nhập đầy đủ mã OTP gồm 6 chữ số.'
      });
      return;
    }

    setIsLoading(true);
    setAlertInfo(null);

    // Giả lập xác thực OTP
    setTimeout(() => {
      setIsLoading(false);
      setAlertInfo({
        type: 'success',
        message: 'Xác thực OTP thành công! Tài khoản của bạn đã được kích hoạt.'
      });

      setTimeout(() => {
        if (userRole === 'teacher') {
          navigate('/teacher/dashboard');
        } else {
          navigate('/student');
        }
      }, 800);
    }, 700);
  };

  const isFormComplete = digits.every((d) => d !== '');

  return (
    <div className="otp-page-wrapper">
      <div className="otp-main-card">
        {/* 1. Stepper Navigation: Tiến trình 3 bước chuẩn Figma */}
        <div className="otp-stepper-wrap">
          <div className="otp-stepper-line-bg"></div>
          <div className="otp-stepper-line-active"></div>

          {/* Bước 1: Hoàn thành */}
          <div className="otp-step-item completed">
            <div className="otp-step-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="otp-step-label">Đăng ký</span>
          </div>

          {/* Bước 2: Đang thực hiện (Active) */}
          <div className="otp-step-item active">
            <div className="otp-step-circle">2</div>
            <span className="otp-step-label">Xác thực OTP</span>
          </div>

          {/* Bước 3: Chưa thực hiện */}
          <div className="otp-step-item upcoming">
            <div className="otp-step-circle">3</div>
            <span className="otp-step-label">Hoàn tất</span>
          </div>
        </div>

        {/* 2. Security Emblem Icon */}
        <div className="otp-security-emblem">
          <svg width="24" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <polyline points="9 12 11 14 15 10"></polyline>
          </svg>
        </div>

        {/* 3. Tag Badge */}
        <div className="otp-tag-badge">
          <span className="otp-tag-dot"></span>
          <span className="otp-tag-text">Xác minh danh tính học thuật</span>
        </div>

        {/* 4. Heading 1 - Title */}
        <h1 className="otp-heading-title">Nhập mã xác thực OTP</h1>

        {/* 5. Description & Email Chip */}
        <div className="otp-desc-container">
          <p className="otp-desc-text">Mã xác thực gồm 6 chữ số đã được gửi tới hòm thư:</p>
          <div className="otp-email-chip">
            <span className="otp-email-text">{targetEmail}</span>
            <Link to="/register" className="btn-otp-change-email" title="Đổi email khác">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </Link>
          </div>
          <p className="otp-desc-subhint">Vui lòng kiểm tra hòm thư chính hoặc mục Thư rác (Spam)</p>
        </div>

        {/* Thông báo Alert */}
        {alertInfo && (
          <div
            style={{
              width: '448px',
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
              marginBottom: '16px',
              boxSizing: 'border-box'
            }}
          >
            <span>{alertInfo.type === 'error' ? '⚠️' : '✅'}</span>
            <span>{alertInfo.message}</span>
          </div>
        )}

        {/* 6. Form OTP (6 ô nhập số độc lập) */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div className="otp-inputs-row" onPaste={handlePaste}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`otp-digit-input ${digit ? 'filled' : ''}`}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoComplete="off"
              />
            ))}
          </div>

          {/* 7. Resend & Countdown Section */}
          <div className="otp-resend-section">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {countdown > 0 ? (
              <span>
                Gửi lại mã sau:{' '}
                <strong className="otp-countdown-val">
                  00:{countdown < 10 ? `0${countdown}` : countdown}
                </strong>
              </span>
            ) : (
              <span>
                Không nhận được mã?{' '}
                <button type="button" onClick={handleResend} className="btn-otp-resend">
                  Gửi lại mã ngay
                </button>
              </span>
            )}
          </div>

          {/* 8. Nút bấm Xác thực */}
          <button
            type="submit"
            className="btn-otp-submit"
            disabled={isLoading || !isFormComplete}
          >
            {isLoading ? (
              <span>Đang kiểm tra mã...</span>
            ) : (
              <>
                <span>Xác thực & Kích hoạt</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* 9. Academic Security Advisory Box */}
        <div className="otp-advisory-box">
          <span className="otp-advisory-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </span>
          <p className="otp-advisory-text">
            Mã OTP có hiệu lực trong 5 phút. Tuyệt đối không chia sẻ mã này cho bất kỳ ai, kể cả cán bộ coi thi hoặc quản trị viên hệ thống để đảm bảo tính toàn vẹn kỳ thi.
          </p>
        </div>

        {/* 10. Back Navigation Actions */}
        <div className="otp-back-nav">
          <Link to="/register" className="btn-otp-nav-back">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Quay lại Đăng ký</span>
          </Link>
          <span className="otp-nav-dot"></span>
          <a
            href="#help"
            onClick={(e) => {
              e.preventDefault();
              alert('Nếu không nhận được mã OTP sau 3 lần gửi lại, vui lòng liên hệ Ban Khảo thí qua hotline: 1900-8888 hoặc email: support@eduquiz.vn');
            }}
            className="btn-otp-nav-help"
          >
            Trợ giúp xác thực
          </a>
        </div>

        {/* 11. Trust Footer Notice */}
        <div className="otp-trust-notice">
          <svg width="11" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Hệ thống khảo thí an toàn & bảo mật HUBT EduQuiz</span>
        </div>
      </div>
    </div>
  );
}

