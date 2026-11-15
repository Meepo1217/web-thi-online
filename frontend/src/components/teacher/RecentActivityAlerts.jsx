import { IconBell } from '../ui/icons';

// Dữ liệu mẫu hoạt động và cảnh báo
export const RECENT_LOGS_DATA = [
  {
    id: 'log-1',
    message: 'Thí sinh Nguyễn Văn An vừa nộp bài thi môn Toán THPT.',
    time: 'Vừa xong',
    timeColor: '#0051D5',
    extra: 'Phòng 102',
    dotColor: '#0051D5',
    isAlert: false,
  },
  {
    id: 'log-2',
    message: 'Đề Tiếng Anh chuyên ngành đã được hệ thống tự động hoán vị xáo 4 mã đề.',
    time: '14 phút trước',
    timeColor: '#45464D',
    extra: null,
    dotColor: '#45464D',
    isAlert: false,
  },
  {
    id: 'log-3',
    message: 'Phát hiện 1 thí sinh chuyển tab màn hình tại Ca 01. Hệ thống đã lưu trữ snapshot.',
    time: '18 phút trước',
    timeColor: '#45464D',
    actionText: 'Xem vi phạm',
    dotColor: '#0051D5',
    isAlert: true, // nền #EFF4FF, bo 4px
  },
];

/**
 * RecentActivityAlerts - Module danh sách hoạt động và cảnh báo hệ thống
 */
export default function RecentActivityAlerts({
  logs = RECENT_LOGS_DATA,
  onViewAll,
}) {
  return (
    <div className="activity-alerts-card">
      {/* Tiêu đề Module & Nút Xem tất cả */}
      <div className="activity-alerts-card__header">
        <div className="activity-alerts-card__title-group">
          <IconBell width={17} height={17} color="#000000" />
          <h2 className="activity-alerts-card__heading">Hoạt động & Cảnh báo</h2>
        </div>
        <button
          type="button"
          className="activity-alerts-card__view-all"
          onClick={onViewAll}
        >
          Xem tất cả
        </button>
      </div>

      {/* Danh sách các logs */}
      <div className="activity-alerts-card__list">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`activity-log-item ${log.isAlert ? 'activity-log-item--alert' : ''}`}
          >
            {/* Chấm tròn trạng thái */}
            <div className="activity-log-item__dot-wrap">
              <span
                className="activity-log-item__dot"
                style={{ backgroundColor: log.dotColor }}
              />
            </div>

            {/* Nội dung thông báo & thời gian */}
            <div className="activity-log-item__content">
              <p className="activity-log-item__msg">{log.message}</p>
              <div className="activity-log-item__meta-row">
                {log.actionText && (
                  <button type="button" className="activity-log-item__action-btn">
                    {log.actionText}
                  </button>
                )}
                <span
                  className="activity-log-item__time"
                  style={{ color: log.timeColor }}
                >
                  {log.time}
                </span>
                {log.extra && (
                  <span className="activity-log-item__extra">{log.extra}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
