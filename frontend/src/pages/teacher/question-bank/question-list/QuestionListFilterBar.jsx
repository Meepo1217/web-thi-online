import React from 'react';
import { IconSearch, IconChevronDown, IconClose } from '../../../../components/ui/icons';
import { FILTER_OPTIONS } from './questionListData';

/**
 * QuestionListFilterBar
 * Thanh tìm kiếm thông minh + 4 dropdown lọc + Dải chip bộ lọc đang hoạt động
 */
export default function QuestionListFilterBar({
  searchTerm = '',
  onSearchChange,
  filters = {
    chapter: 'all',
    bloom: 'all',
    format: 'all',
    status: 'all',
  },
  onFilterChange,
  activeChips = [
    { id: 'grade', label: 'TOÁN 12', color: 'blue' },
    { id: 'bloom', label: 'VẬN DỤNG CAO', color: 'slate' },
  ],
  onRemoveChip,
  onClearAllFilters,
}) {
  return (
    <div className="ql-filter-container">
      {/* Top row: Search + Select Dropdowns */}
      <div className="ql-filter-top-row">
        {/* Search input with leading icon */}
        <div className="ql-search-wrapper">
          <span className="ql-search-icon">
            <IconSearch width={15} height={15} color="#76777D" />
          </span>
          <input
            type="text"
            className="ql-search-input"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm nội dung công thức, từ khóa, mã câu (#MATH-12-0482)..."
          />
        </div>

        {/* Dropdown: Chương */}
        <div className="ql-select-wrapper">
          <select
            className="ql-select"
            value={filters.chapter}
            onChange={(e) => onFilterChange('chapter', e.target.value)}
          >
            {FILTER_OPTIONS.chapters.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="ql-select-arrow">
            <IconChevronDown width={9} height={6} color="#76777D" />
          </span>
        </div>

        {/* Dropdown: Mức độ Bloom */}
        <div className="ql-select-wrapper">
          <select
            className="ql-select"
            value={filters.bloom}
            onChange={(e) => onFilterChange('bloom', e.target.value)}
          >
            {FILTER_OPTIONS.bloomLevels.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="ql-select-arrow">
            <IconChevronDown width={9} height={6} color="#76777D" />
          </span>
        </div>

        {/* Dropdown: Định dạng */}
        <div className="ql-select-wrapper">
          <select
            className="ql-select"
            value={filters.format}
            onChange={(e) => onFilterChange('format', e.target.value)}
          >
            {FILTER_OPTIONS.formats.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="ql-select-arrow">
            <IconChevronDown width={9} height={6} color="#76777D" />
          </span>
        </div>

        {/* Dropdown: Trạng thái */}
        <div className="ql-select-wrapper ql-select-compact">
          <select
            className="ql-select"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            {FILTER_OPTIONS.statuses.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="ql-select-arrow">
            <IconChevronDown width={9} height={6} color="#76777D" />
          </span>
        </div>
      </div>

      {/* Bottom row: Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="ql-chips-row">
          <span className="ql-chips-label">ĐANG LỌC:</span>

          {activeChips.map((chip) => (
            <div
              key={chip.id}
              className={`ql-chip ${chip.color === 'blue' ? 'ql-chip-blue' : 'ql-chip-slate'}`}
            >
              <span className="ql-chip-text">{chip.label}</span>
              <button
                type="button"
                className="ql-chip-remove"
                onClick={() => onRemoveChip(chip.id)}
                aria-label={`Xóa bộ lọc ${chip.label}`}
              >
                <IconClose width={8} height={8} color="currentColor" />
              </button>
            </div>
          ))}

          <button
            type="button"
            className="ql-clear-all-btn"
            onClick={onClearAllFilters}
          >
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
