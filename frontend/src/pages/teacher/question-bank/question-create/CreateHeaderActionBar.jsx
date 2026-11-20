import React from 'react';
import {
  IconArrowLeft,
  IconEye,
  IconCheck,
} from '../../../../components/ui/icons';

/**
 * CreateHeaderActionBar - Thanh điều hướng & Cụm nút hành động trên cùng (Figma)
 * Chiều cao 64px, nền trắng, box-shadow, căn chỉnh 2 bên
 */
export default function CreateHeaderActionBar({
  onBack,
  onCancel,
  onPreview,
  onSaveAndAddAnother,
  onSave,
  isSaving = false,
}) {
  return (
    <div className="qc-header-bar-wrapper">
      <header className="qc-header-bar">
        {/* Left: Back Link + Divider + Page Title */}
        <div className="qc-header-left">
          <button
            type="button"
            className="qc-back-link-btn"
            onClick={onBack}
            title="Quay lại danh sách câu hỏi"
          >
            <span className="qc-back-icon">
              <IconArrowLeft width={12} height={12} color="#45464D" />
            </span>
            <span className="qc-back-text">Quay lại</span>
          </button>

          <span className="qc-header-divider" aria-hidden="true" />

          <div className="qc-title-box">
            <h1 className="qc-page-title">Thêm câu hỏi mới</h1>
          </div>
        </div>

        {/* Right: 4 Action Buttons Group */}
        <div className="qc-header-actions">
          {/* Button 1: Hủy */}
          <button
            type="button"
            className="qc-btn qc-btn--cancel"
            onClick={onCancel}
          >
            Hủy
          </button>

          {/* Button 2: Xem trước */}
          <button
            type="button"
            className="qc-btn qc-btn--preview"
            onClick={onPreview}
          >
            <span className="qc-btn-icon">
              <IconEye width={16} height={11} color="#0B1C30" />
            </span>
            <span>Xem trước</span>
          </button>

          {/* Button 3: Lưu & Thêm câu khác */}
          <button
            type="button"
            className="qc-btn qc-btn--secondary-blue"
            onClick={onSaveAndAddAnother}
            disabled={isSaving}
          >
            Lưu & Thêm câu khác
          </button>

          {/* Button 4: Lưu câu hỏi */}
          <button
            type="button"
            className="qc-btn qc-btn--primary"
            onClick={onSave}
            disabled={isSaving}
          >
            <span className="qc-btn-icon">
              <IconCheck width={13} height={13} color="#FFFFFF" />
            </span>
            <span>{isSaving ? 'Đang lưu...' : 'Lưu câu hỏi'}</span>
          </button>
        </div>
      </header>
    </div>
  );
}
