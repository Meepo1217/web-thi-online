import React from 'react';
import {
  IconArrowLeft,
  IconUpload,
  IconDownload,
  IconSave,
} from '../../../../components/ui/icons';

/**
 * ExamEditHeaderBar
 * Thanh Header/Status trên cùng của màn hình Sửa Đề Thi
 */
export default function ExamEditHeaderBar({
  exam,
  totalQuestions = 16,
  onBack,
  onImportFile,
  onExportFile,
  onSave,
}) {
  return (
    <header className="ee-header-bar">
      <div className="ee-header-container">
        {/* Bên trái: Nút quay lại & Tiêu đề */}
        <div className="ee-header-left">
          <button
            type="button"
            className="ee-back-btn"
            onClick={onBack}
            title="Quay lại danh sách đề thi"
            aria-label="Quay lại danh sách đề thi"
          >
            <IconArrowLeft width={14} height={14} color="#0B1C30" />
          </button>

          <div className="ee-header-meta-group">
            <div className="ee-breadcrumb-row">
              <span className="ee-badge-type">SỬA ĐỀ THI</span>
              <span className="ee-breadcrumb-sep">•</span>
              <span className="ee-breadcrumb-info">
                Mã đề: {exam.code} • {totalQuestions} câu hỏi
              </span>
            </div>

            <h1 className="ee-header-title">{exam.title}</h1>
          </div>
        </div>

        {/* Bên phải: Nút Nhập File, Xuất File, Lưu */}
        <div className="ee-header-actions">
          <button
            type="button"
            className="ee-btn-action-soft"
            onClick={onImportFile}
            title="Nhập đề từ file Word / Excel"
          >
            <IconUpload width={14} height={14} color="#0B1C30" />
            <span>Nhập File</span>
          </button>

          <button
            type="button"
            className="ee-btn-action-soft"
            onClick={onExportFile}
            title="Xuất bản đề thi ra file"
          >
            <IconDownload width={14} height={14} color="#0B1C30" />
            <span>Xuất File</span>
          </button>

          <button
            type="button"
            className="ee-btn-action-primary"
            onClick={onSave}
            title="Lưu các thay đổi của đề thi"
          >
            <IconSave width={14} height={14} color="#FFFFFF" />
            <span>Lưu thay đổi</span>
          </button>
        </div>
      </div>
    </header>
  );
}
