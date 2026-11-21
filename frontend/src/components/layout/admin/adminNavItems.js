/**
 * adminNavItems.js
 * Cấu hình danh mục điều hướng cho Cổng Quản trị viên (Admin Portal)
 * Chuẩn Figma Auto Layout với 8 chức năng quản trị cốt lõi
 */

export const adminNavGroups = [
  {
    title: 'TỔNG QUAN HỆ THỐNG',
    items: [
      {
        label: 'Thống kê',
        path: '/admin/dashboard',
        iconName: 'chart',
        end: true,
      },
      {
        label: 'Quản lý người dùng',
        path: '/admin/users',
        iconName: 'users',
        badge: '48.2k',
      },
    ],
  },
  {
    title: 'QUẢN LÝ KHẢO THÍ',
    items: [
      {
        label: 'Quản lý đề thi',
        path: '/admin/exams',
        iconName: 'exams',
        badge: '1.4k',
      },
      {
        label: 'Ngân hàng câu hỏi',
        path: '/admin/questions',
        iconName: 'questions',
      },
      {
        label: 'Quản lý môn học / khối',
        path: '/admin/subjects',
        iconName: 'subjects',
      },
    ],
  },
  {
    title: 'VẬN HÀNH & BẢO TRÌ',
    items: [
      {
        label: 'Lịch sử hệ thống',
        path: '/admin/logs',
        iconName: 'logs',
      },
      {
        label: 'Cấu hình hệ thống',
        path: '/admin/settings',
        iconName: 'settings',
      },
      {
        label: 'Trợ giúp & Hỗ trợ',
        path: '/admin/help',
        iconName: 'help',
      },
    ],
  },
];

