/**
 * examData.js - Dữ liệu mẫu cứng cho trang Quản lý đề thi (Exam Management)
 * Tách biệt hoàn toàn khỏi logic JSX theo quy ước dự án
 */

export const INITIAL_TABS = [
  { id: 'all', label: 'Tất cả', count: 48 },
  { id: 'active', label: 'Đang diễn ra', count: 3 },
  { id: 'upcoming', label: 'Sắp tới', count: 12 },
  { id: 'finished', label: 'Đã kết thúc', count: 28 },
  { id: 'draft', label: 'Bản nháp', count: 5 },
];

export const INITIAL_SUBJECT_OPTIONS = [
  { value: 'all', label: 'Tất cả môn' },
  { value: 'math', label: 'Toán học' },
  { value: 'physics', label: 'Vật lý' },
  { value: 'chemistry', label: 'Hóa học' },
  { value: 'biology', label: 'Sinh học' },
  { value: 'english', label: 'Tiếng Anh' },
  { value: 'history', label: 'Lịch sử' },
];

export const INITIAL_GRADE_OPTIONS = [
  { value: 'all', label: 'Tất cả khối' },
  { value: 'grade10', label: 'Khối 10' },
  { value: 'grade11', label: 'Khối 11' },
  { value: 'grade12', label: 'Khối 12' },
];

export const INITIAL_SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất trước' },
  { value: 'oldest', label: 'Cũ nhất trước' },
  { value: 'title_asc', label: 'Tên A - Z' },
  { value: 'title_desc', label: 'Tên Z - A' },
];

export const INITIAL_ACTIVE_TAGS = [
  { id: 'subject', label: 'Toán học' },
  { id: 'grade', label: 'Khối 12' },
];

export const INITIAL_EXAMS_LIST = [
  {
    id: 1,
    title: 'Đề thi giữa kỳ 1 - Toán 12',
    subject: 'Toán học',
    grade: 'Khối 12',
    status: 'live',
    statusLabel: 'ĐANG THI',
    statusColor: '#005137',
    statusBg: '#85F8C4',
    dotColor: '#069669',
    iconBg: 'rgba(0, 81, 213, 0.1)',
    iconColor: '#0051D5',
    questionsCount: 50,
    durationText: '90 Phút làm bài',
    createdDate: '15/10/2025',
    deadlineText: 'Không giới hạn hạn nộp',
    isDeadlineWarning: false,
    canEdit: true,
    canDelete: true,
  },
  {
    id: 2,
    title: 'Kiểm tra 1 tiết - Vật lý 12',
    subject: 'Vật lý',
    grade: 'Khối 12',
    status: 'open',
    statusLabel: 'ĐANG MỞ',
    statusColor: '#003EA8',
    statusBg: '#DBE1FF',
    dotColor: '#0051D5',
    iconBg: 'rgba(49, 107, 243, 0.1)',
    iconColor: '#0051D5',
    questionsCount: 50,
    durationText: '50 Phút làm bài',
    createdDate: '20/10/2025',
    deadlineText: 'Đóng: 23:59 hôm nay',
    isDeadlineWarning: true,
    canEdit: true,
    canDelete: true,
  },
  {
    id: 3,
    title: 'Thi thử TN THPT - Hóa học',
    subject: 'Hóa học',
    grade: 'Khối 12',
    status: 'closed',
    statusLabel: 'ĐÃ ĐÓNG',
    statusColor: '#45464D',
    statusBg: '#F1F3FA',
    dotColor: '#76777D',
    iconBg: '#DCE9FF',
    iconColor: '#0051D5',
    questionsCount: 25,
    durationText: '45 Phút làm bài',
    createdDate: '24/10/2025',
    deadlineText: 'Đã kết thúc thu bài',
    isDeadlineWarning: false,
    canEdit: true,
    canDelete: true,
  },
  {
    id: 4,
    title: 'Đề cương ôn tập HK1 - Sinh học',
    subject: 'Sinh học',
    grade: 'Khối 12',
    status: 'draft',
    statusLabel: 'BẢN NHÁP',
    statusColor: '#45464D',
    statusBg: '#DCE9FF',
    dotColor: '#76777D',
    iconBg: 'rgba(255, 218, 214, 0.4)',
    iconColor: '#93000A',
    questionsCount: 30,
    durationText: 'Chưa cài thời gian',
    createdDate: '24/10/2025',
    deadlineText: 'Đã kết thúc thu bài',
    isDeadlineWarning: false,
    canUpload: true,
    canDelete: true,
  },
];
