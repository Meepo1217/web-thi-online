import { IconArrowRight, IconUpload, IconPlus } from '../../../../components/ui/icons';

/**
 * QuestionBankHeader - Top Navigation & Breadcrumbs cho Ngân hàng câu hỏi
 * Chuẩn thông số Figma: Tiêu đề 28px, nút Nhập câu hỏi và Tạo thư mục mới
 */
export default function QuestionBankHeader({ onImportExcel, onCreateFolder }) {
  return (
    <div className="qb-top-header">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="qb-breadcrumbs">
        <span className="qb-breadcrumb-item">Ngân hàng câu hỏi</span>
        <span className="qb-breadcrumb-separator" aria-hidden="true">
          <IconArrowRight width={4.93} height={8} color="#76777D" />
        </span>
        <span className="qb-breadcrumb-item active">Thư mục chuyên môn</span>
      </nav>

      {/* Title & Action Buttons Row */}
      <div className="qb-heading-action-row">
        <div className="qb-title-desc-block">
          <h1 className="qb-page-title">Ngân hàng câu hỏi</h1>
          <p className="qb-page-description">
            Hệ thống ngân hàng câu hỏi chuẩn hóa phân theo khối lớp và chuyên đề đào tạo
          </p>
        </div>

        <div className="qb-toolbar-controls">
          <button
            type="button"
            className="qb-btn qb-btn-secondary"
            onClick={onImportExcel}
            title="Nhập câu hỏi từ tệp Excel"
          >
            <IconUpload width={12} height={15} color="#0051D5" />
            <span>Nhập câu hỏi (Excel)</span>
          </button>

          <button
            type="button"
            className="qb-btn qb-btn-primary"
            onClick={onCreateFolder}
            title="Tạo thư mục môn học mới"
          >
            <IconPlus width={15} height={12} color="#FFFFFF" />
            <span>Tạo thư mục mới</span>
          </button>
        </div>
      </div>
    </div>
  );
}
