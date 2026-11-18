/**
 * examDetailData.js
 * Dữ liệu chi tiết đề thi chuẩn theo thiết kế Figma (50 câu hỏi, ma trận Bloom & lọc chương)
 */

export const EXAM_DETAIL_INFO = {
  id: 'EXAM-12-001',
  title: 'Đề thi thử THPT Quốc gia 2025 - Môn Toán',
  code: 'MÃ ĐỀ: 101',
  statusText: 'Sẵn sàng',
  subject: 'Toán học 12',
  academicYear: 'Năm học 2024 - 2025',
  updatedAt: 'Cập nhật gần nhất: 15/10/2025 14:30',
  totalQuestions: 50,
  metrics: [
    {
      id: 'total-questions',
      icon: 'questions',
      label: 'TỔNG SỐ CÂU',
      value: '50 câu',
    },
    {
      id: 'duration',
      icon: 'clock',
      label: 'THỜI GIAN',
      value: '90 phút',
    },
    {
      id: 'total-score',
      icon: 'score',
      label: 'TỔNG ĐIỂM',
      value: '10.0 điểm',
    },
    {
      id: 'format',
      icon: 'format',
      label: 'HÌNH THỨC',
      value: 'Trắc nghiệm khách quan',
    },
  ],
  specs: [
    { label: 'Người biên soạn', value: 'Thầy Nguyễn Nam', isHighlight: false },
    { label: 'Tổ chuyên môn', value: 'Tổ Toán - Tin học', isHighlight: false },
    { label: 'Trộn đáp án', value: 'Tự động xáo trộn', isHighlight: false },
    { label: 'Trạng thái sử dụng', value: 'Sẵn sàng phát hành', isHighlight: true },
  ],
};

export const EXAM_CHAPTER_FILTERS = [
  { id: 'all', label: 'Tất cả (50)' },
  { id: 'chap-1', label: 'Chương I: Hàm số & Đồ thị (12)' },
  { id: 'chap-2', label: 'Chương II: Mũ & Logarit (10)' },
  { id: 'chap-3', label: 'Chương III: Nguyên hàm & Tích phân (10)' },
  { id: 'chap-4', label: 'Chương IV: Số phức (8)' },
  { id: 'chap-5', label: 'Hình học không gian Oxyz (10)' },
];

export const EXAM_BLOOM_FILTERS = [
  { id: 'all', label: 'Tất cả mức độ' },
  { id: 'nhan-biet', label: 'Nhận biết (15)' },
  { id: 'thong-hieu', label: 'Thông hiểu (15)' },
  { id: 'van-dung', label: 'Vận dụng (15)' },
  { id: 'van-dung-cao', label: 'Vận dụng cao (5)' },
];

export const EXAM_BLOOM_DISTRIBUTION = [
  { id: 'nhan-biet', label: 'Nhận biết (30%)', percent: 30, color: '#0051D5' },
  { id: 'thong-hieu', label: 'Thông hiểu (30%)', percent: 30, color: '#316BF3' },
  { id: 'van-dung', label: 'Vận dụng (30%)', percent: 30, color: '#D3E4FE' },
  { id: 'van-dung-cao', label: 'Vận dụng cao (10%)', percent: 10, color: '#131B2E' },
];

