import React from 'react';
import { IconEdit, IconFolder, IconMoreVertical } from '../../../../components/ui/icons';

/**
 * SubjectHeaderCard
 * Wireframe Subject Header Card:
 * - Hiển thị mã môn học, tên môn học và mô tả tóm tắt chương trình
 * - Hai nút thao tác nhanh bên phải: 'Sửa' và 'Cài đặt'
 */
export default function SubjectHeaderCard({
  subject,
  onEditSubject,
  onSubjectSettings,
}) {
  return (
    <div className="sc-subject-card">
      <div className="sc-subject-inner">
        {/* Left Information */}
        <div className="sc-subject-info">
          {/* Code subline */}
          <div className="sc-subject-code-row">
            <IconFolder width={13.33} height={13.33} color="#6C757D" />
            <span className="sc-subject-code">MÃ MÔN: {subject.code}</span>
          </div>

          {/* Heading 1 */}
          <h1 className="sc-subject-title">{subject.title}</h1>

          {/* Description */}
          <p className="sc-subject-desc">{subject.description}</p>
        </div>

        {/* Right Action Buttons */}
        <div className="sc-subject-actions">
          <button
            type="button"
            className="sc-btn-wireframe"
            onClick={onEditSubject}
            title="Chỉnh sửa thông tin môn học"
          >
            <IconEdit width={12} height={12} color="#495057" />
            <span>Sửa</span>
          </button>

          <button
            type="button"
            className="sc-btn-wireframe"
            onClick={onSubjectSettings}
            title="Cài đặt môn học"
          >
            <IconMoreVertical width={10.67} height={10.67} color="#495057" />
            <span>Cài đặt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
