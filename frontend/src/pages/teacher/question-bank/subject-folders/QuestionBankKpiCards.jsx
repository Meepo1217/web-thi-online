import { IconFolder, IconQuestions, IconCheck } from '../../../../components/ui/icons';

/**
 * QuestionBankKpiCards - Key Metrics / Academic Pulse
 * Chuẩn thông số Figma: 3 thẻ card 82px, shadow 0 1px 2px rgba(0,0,0,0.05), icon box 48x48px
 */
export default function QuestionBankKpiCards({ metrics }) {
  const { totalFolders, totalQuestions, verificationRate } = metrics;

  return (
    <div className="qb-kpi-grid">
      {/* KPI 1: Tổng số thư mục */}
      <div className="qb-kpi-card">
        <div className="qb-kpi-icon-box bg-blue-light">
          <IconFolder width={22} height={19} color="#0051D5" />
        </div>
        <div className="qb-kpi-info">
          <span className="qb-kpi-label">{totalFolders.label}</span>
          <div className="qb-kpi-metric-row">
            <span className="qb-kpi-value">{totalFolders.value}</span>
            <span className="qb-kpi-tag tag-blue">{totalFolders.subtext}</span>
          </div>
        </div>
      </div>

      {/* KPI 2: Tổng số câu hỏi */}
      <div className="qb-kpi-card">
        <div className="qb-kpi-icon-box bg-slate-light">
          <IconQuestions width={18} height={18} color="#0B1C30" />
        </div>
        <div className="qb-kpi-info">
          <span className="qb-kpi-label">{totalQuestions.label}</span>
          <div className="qb-kpi-metric-row">
            <span className="qb-kpi-value">{totalQuestions.value}</span>
            <span className="qb-kpi-tag tag-green">{totalQuestions.subtext}</span>
          </div>
        </div>
      </div>

      {/* KPI 3: Tỷ lệ thẩm định */}
      <div className="qb-kpi-card">
        <div className="qb-kpi-icon-box bg-blue-light">
          <IconCheck width={18} height={18} color="#0051D5" />
        </div>
        <div className="qb-kpi-info">
          <span className="qb-kpi-label">{verificationRate.label}</span>
          <div className="qb-kpi-badges-row">
            <span className="qb-badge-pill">{verificationRate.approved}</span>
            <span className="qb-badge-pill">{verificationRate.pending}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
