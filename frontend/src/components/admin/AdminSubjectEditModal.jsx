import { useState, useEffect } from 'react';
import '../../pages/admin/admin-subject-edit.css';

export default function AdminSubjectEditModal({
  isOpen,
  onClose,
  subject,
  onSave,
}) {
  const [formData, setFormData] = useState({
    name: 'Học máy',
    code: 'IT4043',
    teacher: 'TS. Nguyễn Hoàng Nam',
    teacherInitials: 'NN',
    description:
      'Môn học trang bị cho sinh viên kiến thức nền tảng về học máy bao gồm học có giám sát, học không giám sát, xử lý dữ liệu và xây dựng mô hình dự báo với Python.',
  });

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name || 'Học máy',
        code: subject.code || 'IT4043',
        teacher: subject.teacher || 'TS. Nguyễn Hoàng Nam',
        teacherInitials: subject.avatarInitials || 'NN',
        description:
          subject.description ||
          'Môn học trang bị cho sinh viên kiến thức nền tảng về học máy bao gồm học có giám sát, học không giám sát, xử lý dữ liệu và xây dựng mô hình dự báo với Python.',
      });
    }
  }, [subject]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      alert('Vui lòng nhập đầy đủ tên môn học và mã học phần.');
      return;
    }
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  return (
    <div className="edit-subject-overlay" onClick={onClose}>
      <div
        className="edit-subject-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top subtle accent bar */}
        <div className="edit-subject-accent-bar" />

        {/* 1. Header (36px) */}
        <div className="edit-subject-header">
          <h2 className="edit-subject-title">Chỉnh sửa môn học</h2>
          <button
            type="button"
            className="btn-close-edit-subject"
            onClick={onClose}
            title="Đóng cửa sổ"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* 2. Form Grid (706x304px) */}
        <form onSubmit={handleSubmit} className="edit-subject-form">
          {/* Row 1: Tên môn học (462.67px) & Mã học phần (219.33px) */}
          <div className="edit-subject-row-1">
            {/* Tên môn học */}
            <div className="edit-subject-field">
              <label className="edit-subject-label">Tên môn học</label>
              <input
                type="text"
                className="edit-subject-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Nhập tên môn học..."
              />
            </div>

            {/* Mã học phần */}
            <div className="edit-subject-field">
              <label className="edit-subject-label">Mã học phần</label>
              <input
                type="text"
                className="edit-subject-input code-input"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
                placeholder="Ví dụ: IT4043"
              />
            </div>
          </div>

          {/* Row 2: Giảng viên phụ trách */}
          <div className="edit-subject-field">
            <label className="edit-subject-label">Trưởng bộ môn / Giảng viên phụ trách</label>
            <div className="edit-subject-teacher-box">
              <div className="edit-subject-teacher-avatar">
                {formData.teacherInitials}
              </div>
              <span className="edit-subject-teacher-name">
                {formData.teacher}
              </span>
            </div>
          </div>

          {/* Row 3: Mô tả môn học */}
          <div className="edit-subject-field">
            <label className="edit-subject-label">Mô tả môn học</label>
            <textarea
              className="edit-subject-textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Nhập mô tả chi tiết môn học..."
              rows={3}
            />
          </div>

          {/* 3. Footer Buttons */}
          <div className="edit-subject-footer">
            <button
              type="button"
              className="btn-edit-subject-cancel"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn-edit-subject-save"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

