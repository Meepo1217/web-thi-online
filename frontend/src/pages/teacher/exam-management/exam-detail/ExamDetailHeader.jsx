import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconArrowLeft,
  IconEdit,
  IconDownload,
} from '../../../../components/ui/icons';

/**
 * ExamDetailHeader
 * Thanh điều hướng & thao tác trên cùng của màn hình Chi tiết đề thi
 */
export default function ExamDetailHeader({
  exam,
  backPath = '/teacher/exams/math/list',
  onEditExam,
  onExportExam,
}) {
  return (
    <header className="ed-top-bar">
      {/* Left: Back Link, Title + Badges, Metadata */}
      <div className="ed-top-left">
        <Link to={backPath} className="ed-back-link">
          <IconArrowLeft width={12} height={12} color="#0051D5" />
          <span>Quay lại danh sách đề thi</span>
        </Link>

        <div className="ed-title-badges-row">
          <h1 className="ed-page-title">{exam.title}</h1>

          <span className="ed-code-pill">{exam.code}</span>

          <div className="ed-status-pill">
            <span className="ed-status-dot" aria-hidden="true" />
            <span className="ed-status-text">{exam.statusText}</span>
          </div>
        </div>

        <div className="ed-meta-row">
          <span>{exam.subject}</span>
          <span aria-hidden="true">•</span>
          <span>{exam.academicYear}</span>
          <span aria-hidden="true">•</span>
          <span>{exam.updatedAt}</span>
        </div>
      </div>

      {/* Right: Action Buttons Group */}
      <div className="ed-top-actions">
        <button
          type="button"
          className="ed-btn ed-btn-soft"
          onClick={onEditExam}
        >
          <IconEdit width={12} height={12} color="#0B1C30" />
          <span>Chỉnh sửa đề</span>
        </button>

        <button
          type="button"
          className="ed-btn ed-btn-soft"
          onClick={onExportExam}
        >
          <IconDownload width={13.5} height={12} color="#0B1C30" />
          <span>Xuất PDF / Word</span>
        </button>
      </div>
    </header>
  );
}
