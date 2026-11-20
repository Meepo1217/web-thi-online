import React from 'react';
import { IconFileText } from '../../../../components/ui/icons';

/**
 * ExamEditMetadataCard
 * BLOCK 1: OVERVIEW METADATA
 * Chỉnh sửa thông tin tổng quan của đề thi (Tên đề, Môn học/Khối, Mô tả quy chế)
 */
export default function ExamEditMetadataCard({
  examInfo,
  onChange,
}) {
  return (
    <section className="ee-card" aria-label="Thông tin chung đề thi">
      {/* Header của Card */}
      <div className="ee-card-header">
        <div className="ee-card-title-group">
          <span className="ee-card-icon-box">
            <IconFileText width={16} height={16} color="#0051D5" />
          </span>
          <h2 className="ee-card-heading">Thông tin chung đề thi</h2>
        </div>

        <span className="ee-badge-status-editing">ĐANG CHỈNH SỬA</span>
      </div>

      {/* Form hàng 1: Tên đề thi & Môn học/Khối */}
      <div className="ee-form-row">
        <div className="ee-form-col-title">
          <label htmlFor="exam-edit-title" className="ee-form-label">
            Tên đề thi
          </label>
          <input
            id="exam-edit-title"
            type="text"
            className="ee-input-field"
            placeholder="Nhập tên đề thi / Đề kiểm tra chuẩn..."
            value={examInfo.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
          />
        </div>

        <div className="ee-form-col-subject">
          <label htmlFor="exam-edit-subject" className="ee-form-label">
            Môn học &amp; Khối
          </label>
          <input
            id="exam-edit-subject"
            type="text"
            className="ee-input-field"
            placeholder="Chọn môn học & Khối lớp..."
            value={examInfo.subject || ''}
            onChange={(e) => onChange('subject', e.target.value)}
          />
        </div>
      </div>

      {/* Form hàng 2: Mô tả / Hướng dẫn thí sinh */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        <label htmlFor="exam-edit-desc" className="ee-form-label">
          Mô tả / Hướng dẫn thí sinh
        </label>
        <textarea
          id="exam-edit-desc"
          className="ee-textarea-field"
          rows={3}
          placeholder="Mô tả quy chế phòng thi, thời lượng làm bài, tài liệu hoặc thiết bị được phép sử dụng..."
          value={examInfo.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>
    </section>
  );
}
