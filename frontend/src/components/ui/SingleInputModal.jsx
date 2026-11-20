import React, { useState, useEffect, useRef } from 'react';
import { IconClose, IconFolder, IconEdit, IconPlus } from './icons';
import './single-input-modal.css';

/**
 * SingleInputModal
 * Popup dùng chung cho các tác vụ thêm mới hoặc chỉnh sửa 1 trường dữ liệu:
 * - Thêm chương học mới
 * - Sửa tên chương
 * - Đổi tên môn học
 * - Thêm nhãn / tag / danh mục
 *
 * Props:
 * @param {boolean} isOpen - Trạng thái hiển thị popup
 * @param {string} title - Tiêu đề popup (VD: "Thêm chương mới", "Đổi tên môn")
 * @param {string} subtitle - Mô tả phụ bên dưới tiêu đề
 * @param {string} label - Nhãn của ô nhập (VD: "TÊN CHƯƠNG HỌC")
 * @param {string} placeholder - Placeholder gợi ý
 * @param {string} defaultValue - Giá trị mặc định (khi sửa)
 * @param {string} confirmText - Chữ hiển thị nút xác nhận (Mặc định: "Xác nhận")
 * @param {string} cancelText - Chữ hiển thị nút hủy (Mặc định: "Hủy bỏ")
 * @param {string} iconType - Loại icon: 'plus' | 'edit' | 'folder' (Mặc định: 'folder')
 * @param {Function} onConfirm - Callback khi xác nhận thành công: (value) => void
 * @param {Function} onClose - Callback khi đóng popup
 */
export default function SingleInputModal({
  isOpen,
  title = 'Nhập thông tin',
  subtitle = 'Vui lòng nhập giá trị để tiếp tục',
  label = 'NỘI DUNG',
  placeholder = 'Nhập tại đây...',
  defaultValue = '',
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  iconType = 'folder',
  onConfirm,
  onClose,
}) {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Khi modal mở lên, đồng bộ giá trị mặc định và tự động focus vào input
  useEffect(() => {
    if (isOpen) {
      setValue(defaultValue || '');
      setError('');
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 50);
    }
  }, [isOpen, defaultValue]);

  // Đóng modal khi bấm phím Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Vui lòng không để trống trường này.');
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    setError('');
    onConfirm(trimmed);
  };

  const renderIcon = () => {
    switch (iconType) {
      case 'plus':
        return <IconPlus width={16} height={16} color="#0051D5" />;
      case 'edit':
        return <IconEdit width={15} height={15} color="#0051D5" />;
      case 'folder':
      default:
        return <IconFolder width={16} height={14} color="#0051D5" />;
    }
  };

  return (
    <div className="sim-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="sim-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sim-header">
          <div className="sim-header-left">
            <div className="sim-icon-box">{renderIcon()}</div>
            <div>
              <h3 className="sim-title">{title}</h3>
              {subtitle && <p className="sim-subtitle">{subtitle}</p>}
            </div>
          </div>

          <button
            type="button"
            className="sim-close-btn"
            onClick={onClose}
            title="Đóng (Esc)"
          >
            <IconClose width={12} height={12} color="#76777D" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="sim-form">
          <div className="sim-body">
            {label && <label className="sim-label">{label}</label>}
            <input
              ref={inputRef}
              type="text"
              className={`sim-input ${error ? 'is-invalid' : ''}`}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError('');
              }}
              placeholder={placeholder}
            />
            {error && <span className="sim-error-text">{error}</span>}
          </div>

          {/* Footer Actions */}
          <div className="sim-footer">
            <button
              type="button"
              className="sim-btn-cancel"
              onClick={onClose}
            >
              {cancelText}
            </button>

            <button
              type="submit"
              className="sim-btn-confirm"
            >
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