export const INITIAL_EXAM_QUESTIONS = [
  {
    id: 1,
    numberLabel: 'Câu 1',
    bloomId: 'nhan-biet',
    bloomLabel: 'NHẬN BIẾT',
    points: '0.20 điểm',
    chapterId: 'chap-1',
    chapterName: 'Chương I: Đồ thị hàm số & cực trị',
    stemParts: [
      { text: 'Cho hàm số bậc ba ', isMath: false },
      { text: 'y = f(x)', isMath: true },
      { text: ' có đồ thị như hình vẽ bên dưới. Điểm cực tiểu của đồ thị hàm số đã cho là điểm nào dưới đây?', isMath: false },
    ],
    hasGraph: true,
    options: [
      { key: 'A', text: '(-1; 2)', isCorrect: false },
      { key: 'B', text: '(1; -2)', isCorrect: true },
      { key: 'C', text: 'x = 1', isCorrect: false },
      { key: 'D', text: 'y = -2', isCorrect: false },
    ],
  },
  {
    id: 2,
    numberLabel: 'Câu 2',
    bloomId: 'nhan-biet',
    bloomLabel: 'NHẬN BIẾT',
    points: '0.20 điểm',
    chapterId: 'chap-3',
    chapterName: 'Chương III: Nguyên hàm & Tích phân',
    stemParts: [
      { text: 'Họ tất cả các nguyên hàm của hàm số ', isMath: false },
      { text: 'f(x) = 3x² + 2x - 1', isMath: true },
      { text: ' là:', isMath: false },
    ],
    hasGraph: false,
    options: [
      { key: 'A', text: 'x³ + x² - x + C', isCorrect: true },
      { key: 'B', text: 'x³ + x² + x + C', isCorrect: false },
      { key: 'C', text: '3x³ + 2x² - x + C', isCorrect: false },
      { key: 'D', text: '6x + 2 + C', isCorrect: false },
    ],
  },
  {
    id: 3,
    numberLabel: 'Câu 3',
    bloomId: 'thong-hieu',
    bloomLabel: 'THÔNG HIỂU',
    points: '0.20 điểm',
    chapterId: 'chap-5',
    chapterName: 'Hình học không gian Oxyz',
    stemParts: [
      { text: 'Trong không gian ', isMath: false },
      { text: 'Oxyz', isMath: true },
      { text: ', cho mặt phẳng ', isMath: false },
      { text: '(P): 2x - 3y + z - 5 = 0', isMath: true },
      { text: '. Một vectơ pháp tuyến của mặt phẳng ', isMath: false },
      { text: '(P)', isMath: true },
      { text: ' có tọa độ là:', isMath: false },
    ],
    hasGraph: false,
    options: [
      { key: 'A', text: 'n₁ = (2; 3; 1)', isCorrect: false },
      { key: 'B', text: 'n₂ = (2; -3; -5)', isCorrect: false },
      { key: 'C', text: 'n₃ = (2; -3; 1)', isCorrect: true },
      { key: 'D', text: 'n₄ = (-2; 3; 1)', isCorrect: false },
    ],
  },
  {
    id: 4,
    numberLabel: 'Câu 4',
    bloomId: 'thong-hieu',
    bloomLabel: 'THÔNG HIỂU',
    points: '0.20 điểm',
    chapterId: 'chap-2',
    chapterName: 'Chương II: Mũ và Logarit',
    stemParts: [
      { text: 'Tập nghiệm của bất phương trình ', isMath: false },
      { text: 'log₂(x - 1) < 3', isMath: true },
      { text: ' là:', isMath: false },
    ],
    hasGraph: false,
    options: [
      { key: 'A', text: '(-∞; 9)', isCorrect: false },
      { key: 'B', text: '(1; 7)', isCorrect: false },
      { key: 'C', text: '(0; 9)', isCorrect: false },
      { key: 'D', text: '(1; 9)', isCorrect: true },
    ],
  },
  {
    id: 5,
    numberLabel: 'Câu 5',
    bloomId: 'van-dung',
    bloomLabel: 'VẬN DỤNG',
    points: '0.20 điểm',
    chapterId: 'chap-3',
    chapterName: 'Chương III: Tích phân & Hình phẳng',
    stemParts: [
      { text: 'Diện tích hình phẳng giới hạn bởi đồ thị hàm số ', isMath: false },
      { text: 'y = x² - 2x', isMath: true },
      { text: ' và trục hoành ', isMath: false },
      { text: 'Ox', isMath: true },
      { text: ' bằng bao nhiêu?', isMath: false },
    ],
    hasGraph: false,
    options: [
      { key: 'A', text: '2 / 3', isCorrect: false },
      { key: 'B', text: '4 / 3', isCorrect: true },
      { key: 'C', text: '8 / 3', isCorrect: false },
      { key: 'D', text: '4', isCorrect: false },
    ],
  },
];

/**
 * Tạo dữ liệu câu hỏi mở rộng cho các câu 6..50 khi người dùng tải thêm
 */
export function generateAdditionalExamQuestion(num) {
  const chapters = [
    { id: 'chap-1', name: 'Chương I: Hàm số & Đồ thị' },
    { id: 'chap-2', name: 'Chương II: Mũ & Logarit' },
    { id: 'chap-3', name: 'Chương III: Nguyên hàm & Tích phân' },
    { id: 'chap-4', name: 'Chương IV: Số phức' },
    { id: 'chap-5', name: 'Hình học không gian Oxyz' },
  ];
  const blooms = [
    { id: 'nhan-biet', label: 'NHẬN BIẾT' },
    { id: 'thong-hieu', label: 'THÔNG HIỂU' },
    { id: 'van-dung', label: 'VẬN DỤNG' },
    { id: 'van-dung-cao', label: 'VẬN DỤNG CAO' },
  ];

  const chap = chapters[(num - 1) % chapters.length];
  const bloom =
    num <= 15
      ? blooms[0]
      : num <= 30
        ? blooms[1]
        : num <= 45
          ? blooms[2]
          : blooms[3];
  const correctIdx = (num - 1) % 4;

  return {
    id: num,
    numberLabel: `Câu ${num}`,
    bloomId: bloom.id,
    bloomLabel: bloom.label,
    points: '0.20 điểm',
    chapterId: chap.id,
    chapterName: chap.name,
    stemParts: [
      { text: `Cho bài toán chuyên đề thuộc ${chap.name} với tham số thực `, isMath: false },
      { text: `m = ${num}`, isMath: true },
      { text: '. Giá trị biểu thức thỏa mãn điều kiện bài toán là:', isMath: false },
    ],
    hasGraph: false,
    options: ['A', 'B', 'C', 'D'].map((key, idx) => ({
      key,
      text: `${num + idx * 2}π / 3`,
      isCorrect: idx === correctIdx,
    })),
  };
}
