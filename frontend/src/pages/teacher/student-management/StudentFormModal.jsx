import React, { useState, useEffect } from 'react';
import { AVAILABLE_CLASSES, AVAILABLE_GRADES } from './studentData';

const PRESET_AVATAR_COLORS = [
  '#0051D5',
  '#059669',
  '#7C3AED',
  '#D97706',
  '#0891B2',
  '#DB2777',
  '#4F46E5',
];

/**
 * StudentFormModal
 * Modal Thêm mới hoặc Chỉnh sửa thông tin sinh viên
 */
export default function StudentFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: '',
    mssv: '',
    email: '',
    phone: '',
    className: '12A1',
    grade: 'Khối 12',
    gender: 'Nam',
    status: 'active',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          mssv: initialData.mssv || '',
          email: initialData.email || '',
          phone: initialData.phone || '',
          className: initialData.className || '12A1',
          grade: initialData.grade || 'Khối 12',
          gender: initialData.gender || 'Nam',
          status: initialData.status || 'active',
        });
      } else {
        // Sinh ngẫu nhiên MSSV gợi ý
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        setFormData({
          name: '',
          mssv: `SV2102${randomNum}`,
          email: '',
          phone: '',
          className: '12A1',
          grade: 'Khối 12',
          gender: 'Nam',
          status: 'active',
        });
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên sinh viên.';
    }
    if (!formData.mssv.trim()) {
      newErrors.mssv = 'Vui lòng nhập mã sinh viên.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Email không đúng định dạng.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const randomColor =
      PRESET_AVATAR_COLORS[Math.floor(Math.random() * PRESET_AVATAR_COLORS.length)];

    onSubmit({
      ...formData,
      avatarColor: initialData?.avatarColor || randomColor,
    });
  };

  return (
    <div className="ee-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="ee-modal-container st-form-modal-container"
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="student-form-title"
      >
        {/* 1. Modal Header */}
        <div className="ee-modal-header">
          <div className="ee-modal-header-left">
            <h2 id="student-form-title" className="ee-modal-title">
              {isEdit ? 'Chỉnh sửa thông tin sinh viên' : 'Thêm sinh viên mới'}
            </h2>
            <div className="ee-modal-subrow">
              <span className="ee-modal-badge">{isEdit ? 'Cập nhật hồ sơ' : 'Tạo mới hồ sơ'}</span>
              <span className="ee-modal-subtext">
                {isEdit
                  ? `Đang sửa sinh viên: ${initialData?.name} (${initialData?.mssv})`
                  : 'Điền đầy đủ thông tin để ghi nhận sinh viên vào hệ thống'}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="ee-modal-close-btn"
            onClick={onClose}
            aria-label="Đóng popup"
          >
            ✕
          </button>
        </div>

        {/* 2. Modal Body / Form Fields */}
        <form onSubmit={handleSubmit} className="st-form-body">
          <div className="st-form-grid">
            {/* Họ và tên */}
            <div className="st-form-group st-col-span-2">
              <label className="st-form-label">
                Họ và tên sinh viên <span className="st-required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ví dụ: Nguyễn Văn An"
                className={`st-form-input ${errors.name ? 'is-error' : ''}`}
                autoFocus
              />
              {errors.name && <span className="st-error-msg">{errors.name}</span>}
            </div>

            {/* Mã sinh viên (MSSV) */}
            <div className="st-form-group">
              <label className="st-form-label">
                Mã số sinh viên (MSSV) <span className="st-required">*</span>
              </label>
              <input
                type="text"
                name="mssv"
                value={formData.mssv}
                onChange={handleChange}
                placeholder="Ví dụ: SV21020015"
                className={`st-form-input ${errors.mssv ? 'is-error' : ''}`}
              />
              {errors.mssv && <span className="st-error-msg">{errors.mssv}</span>}
            </div>

            {/* Email */}
            <div className="st-form-group">
              <label className="st-form-label">
                Email sinh viên <span className="st-required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="an.nv@eduquiz.vn"
                className={`st-form-input ${errors.email ? 'is-error' : ''}`}
              />
              {errors.email && <span className="st-error-msg">{errors.email}</span>}
            </div>

            {/* Số điện thoại */}
            <div className="st-form-group">
              <label className="st-form-label">Số điện thoại liên hệ</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0912345678"
                className="st-form-input"
              />
            </div>

            {/* Giới tính */}
            <div className="st-form-group">
              <label className="st-form-label">Giới tính</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="st-form-select"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* Lớp học */}
            <div className="st-form-group">
              <label className="st-form-label">Lớp học sinh hoạt</label>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="st-form-select"
              >
                {AVAILABLE_CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Khối lớp */}
            <div className="st-form-group">
              <label className="st-form-label">Khối đào tạo</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="st-form-select"
              >
                {AVAILABLE_GRADES.map((gr) => (
                  <option key={gr} value={gr}>
                    {gr}
                  </option>
                ))}
              </select>
            </div>

            {/* Trạng thái học tập */}
            <div className="st-form-group st-col-span-2">
              <label className="st-form-label">Trạng thái hồ sơ</label>
              <div className="st-status-radios">
                <label className="st-radio-label">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === 'active'}
                    onChange={handleChange}
                  />
                  <span>Đang học tập (Hoạt động bình thường)</span>
                </label>
                <label className="st-radio-label">
                  <input
                    type="radio"
                    name="status"
                    value="reserved"
                    checked={formData.status === 'reserved'}
                    onChange={handleChange}
                  />
                  <span>Bảo lưu kết quả</span>
                </label>
                <label className="st-radio-label">
                  <input
                    type="radio"
                    name="status"
                    value="suspended"
                    checked={formData.status === 'suspended'}
                    onChange={handleChange}
                  />
                  <span>Đình chỉ thi / Tạm dừng</span>
                </label>
              </div>
            </div>
          </div>

          {/* 3. Modal Footer */}
          <div className="ee-modal-footer">
            <span className="ee-modal-footer-hint">
              {isEdit ? 'Dữ liệu được cập nhật ngay vào bảng' : 'Sinh viên sẽ được thêm vào danh sách'}
            </span>

            <div className="ee-modal-footer-actions">
              <button
                type="button"
                className="ee-modal-btn-cancel"
                onClick={onClose}
              >
                Hủy bỏ
              </button>

              <button type="submit" className="ee-modal-btn-submit">
                <span>{isEdit ? 'Lưu thay đổi' : 'Thêm sinh viên'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
