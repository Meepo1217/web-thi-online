import {
  IconExams,
  IconSessions,
  IconStudents,
  IconGrading,
  IconTrendUp,
  IconArrowRight,
} from '../ui/icons';

// Dữ liệu mẫu cứng tách biệt khỏi JSX theo quy ước
export const KPI_DATA = [
  {
    id: 'kpi-1',
    title: 'Tổng số đề thi',
    value: '48',
    unit: 'đề',
    trend: '+12%',
    trendLabel: 'so với tháng trước',
    icon: IconExams,
    iconBg: '#EFF4FF',
    iconColor: '#000000',
    type: 'trend',
  },
  {
    id: 'kpi-2',
    title: 'Ca thi hôm nay',
    isLive: true,
    value: '03',
    unit: 'ca thi',
    statusText: '1 ca đang diễn ra trực tiếp',
    icon: IconSessions,
    iconBg: '#D3E4FE',
    iconColor: '#0051D5',
    type: 'status',
  },
  {
    id: 'kpi-3',
    title: 'Thí sinh dự thi',
    value: '1,240',
    unit: 'SV',
    trend: '+5.4%',
    trendLabel: 'tỷ lệ hoàn thành',
    icon: IconStudents,
    iconBg: '#EFF4FF',
    iconColor: '#000000',
    type: 'trend',
  },
  {
    id: 'kpi-4',
    title: 'Cần chấm / Duyệt',
    value: '15',
    unit: 'bài',
    statusText: 'Hạn chót: 24h tới',
    icon: IconGrading,
    iconBg: '#EFF4FF',
    iconColor: '#000000',
    type: 'action',
  },
];

/**
 * KpiCards - Khối 4 thẻ thống kê tổng quan (KPI Summary Cards)
 */
export default function KpiCards({ data = KPI_DATA }) {
  return (
    <section className="kpi-grid" aria-label="Thống kê tổng quan">
      {data.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className="kpi-card">
            {/* Hàng trên: Tiêu đề + Icon box */}
            <div className="kpi-card__header">
              <div className="kpi-card__title-wrap">
                <span className="kpi-card__title">{item.title}</span>
                {item.isLive && <span className="kpi-card__live-dot" />}
              </div>
              <div
                className="kpi-card__icon-box"
                style={{ backgroundColor: item.iconBg }}
              >
                <Icon width={17} height={17} color={item.iconColor} />
              </div>
            </div>

            {/* Hàng giữa: Giá trị lớn + Đơn vị */}
            <div className="kpi-card__body">
              <span className="kpi-card__value">{item.value}</span>
              <span className="kpi-card__unit">{item.unit}</span>
            </div>

            {/* Hàng dưới: Xu hướng hoặc trạng thái */}
            <div className="kpi-card__footer">
              {item.type === 'trend' && (
                <div className="kpi-card__trend">
                  <span className="kpi-card__trend-icon">
                    <IconTrendUp width={12} height={8} color="#0051D5" />
                  </span>
                  <span className="kpi-card__trend-value">{item.trend}</span>
                  <span className="kpi-card__trend-label">{item.trendLabel}</span>
                </div>
              )}

              {item.type === 'status' && (
                <div className="kpi-card__status">
                  <span className="kpi-card__status-dot" />
                  <span className="kpi-card__status-text">{item.statusText}</span>
                </div>
              )}

              {item.type === 'action' && (
                <div className="kpi-card__action">
                  <span className="kpi-card__action-text">{item.statusText}</span>
                  <span className="kpi-card__action-icon">
                    <IconArrowRight width={8} height={10} color="#0051D5" />
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
