import React, { useState } from 'react';
import {
  IconLock,
  IconKey,
  IconEye,
} from '../../../components/ui/icons';

/**
 * TabSecurity - Đổi mật khẩu tài khoản giảng viên
 */
export default function TabSecurity({
  onShowAlert,
}) {
  // Trạng thái form mật khẩu
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Toggle hiển thị mật khẩu
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Đánh giá độ mạnh mật khẩu
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, text: 'Chưa nhập', cls: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, text: 'Yếu', cls: 'weak' };
    if (score <= 3) return { score: 2, text: 'Khá an toàn', cls: 'medium' };
    return { score: 3, text: 'Rất mạnh', cls: 'strong' };
  };

  const strength = calculateStrength(newPassword);

  // Xử lý nộp form đổi mật khẩu
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      if (onShowAlert) onShowAlert('error', 'Vui lòng nhập mật khẩu hiện tại.');
      return;
    }
    if (newPassword.length < 6) {
      if (onShowAlert) onShowAlert('error', 'Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }
    if (newPassword !== confirmPassword) {
      if (onShowAlert) onShowAlert('error', 'Xác nhận mật khẩu mới không khớp!');
      return;
    }

    // Giả lập đổi thành công
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    if (onShowAlert) {
      onShowAlert('success', 'Đã đổi mật khẩu tài khoản thành công! Vui lòng ghi nhớ mật khẩu mới.');
    }
  };

  return (
    <div className="ts-security-wrapper">
      {/* Card Đổi Mật Khẩu */}
      <div className="ts-card">
        <div className="ts-card-header">
          <div className="ts-card-title-group">
            <h3 className="ts-card-title">Đổi mật khẩu đăng nhập</h3>
            <p className="ts-card-subtitle">
              Nên sử dụng mật khẩu mạnh kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit}>
          <div className="ts-form-grid">
            {/* Mật khẩu hiện tại */}
            <div className="ts-form-group col-full">
              <label className="ts-form-label">
                <span>Mật khẩu hiện tại *</span>
              </label>
              <div className="ts-input-icon-wrap">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Nhập mật khẩu bạn đang sử dụng..."
                  className="ts-form-input"
                />
                <button
                  type="button"
                  className="ts-input-toggle-btn"
                  onClick={() => setShowCurrent(!showCurrent)}
                  title={showCurrent ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  <IconEye width={16} height={16} color="#64748B" />
                </button>
              </div>
            </div>

            {/* Mật khẩu mới */}
            <div className="ts-form-group">
              <label className="ts-form-label">
                <span>Mật khẩu mới *</span>
              </label>
              <div className="ts-input-icon-wrap">
                <input
                  type={showNew ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mật khẩu mới ít nhất 8 ký tự..."
                  className="ts-form-input"
                />
                <button
                  type="button"
                  className="ts-input-toggle-btn"
                  onClick={() => setShowNew(!showNew)}
                  title={showNew ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  <IconEye width={16} height={16} color="#64748B" />
                </button>
              </div>

              {/* Thanh đo độ mạnh mật khẩu */}
              {newPassword && (
                <div className="ts-strength-box">
                  <div className="ts-strength-bars">
                    <div className={`ts-strength-bar ${strength.score >= 1 ? strength.cls : ''}`} />
                    <div className={`ts-strength-bar ${strength.score >= 2 ? strength.cls : ''}`} />
                    <div className={`ts-strength-bar ${strength.score >= 3 ? strength.cls : ''}`} />
                  </div>
                  <span className="ts-strength-text">
                    Độ an toàn: <strong>{strength.text}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Xác nhận mật khẩu mới */}
            <div className="ts-form-group">
              <label className="ts-form-label">
                <span>Xác nhận mật khẩu mới *</span>
              </label>
              <div className="ts-input-icon-wrap">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới..."
                  className="ts-form-input"
                />
                <button
                  type="button"
                  className="ts-input-toggle-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                  title={showConfirm ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  <IconEye width={16} height={16} color="#64748B" />
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <span className="ts-form-help" style={{ color: '#BA1A1A' }}>
                  ✕ Mật khẩu xác nhận chưa trùng khớp.
                </span>
              )}
            </div>
          </div>

          <div className="ts-card-footer">
            <button type="submit" className="ts-btn-primary">
              <IconKey width={14} height={14} color="#FFFFFF" />
              <span>Cập nhật mật khẩu mới</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
