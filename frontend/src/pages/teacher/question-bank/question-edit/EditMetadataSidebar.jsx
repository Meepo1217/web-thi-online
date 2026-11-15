import React, { useState } from 'react';
import {
  IconTag,
  IconClose,
  IconPlus,
  IconCheck,
} from '../../../../components/ui/icons';

/**
 * EditMetadataSidebar
 * Card thiết lập bổ sung (Cột phải):
 * - Thẻ gắn (Tags) có thể xóa và thêm mới
 * - Trạng thái duyệt câu hỏi (Approval status)
 * - Biểu đồ Sparkline hiệu suất câu hỏi (Performance insight)
 * - Thông tin tác giả & mã băm phiên bản (Revision timeline)
 */
export default function EditMetadataSidebar({
  tags,
  onRemoveTag,
  onAddTag,
  approvalStatus,
  insights,
  author,
  lastUpdated,
  hashId,
}) {
  const [newTagInput, setNewTagInput] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newTagInput.trim()) {
      onAddTag(newTagInput.trim());
      setNewTagInput('');
      setIsAddingTag(false);
    }
  };

  return (
    <div className="qe-card qe-card-sidebar">
      {/* Header */}
      <div className="qe-sidebar-card-header">
        <div className="qe-sidebar-header-left">
          <div className="qe-icon-box-primary">
            <IconTag width={15} height={15} color="#0051D5" />
          </div>
          <h2 className="qe-sidebar-heading">Thiết lập bổ sung</h2>
        </div>
      </div>

      <div className="qe-sidebar-body">
        {/* 1. Thẻ gắn (Tags) */}
        <div className="qe-form-group">
          <label className="qe-field-label">THẺ GẮN (TAGS)</label>
          <div className="qe-tags-wrap">
            {tags.map((tag, idx) => (
              <span key={idx} className="qe-tag-pill">
                <span>{tag}</span>
                <button
                  type="button"
                  className="qe-tag-remove-btn"
                  onClick={() => onRemoveTag(tag)}
                  title={`Xóa thẻ ${tag}`}
                >
                  <IconClose width={10} height={10} color="#45464D" />
                </button>
              </span>
            ))}

            {isAddingTag ? (
              <form onSubmit={handleAddSubmit} className="qe-add-tag-form">
                <input
                  type="text"
                  autoFocus
                  className="qe-tag-input"
                  placeholder="Nhập tên tag..."
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onBlur={() => {
                    if (!newTagInput.trim()) setIsAddingTag(false);
                  }}
                />
              </form>
            ) : (
              <button
                type="button"
                className="qe-add-tag-btn"
                onClick={() => setIsAddingTag(true)}
              >
                <IconPlus width={12} height={12} color="#0051D5" />
                <span>Thêm tag</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. Trạng thái duyệt câu hỏi */}
        <div className="qe-form-group">
          <label className="qe-field-label">TRẠNG THÁI DUYỆT CÂU HỎI</label>
          <div className="qe-approval-card">
            <div className="qe-approval-left">
              <div className="qe-approval-icon-box">
                <IconCheck width={12} height={12} color="#00875A" />
              </div>
              <div className="qe-approval-texts">
                <div className="qe-approval-title">{approvalStatus.title}</div>
                <div className="qe-approval-desc">{approvalStatus.subtitle}</div>
              </div>
            </div>
            <button
              type="button"
              className="qe-btn-change-status"
              onClick={() => alert('Chức năng điều chỉnh trạng thái duyệt')}
            >
              Thay đổi
            </button>
          </div>
        </div>

        {/* 3. Question Performance Insight (Sparkline SVG) */}
        <div className="qe-form-group">
          <div className="qe-insight-header">
            <span className="qe-field-label">HIỆU SUẤT CÂU HỎI</span>
            <span className="qe-insight-badge">Kỳ gần nhất</span>
          </div>

          <div className="qe-sparkline-box">
            {/* SVG Sparkline Graph */}
            <div className="qe-sparkline-svg-wrap">
              <svg width="100%" height="48" viewBox="0 0 315 48" fill="none">
                <path
                  d="M 10 38 Q 45 20, 85 30 T 160 18 T 235 34 T 295 12"
                  stroke="#0051D5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Last point highlight dot */}
                <circle cx="295" cy="12" r="4.5" fill="#0051D5" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>

            <div className="qe-sparkline-stats">
              <div className="qe-stat-col">
                <span className="qe-stat-label">Độ khó (P)</span>
                <span className="qe-stat-val">{insights.difficulty}</span>
              </div>
              <div className="qe-stat-col text-right">
                <span className="qe-stat-label">Độ phân hóa (D)</span>
                <span className="qe-stat-val qe-stat-accent">
                  {insights.discrimination} ({insights.discriminationRating})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Author & Revision Timeline */}
        <div className="qe-meta-timeline">
          <div className="qe-timeline-row">
            <span className="qe-timeline-label">Người tạo:</span>
            <span className="qe-timeline-val">{author}</span>
          </div>
          <div className="qe-timeline-row">
            <span className="qe-timeline-label">Cập nhật:</span>
            <span className="qe-timeline-val">{lastUpdated}</span>
          </div>
          <div className="qe-timeline-row">
            <span className="qe-timeline-label">Mã băm:</span>
            <span className="qe-hash-badge">{hashId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
