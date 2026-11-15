import React from 'react';
import {
  IconChevronsLeft,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsRight,
  IconChevronDown,
} from '../../../../components/ui/icons';

/**
 * QuestionPagination
 * Phân trang học thuật chuẩn xác theo thiết kế Figma
 */
export default function QuestionPagination({
  currentPage = 1,
  pageSize = 10,
  totalItems = 1420,
  totalPages = 142,
  onPageChange,
  onPageSizeChange,
}) {
  return (
    <div className="ql-pagination-footer">
      {/* Left info: Page size select + total count text */}
      <div className="ql-pagination-left">
        <span className="ql-pagination-text">Hiển thị</span>

        <div className="ql-page-size-select-wrap">
          <select
            className="ql-page-size-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span className="ql-page-size-arrow">
            <IconChevronDown width={8} height={5} color="#76777D" />
          </span>
        </div>

        <span className="ql-pagination-text">
          trên tổng số {totalItems.toLocaleString()} câu hỏi
        </span>
      </div>

      {/* Right controls: Page buttons */}
      <div className="ql-pagination-controls">
        {/* First page button */}
        <button
          type="button"
          className="ql-page-btn ql-page-btn-nav"
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(1)}
          title="Trang đầu"
        >
          <IconChevronsLeft width={10} height={10} color="#76777D" />
        </button>

        {/* Previous page button */}
        <button
          type="button"
          className="ql-page-btn ql-page-btn-nav"
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          title="Trang trước"
        >
          <IconChevronLeft width={6} height={10} color="#76777D" />
        </button>

        {/* Numbered page buttons */}
        <div className="ql-page-numbers-cluster">
          <button
            type="button"
            className={`ql-page-btn ${currentPage === 1 ? 'ql-page-btn-active' : ''}`}
            onClick={() => onPageChange?.(1)}
          >
            1
          </button>

          <button
            type="button"
            className={`ql-page-btn ${currentPage === 2 ? 'ql-page-btn-active' : ''}`}
            onClick={() => onPageChange?.(2)}
          >
            2
          </button>

          <button
            type="button"
            className={`ql-page-btn ${currentPage === 3 ? 'ql-page-btn-active' : ''}`}
            onClick={() => onPageChange?.(3)}
          >
            3
          </button>

          <span className="ql-page-ellipsis">...</span>

          <button
            type="button"
            className={`ql-page-btn ${currentPage === totalPages ? 'ql-page-btn-active' : ''}`}
            onClick={() => onPageChange?.(totalPages)}
          >
            {totalPages}
          </button>
        </div>

        {/* Next page button */}
        <button
          type="button"
          className="ql-page-btn ql-page-btn-nav"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          title="Trang sau"
        >
          <IconChevronRight width={6} height={10} color="#76777D" />
        </button>

        {/* Last page button */}
        <button
          type="button"
          className="ql-page-btn ql-page-btn-nav"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange?.(totalPages)}
          title="Trang cuối"
        >
          <IconChevronsRight width={10} height={10} color="#76777D" />
        </button>
      </div>
    </div>
  );
}
