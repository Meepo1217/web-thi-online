import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconArrowLeft,
  IconHistory,
  IconTrash,
  IconEdit,
} from '../../../../components/ui/icons';

/**
 * QuestionDetailActionBar
 * Thanh điều hướng tối giản trên cùng: Nút quay lại, Mã câu hỏi, Trạng thái Cloud, Các nút thao tác
 */
export default function QuestionDetailActionBar({
  question,
  onHistoryClick,
  onDeleteClick,
  onEditClick,
}) {
  return (
    <div className="qd-action-bar-wrapper">
      <div className="qd-action-bar-container">
        {/* Left: Back Link & Badges */}
        <div className="qd-action-left">
          <Link to="/teacher/questions/math" className="qd-back-link">
            <IconArrowLeft width={12} height={12} color="#0B1C30" />
            <span>Quay lại danh sách</span>
          </Link>

          <span className="qd-vertical-divider" />

          <span className="qd-code-badge">{question.code}</span>

          <div className="qd-status-badge">
            <span className="qd-status-dot" />
            <span className="qd-status-text">{question.statusText}</span>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="qd-action-right">
          <button
            type="button"
            className="qd-btn qd-btn-soft"
            onClick={onHistoryClick}
          >
            <IconHistory width={13} height={15} color="#0B1C30" />
            <span>Lịch sử sửa</span>
          </button>

          <button
            type="button"
            className="qd-btn qd-btn-danger"
            onClick={onDeleteClick}
          >
            <IconTrash width={12} height={13.5} color="#93000A" />
            <span>Xóa câu hỏi</span>
          </button>

          <button
            type="button"
            className="qd-btn qd-btn-primary"
            onClick={onEditClick}
          >
            <IconEdit width={13.5} height={12} color="#FEFCFF" />
            <span>Chỉnh sửa câu hỏi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
