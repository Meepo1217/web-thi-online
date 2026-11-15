import {
  IconChevronDown,
  IconChevronsLeft,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsRight,
} from '../ui/icons';

/**
 * ExamPagination - Phân trang và tùy chọn hiển thị số lượng đề thi
 * Chuẩn thông số Figma: chiều cao 80px, shadow trên rgba(198, 198, 205, 0.25)
 */
export default function ExamPagination({
  currentPage = 1,
  pageSize = 10,
  totalItems = 48,
  onPageChange,
  onPageSizeChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="exam-pagination-bar">
      {/* Information & Page size selector */}
      <div className="exam-pagination-left">
        <span className="exam-pagination-info">
          Đang hiển thị {startItem}-{endItem} của {totalItems} đề thi
        </span>

        <div className="exam-page-size-wrapper">
          <select
            className="exam-page-size-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Chọn số lượng đề thi trên một trang"
          >
            <option value={10}>10 đề / trang</option>
            <option value={20}>20 đề / trang</option>
            <option value={50}>50 đề / trang</option>
          </select>
          <span className="exam-page-size-arrow" aria-hidden="true">
            <IconChevronDown width={7} height={4.32} color="#76777D" />
          </span>
        </div>
      </div>

      {/* Pagination Navigation buttons */}
      <div className="exam-pagination-nav">
        {/* First page */}
        <button
          type="button"
          className="exam-page-btn nav-btn"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
          title="Trang đầu"
          aria-label="Về trang đầu tiên"
        >
          <IconChevronsLeft
            width={9.33}
            height={8}
            color={currentPage <= 1 ? '#C6C6CD' : '#76777D'}
          />
        </button>

        {/* Previous page */}
        <button
          type="button"
          className="exam-page-btn nav-btn"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          title="Trang trước"
          aria-label="Sang trang trước"
        >
          <IconChevronLeft
            width={4.93}
            height={8}
            color={currentPage <= 1 ? '#C6C6CD' : '#76777D'}
          />
        </button>

        {/* Page numbers: 1, 2, 3, 4, ..., 12 */}
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            type="button"
            className={`exam-page-btn page-number ${
              currentPage === page ? 'active' : ''
            }`}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {totalPages > 5 && (
          <span className="exam-page-ellipsis" aria-hidden="true">
            ...
          </span>
        )}

        {totalPages >= 5 && (
          <button
            type="button"
            className={`exam-page-btn page-number ${
              currentPage === 12 ? 'active' : ''
            }`}
            onClick={() => onPageChange(12)}
            aria-current={currentPage === 12 ? 'page' : undefined}
          >
            12
          </button>
        )}

        {/* Next page */}
        <button
          type="button"
          className="exam-page-btn nav-btn"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          title="Trang kế tiếp"
          aria-label="Sang trang kế tiếp"
        >
          <IconChevronRight
            width={4.93}
            height={8}
            color={currentPage >= totalPages ? '#C6C6CD' : '#0B1C30'}
          />
        </button>

        {/* Last page */}
        <button
          type="button"
          className="exam-page-btn nav-btn"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(totalPages)}
          title="Trang cuối"
          aria-label="Đến trang cuối cùng"
        >
          <IconChevronsRight
            width={9.33}
            height={8}
            color={currentPage >= totalPages ? '#C6C6CD' : '#0B1C30'}
          />
        </button>
      </div>
    </div>
  );
}
