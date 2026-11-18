/**
 * examListData.js
 * Dữ liệu mẫu danh sách đề thi theo chuyên đề
 */

export const EXAM_SUBJECT_INFO = {
  id: 'math',
  code: 'MATH-THPT',
  name: 'Toán học THPT',
  chapterTitle: 'Chương I: Đạo hàm & Khảo sát hàm số',
  totalExams: 24,
  syncStatus: 'ĐÃ ĐỒNG BỘ CLOUD',
  description: 'Kho đề thi trắc nghiệm phân loại theo ma trận đề thi chuẩn Bộ GD&ĐT',
};

export const EXAM_FILTER_OPTIONS = {
  levels: [
    { value: 'all', label: 'Mức độ đề thi' },
    { value: 'nhan-biet', label: 'Nhận biết / Cơ bản' },
    { value: 'thong-hieu', label: 'Thông hiểu' },
    { value: 'van-dung', label: 'Vận dụng' },
    { value: 'vd-cao', label: 'Vận dụng cao / Phân hóa' },
  ],
};

export const INITIAL_EXAMS = [
  {
    id: 'EXAM-12-001',
    code: '#EXAM-12-001',
    title: 'Đề kiểm tra 1 tiết: Đạo hàm và Khảo sát hàm số',
    description: 'Ma trận 40 câu trắc nghiệm khách quan gồm tính đơn điệu, cực trị, GTLN-GTNN và nhận dạng đồ thị.',
    duration: '45 phút',
    questionCount: 40,
    level: 'VẬN DỤNG',
    levelType: 'van-dung',
    tags: ['Đạo hàm', 'Cực trị', 'Khảo sát hàm số'],
    author: 'Thầy Nam',
    date: '15/10/2025',
    usageCount: 3,
  },
  {
    id: 'EXAM-12-002',
    code: '#EXAM-12-002',
    title: 'Đề thi thử THPT Quốc gia 2025 - Chuyên đề Ứng dụng đạo hàm',
    description: 'Đề thi phân hóa cao với 50 câu trắc nghiệm chuẩn cấu trúc định dạng Bộ Giáo dục và Đào tạo.',
    duration: '90 phút',
    questionCount: 50,
    level: 'VẬN DỤNG CAO',
    levelType: 'vd-cao',
    tags: ['Đề thi thử', 'Đồ thị', 'Hàm hợp'],
    author: 'Thầy Nam',
    date: '12/10/2025',
    usageCount: 5,
  },
  {
    id: 'EXAM-12-003',
    code: '#EXAM-12-003',
    title: 'Đề khảo sát năng lực đầu năm: Hàm số và Đồ thị',
    description: 'Đề kiểm tra kiến thức nền tảng và rèn luyện kỹ năng đọc bảng biến thiên, đồ thị.',
    duration: '45 phút',
    questionCount: 30,
    level: 'THÔNG HIỂU',
    levelType: 'thong-hieu',
    tags: ['Bảng biến thiên', 'Tiệm cận'],
    author: 'Cô Lan',
    date: '08/10/2025',
    usageCount: 2,
  },
  {
    id: 'EXAM-12-004',
    code: '#EXAM-12-004',
    title: 'Đề kiểm tra 15 phút: Quy tắc tính đạo hàm và tiếp tuyến',
    description: 'Kiểm tra nhanh kỹ năng tính đạo hàm cấp 1, phương trình tiếp tuyến của đồ thị hàm số.',
    duration: '15 phút',
    questionCount: 15,
    level: 'NHẬN BIẾT',
    levelType: 'nhan-biet',
    tags: ['Tiếp tuyến', 'Đạo hàm cơ bản'],
    author: 'Thầy Hoàng',
    date: '05/10/2025',
    usageCount: 1,
  },
  {
    id: 'EXAM-12-005',
    code: '#EXAM-12-005',
    title: 'Đề thi thử THPT Chuyên Toán - Đợt 1',
    description: 'Đề phân hóa cao dành cho học sinh khối chuyên và ôn luyện đội tuyển học sinh giỏi.',
    duration: '90 phút',
    questionCount: 50,
    level: 'VẬN DỤNG CAO',
    levelType: 'vd-cao',
    tags: ['Chuyên đề cực trị', 'Bài toán thực tế'],
    author: 'Thầy Nam',
    date: 'Hôm qua 14:20',
    usageCount: 4,
  },
];
