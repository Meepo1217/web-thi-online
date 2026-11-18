import React, { useState, useEffect, useRef } from 'react';
import {
  IconClose,
  IconFolder,
  IconPlus,
} from '../../../../components/ui/icons';
import './create-folder-modal.css';

const PRESET_COLORS = [
  { id: 'blue', color: '#0051D5', label: 'Xanh dương' },
  { id: 'navy', color: '#131B2E', label: 'Xanh navy' },
  { id: 'green', color: '#069669', label: 'Xanh lá' },
  { id: 'purple', color: '#7C3AED', label: 'Tím đậm' },
  { id: 'amber', color: '#D97706', label: 'Cam vàng' },
  { id: 'slate', color: '#565E74', label: 'Xám thép' },
];

/**
 * CreateFolderModal
 * Popup tạo thư mục môn học mới với các trường cơ bản:
 * - Tên môn học / thư mục
 * - Mã môn học (Ký hiệu)
 * - Khối lớp / Hệ đào tạo
 * - Mô tả ngắn
 * - Màu sắc nhận diện
 */
export default function CreateFolderModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [grade, setGrade] = useState('Khối 12');
  const [description, setDescription] = useState('');
  const [accentColor, setAccentColor] = useState('#0051D5');
  const [errors, setErrors] = useState({});

  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setCode('');
      setGrade('Khối 12');
      setDescription('');
      setAccentColor('#0051D5');
      setErrors({});
      setTimeout(() => {
        if (titleInputRef.current) {
          titleInputRef.current.focus();
        }
      }, 50);
    }
  }, [isOpen]);

  // Đóng khi bấm phím Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Vui lòng nhập tên thư mục môn học.';
    }
    if (!code.trim()) {
      errs.code = 'Vui lòng nhập mã môn học.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const folderId = code.trim().toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4);
    const newFolder = {
      id: folderId,
      code: code.trim().toUpperCase(),
      grade: grade,
      title: title.trim(),
      description: description.trim() || 'Ngân hàng câu hỏi chuyên đề mới khởi tạo',
      totalQuestions: '0',
      authorInitial: title.trim().charAt(0).toUpperCase() || 'M',
      authorBg: accentColor,
      authorName: 'Bạn (Giảng viên)',
      accentColor: accentColor,
      badgeBg: '#EFF4FF',
      badgeColor: accentColor,
      iconBg: '#EFF4FF',
      iconColor: accentColor,
    };

    onSubmit(newFolder);
  };

  return (
    <div className="sim-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cfm-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Top colored accent indicator */}
        <div className="cfm-accent-bar" style={{ backgroundColor: accentColor }} />

        {/* Modal Header */}
        <div className="cfm-header">
          <div className="cfm-header-left">
            <div className="cfm-icon-box" style={{ backgroundColor: `${accentColor}1A` }}>
              <IconFolder width={20} height={18} color={accentColor} />
            </div>
            <div>
              <h3 className="cfm-title">Tạo thư mục môn học mới</h3>
              <p className="cfm-subtitle">
                Nhập thông tin cơ bản để khởi tạo ngăn chứa câu hỏi chuyên môn
              </p>
            </div>
          </div>

          <button
            type="button"
            className="cfm-close-btn"
            onClick={onClose}
            title="Đóng (Esc)"
          >
            <IconClose width={12} height={12} color="#76777D" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="cfm-form">
          <div className="cfm-body">
            {/* Field 1: Tên môn học */}
            <div className="cfm-form-group">
              <label className="cfm-label">
                TÊN THƯ MỤC / MÔN HỌC <span className="cfm-required">*</span>
              </label>
              <input
                ref={titleInputRef}
                type="text"
                className={`cfm-input ${errors.title ? 'is-invalid' : ''}`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
                }}
                placeholder="VD: Toán học THPT, Lập trình Web, Vật lý 12..."
              />
              {errors.title && <span className="cfm-error-text">{errors.title}</span>}
            </div>

            {/* Row 2: Mã môn + Khối lớp */}
            <div className="cfm-form-row">
              <div className="cfm-form-group cfm-col-half">
                <label className="cfm-label">
                  MÃ MÔN HỌC <span className="cfm-required">*</span>
                </label>
                <input
                  type="text"
                  className={`cfm-input ${errors.code ? 'is-invalid' : ''}`}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (errors.code) setErrors((prev) => ({ ...prev, code: '' }));
                  }}
                  placeholder="VD: MATH, PHYS, IT..."
                />
                {errors.code && <span className="cfm-error-text">{errors.code}</span>}
              </div>

              <div className="cfm-form-group cfm-col-half">
                <label className="cfm-label">KHỐI LỚP / HỆ ĐÀO TẠO</label>
                <select
                  className="cfm-select"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="Khối 10">Khối 10</option>
                  <option value="Khối 11">Khối 11</option>
                  <option value="Khối 12">Khối 12</option>
                  <option value="Đại học">Đại học / Cao đẳng</option>
                  <option value="Chuyên sâu">Chuyên sâu / Khác</option>
                </select>
              </div>
            </div>

            {/* Field 3: Mô tả */}
            <div className="cfm-form-group">
              <label className="cfm-label">MÔ TẢ NGẮN GỌN</label>
              <textarea
                className="cfm-textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="VD: Kho câu hỏi Giải tích, Hình học không gian ma trận THPT..."
              />
            </div>

            {/* Field 4: Chọn màu nhận diện */}
            <div className="cfm-form-group">
              <label className="cfm-label">MÀU SẮC NHẬN DIỆN THƯ MỤC</label>
              <div className="cfm-color-palette">
                {PRESET_COLORS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`cfm-color-dot ${accentColor === item.color ? 'is-active' : ''}`}
                    style={{ backgroundColor: item.color }}
                    onClick={() => setAccentColor(item.color)}
                    title={item.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="cfm-footer">
            <button
              type="button"
              className="cfm-btn-cancel"
              onClick={onClose}
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              className="cfm-btn-submit"
            >
              <IconPlus width={14} height={14} color="#FFFFFF" />
              <span>Tạo thư mục</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
