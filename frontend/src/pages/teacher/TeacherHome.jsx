import { useNavigate } from 'react-router-dom';
import {
  IconDownload,
  IconPlus,
  IconVideo,
} from '../../components/ui/icons';
import KpiCards from '../../components/teacher/KpiCards';
import LiveExamMonitor from '../../components/teacher/LiveExamMonitor';
import RecentExamsTable from '../../components/teacher/RecentExamsTable';
import UpcomingSchedule from '../../components/teacher/UpcomingSchedule';
import RecentActivityAlerts from '../../components/teacher/RecentActivityAlerts';
import QuickToolShortcuts from '../../components/teacher/QuickToolShortcuts';
import './teacher-home.css';

// Dữ liệu tiêu đề và thông tin giảng viên
const TEACHER_HEADER_DATA = {
  title: 'Trang chủ giáo viên',
  term: 'HỌC KỲ II - 2024',
  greeting: 'Xin chào,',
  teacherName: 'ThS. Nguyễn Văn A',
  notice: '- Hôm nay bạn có 2 ca thi trực tiếp.',
};

/**
 * TeacherHome - Trang chủ giáo viên chuẩn thiết kế Figma
 * Ghép: Thanh tiêu đề + 3 nút hành động nhanh; 4 thẻ KPI; bố cục 2 cột (trái 8 cột, phải 4 cột)
 */
export default function TeacherHome() {
  const navigate = useNavigate();

  const handleExportReport = () => {
    navigate('/teacher/statistics');
  };

  const handleCreateExam = () => {
    navigate('/teacher/exams');
  };

  const handleEnterLiveRoom = () => {
    navigate('/teacher/sessions');
  };

  return (
    <div className="teacher-home-page">
      {/* 1. TOP HEADER / ACTION BAR */}
      <section className="teacher-home-header">
        <div className="teacher-home-header__title-section">
          <div className="teacher-home-header__title-row">
            <h1 className="teacher-home-header__title">
              {TEACHER_HEADER_DATA.title}
            </h1>
            <div className="teacher-home-header__term-badge">
              <span className="teacher-home-header__term-dot" />
              <span className="teacher-home-header__term-text">
                {TEACHER_HEADER_DATA.term}
              </span>
            </div>
          </div>

          <p className="teacher-home-header__subtitle">
            <span>{TEACHER_HEADER_DATA.greeting}</span>
            <span className="teacher-home-header__user-highlight">
              {TEACHER_HEADER_DATA.teacherName}
            </span>
            <span>{TEACHER_HEADER_DATA.notice}</span>
          </p>
        </div>

        {/* 3 Nút hành động nhanh */}
        <div className="teacher-home-header__actions">
          <button
            type="button"
            className="action-btn action-btn--white"
            onClick={handleExportReport}
          >
            <IconDownload width={12} height={12} color="#0B1C30" />
            <span>Xuất báo cáo</span>
          </button>

          <button
            type="button"
            className="action-btn action-btn--soft-blue"
            onClick={handleCreateExam}
          >
            <IconPlus width={12} height={12} color="#0051D5" />
            <span>Tạo đề thi mới</span>
          </button>

          <button
            type="button"
            className="action-btn action-btn--black"
            onClick={handleEnterLiveRoom}
          >
            <IconVideo width={15} height={12} color="#FFFFFF" />
            <span>Vào phòng thi</span>
          </button>
        </div>
      </section>

      {/* 2. KHỐI 4 THẺ KPI SUMMARY CARDS */}
      <KpiCards />

      {/* 3. BỐ CỤC 2 CỘT (Cột trái 8/12, Cột phải 4/12) */}
      <section className="teacher-home-grid">
        {/* CỘT TRÁI (8 Cột) */}
        <div className="teacher-home-grid__left">
          {/* Module 1: Ca thi đang diễn ra */}
          <LiveExamMonitor />

          {/* Module 2: Bảng đề thi gần đây (có tìm kiếm, lọc, phân trang) */}
          <RecentExamsTable />
        </div>

        {/* CỘT PHẢI (4 Cột) */}
        <div className="teacher-home-grid__right">
          {/* Module 1: Lịch sắp tới */}
          <UpcomingSchedule />

          {/* Module 2: Hoạt động & Cảnh báo */}
          <RecentActivityAlerts />

          {/* Module 3: Công cụ trợ giảng */}
          <QuickToolShortcuts />
        </div>
      </section>
    </div>
  );
}
