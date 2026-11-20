/**
 * questionEditData.js
 * Mock data khởi tạo cho Màn hình 4: Chỉnh sửa câu hỏi (Edit Question - EduQuiz Studio)
 */

export const INITIAL_EDIT_QUESTION = {
  code: 'MATH-12-0482',
  version: 'v2.4',
  lastUpdated: '15/10/2025, 22:58',
  autoSaveTime: '22:58',
  statusBadge: 'ĐANG CHỈNH SỬA',
  
  // 1. Định dạng câu hỏi
  format: 'single-choice', // single-choice | true-false | short-answer | essay

  // 2. Nội dung câu hỏi (Đề bài)
  stem: 'Cho hàm số bậc ba y = f(x) có đồ thị như hình vẽ bên dưới. Hỏi hàm số g(x) = f(x² - 2x) có bao nhiêu điểm cực trị?',
  attachment: {
    fileName: 'dothi_f(x)_math12.jpg',
    fileSize: '142 KB',
    dimensions: '1200x800px',
  },

  // 3. Phương án lựa chọn (A, B, C, D)
  options: [
    { id: 'opt-a', letter: 'A', text: '3 điểm cực trị.', isCorrect: false },
    { id: 'opt-b', letter: 'B', text: '5 điểm cực trị.', isCorrect: true },
    { id: 'opt-c', letter: 'C', text: '7 điểm cực trị.', isCorrect: false },
    { id: 'opt-d', letter: 'D', text: '4 điểm cực trị.', isCorrect: false },
  ],

  // 4. Lời giải chi tiết
  explanation: `Bước 1: Tính đạo hàm của hàm hợp g(x):
g'(x) = [f(x² - 2x)]' = (x² - 2x)' · f'(x² - 2x) = 2(x - 1) · f'(x² - 2x).

Bước 2: Cho g'(x) = 0 <=> x = 1 hoặc f'(x² - 2x) = 0.
Từ đồ thị hàm số y = f(x), ta thấy hàm số đạt cực trị tại hai điểm x = -1 và x = 1 (f'(x) = 0 <=> x = -1 hoặc x = 1).
Do đó:
• x² - 2x = -1 <=> (x - 1)² = 0 <=> x = 1 (nghiệm kép).
• x² - 2x = 1 <=> x² - 2x - 1 = 0 <=> x = 1 ± √2 (hai nghiệm đơn phân biệt, khác 1).

Bước 3: Lập bảng xét dấu hoặc đếm nghiệm bội lẻ:
Phương trình g'(x) = 0 có các nghiệm đơn phân biệt làm g'(x) đổi dấu. Tổng số điểm cực trị của hàm số g(x) là 5 điểm.`,

  // 5. Phân loại học thuật (Taxonomy)
  taxonomy: {
    subject: 'math', // Toán học THPT
    subjectName: 'Toán học THPT',
    grade: '12', // 10, 11, 12
    chapter: 'Chương I: Đạo hàm & Khảo sát hàm số',
    bloom: 'van-dung-cao', // nhan-biet | thong-hieu | van-dung | van-dung-cao
    scoreWeight: '0.2',
  },

  // 6. Thẻ gắn & Thiết lập bổ sung
  tags: ['Hàm hợp', 'Cực trị', 'Đồ thị'],
  approvalStatus: {
    status: 'approved',
    title: 'Đã duyệt',
    subtitle: 'Sẵn sàng sử dụng trong kỳ thi chính thức',
  },

  // 7. Thống kê hiệu suất & Lịch sử
  insights: {
    difficulty: '34.2%',
    discrimination: '0.48',
    discriminationRating: 'Rất tốt',
  },
  author: 'Thầy Nam (Tổ Toán)',
  hashId: '#v2.4-89f1',
};

export const FORMAT_OPTIONS = [
  { id: 'single-choice', label: 'Trắc nghiệm đơn', iconType: 'radio' },
  { id: 'true-false', label: 'Đúng / Sai', iconType: 'check-cross' },
  { id: 'short-answer', label: 'Điền đáp án ngắn', iconType: 'cursor' },
  { id: 'essay', label: 'Tự luận ngắn', iconType: 'paragraph' },
];

export const BLOOM_LEVELS = [
  { id: 'nhan-biet', label: 'Nhận biết' },
  { id: 'thong-hieu', label: 'Thông hiểu' },
  { id: 'van-dung', label: 'Vận dụng' },
  { id: 'van-dung-cao', label: 'Vận dụng cao' },
];
