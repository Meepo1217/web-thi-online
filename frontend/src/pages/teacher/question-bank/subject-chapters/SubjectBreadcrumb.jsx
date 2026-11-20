import React from 'react';
import { Link } from 'react-router-dom';
import { IconFolder } from '../../../../components/ui/icons';

/**
 * SubjectBreadcrumb
 * Wireframe Breadcrumb & Status Tag:
 * - Điều hướng: Ngân hàng câu hỏi / Môn học / Tên môn
 * - Tag trạng thái học kỳ / phân loại bên phải
 */
export default function SubjectBreadcrumb({
  subjectTitle,
  statusTag,
  rootLabel = 'Ngân hàng',
  rootPath = '/teacher/questions',
}) {
  return (
    <div className="sc-breadcrumb-row">
      <nav className="sc-breadcrumb-nav" aria-label="Breadcrumb">
        <Link to={rootPath} className="sc-breadcrumb-link" title={`Quay về ${rootLabel}`}>
          <IconFolder width={14} height={12} color="#6C757D" />
          <span>{rootLabel}</span>
        </Link>

        <span className="sc-breadcrumb-sep">/</span>

        <Link to={rootPath} className="sc-breadcrumb-link">
          <span>Môn học</span>
        </Link>

        <span className="sc-breadcrumb-sep">/</span>

        <span className="sc-breadcrumb-current">{subjectTitle}</span>
      </nav>

      {statusTag && (
        <div className="sc-status-tag">
          <span>{statusTag}</span>
        </div>
      )}
    </div>
  );
}
