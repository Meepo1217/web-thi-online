/**
 * teacherNavItems.js
 * Cấu hình menu điều hướng cho Giảng viên theo đúng thứ tự yêu cầu:
 * - TỔNG QUAN: Trang chủ
 * - QUẢN LÝ THI: Ngân hàng câu hỏi, Quản lý đề thi, Ca thi
 * - CHẤM THI: Kết quả bài làm, Danh sách sinh viên
 * - HỆ THỐNG: Cài đặt tài khoản
 */

import {
  IconOverview,
  IconExamMgmt,
  IconGrading,
  IconSystem,
  IconDashboard,
  IconQuestions,
  IconExams,
  IconSessions,
  IconResults,
  IconStudents,
  IconSettings,
  IconHelp,
} from '../../ui/icons';

// 4 Nhóm điều hướng chuẩn cho Giảng viên
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
        label: 'Ca thi',
        path: '/teacher/sessions',
        icon: IconSessions,
      },
    ],
  },
  {
    title: 'CHẤM THI',
    icon: IconGrading,
    items: [
      {
        label: 'Kết quả bài làm',
        path: '/teacher/results',
        icon: IconResults,
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
