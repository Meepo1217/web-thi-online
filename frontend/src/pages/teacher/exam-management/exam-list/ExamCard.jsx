import React from 'react';
import {
  IconEye,
  IconEdit,
  IconTrash,
  IconClock,
  IconQuestions,
} from '../../../../components/ui/icons';

/**
 * ExamCard - Thẻ hiển thị một đề thi trong danh sách
 * Kế thừa trực tiếp cấu trúc của QuestionCard trong Question Bank
 */
export default function ExamCard({
  exam,
  isSelected = false,
  onToggleSelect,
  onViewDetail,
  onEdit,
  onDelete,
}) {
  // Render Level Badge
  const renderLevelBadge = () => {
    switch (exam.levelType) {
      case 'vd-cao':
        return <span className="ql-badge ql-badge-vd-cao">{exam.level}</span>;
      case 'van-dung':
        return <span className="ql-badge ql-badge-van-dung">{exam.level}</span>;
      case 'thong-hieu':
        return <span className="ql-badge ql-badge-thong-hieu">{exam.level}</span>;
      case 'nhan-biet':
        return <span className="ql-badge ql-badge-nhan-biet">{exam.level}</span>;
      default:
        return <span className="ql-badge ql-badge-default">{exam.level}</span>;
    }
  };

  return (
    <article className={`ql-question-card ${isSelected ? 'ql-card-selected' : ''}`}>
      <div className="ql-card-inner">
        {/* Checkbox chọn đề thi */}
        <div className="ql-card-select-col">
          <input
            type="checkbox"
            className="ql-question-checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(exam.id)}
            aria-label={`Chọn đề thi ${exam.code}`}
          />
        </div>

        {/* Nội dung chính của đề thi */}
        <div className="ql-card-body-col">
          {/* Metadata bar */}
          <div className="ql-metadata-bar">
            <div className="ql-metadata-left">
              <span className="ql-code-badge">{exam.code}</span>
              {renderLevelBadge()}
              <span className="ql-exam-meta-pill">
                ⏱ {exam.duration}
              </span>
              <span className="ql-exam-meta-pill">
                📝 {exam.questionCount} câu
              </span>
            </div>

            <div className="ql-metadata-right">
              <span className="ql-author-info">
                {exam.author} • {exam.date}
              </span>
            </div>
          </div>

          {/* Tiêu đề & Mô tả đề thi */}
          <div className="ql-question-content" style={{ marginTop: '8px' }}>
            <h3
              style={{
                margin: '0 0 6px 0',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '16px',
                fontWeight: 600,
                color: '#0B1C30',
                cursor: 'pointer',
              }}
              onClick={() => onViewDetail(exam)}
            >
              {exam.title}
            </h3>
            <p style={{ margin: 0, color: '#45464D', fontSize: '13.5px', lineHeight: '20px' }}>
              {exam.description}
            </p>
          </div>

          {/* Footer Tags & Thống kê */}
          <div className="ql-card-footer" style={{ marginTop: '12px' }}>
            <div className="ql-tags-cluster">
              {exam.tags?.map((tag, idx) => (
                <span key={idx} className="ql-topic-tag">
                  {tag}
                </span>
              ))}
            </div>

            {exam.usageCount > 0 && (
              <div className="ql-usage-text">
                Đã tổ chức thi cho {exam.usageCount} đợt / ca thi
              </div>
            )}
          </div>
        </div>

        {/* Cột 3 nút thao tác bên phải */}
        <div className="ql-card-actions-col">
          <button
            type="button"
            className="ql-action-icon-btn"
            title="Xem chi tiết đề thi"
            onClick={() => onViewDetail(exam)}
          >
            <IconEye width={16.5} height={12} color="#45464D" />
          </button>

          <button
            type="button"
            className="ql-action-icon-btn"
            title="Chỉnh sửa đề thi"
            onClick={() => onEdit(exam)}
          >
            <IconEdit width={13.5} height={13.5} color="#45464D" />
          </button>

          <button
            type="button"
            className="ql-action-icon-btn ql-action-btn-danger"
            title="Xóa đề thi"
            onClick={() => onDelete(exam)}
          >
            <IconTrash width={13} height={14} color="#BA1A1A" />
          </button>
        </div>
      </div>
    </article>
  );
}
