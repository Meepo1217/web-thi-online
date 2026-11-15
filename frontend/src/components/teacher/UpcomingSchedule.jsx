import { IconCalendar } from '../ui/icons';

// Dữ liệu mẫu danh sách lịch sắp tới
export const UPCOMING_SCHEDULE_DATA = [
  {
    id: 'event-1',
    dayOfWeek: 'TH 2',
    dayNumber: '18',
    title: 'Thi giữa kỳ HK2',
    timeRoom: '08:00 - 10:00 • LAB 02',
    statusTag: 'Ca thi số 01',
    isLiveTag: true,
  },
  {
    id: 'event-2',
    dayOfWeek: 'TH 4',
    dayNumber: '20',
    title: 'Họp hội đồng ra đề',
    timeRoom: '14:00 - 16:30 • P.Hội thảo A',
    statusTag: 'Chốt đề thi môn Toán',
    isLiveTag: false,
  },
  {
    id: 'event-3',
    dayOfWeek: 'TH 6',
    dayNumber: '22',
    title: 'Hạn chót nộp điểm',
    timeRoom: 'Trước 17:00 • Cổng đào tạo',
    statusTag: 'Lớp K20-CNTT1',
    isLiveTag: false,
  },
];

/**
 * UpcomingSchedule - Module lịch sắp tới của giảng viên
 */
export default function UpcomingSchedule({
  events = UPCOMING_SCHEDULE_DATA,
  month = 'Tháng 11',
}) {
  return (
    <div className="upcoming-schedule-card">
      {/* Tiêu đề Module & Tháng */}
      <div className="upcoming-schedule-card__header">
        <div className="upcoming-schedule-card__title-group">
          <IconCalendar width={17} height={18} color="#0051D5" />
          <h2 className="upcoming-schedule-card__heading">Lịch sắp tới</h2>
        </div>
        <span className="upcoming-schedule-card__month">{month}</span>
      </div>

      {/* Danh sách các sự kiện */}
      <div className="upcoming-schedule-card__list">
        {events.map((event) => (
          <div key={event.id} className="schedule-item">
            {/* Hộp ngày: 48x48 nền #E5EEFF */}
            <div className="schedule-item__date-box">
              <span className="schedule-item__day-week">{event.dayOfWeek}</span>
              <span className="schedule-item__day-number">{event.dayNumber}</span>
            </div>

            {/* Chi tiết sự kiện */}
            <div className="schedule-item__content">
              <h4 className="schedule-item__title">{event.title}</h4>
              <span className="schedule-item__time">{event.timeRoom}</span>
              <div className="schedule-item__tag-row">
                {event.isLiveTag ? (
                  <span className="schedule-item__tag schedule-item__tag--live">
                    <span className="schedule-item__tag-dot" />
                    {event.statusTag}
                  </span>
                ) : (
                  <span className="schedule-item__tag schedule-item__tag--default">
                    {event.statusTag}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
