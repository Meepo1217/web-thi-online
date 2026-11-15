import React from 'react';
import {
  IconEye,
  IconEdit,
  IconTrash,
  IconCheck,
} from '../../../../components/ui/icons';

/**
 * QuestionCard
 * Thẻ hiển thị một câu hỏi trong danh sách theo thiết kế Figma
 */
export default function QuestionCard({
  question,
  isSelected = false,
  onToggleSelect,
  onViewDetail,
  onEdit,
  onDelete,
}) {
  // Render Bloom Badge dựa trên bloomType
  const renderBloomBadge = () => {
    switch (question.bloomType) {
      case 'vd-cao':
        return <span className="ql-badge ql-badge-vd-cao">{question.bloom}</span>;
      case 'van-dung':
        return <span className="ql-badge ql-badge-van-dung">{question.bloom}</span>;
      case 'thong-hieu':
        return <span className="ql-badge ql-badge-thong-hieu">{question.bloom}</span>;
      case 'nhan-biet':
        return <span className="ql-badge ql-badge-nhan-biet">{question.bloom}</span>;
      default:
        return <span className="ql-badge ql-badge-default">{question.bloom}</span>;
    }
  };

  // Render Status Badge (Đã duyệt / Chờ duyệt)
  const renderStatus = () => {
    const isApproved = question.status === 'approved';
    return (
      <div className={`ql-status-indicator ${isApproved ? 'ql-status-approved' : 'ql-status-pending'}`}>
        <span className="ql-status-dot" />
        <span className="ql-status-text">{question.statusText}</span>
      </div>
    );
  };

  // Render Options / Statements / Short Answer dựa trên question.type
  const renderTypeBody = () => {
    if (question.type === 'mcq' && question.options) {
      return (
        <div className="ql-options-grid">
          {question.options.map((opt) => (
            <div
              key={opt.key}
              className={`ql-option-card ${opt.isCorrect ? 'ql-option-correct' : ''}`}
            >
              <div className="ql-option-circle">
                {opt.isCorrect ? (
                  <IconCheck width={10} height={10} color="#FFFFFF" />
                ) : (
                  opt.key
                )}
              </div>
              <div className="ql-option-text">
                <span className="ql-option-key-label">{opt.key}.</span> {opt.text}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (question.type === 'true-false' && question.statements) {
      return (
        <div className="ql-statements-list">
          {question.statements.map((stmt) => (
            <div key={stmt.key} className="ql-statement-row">
              <div className="ql-statement-left">
                <span className="ql-statement-key">{stmt.key})</span>
                <span className="ql-statement-text">{stmt.text}</span>
              </div>
              <span
                className={`ql-tf-badge ${
                  stmt.isCorrect ? 'ql-tf-true' : 'ql-tf-false'
                }`}
              >
                {stmt.isCorrect ? 'ĐÚNG' : 'SAI'}
              </span>
            </div>
          ))}
        </div>
      );
    }

    if (question.type === 'short-answer') {
      return (
        <div className="ql-short-answer-box">
          <span className="ql-short-answer-label">ĐIỀN ĐÁP ÁN NGẮN:</span>
          <span className="ql-short-answer-val">{question.shortAnswer}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <article className={`ql-question-card ${isSelected ? 'ql-card-selected' : ''}`}>
      <div className="ql-card-inner">
        {/* Checkbox chọn câu hỏi */}
        <div className="ql-card-select-col">
          <input
            type="checkbox"
            className="ql-question-checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(question.id)}
            aria-label={`Chọn câu hỏi ${question.code}`}
          />
        </div>

        {/* Nội dung chính của câu hỏi */}
        <div className="ql-card-body-col">
          {/* Metadata bar */}
          <div className="ql-metadata-bar">
            <div className="ql-metadata-left">
              <span className="ql-code-badge">{question.code}</span>
              {renderBloomBadge()}
              <span className="ql-chapter-badge">{question.chapter}</span>
              {renderStatus()}
            </div>

            <div className="ql-metadata-right">
              <span className="ql-author-info">
                {question.author} • {question.date}
              </span>
            </div>
          </div>

          {/* Nội dung câu hỏi (hỗ trợ công thức) */}
          <div className="ql-question-content">
            <p>{question.content}</p>
          </div>

          {/* Phần lựa chọn theo loại câu hỏi */}
          {renderTypeBody()}

          {/* Footer Topic Tags */}
          <div className="ql-card-footer">
            <div className="ql-tags-cluster">
              {question.tags?.map((tag, idx) => (
                <span key={idx} className="ql-topic-tag">
                  {tag}
                </span>
              ))}
            </div>

            {question.usageCount > 0 && (
              <div className="ql-usage-text">
                Xuất hiện trong {question.usageCount} đề thi
              </div>
            )}
          </div>
        </div>

        {/* Cột 3 nút thao tác nhanh bên phải */}
        <div className="ql-card-actions-col">
          <button
            type="button"
            className="ql-action-icon-btn"
            title="Xem chi tiết câu hỏi"
            onClick={() => onViewDetail(question)}
          >
            <IconEye width={16.5} height={12} color="#45464D" />
          </button>

          <button
            type="button"
            className="ql-action-icon-btn"
            title="Chỉnh sửa câu hỏi"
            onClick={() => onEdit(question)}
          >
            <IconEdit width={13.5} height={13.5} color="#45464D" />
          </button>

          <button
            type="button"
            className="ql-action-icon-btn ql-action-btn-danger"
            title="Xóa câu hỏi"
            onClick={() => onDelete(question)}
          >
            <IconTrash width={13} height={14} color="#BA1A1A" />
          </button>
        </div>
      </div>
    </article>
  );
}
