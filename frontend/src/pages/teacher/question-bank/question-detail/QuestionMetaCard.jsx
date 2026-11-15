import React from 'react';
import { IconOverview } from '../../../../components/ui/icons';

/**
 * QuestionMetaCard
 * Thẻ hiển thị thông tin học thuật (Mã, Khối, Mức độ Bloom, Tác giả, Thẻ phân loại)
 */
export default function QuestionMetaCard({ question }) {
  return (
    <div className="qd-side-card">
      {/* Header */}
      <div className="qd-side-header">
        <IconOverview width={16.67} height={16.67} color="#0051D5" />
        <h2 className="qd-side-title">Thông tin học thuật</h2>
      </div>

      {/* Rows */}
      <div className="qd-meta-rows-list">
        {/* Row 1: Mã định danh */}
        <div className="qd-meta-row">
          <span className="qd-meta-label">Mã câu:</span>
          <span className="qd-meta-val-bold">{question.code}</span>
        </div>

        {/* Row 2: Khối kiến thức */}
        <div className="qd-meta-row">
          <span className="qd-meta-label">Môn học:</span>
          <div className="qd-meta-subject-val">
            <span className="qd-grade-circle">{question.grade}</span>
            <span>{question.subjectName}</span>
          </div>
        </div>

        {/* Row 3: Mức độ Bloom */}
        <div className="qd-meta-row">
          <span className="qd-meta-label">Mức độ:</span>
          <span className="qd-bloom-badge">{question.bloom}</span>
        </div>

        {/* Row 4: Tác giả */}
        <div className="qd-meta-row qd-meta-row-author">
          <span className="qd-meta-label">Tác giả:</span>
          <div className="qd-author-details">
            <span className="qd-author-name">{question.author}</span>
            <span className="qd-author-date">Cập nhật: {question.updatedAt}</span>
          </div>
        </div>
      </div>

      {/* Tags Cluster */}
      <div className="qd-tags-section">
        <span className="qd-tags-title">Thẻ phân loại (Tags):</span>
        <div className="qd-tags-cloud">
          {question.tags?.map((tag, idx) => (
            <span key={idx} className="qd-tag-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
