import React from 'react';
import { IconTrendUp } from '../../../../components/ui/icons';

/**
 * QuestionPerformanceCard
 * Thẻ thống kê hiệu suất câu hỏi: Lượt làm, Tỷ lệ đúng, Chỉ số phân cách, Phân bố lựa chọn A/B/C/D
 */
export default function QuestionPerformanceCard({ stats }) {
  return (
    <div className="qd-side-card">
      {/* Header */}
      <div className="qd-side-header qd-stats-header">
        <div className="qd-stats-header-left">
          <IconTrendUp width={15} height={15} color="#0051D5" />
          <h2 className="qd-side-title">Thống kê câu hỏi</h2>
        </div>
        <span className="qd-standardized-badge">ĐÃ CHUẨN HÓA</span>
      </div>

      {/* Main Metric Grid: 2 Boxes */}
      <div className="qd-stats-metrics-grid">
        {/* Box 1: Lượt làm bài */}
        <div className="qd-metric-box">
          <span className="qd-metric-label">Lượt làm bài</span>
          <span className="qd-metric-val">{stats.totalAttempts}</span>
          <div className="qd-metric-trend">
            <svg width="11.67" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 6L5.5 1.5L8.5 4.5L11 2" stroke="#069669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{stats.attemptsTrend}</span>
          </div>
        </div>

        {/* Box 2: Tỷ lệ trả lời đúng */}
        <div className="qd-metric-box">
          <span className="qd-metric-label">Tỷ lệ trả lời đúng</span>
          <span className="qd-metric-val qd-val-blue">{stats.correctRate}</span>
          <span className="qd-metric-sub">{stats.classification}</span>
        </div>
      </div>

      {/* Discrimination Index Bar (Độ phân cách) */}
      <div className="qd-discrimination-box">
        <div className="qd-disc-header">
          <span className="qd-disc-label">Chỉ số phân cách (Discrimination):</span>
          <span className="qd-disc-badge">
            {stats.discriminationIndex} - {stats.discriminationLabel}
          </span>
        </div>
        <div className="qd-disc-track">
          <span
            className="qd-disc-fill"
            style={{ width: `${stats.discriminationPercent}%` }}
          />
        </div>
        <p className="qd-disc-note">{stats.discriminationNote}</p>
      </div>

      {/* Option Selection Distribution Chart */}
      <div className="qd-distribution-section">
        <span className="qd-dist-title">Phân bố học sinh chọn đáp án:</span>
        <div className="qd-dist-bars-list">
          {stats.selectionDistribution?.map((item) => (
            <div key={item.key} className="qd-dist-row">
              <span className={`qd-dist-key ${item.isCorrect ? 'qd-key-correct' : ''}`}>
                {item.key}
              </span>
              <div className="qd-dist-bar-track">
                <span
                  className={`qd-dist-bar-fill ${
                    item.isCorrect ? 'qd-bar-correct' : 'qd-bar-normal'
                  }`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <span className={`qd-dist-percent ${item.isCorrect ? 'qd-percent-correct' : ''}`}>
                {item.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
