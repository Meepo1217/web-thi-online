import { useLocation, Link } from 'react-router-dom';
import {
  IconDashboard,
  IconQuestions,
  IconExams,
  IconArrowRight,
} from '../../components/ui/icons';

// Bảng ánh xạ thông tin các phân hệ Giảng viên
const ROUTE_INFO_MAP = {
  '/teacher/schedule': {
    title: 'Lịch giảng & Ca thi',
    group: 'TỔNG QUAN',
    desc: 'Quản lý thời khóa biểu giảng dạy, lịch thi và phân công giám thị theo từng học kỳ.',
  },
  '/teacher/sessions': {
    title: 'Ca thi',
    group: 'QUẢN LÝ THI',
    desc: 'Giám sát trực tiếp các ca thi trực tuyến, theo dõi trạng thái thí sinh trong thời gian thực.',
  },
  '/teacher/results': {
    title: 'Kết quả bài làm',
    group: 'CHẤM THI',
    desc: 'Quản lý điểm số, phân tích phổ điểm sinh viên và chấm điểm bài làm tự luận.',
  },
  '/teacher/students': {
    title: 'Danh sách sinh viên',
    group: 'CHẤM THI',
    desc: 'Quản lý hồ sơ học viên, xem lịch sử làm bài và tổng hợp kết quả thi cá nhân.',
  },
  '/teacher/statistics': {
    title: 'Báo cáo thống kê',
    group: 'HỆ THỐNG',
    desc: 'Báo cáo tổng hợp chất lượng đề thi, độ phân loại câu hỏi và hiệu suất đào tạo.',
  },
  '/teacher/settings': {
    title: 'Cài đặt tài khoản',
    group: 'HỆ THỐNG',
    desc: 'Tùy chỉnh thông tin hồ sơ cá nhân, đổi mật khẩu và cấu hình thông báo hệ thống.',
  },
  '/teacher/help': {
    title: 'Hướng dẫn sử dụng',
    group: 'HỆ THỐNG',
    desc: 'Tài liệu hướng dẫn thao tác, sơ đồ quy trình và giải đáp câu hỏi thường gặp dành cho Giảng viên.',
  },
};

/**
 * TeacherDashboard - Trang hiển thị cho các phân hệ chức năng Giảng viên
 * Tự động đồng bộ với URL hiện tại từ Sidebar, tuân thủ đúng App Shell & Design System
 */
export default function TeacherDashboard({ title: customTitle, description: customDesc }) {
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, '');
  const info = ROUTE_INFO_MAP[currentPath] || {
    title: customTitle || 'Tính năng Giảng viên',
    group: 'PHÂN HỆ GIẢNG VIÊN',
    desc: customDesc || 'Khung Master Page (App Shell) đã kết nối đường dẫn thành công.',
  };

  const title = customTitle || info.title;
  const desc = customDesc || info.desc;

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1280px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      {/* 1. Breadcrumbs */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
          fontSize: '13px',
          color: '#76777D',
        }}
      >
        <Link
          to="/teacher/dashboard"
          style={{ color: '#0051D5', textDecoration: 'none', fontWeight: 500 }}
        >
          Trang chủ
        </Link>
        <span>/</span>
        <span style={{ color: '#45464D', fontWeight: 600 }}>{title}</span>
      </nav>

      {/* 2. Header Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          padding: '24px 28px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          border: '1px solid #E2E8F0',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              color: '#0051D5',
              background: '#EFF4FF',
              padding: '3px 8px',
              borderRadius: '6px',
              textTransform: 'uppercase',
            }}
          >
            {info.group}
          </span>
          <span
            style={{
              fontSize: '12px',
              color: '#16A34A',
              fontWeight: 600,
              background: '#F0FDF4',
              padding: '3px 8px',
              borderRadius: '6px',
            }}
          >
            ● Đường dẫn hoạt động chính xác
          </span>
        </div>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#0B1C30',
            margin: '0 0 8px 0',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: '#45464D',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {desc}
        </p>
      </div>

      {/* 3. Phím tắt điều hướng nhanh */}
      <div style={{ marginBottom: '16px' }}>
        <h2
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#0B1C30',
            margin: '0 0 12px 0',
          }}
        >
          Phím tắt đến các màn hình đã hoàn thiện
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          <Link
            to="/teacher/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#EFF4FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0051D5',
                }}
              >
                <IconDashboard width={18} height={18} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#0B1C30' }}>
                  Trang chủ Giảng viên
                </div>
                <div style={{ fontSize: '12px', color: '#76777D' }}>
                  KPI, ca thi trực tiếp, bảng đề thi gần đây
                </div>
              </div>
            </div>
            <IconArrowRight width={6} height={10} color="#76777D" />
          </Link>

          <Link
            to="/teacher/questions"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#EFF4FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0051D5',
                }}
              >
                <IconQuestions width={18} height={18} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#0B1C30' }}>
                  Ngân hàng câu hỏi
                </div>
                <div style={{ fontSize: '12px', color: '#76777D' }}>
                  Môn học, chương, danh sách & chi tiết câu hỏi
                </div>
              </div>
            </div>
            <IconArrowRight width={6} height={10} color="#76777D" />
          </Link>

          <Link
            to="/teacher/exams"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#EFF4FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0051D5',
                }}
              >
                <IconExams width={18} height={18} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#0B1C30' }}>
                  Quản lý đề thi
                </div>
                <div style={{ fontSize: '12px', color: '#76777D' }}>
                  Danh sách đề thi và cấu hình ma trận đề
                </div>
              </div>
            </div>
            <IconArrowRight width={6} height={10} color="#76777D" />
          </Link>
        </div>
      </div>
    </div>
  );
}
