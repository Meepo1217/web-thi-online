import React from 'react';
import { IconViewGrid } from '../../../../components/ui/icons';

/**
 * ExamMatrixSidebar
 * Cột phải dính (sticky): Bảng điều hướng 50 câu hỏi + Ma trận Bloom + Thông số ngân hàng đề
 */
export default function ExamMatrixSidebar({
  totalQuestions = 50,
  loadedCount = 5,
  activeQuestionIds = [1, 2],
  bloomDistribution = [],
  specs = [],
  onSelectQuestionNumber,
}) {
  const numbers = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  return (
    <aside className="ed-right-sticky" aria-label="Bảng ma trận câu hỏi và thông số đề thi">
      {/* 1. Question Matrix Navigation Card */}
      <div className="ed-side-card">
        <div className="ed-side-card-header">
          <div className="ed-side-header-left">
            <IconViewGrid width={13.5} height={13.5} color="#0051D5" />
            <h2 className="ed-side-heading">Bảng câu hỏi</h2>
          </div>
          <span className="ed-side-count">{totalQuestions} câu</span>
        </div>

        {/* Bloom Difficulty Summary Bar */}
        <div className="ed-bloom-summary">
          <div className="ed-bloom-summary-header">
            <span className="ed-bloom-summary-label">Phân bổ mức độ nhận thức</span>
            <span className="ed-bloom-summary-badge">Chuẩn ma trận</span>
          </div>

          <div className="ed-progress-multibar" aria-hidden="true">
            {bloomDistribution.map((seg) => (
              <div
                key={seg.id}
                className="ed-progress-seg"
                style={{ width: `${seg.percent}%`, backgroundColor: seg.color }}
              />
            ))}
          </div>

          <div className="ed-bloom-legend-grid">
            {bloomDistribution.map((seg) => (
              <div key={seg.id} className="ed-bloom-legend-item">
                <span
                  className="ed-legend-dot"
                  style={{ backgroundColor: seg.color }}
                  aria-hidden="true"
                />
                <span className="ed-legend-text">{seg.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Matrix Grid for 50 Questions */}
        <div className="ed-matrix-section">
          <div className="ed-matrix-label">BẤM VÀO SỐ CÂU ĐỂ XEM NHANH:</div>

          <div className="ed-matrix-grid">
            {numbers.map((num) => {
              const isActive = activeQuestionIds.includes(num);
              const isLoaded = num <= loadedCount;
              let tileStateClass = 'is-unloaded';
              if (isActive) {
                tileStateClass = 'is-active';
              } else if (isLoaded) {
                tileStateClass = 'is-loaded';
              }

              return (
                <button
                  key={num}
                  type="button"
                  className={`ed-matrix-tile ${tileStateClass}`}
                  onClick={() => onSelectQuestionNumber?.(num)}
                  title={`Đi tới Câu ${num}`}
                  aria-label={`Câu ${num}`}
                >
                  {String(num).padStart(2, '0')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Palette Legend */}
        <div className="ed-palette-legend">
          <div className="ed-palette-legend-item">
            <span className="ed-palette-swatch is-active" aria-hidden="true" />
            <span>Đang xem</span>
          </div>
          <div className="ed-palette-legend-item">
            <span className="ed-palette-swatch is-loaded" aria-hidden="true" />
            <span>Đã tải</span>
          </div>
          <div className="ed-palette-legend-item">
            <span className="ed-palette-swatch is-unloaded" aria-hidden="true" />
            <span>Chưa tải</span>
          </div>
        </div>
      </div>

      {/* 2. Meta Specification Card */}
      <div className="ed-side-card ed-specs-card">
        <h3 className="ed-side-heading">Thông số ngân hàng đề</h3>

        <div className="ed-specs-list">
          {specs.map((row, idx) => (
            <div
              key={row.label}
              className={`ed-spec-row ${idx < specs.length - 1 ? 'has-border' : ''}`}
            >
              <span className="ed-spec-label">{row.label}</span>
              <span className={`ed-spec-value ${row.isHighlight ? 'is-green' : ''}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
