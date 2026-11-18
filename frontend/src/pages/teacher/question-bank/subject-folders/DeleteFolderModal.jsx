import React, { useState, useEffect } from 'react';
import {
  IconAlertTriangle,
  IconFolder,
  IconQuestions,
  IconTrash,
  IconClose,
} from '../../../../components/ui/icons';
import '../question-delete/question-delete.css';

/**
 * DeleteFolderModal
 * Popup xác nhận xóa vĩnh viễn thư mục môn học
 * Thiết kế chuẩn Figma tương đồng với QuestionDeleteModal
 */
export default function DeleteFolderModal({
  isOpen,
  folder,
  foldersList = [],
  onFolderChange,
  onConfirm,
  onCancel,
  isDeleting = false,
}) {
  const [isSafetyChecked, setIsSafetyChecked] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(folder?.id || '');

  useEffect(() => {
    if (isOpen) {
      setIsSafetyChecked(false);
      setSelectedFolderId(folder?.id || (foldersList[0]?.id || ''));
    }
  }, [isOpen, folder, foldersList]);

  // Đóng khi bấm phím Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onCancel?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const currentFolder =
    foldersList.find((f) => f.id === selectedFolderId) || folder || {};

  const handleSelectFolder = (e) => {
    const nextId = e.target.value;
    setSelectedFolderId(nextId);
    const found = foldersList.find((f) => f.id === nextId);
    if (found && onFolderChange) {
      onFolderChange(found);
    }
  };

  const handleConfirm = () => {
    if (!isSafetyChecked || isDeleting) return;
    onConfirm?.(currentFolder);
  };

  return (
    <div
      className="qdm-overlay-canvas"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dfm-modal-title"
    >
      <div className="qdm-modal-card">
        {/* 1. Decorative Accent Indicator Top Bar */}
        <div className="qdm-accent-bar" aria-hidden="true" />

        {/* 2. Header & Warning Badge Section */}
        <div className="qdm-header-section">
          {/* Warning Icon Box */}
          <div className="qdm-warning-icon-box">
            <IconAlertTriangle width={24} height={21} color="#BA1A1A" />
          </div>

          {/* Title & Badge */}
          <div className="qdm-header-text-col">
            <div className="qdm-badge-row">
              <span className="qdm-badge-dot" />
              <span className="qdm-badge-text">
                CẢNH BÁO BẢO MẬT & DỮ LIỆU
              </span>
            </div>

            <h2 id="dfm-modal-title" className="qdm-main-heading">
              Xác nhận xóa vĩnh viễn thư mục môn học?
            </h2>
          </div>
        </div>

        {/* Dropdown chọn thư mục nếu danh sách có nhiều môn */}
        {foldersList.length > 1 && (
          <div className="dfm-select-wrapper">
            <label className="dfm-select-label">CHỌN THƯ MỤC CẦN XÓA:</label>
            <select
              className="dfm-folder-select"
              value={selectedFolderId}
              onChange={handleSelectFolder}
            >
              {foldersList.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.title} ({f.code}) • {f.totalQuestions || 0}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 3. Context Body Message */}
        <div className="qdm-context-message">
          <p className="qdm-context-p1">
            <span>Bạn đang chuẩn bị xóa thư mục môn học </span>
            <span className="qdm-code-highlight">"{currentFolder.title || 'Môn học'}"</span>
            <span> ({currentFolder.code || 'MÃ'}).</span>
          </p>
          <p className="qdm-context-p2">
            Toàn bộ các câu hỏi bên trong thư mục này sẽ bị xóa khỏi kho lưu trữ và không thể khôi phục sau khi xác nhận.
          </p>
        </div>

        {/* 4. Impact Assessment Box */}
        <div className="qdm-impact-box">
          <div className="qdm-impact-header">
            <IconAlertTriangle width={13.5} height={13.5} color="#BA1A1A" />
            <span className="qdm-impact-title">
              ĐÁNH GIÁ TÁC ĐỘNG DỮ LIỆU
            </span>
          </div>

          <div className="qdm-impact-matrix">
            <div className="qdm-matrix-row">
              <div className="qdm-matrix-label-wrap">
                <IconQuestions width={14} height={14} color="#45464D" />
                <span className="qdm-matrix-label">
                  Tổng câu hỏi trong thư mục:
                </span>
              </div>
              <span className="qdm-matrix-val">
                {currentFolder.totalQuestions || '0 câu'}
              </span>
            </div>

            <div className="qdm-matrix-row">
              <div className="qdm-matrix-label-wrap">
                <IconFolder width={14} height={14} color="#45464D" />
                <span className="qdm-matrix-label">
                  Khối kiến thức phân loại:
                </span>
              </div>
              <span className="qdm-matrix-val">
                {currentFolder.grade || 'Khối 12'}
              </span>
            </div>
          </div>
        </div>

        {/* 5. Safety Confirmation Checkbox */}
        <label className="qdm-checkbox-label">
          <input
            type="checkbox"
            className="qdm-checkbox-input"
            checked={isSafetyChecked}
            onChange={(e) => setIsSafetyChecked(e.target.checked)}
          />
          <span className="qdm-checkbox-text">
            Tôi hiểu rõ rủi ro và xác nhận muốn xóa vĩnh viễn thư mục môn học này.
          </span>
        </label>

        {/* 6. Action Buttons Footer */}
        <div className="qdm-footer-actions">
          <button
            type="button"
            className="qdm-btn-cancel"
            onClick={onCancel}
          >
            Hủy
          </button>

          <button
            type="button"
            className={`qdm-btn-delete ${isSafetyChecked ? 'is-enabled' : 'is-disabled'}`}
            disabled={!isSafetyChecked || isDeleting}
            onClick={handleConfirm}
          >
            <IconTrash width={12} height={13.5} color="#FFFFFF" />
            <span>{isDeleting ? 'Đang xóa...' : 'Xóa vĩnh viễn'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
