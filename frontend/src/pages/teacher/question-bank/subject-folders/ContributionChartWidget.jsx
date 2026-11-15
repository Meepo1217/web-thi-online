/**
 * ContributionChartWidget - Biểu đồ tốc độ biên soạn & đóng góp câu hỏi
 * Tái hiện chính xác biểu đồ SVG Sparkline và chỉ số KPI từ bản vẽ Figma
 */
export default function ContributionChartWidget({ analytics, onOpenKpiDetail }) {
  const { growthRate, subtitle, semesterGoal, weeks } = analytics;

  return (
    <div className="qb-chart-card">
      <div className="qb-chart-header">
        <div className="qb-chart-title-row">
          <h3 className="qb-chart-title">Tốc độ đóng góp</h3>
          <span className="qb-growth-badge">{growthRate}</span>
        </div>
        <p className="qb-chart-subtitle">{subtitle}</p>
      </div>

      {/* Inline SVG Academic Chart */}
      <div className="qb-svg-chart-container">
        <svg
          className="qb-svg-chart"
          viewBox="0 0 368 112"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="112" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0051D5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0051D5" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path
            d="M 16 95 Q 80 80, 123 65 T 235 30 T 346 15 L 346 112 L 16 112 Z"
            fill="url(#areaGradient)"
          />

          {/* Line stroke */}
          <path
            d="M 16 95 Q 80 80, 123 65 T 235 30 T 346 15"
            fill="none"
            stroke="#0051D5"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Points */}
          <circle cx="16" cy="95" r="4" fill="#FFFFFF" stroke="#0051D5" strokeWidth="2.8" />
          <circle cx="123" cy="65" r="4.5" fill="#FFFFFF" stroke="#0051D5" strokeWidth="2.8" />
          <circle cx="235" cy="30" r="4.5" fill="#FFFFFF" stroke="#0051D5" strokeWidth="2.8" />
          <circle cx="346" cy="15" r="5.5" fill="#0051D5" stroke="#FFFFFF" strokeWidth="2.8" />
        </svg>

        {/* Week labels */}
        <div className="qb-chart-weeks-row">
          {weeks.map((week, idx) => (
            <span
              key={week}
              className={`qb-chart-week-label ${idx === weeks.length - 1 ? 'active' : ''}`}
            >
              {week}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom KPI highlight box */}
      <div className="qb-chart-kpi-box">
        <div className="qb-chart-kpi-text">
          <span className="qb-kpi-target-label">MỤC TIÊU HỌC KỲ 1</span>
          <span className="qb-kpi-target-value">{semesterGoal}</span>
        </div>

        <button
          type="button"
          className="qb-btn-kpi-detail"
          onClick={onOpenKpiDetail}
        >
          Chi tiết KPI
        </button>
      </div>
    </div>
  );
}
