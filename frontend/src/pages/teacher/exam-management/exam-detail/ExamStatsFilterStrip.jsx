import React from 'react';
import {
  IconQuestions,
  IconClock,
  IconGrading,
  IconExams,
} from '../../../../components/ui/icons';

/**
 * ExamStatsFilterStrip
 * 4 thẻ thống kê nhanh (Số câu, Thời gian, Tổng điểm, Hình thức) + Bộ lọc Chương & Mức độ Bloom
 */
export default function ExamStatsFilterStrip({
  metrics = [],
  chapterFilters = [],
  bloomFilters = [],
  activeChapter = 'all',
  activeBloom = 'all',
  onChapterChange,
  onBloomChange,
}) {
  const renderMetricIcon = (iconType) => {
    switch (iconType) {
      case 'questions':
        return <IconQuestions width={18} height={18} color="#0051D5" />;
      case 'clock':
        return <IconClock width={18} height={18} color="#0051D5" />;
      case 'score':
        return <IconGrading width={16.5} height={19} color="#0051D5" />;
      case 'format':
      default:
        return <IconExams width={18} height={15} color="#0051D5" />;
    }
  };

  return (
    <section className="ed-stats-filter-card" aria-label="Thống kê nhanh và bộ lọc đề thi">
      {/* 1. Quick Metric Counters (4 items) */}
      <div className="ed-metrics-row">
        {metrics.map((metric) => (
          <div key={metric.id} className="ed-metric-box">
            <div className="ed-metric-icon-box" aria-hidden="true">
              {renderMetricIcon(metric.icon)}
            </div>
            <div className="ed-metric-info">
              <span className="ed-metric-label">{metric.label}</span>
              <span className="ed-metric-value">{metric.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Filters: Chapters and Bloom Taxonomies */}
      <div className="ed-filters-stack">
        {/* Chapter tags */}
        <div className="ed-filter-row ed-chapter-tags-row" role="group" aria-label="Lọc theo chương">
          <span className="ed-filter-label">CHƯƠNG:</span>
          {chapterFilters.map((chap) => {
            const isActive = activeChapter === chap.id;
            return (
              <button
                key={chap.id}
                type="button"
                className={`ed-chapter-pill ${isActive ? 'is-active' : ''}`}
                onClick={() => onChapterChange(chap.id)}
              >
                {chap.label}
              </button>
            );
          })}
        </div>

        {/* Bloom taxonomy filters */}
        <div className="ed-filter-row ed-bloom-filters-row" role="group" aria-label="Lọc theo mức độ nhận thức">
          <span className="ed-filter-label">MỨC ĐỘ:</span>
          {bloomFilters.map((bloom) => {
            const isActive = activeBloom === bloom.id;
            return (
              <button
                key={bloom.id}
                type="button"
                className={`ed-bloom-pill ${isActive ? 'is-active' : ''}`}
                onClick={() => onBloomChange(bloom.id)}
              >
                {bloom.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
