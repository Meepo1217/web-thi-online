import React, { useState, useRef } from 'react';
import {
  IconUser,
  IconCheck,
  IconCamera,
  IconSave,
} from '../../../components/ui/icons';

const AVATAR_COLORS = [
  '#0051D5', // Deep Blue
  '#2563EB', // Blue
  '#0D9488', // Teal
  '#059669', // Emerald
  '#7C3AED', // Purple
  '#EA580C', // Orange
  '#BE185D', // Pink
  '#334155', // Slate
];

/**
 * TabProfile - Quản lý thông tin cá nhân & hồ sơ giảng viên
 */
export default function TabProfile({
  profileData,
  onSave,
  onReset,
}) {
  const [formData, setFormData] = useState({ ...profileData });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorSelect = (color) => {
    setFormData((prev) => ({
      ...prev,
      avatarColor: color,
      avatarImg: '', // Nếu chọn màu thì bỏ ảnh tùy biến
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          avatarImg: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      avatarImg: '',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSave(formData);
      setIsSubmitting(false);
    }, 200);
  };

  const getInitials = (name) => {
    if (!name) return 'GV';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="ts-card">
        <div className="ts-card-header">
          <div className="ts-card-title-group">
            <h3 className="ts-card-title">Hồ sơ cá nhân & Thông tin giảng viên</h3>
            <p className="ts-card-subtitle">
              Cập nhật thông tin nhận diện giảng viên trên toàn bộ hệ thống thi trực tuyến
            </p>
          </div>
        </div>

        {/* Khối chỉnh sửa Avatar */}
        <div className="ts-avatar-banner">
          <div
            className="ts-avatar-preview-box"
            style={{
              background: formData.avatarColor || '#0051D5',
            }}
          >
            {formData.avatarImg ? (
              <img
                src={formData.avatarImg}
                alt="Avatar giảng viên"
                className="ts-avatar-img"
              />
            ) : (
              <span>{getInitials(formData.name)}</span>
            )}
          </div>

          <div className="ts-avatar-actions">
            <div className="ts-avatar-btns">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="ts-btn-upload"
                onClick={() => fileInputRef.current?.click()}
              >
                <IconCamera width={14} height={14} color="#FFFFFF" />
                <span>Tải ảnh đại diện</span>
              </button>

              {formData.avatarImg && (
                <button
                  type="button"
                  className="ts-btn-remove-avatar"
                  onClick={handleRemovePhoto}
                >
                  Gỡ ảnh
                </button>
              )}
            </div>

            <div className="ts-avatar-hint">
              Hỗ trợ PNG, JPG, WEBP tối đa 5MB. Hoặc chọn màu nền nhận diện:
            </div>

            <div className="ts-color-swatches">
              {AVATAR_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`ts-color-dot ${formData.avatarColor === color && !formData.avatarImg ? 'active' : ''}`}
                  style={{ background: color }}
                  onClick={() => handleColorSelect(color)}
                  title={`Chọn mã màu: ${color}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Lưới các trường thông tin */}
        <div className="ts-form-grid">
          {/* Họ và tên */}
          <div className="ts-form-group">
            <label className="ts-form-label">
              <span>Họ và tên giảng viên *</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="ts-form-input"
              placeholder="VD: ThS. Nguyễn Văn A"
            />
          </div>

          {/* Mã cán bộ / Giảng viên */}
          <div className="ts-form-group">
            <label className="ts-form-label">
              <span>Mã cán bộ / Giảng viên</span>
              <span className="ts-form-label-tag">Đã xác thực</span>
            </label>
            <input
              type="text"
              name="teacherId"
              readOnly
              value={formData.teacherId || 'GV2024-MATH01'}
              className="ts-form-input font-mono"
              title="Mã giảng viên do ban quản trị cấp cố định"
            />
            <span className="ts-form-help">Mã định danh cán bộ do Nhà trường cấp cố định.</span>
          </div>

          {/* Học hàm / Học vị */}
          <div className="ts-form-group">
            <label className="ts-form-label">
              <span>Học hàm / Học vị *</span>
            </label>
            <select
              name="degree"
              value={formData.degree || 'Thạc sĩ (ThS.)'}
              onChange={handleChange}
              className="ts-form-select"
            >
              <option value="Thạc sĩ (ThS.)">Thạc sĩ (ThS.)</option>
              <option value="Tiến sĩ (TS.)">Tiến sĩ (TS.)</option>
              <option value="Phó Giáo sư (PGS.TS)">Phó Giáo sư (PGS.TS)</option>
              <option value="Giáo sư (GS.TS)">Giáo sư (GS.TS)</option>
              <option value="Cử nhân / Kỹ sư">Cử nhân / Kỹ sư</option>
              <option value="Giảng viên chính">Giảng viên chính</option>
            </select>
          </div>

          {/* Tổ chuyên môn / Bộ môn */}
          <div className="ts-form-group">
            <label className="ts-form-label">
              <span>Bộ môn / Tổ chuyên môn *</span>
            </label>
            <input
              type="text"
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="ts-form-input"
              placeholder="VD: Tổ Toán học THPT"
            />
          </div>

          {/* Email công tác */}
          <div className="ts-form-group">
            <label className="ts-form-label">
              <span>Email công tác *</span>
              <span className="ts-form-label-tag">Chính thức</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="ts-form-input"
              placeholder="teacher@hubt.edu.vn"
            />
            <span className="ts-form-help">Dùng để nhận báo cáo ca thi và khôi phục tài khoản.</span>
          </div>

          {/* Số điện thoại */}
          <div className="ts-form-group">
            <label className="ts-form-label">
              <span>Số điện thoại liên hệ *</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="ts-form-input"
              placeholder="0987 654 321"
            />
          </div>

          {/* Giới tính */}
          <div className="ts-form-group">
            <label className="ts-form-label">
              <span>Giới tính</span>
            </label>
            <select
              name="gender"
              value={formData.gender || 'Nam'}
              onChange={handleChange}
              className="ts-form-select"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          {/* Ngày sinh */}
          <div className="ts-form-group">
            <label className="ts-form-label">
              <span>Ngày sinh</span>
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate || '1985-08-15'}
              onChange={handleChange}
              className="ts-form-input"
            />
          </div>

          {/* Giới thiệu tóm tắt / Bio */}
          <div className="ts-form-group col-full">
            <label className="ts-form-label">
              <span>Giới thiệu chuyên môn & Hướng nghiên cứu</span>
            </label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              className="ts-form-textarea"
              placeholder="Mô tả kinh nghiệm giảng dạy, môn phụ trách, đề tài nghiên cứu..."
            />
          </div>
        </div>

        {/* Nút hành động chân trang */}
        <div className="ts-card-footer">
          <button
            type="button"
            className="ts-btn-secondary"
            onClick={() => {
              setFormData({ ...profileData });
              if (onReset) onReset();
            }}
          >
            Hủy thay đổi
          </button>

          <button
            type="submit"
            className="ts-btn-primary"
            disabled={isSubmitting}
          >
            <IconSave width={14} height={14} color="#FFFFFF" />
            <span>{isSubmitting ? 'Đang lưu...' : 'Lưu thông tin hồ sơ'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
