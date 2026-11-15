import {
  IconSearch,
  IconClose,
  IconFilter,
  IconChevronDown,
} from '../ui/icons';

/**
 * ExamFilterToolbar - Thanh tìm kiếm, các bộ lọc nhanh và thẻ lọc đang hoạt động
 */
export default function ExamFilterToolbar({
  searchTerm = '',
  onSearchChange,
  onClearSearch,
  subjectOptions = [],
  selectedSubject = 'math',
  onSubjectChange,
  gradeOptions = [],
  selectedGrade = 'grade12',
  onGradeChange,
  sortOptions = [],
  selectedSort = 'newest',
  onSortChange,
  activeTags = [],
  onRemoveTag,
  onClearAllTags,
  onOpenAdvancedFilter,
}) {
  return (
    <div className="exam-filter-section">
      {/* Search, Quick Filter Toolbar */}
      <div className="exam-filter-toolbar">
        {/* Search input */}
        <div className="exam-search-box">
          <span className="exam-search-icon" aria-hidden="true">
            <IconSearch width={15} height={15} color="#76777D" />
          </span>
          <input
            type="text"
            className="exam-search-input"
            placeholder="Tìm kiếm đề thi theo tên, mã đề..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="exam-search-clear-btn"
              onClick={onClearSearch}
              title="Xóa tìm kiếm"
              aria-label="Xóa từ khóa tìm kiếm"
            >
              <IconClose width={9.33} height={9.33} color="#76777D" />
            </button>
          )}
        </div>

        {/* Filter selectors */}
        <div className="exam-selectors-group">
          {/* Advanced Filter Modal trigger */}
          <button
            type="button"
            className="exam-filter-trigger-btn"
            onClick={onOpenAdvancedFilter}
            title="Mở bộ lọc nâng cao"
          >
            <IconFilter width={13.5} height={9} color="#0051D5" />
            <span>Bộ lọc nâng cao</span>
            <span className="exam-filter-dot" aria-label="Đang có bộ lọc áp dụng" />
          </button>

          {/* Subject Dropdown */}
          <div className="exam-select-wrapper">
            <select
              className="exam-select"
              value={selectedSubject}
              onChange={(e) => onSubjectChange(e.target.value)}
              aria-label="Lọc theo môn học"
            >
              {subjectOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="exam-select-arrow" aria-hidden="true">
              <IconChevronDown width={9} height={5.55} color="#76777D" />
            </span>
          </div>

          {/* Grade Dropdown */}
          <div className="exam-select-wrapper">
            <select
              className="exam-select"
              value={selectedGrade}
              onChange={(e) => onGradeChange(e.target.value)}
              aria-label="Lọc theo khối lớp"
            >
              {gradeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="exam-select-arrow" aria-hidden="true">
              <IconChevronDown width={9} height={5.55} color="#76777D" />
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="exam-select-wrapper">
            <select
              className="exam-select"
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sắp xếp danh sách"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="exam-select-arrow" aria-hidden="true">
              <IconChevronDown width={10} height={6} color="#76777D" />
            </span>
          </div>
        </div>
      </div>

      {/* Quick Active Tags */}
      {activeTags.length > 0 && (
        <div className="exam-active-tags-row">
          <span className="exam-active-tags-label">Đang lọc theo:</span>

          <div className="exam-active-tags-list">
            {activeTags.map((tag) => (
              <span key={tag.id} className="exam-tag-pill">
                <span className="exam-tag-text">{tag.label}</span>
                <button
                  type="button"
                  className="exam-tag-remove-btn"
                  onClick={() => onRemoveTag(tag.id)}
                  title={`Xóa lọc ${tag.label}`}
                  aria-label={`Xóa lọc ${tag.label}`}
                >
                  <IconClose width={8.17} height={8.17} color="#003EA8" />
                </button>
              </span>
            ))}
          </div>

          <button
            type="button"
            className="exam-clear-all-tags-btn"
            onClick={onClearAllTags}
          >
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
