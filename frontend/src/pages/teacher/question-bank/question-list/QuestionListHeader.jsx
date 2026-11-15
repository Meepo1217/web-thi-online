import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconChevronRight,
  IconExcel,
  IconExport,
  IconShuffle,
  IconPlus,
  IconFolder,
} from '../../../../components/ui/icons';

/**
 * QuestionListHeader
 * Thanh điều hướng Breadcrumb + Banner tiêu đề môn học + Cụm 4 nút hành động nhanh
 */
export default function QuestionListHeader({
  subject = {
    name: 'Toán học THPT',
    totalQuestions: 1420,
    syncStatus: 'ĐÃ ĐỒNG BỘ CLOUD',
    description: 'Kho câu hỏi trắc nghiệm và tự luận phân loại theo ma trận đề thi chuẩn THPT Quốc gia',
  },
  onAddQuestion,
  onAutoShuffle,
  onExport,
  onDownloadTemplate,
}) {
  return (
    <div className="ql-header-section">
      {/* 1. Breadcrumb and Context Navigation */}
      <div className="ql-breadcrumb-bar">
        <nav className="ql-breadcrumb-nav" aria-label="Breadcrumb">
          <Link to="/teacher/questions" className="ql-breadcrumb-link">
            Ngân hàng câu hỏi
          </Link>
          <span className="ql-breadcrumb-sep">
            <IconChevronRight width={5} height={8} color="#76777D" />
          </span>
          <Link to="/teacher/questions" className="ql-breadcrumb-link">
            Thư mục chuyên môn
          </Link>
          <span className="ql-breadcrumb-sep">
            <IconChevronRight width={5} height={8} color="#76777D" />
          </span>
          <span className="ql-breadcrumb-current">Danh sách câu hỏi</span>
        </nav>

        {/* Sync Status Badge */}
        <div className="ql-sync-badge">
          <span className="ql-sync-dot" />
          <span className="ql-sync-text">{subject.syncStatus || 'ĐÃ ĐỒNG BỘ CLOUD'}</span>
        </div>
      </div>

      {/* 2. Main Header Banner & Quick Actions */}
      <div className="ql-main-banner">
        <div className="ql-banner-left">
          <div className="ql-title-row">
            <div className="ql-subject-icon-box">
              <IconFolder width={21} height={21} color="#0051D5" />
            </div>
            <h1 className="ql-page-title">
              Danh sách câu hỏi: {subject.name}
            </h1>
            <span className="ql-count-badge">
              {subject.totalQuestions.toLocaleString()} CÂU
            </span>
          </div>
          <p className="ql-page-desc">{subject.description}</p>
        </div>

        {/* 3. Action Buttons Cluster */}
        <div className="ql-action-cluster">
          <button
            type="button"
            className="ql-btn ql-btn-soft"
            onClick={onDownloadTemplate}
          >
            <IconExcel width={12} height={15} color="#76777D" />
            <span>Tải file mẫu Excel</span>
          </button>

          <button
            type="button"
            className="ql-btn ql-btn-soft"
            onClick={onExport}
          >
            <IconExport width={12} height={12} color="#76777D" />
            <span>Xuất ngân hàng câu hỏi</span>
          </button>

          <button
            type="button"
            className="ql-btn ql-btn-primary-tint"
            onClick={onAutoShuffle}
          >
            <IconShuffle width={16.5} height={14.6} color="#0051D5" />
            <span>Trộn đề tự động</span>
          </button>

          <button
            type="button"
            className="ql-btn ql-btn-dark"
            onClick={onAddQuestion}
          >
            <IconPlus width={10.5} height={10.5} color="#FFFFFF" />
            <span>Thêm câu hỏi mới</span>
          </button>
        </div>
      </div>
    </div>
  );
}
