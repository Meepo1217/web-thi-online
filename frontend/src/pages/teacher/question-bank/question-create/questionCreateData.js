/**
 * questionCreateData.js
 * Dữ liệu mặc định và danh mục lựa chọn cho màn hình Thêm câu hỏi mới
 */

export const INITIAL_CREATE_QUESTION = {
  stem: '',
  options: [
    { id: 'opt_a', letter: 'A', text: '', isCorrect: true },
    { id: 'opt_b', letter: 'B', text: '', isCorrect: false },
    { id: 'opt_c', letter: 'C', text: '', isCorrect: false },
    { id: 'opt_d', letter: 'D', text: '', isCorrect: false },
  ],
  solution: '',
  taxonomy: {
    subject: 'math',
    grade: 'grade12',
    chapter: 'chapter1',
    lesson: 'lesson1',
    bloomLevel: 'recognize', // 'recognize' (Nhận biết) | 'understand' (Thông hiểu) | 'apply' (Vận dụng) | 'advanced' (Vận dụng cao)
  },
  settings: {
    points: '0.25',
    randomizeOptions: true,
  },
};

export const SUBJECT_OPTIONS = [
  { value: 'math', label: 'Toán học' },
  { value: 'physics', label: 'Vật lí' },
  { value: 'chemistry', label: 'Hóa học' },
  { value: 'biology', label: 'Sinh học' },
  { value: 'english', label: 'Tiếng Anh' },
  { value: 'history', label: 'Lịch sử' },
];

export const GRADE_OPTIONS = [
  { value: 'grade10', label: 'Khối 10 - Chương trình GDPT mới' },
  { value: 'grade11', label: 'Khối 11 - Chương trình GDPT mới' },
  { value: 'grade12', label: 'Khối 12 - Ôn thi Tốt nghiệp THPT' },
];

export const CHAPTER_OPTIONS = {
  math: [
    { value: 'chapter1', label: 'Chương 1: Ứng dụng đạo hàm để khảo sát hàm số' },
    { value: 'chapter2', label: 'Chương 2: Tọa độ trong không gian (Oxyz)' },
    { value: 'chapter3', label: 'Chương 3: Nguyên hàm và Tích phân' },
    { value: 'chapter4', label: 'Chương 4: Thống kê và Xác suất có điều kiện' },
  ],
  physics: [
    { value: 'chapter1', label: 'Chương 1: Vật lý nhiệt và nhiệt động lực học' },
    { value: 'chapter2', label: 'Chương 2: Khí lý tưởng và phương trình trạng thái' },
  ],
};

export const LESSON_OPTIONS = {
  chapter1: [
    { value: 'lesson1', label: 'Bài 1: Tính đơn điệu của hàm số' },
    { value: 'lesson2', label: 'Bài 2: Cực trị của hàm số' },
    { value: 'lesson3', label: 'Bài 3: Giá trị lớn nhất và nhỏ nhất của hàm số' },
    { value: 'lesson4', label: 'Bài 4: Đường tiệm cận của đồ thị hàm số' },
  ],
  chapter2: [
    { value: 'lesson1', label: 'Bài 1: Hệ trục tọa độ trong không gian' },
    { value: 'lesson2', label: 'Bài 2: Phương trình mặt phẳng và mặt cầu' },
  ],
};

export const BLOOM_LEVELS = [
  { id: 'recognize', label: 'Nhận biết' },
  { id: 'understand', label: 'Thông hiểu' },
  { id: 'apply', label: 'Vận dụng' },
  { id: 'advanced', label: 'Vận dụng cao' },
];
