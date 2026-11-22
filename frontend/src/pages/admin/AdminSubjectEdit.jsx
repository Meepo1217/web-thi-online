import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './admin-subject-edit.css';

// Dữ liệu mẫu chuẩn xác từ Figma Spec
const DEFAULT_SUBJECT = {
  id: 'IT4043',
  code: 'IT4043',
  name: 'Học máy',
  teacher: 'TS. Nguyễn Hoàng Nam',
  teacherInitials: 'NN',
  description:
    'Môn học trang bị cho sinh viên kiến thức nền tảng về học máy bao gồm học có giám sát, học không giám sát, xử lý dữ liệu và xây dựng mô hình dự báo với Python.',
};

export default function AdminSubjectEdit() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ ...DEFAULT_SUBJECT });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      showToast('Vui lòng điền đầy đủ tên môn học và mã học phần.');
      return;
    }
    showToast(`Đã lưu thay đổi cho môn học ${formData.code} thành công!`);
    setTimeout(() => {
      navigate(`/admin/subjects/${subjectId || formData.id}`);
    }, 1200);
  };

  return (
    <div
      style={{
        padding: '32px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Toast thông báo */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#0B1C30',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            zIndex: 9999,
            fontSize: '13.5px',
            fontWeight: 500,
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Breadcrumb quay lại */}
      <div style={{ width: '786px', maxWidth: '100%' }}>
        <Link
          to={`/admin/subjects/${subjectId || formData.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#2563EB',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Quay lại thông tin môn học</span>
        </Link>
      </div>

      {/* Thẻ 786px theo đúng Figma */}
      <div className="edit-subject-card">
        {/* Top subtle accent bar */}
        <div className="edit-subject-accent-bar" />

        {/* 1. Header (36px) */}
        <div className="edit-subject-header">
          <h2 className="edit-subject-title">Chỉnh sửa môn học</h2>
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
              onClick={() => navigate(`/admin/subjects/${subjectId || formData.id}`)}
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

