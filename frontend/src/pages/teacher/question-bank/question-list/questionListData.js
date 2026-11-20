/**
 * questionListData.js
 * Dữ liệu mẫu chuẩn xác theo thiết kế Figma cho màn hình Danh sách câu hỏi (Toán học THPT)
 */

export const SUBJECT_INFO = {
  id: 'math',
  code: 'MATH-THPT',
  name: 'Toán học THPT',
  totalQuestions: 1420,
  syncStatus: 'ĐÃ ĐỒNG BỘ CLOUD',
  description: 'Kho câu hỏi trắc nghiệm và tự luận phân loại theo ma trận đề thi chuẩn THPT Quốc gia',
};

export const FILTER_OPTIONS = {
  chapters: [
    { value: 'all', label: 'Tất cả các chương' },
    { value: 'giai-tich-12', label: 'Giải tích 12' },
    { value: 'hinh-hoc-12', label: 'Hình học 12' },
    { value: 'dai-so-11', label: 'Đại số & Giải tích 11' },
    { value: 'hinh-hoc-11', label: 'Hình học 11' },
  ],
  bloomLevels: [
    { value: 'all', label: 'Mức độ' },
    { value: 'nhan-biet', label: 'Nhận biết' },
    { value: 'thong-hieu', label: 'Thông hiểu' },
    { value: 'van-dung', label: 'Vận dụng' },
    { value: 'van-dung-cao', label: 'Vận dụng cao' },
  ],
  formats: [
    { value: 'all', label: 'Định dạng câu hỏi' },
    { value: 'mcq-4', label: 'Trắc nghiệm 4 lựa chọn' },
    { value: 'true-false', label: 'Trắc nghiệm Đúng / Sai' },
    { value: 'short-answer', label: 'Điền đáp án ngắn' },
  ],
};

export const INITIAL_QUESTIONS = [
  {
    id: 'MATH-12-0482',
    code: '#MATH-12-0482',
    bloom: 'VẬN DỤNG CAO',
    bloomType: 'vd-cao',
    chapter: 'Giải tích 12',
    author: 'Thầy Nam',
    date: '15/10/2025',
    type: 'mcq',
    content: 'Cho hàm số f(x) liên tục trên ℝ thỏa mãn f(x) + f\'(x) = e^{-x} và f(0) = 1. Giá trị của tích phân I = ∫₀¹ f(x)dx bằng:',
    options: [
      { key: 'A', text: 'e - 1', isCorrect: false },
      { key: 'B', text: '(e - 1) / e', isCorrect: true },
      { key: 'C', text: '1 - e⁻¹', isCorrect: false },
      { key: 'D', text: 'e⁻¹', isCorrect: false },
    ],
    tags: ['Hàm số liên tục', 'Tích phân từng phần'],
    usageCount: 4,
  },
  {
    id: 'MATH-12-0391',
    code: '#MATH-12-0391',
    bloom: 'VẬN DỤNG',
    bloomType: 'van-dung',
    chapter: 'Hình học không gian',
    author: 'Cô Lan',
    date: '12/10/2025',
    type: 'mcq',
    content: "Cho hình lăng trụ đứng ABC.A'B'C' có đáy ABC là tam giác vuông cân tại B, AC = 2a, AA' = a√2. Khoảng cách giữa hai đường thẳng chéo nhau AB' và BC' bằng:",
    options: [
      { key: 'A', text: 'a√2 / 3', isCorrect: false },
      { key: 'B', text: 'a√3 / 2', isCorrect: false },
      { key: 'C', text: 'a√6 / 3', isCorrect: true },
      { key: 'D', text: '2a / 3', isCorrect: false },
    ],
    tags: ['Hình lăng trụ đứng', 'Khoảng cách giữa hai đường chéo nhau'],
    usageCount: 2,
  },
  {
    id: 'MATH-12-0215',
    code: '#MATH-12-0215',
    bloom: 'THÔNG HIỂU',
    bloomType: 'thong-hieu',
    chapter: 'Khảo sát hàm số',
    author: 'Thầy Hoàng',
    date: '08/10/2025',
    type: 'true-false',
    content: 'Cho hàm số bậc ba y = ax³ + bx² + cx + d có đồ thị đạo hàm y = f\'(x) như hình vẽ. Xét tính đúng / sai của các mệnh đề sau:',
    statements: [
      { key: 'a', text: 'Hàm số đồng biến trên khoảng (-1; 1)', isCorrect: true },
      { key: 'b', text: 'Điểm cực đại của đồ thị hàm số là (0; 2)', isCorrect: false },
      { key: 'c', text: 'Đồ thị hàm số cắt trục tung tại điểm có tung độ dương', isCorrect: true },
      { key: 'd', text: 'Phương trình f(x) = m có 3 nghiệm phân biệt khi -2 < m < 2', isCorrect: true },
    ],
    tags: ['Đồ thị hàm số bậc 3', 'Cực trị hàm số'],
    usageCount: 6,
  },
  {
    id: 'MATH-12-0104',
    code: '#MATH-12-0104',
    bloom: 'NHẬN BIẾT',
    bloomType: 'nhan-biet',
    chapter: 'Nguyên hàm',
    author: 'Cô Hương',
    date: '05/10/2025',
    type: 'mcq',
    content: 'Họ tất cả các nguyên hàm của hàm số f(x) = 3x² + 2x + 1 trên tập số thực ℝ là:',
    options: [
      { key: 'A', text: 'F(x) = x³ + x² + x + C', isCorrect: true },
      { key: 'B', text: 'F(x) = 6x + 2 + C', isCorrect: false },
      { key: 'C', text: 'F(x) = 3x³ + 2x² + x + C', isCorrect: false },
      { key: 'D', text: 'F(x) = x³ + 2x² + x + C', isCorrect: false },
    ],
    tags: ['Nguyên hàm cơ bản', 'Định nghĩa họ nguyên hàm'],
    usageCount: 8,
  },
  {
    id: 'MATH-12-0512',
    code: '#MATH-12-0512',
    bloom: 'VẬN DỤNG',
    bloomType: 'van-dung',
    chapter: 'Hình học Oxyz',
    author: 'Thầy Minh',
    date: 'Hôm qua 16:45',
    type: 'short-answer',
    content: 'Trong không gian Oxyz, cho mặt cầu (S): (x-1)² + (y+2)² + (z-3)² = 25 và mặt phẳng (P): 2x - 2y + z + 5 = 0. Bán kính r của đường tròn giao tuyến giữa (S) và (P) bằng bao nhiêu?',
    shortAnswer: '4',
    tags: ['Mặt cầu Oxyz', 'Giao tuyến mặt cầu và mặt phẳng'],
    usageCount: 0,
  },
];
