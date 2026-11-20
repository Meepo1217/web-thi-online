import React, { useState } from 'react';
import {
  IconAlertTriangle,
  IconFileText,
  IconGrading,
  IconArrowRight,
  IconTrash,
} from '../../../../components/ui/icons';

/**
 * QuestionDeleteModal
 * Popup xác nhận xóa vĩnh viễn câu hỏi (Chuẩn thiết kế Figma)
 * - Thanh trang trí gradient đỏ trên cùng
 * - Icon cảnh báo tam giác nền hồng #FFDAD6
 * - Huy hiệu 'CẢNH BÁO BẢO MẬT & DỮ LIỆU'
 * - Tiêu đề 'Xác nhận xóa vĩnh viễn câu hỏi?'
 * - Khung đánh giá tác động liên kết dữ liệu (Impact Assessment)
 * - Checkbox xác nhận an toàn bắt buộc trước khi cho phép bấm Xóa
 * - Nút Hủy và Nút Xóa vĩnh viễn
 */
export default function QuestionDeleteModal({
  isOpen = true,
  question = {
    code: 'MATH-12-0482',
    linkedExamsCount: 3,
    studentSubmissionsCount: '1,420',
  },
  onConfirm,
  onCancel,
  isDeleting = false,
}) {
  const [isSafetyChecked, setIsSafetyChecked] = useState(false);

  if (!isOpen) return null;

  const handleConfirmDelete = () => {
    if (!isSafetyChecked || isDeleting) return;
    onConfirm?.(question);
  };

  const handleViewImpactDetails = (e) => {
    e.preventDefault();
    alert(`Chi tiết liên kết của câu hỏi #${question.code}:\n• Đang được sử dụng trong: Đề thi thử THPT 2024 (Lần 1, 2) & Đề kiểm tra 1 tiết Đại số.\n• 1,420 học sinh đã nộp bài có chứa câu hỏi này.`);
  };

  return (
    <div
      className="qdm-overlay-canvas"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qdm-modal-title"
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

            <h2 id="qdm-modal-title" className="qdm-main-heading">
              Xác nhận xóa vĩnh viễn câu hỏi?
            </h2>
          </div>
        </div>

        {/* 3. Context Body Message */}
        <div className="qdm-context-message">
          <p className="qdm-context-p1">
            <span>Bạn đang chuẩn bị xóa câu hỏi mã </span>
            <span className="qdm-code-highlight">#{question.code}</span>
            <span> khỏi hệ thống ngân hàng đề thi.</span>
          </p>
          <p className="qdm-context-p2">
            Hành động này mang tính vĩnh viễn và không thể khôi phục sau khi xác nhận.
          </p>
        </div>

        {/* 4. Impact Assessment Box (Khung cảnh báo tác động dữ liệu) */}
        <div className="qdm-impact-box">
          <div className="qdm-impact-header">
            <IconAlertTriangle width={13.5} height={13.5} color="#BA1A1A" />
            <span className="qdm-impact-title">
              ĐÁNH GIÁ TÁC ĐỘNG LIÊN KẾT DỮ LIỆU (IMPACT ASSESSMENT)
            </span>
          </div>

          <div className="qdm-impact-matrix">
            {/* Row 1: Linked Exams */}
            <div className="qdm-matrix-row">
              <div className="qdm-matrix-label-wrap">
                <IconFileText width={13.33} height={13.33} color="#45464D" />
                <span className="qdm-matrix-label">
                  Đề thi chính thức liên kết:
                </span>
              </div>
              <span className="qdm-matrix-val">
                {String(question.linkedExamsCount || 3).padStart(2, '0')} đề thi
              </span>
            </div>

            {/* Row 2: Submissions */}
            <div className="qdm-matrix-row">
              <div className="qdm-matrix-label-wrap">
                <IconGrading width={13} height={12} color="#45464D" />
                <span className="qdm-matrix-label">
                  Lịch sử làm bài thí sinh:
                </span>
              </div>
              <span className="qdm-matrix-val">
                {question.studentSubmissionsCount || '1,420'} lượt
              </span>
            </div>

            {/* Row 3: View impact details link */}
            <div className="qdm-impact-link-row">
              <a
                href="#impact-details"
                className="qdm-impact-link"
                onClick={handleViewImpactDetails}
              >
                <span>Xem chi tiết tác động liên kết</span>
                <IconArrowRight width={9.33} height={9.33} color="#0051D5" />
              </a>
            </div>
          </div>
        </div>

        {/* 5. Safety Confirmation Checkbox Area */}
        <label className="qdm-checkbox-label">
          <input
            type="checkbox"
            className="qdm-checkbox-input"
            checked={isSafetyChecked}
            onChange={(e) => setIsSafetyChecked(e.target.checked)}
          />
          <span className="qdm-checkbox-text">
            Tôi hiểu rõ rủi ro và xác nhận muốn xóa vĩnh viễn câu hỏi này cùng các dữ liệu phân tích liên quan.
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
            onClick={handleConfirmDelete}
          >
            <IconTrash width={12} height={13.5} color="#FFFFFF" />
            <span>{isDeleting ? 'Đang xóa...' : 'Xóa vĩnh viễn'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
