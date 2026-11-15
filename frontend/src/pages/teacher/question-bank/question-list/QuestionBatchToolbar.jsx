import React from 'react';
import {
  IconFolder,
  IconFilter,
  IconExport,
  IconTrash,
  IconCheck,
} from '../../../../components/ui/icons';

/**
 * QuestionBatchToolbar
 * Thanh công cụ thao tác hàng loạt xuất hiện khi có câu hỏi được chọn
 */
export default function QuestionBatchToolbar({
  selectedCount = 0,
  isAllSelected = false,
  onToggleSelectAll,
  onMoveFolder,
  onChangeBloom,
  onExportSelected,
  onDeleteSelected,
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="ql-batch-toolbar">
      {/* Left: Selection count and label */}
      <div className="ql-batch-left">
        <label className="ql-batch-select-label">
          <input
            type="checkbox"
            className="ql-batch-checkbox"
            checked={isAllSelected}
            onChange={onToggleSelectAll}
          />
          <span className="ql-batch-count-text">
            Đã chọn: {selectedCount} câu hỏi
          </span>
        </label>

        <span className="ql-batch-divider" />

        <span className="ql-batch-action-hint">
          Thao tác hàng loạt:
        </span>
      </div>

      {/* Right: Batch Actions */}
      <div className="ql-batch-right">
        <button
          type="button"
          className="ql-batch-btn ql-batch-btn-white"
          onClick={onMoveFolder}
        >
          <IconFolder width={13} height={11} color="#76777D" />
          <span>Chuyển thư mục</span>
        </button>

        <button
          type="button"
          className="ql-batch-btn ql-batch-btn-white"
          onClick={onChangeBloom}
        >
          <IconFilter width={12} height={12} color="#76777D" />
          <span>Thay đổi mức độ</span>
        </button>

        <button
          type="button"
          className="ql-batch-btn ql-batch-btn-white"
          onClick={onExportSelected}
        >
          <IconExport width={13} height={11} color="#76777D" />
          <span>Xuất câu hỏi</span>
        </button>

        <button
          type="button"
          className="ql-batch-btn ql-batch-btn-danger"
          onClick={onDeleteSelected}
        >
          <IconTrash width={11} height={12} color="#93000A" />
          <span>Xóa đã chọn</span>
        </button>
      </div>
    </div>
  );
}
