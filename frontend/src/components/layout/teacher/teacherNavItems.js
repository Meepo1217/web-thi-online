/**
 * teacherNavItems.js
 * Cấu hình menu điều hướng cho Giảng viên dựa trên số nhóm & mục thực tế trích xuất từ Figma (Aside).
 * Gồm đúng 4 nhóm và 10 mục điều hướng chính, toàn bộ path bắt đầu bằng /teacher.
 * Định dạng: { label, path, icon }, không chứa JSX trực tiếp để giữ file .js thuần.
 */

import {
  IconOverview,
  IconExamMgmt,
  IconGrading,
  IconSystem,
  IconDashboard,
  IconSchedule,
  IconQuestions,
  IconExams,
  IconSessions,
  IconResults,
  IconClasses,
  IconStudents,
  IconStats,
  IconSettings,
  IconHelp,
} from '../../ui/icons';

// 4 Nhóm và 10 mục thực tế theo cấu trúc Figma Aside
export const teacherNavGroups = [
  {
    title: 'TỔNG QUAN',
    icon: IconOverview,
    items: [
      {
        label: 'Trang chủ',
        path: '/teacher/dashboard',
        icon: IconDashboard,
        end: true,
      },
    ],
  },
  {
    title: 'QUẢN LÝ THI',
    icon: IconExamMgmt,
    items: [
      {
        label: 'Ngân hàng câu hỏi',
        path: '/teacher/questions',
        icon: IconQuestions,
      },
      {
        label: 'Quản lý đề thi',
        path: '/teacher/exams',
        icon: IconExams,
      },
      {
        label: 'Phòng / Ca thi',
        path: '/teacher/sessions',
        icon: IconSessions,
      },
    ],
  },
  {
    title: 'CHẤM THI & LỚP',
    icon: IconGrading,
    items: [
      {
        label: 'Kết quả bài làm',
        path: '/teacher/results',
        icon: IconResults,
      },
      {
        label: 'Quản lý lớp học',
        path: '/teacher/classes',
        icon: IconClasses,
      },
      {
        label: 'Danh sách sinh viên',
        path: '/teacher/students',
        icon: IconStudents,
      },
    ],
  },
  {
    title: 'HỆ THỐNG',
    icon: IconSystem,
    items: [
      {
        label: 'Báo cáo thống kê',
        path: '/teacher/statistics',
        icon: IconStats,
      },
      {
        label: 'Cài đặt tài khoản',
        path: '/teacher/settings',
        icon: IconSettings,
      },
    ],
  },
];

// Mục phụ ở đáy Aside (dưới thẻ dung lượng)
export const teacherBottomNav = {
  label: 'Hướng dẫn sử dụng',
  path: '/teacher/help',
  icon: IconHelp,
};

export default teacherNavGroups;
