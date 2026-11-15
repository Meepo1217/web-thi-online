import React from 'react';
import { IconCheck } from '../../../../components/ui/icons';

/**
 * EditFloatingActionBar
 * Thanh điều khiển nổi cố định dưới đáy màn hình (Bottom Floating Action Bar):
 * - Trạng thái tự động lưu (Auto-saved indicator)
 * - Nút Hủy thay đổi
 * - Nút Cập nhật câu hỏi (Primary button)
 */
export default function EditFloatingActionBar({
  autoSaveTime,
  onCancel,
  onSave,
  isSaving,
}) {
  return (
    <aside className="qe-floating-bar-wrapper">
      <div className="qe-floating-bar-container">
        {/* Left: Auto-save status */}
        <div className="qe-floating-status">
          <span className="qe-status-dot-pulse" />
          <span className="qe-status-text">
            Đã lưu tự động lúc {autoSaveTime}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="qe-floating-actions">
          <button
            type="button"
            className="qe-floating-btn-cancel"
            onClick={onCancel}
          >
            Hủy thay đổi
          </button>

          <button
            type="button"
            className="qe-floating-btn-save"
            onClick={onSave}
            disabled={isSaving}
          >
            <IconCheck width={14} height={14} color="#FFFFFF" />
            <span>{isSaving ? 'Đang cập nhật...' : 'Cập nhật câu hỏi'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
