import { IconExport, IconExcel, IconPlus, IconArrowRight } from '../ui/icons';

/**
 * ExamHeaderActionBar - Top Action Bar & Page Header
 * Chuẩn thông số Figma: Tiêu đề 28px Plus Jakarta Sans, Breadcrumbs, Badge 48 ĐỀ THI, 3 nút hành động
 */
export default function ExamHeaderActionBar({ totalExams = 48, onCreateExam, onExport, onImportExcel }) {
  return (
    <div className="exam-top-action-bar">
      <div className="exam-title-block">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="exam-breadcrumbs">
          <span className="exam-breadcrumb-item">Quản lý đề thi</span>
          <span className="exam-breadcrumb-separator" aria-hidden="true">
            <IconArrowRight width={4.32} height={7} color="#45464D" />
          </span>
          <span className="exam-breadcrumb-item active">Danh sách đề thi</span>
        </nav>

        {/* Title + Total count badge */}
        <div className="exam-heading-row">
          <h1 className="exam-page-title">Quản lý đề thi</h1>
          <span className="exam-total-badge">
            {totalExams} ĐỀ THI
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="exam-action-buttons">
        <button
          type="button"
          className="exam-btn exam-btn-outline"
          onClick={onExport}
          title="Xuất danh sách đề thi"
        >
          <IconExport width={12} height={12} color="#0B1C30" />
          <span>Xuất danh sách</span>
        </button>

        <button
          type="button"
          className="exam-btn exam-btn-outline"
          onClick={onImportExcel}
          title="Nhập đề thi từ tệp Excel"
        >
          <IconExcel width={14} height={12} color="#0B1C30" />
          <span>Nhập từ Excel</span>
        </button>

        <button
          type="button"
          className="exam-btn exam-btn-primary"
          onClick={onCreateExam}
          title="Tạo đề thi mới"
        >
          <IconPlus width={14} height={14} color="#FFFFFF" />
          <span>Tạo đề thi mới</span>
        </button>
      </div>
    </div>
  );
}
