import { IconEye, IconVideo } from '../ui/icons';

// Dữ liệu mẫu ca thi live
export const LIVE_EXAM_DATA = {
  examCode: 'Mã ca: CA-2024-02',
  categoryTag: 'MÔN THI BẮT BUỘC',
  title: 'Lập trình Web nâng cao - Đề 01',
  details: 'Lớp: K20-CNTT1 • Phòng: LAB-03 • Giám thị: ThS. Nguyễn Văn A',
  studentsTotal: '45/45',
  timeRemaining: '32:15',
  submittedCount: '12/45',
  progressPercent: 96,
  progressLabel: '96% thời lượng',
};

/**
 * LiveExamMonitor - Module giám sát ca thi đang diễn ra trực tiếp
 */
export default function LiveExamMonitor({ data = LIVE_EXAM_DATA }) {
  return (
    <div className="live-monitor-card">
      {/* Tiêu đề Module + Badge mã ca */}
      <div className="live-monitor-card__header">
        <div className="live-monitor-card__title-group">
          <div className="live-monitor-card__pulse-dot">
            <span className="live-monitor-card__pulse-ring" />
            <span className="live-monitor-card__pulse-core" />
          </div>
          <h2 className="live-monitor-card__heading">Ca thi đang diễn ra</h2>
        </div>
        <span className="live-monitor-card__badge">{data.examCode}</span>
      </div>

      {/* Khung chi tiết thông tin ca thi */}
      <div className="live-monitor-card__canvas">
        <div className="live-monitor-card__canvas-left">
          <span className="live-monitor-card__category">{data.categoryTag}</span>
          <h3 className="live-monitor-card__exam-title">{data.title}</h3>
          <p className="live-monitor-card__meta">{data.details}</p>
        </div>

        {/* Khung số liệu 3 cột */}
        <div className="live-monitor-card__metrics">
          <div className="live-monitor-card__metric-col">
            <span className="live-monitor-card__metric-label">Sĩ số</span>
            <span className="live-monitor-card__metric-val">{data.studentsTotal}</span>
          </div>

          <div className="live-monitor-card__metric-col">
            <span className="live-monitor-card__metric-label">Thời gian còn</span>
            <span className="live-monitor-card__metric-val live-monitor-card__metric-val--timer">
              {data.timeRemaining}
            </span>
          </div>

          <div className="live-monitor-card__metric-col">
            <span className="live-monitor-card__metric-label">Đã nộp</span>
            <span className="live-monitor-card__metric-val">{data.submittedCount}</span>
          </div>
        </div>
      </div>

      {/* Thanh tiến trình thời lượng và các nút điều khiển */}
      <div className="live-monitor-card__controls-row">
        <div className="live-monitor-card__progress-wrap">
          <div className="live-monitor-card__progress-track">
            <div
              className="live-monitor-card__progress-bar"
              style={{ width: `${data.progressPercent}%` }}
            />
          </div>
          <span className="live-monitor-card__progress-text">{data.progressLabel}</span>
        </div>

        <div className="live-monitor-card__actions">
          <button type="button" className="live-btn live-btn--secondary">
            <IconEye width={14} height={12} color="#0B1C30" />
            <span>Bật camera giám sát</span>
          </button>
          <button type="button" className="live-btn live-btn--primary">
            <IconVideo width={14} height={11} color="#FFFFFF" />
            <span>Vào giám thị trực tiếp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
