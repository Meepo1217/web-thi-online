import {
  IconSearch,
  IconChevronDown,
  IconViewGrid,
  IconViewList,
} from '../../../../components/ui/icons';

/**
 * QuestionBankFilterBar - Thanh tìm kiếm và bộ lọc nhanh khối lớp
 * Chuẩn thông số Figma: 48px, nền trắng bo 8px, tab chuyển khối lớp và nút chuyển đổi chế độ xem
 */
export default function QuestionBankFilterBar({
  searchTerm = '',
  onSearchChange,
  activeGrade = 'all',
  onGradeChange,
  gradeTabs = [],
  sortOrder = 'newest',
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
}) {
  return (
    <div className="qb-filter-bar">
      {/* Left side: Search input + Grade level tabs */}
      <div className="qb-filter-left">
        {/* Fast Search input */}
        <div className="qb-search-input-box">
          <IconSearch width={15} height={15} color="#76777D" />
          <input
            type="text"
            className="qb-search-input"
            placeholder="Tìm kiếm nhanh mã môn, tên chuyên đề..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Grade tabs */}
        <div className="qb-grade-tabs-container" role="tablist">
          {gradeTabs.map((tab) => {
            const isActive = tab.id === activeGrade;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`qb-grade-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => onGradeChange(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side: Sort + View switchers */}
      <div className="qb-filter-right">
        <span className="qb-sort-label">Sắp xếp:</span>

        <button
          type="button"
          className="qb-sort-dropdown-btn"
          onClick={onSortChange}
          title="Chọn thứ tự sắp xếp"
        >
          <span>Mới nhất</span>
          <IconChevronDown width={8} height={5} color="#0B1C30" />
        </button>

        <span className="qb-vertical-divider" aria-hidden="true" />

        <div className="qb-view-mode-buttons">
          <button
            type="button"
            className={`qb-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Chế độ xem lưới (Grid)"
            aria-label="Chế độ xem lưới"
          >
            <IconViewGrid
              width={13.5}
              height={13.5}
              color={viewMode === 'grid' ? '#0051D5' : '#76777D'}
            />
          </button>
          <button
            type="button"
            className={`qb-view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => onViewModeChange('list')}
            title="Chế độ xem danh sách (List)"
            aria-label="Chế độ xem danh sách"
          >
            <IconViewList
              width={15}
              height={12}
              color={viewMode === 'list' ? '#0051D5' : '#76777D'}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
