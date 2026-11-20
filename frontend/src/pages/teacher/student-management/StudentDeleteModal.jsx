import React from 'react';
import { IconTrash } from '../../../components/ui/icons';

/**
 * StudentDeleteModal
 * Popup xác nhận xóa sinh viên khỏi danh sách
 */
export default function StudentDeleteModal({
  isOpen,
  student = null,
  selectedCount = 1,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  const isBatch = !student && selectedCount > 1;

  return (
    <div className="ee-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="ee-modal-container st-delete-modal-container"
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="student-delete-title"
      >
        <div className="ee-modal-header">
          <div className="ee-modal-header-left">
            <h2 id="student-delete-title" className="ee-modal-title" style={{ color: '#BA1A1A' }}>
              Xác nhận xóa sinh viên
            </h2>
            <div className="ee-modal-subrow">
              <span className="ee-modal-badge" style={{ background: '#FEE2E2', color: '#991B1B' }}>
                Hành động nhạy cảm
              </span>
              <span className="ee-modal-subtext">Hồ sơ sau khi xóa sẽ không thể phục hồi</span>
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

        <div className="st-delete-body">
          <div className="st-delete-icon-box">
            <IconTrash width={24} height={24} color="#BA1A1A" />
          </div>

          <p className="st-delete-prompt">
            {isBatch ? (
              <>
                Bạn có chắc chắn muốn xóa vĩnh viễn <strong>{selectedCount} sinh viên</strong> đã chọn khỏi hệ thống?
              </>
            ) : (
              <>
                Bạn có chắc chắn muốn xóa sinh viên <strong>{student?.name}</strong> (Mã SV:{' '}
                <strong>{student?.mssv}</strong>, Lớp: <strong>{student?.className}</strong>) khỏi hệ thống?
              </>
            )}
          </p>

          <p className="st-delete-subwarning">
            Toàn bộ lịch sử thi, kết quả bài làm và thống kê liên quan của sinh viên này sẽ bị xóa khỏi lớp học.
          </p>
        </div>

        <div className="ee-modal-footer">
          <span className="ee-modal-footer-hint">Hãy kiểm tra kỹ trước khi bấm xác nhận</span>

          <div className="ee-modal-footer-actions">
            <button
              type="button"
              className="ee-modal-btn-cancel"
              onClick={onClose}
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              className="st-btn-confirm-delete"
              onClick={onConfirm}
            >
              <IconTrash width={14} height={14} color="#FFFFFF" />
              <span>{isBatch ? `Xóa ${selectedCount} sinh viên` : 'Xác nhận xóa'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
