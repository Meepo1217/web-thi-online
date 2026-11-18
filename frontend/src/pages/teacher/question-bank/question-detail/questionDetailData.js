/**
 * questionDetailData.js
 * Dữ liệu chi tiết câu hỏi chuẩn xác theo thiết kế Figma cho màn hình Chi tiết câu hỏi
 */

export const QUESTION_DETAIL_DATA = {
  id: 'MATH-12-0482',
  code: '#MATH-12-0482',
  subjectGroup: 'TOÁN HỌC 12 • GIẢI TÍCH & ỨNG DỤNG ĐẠO HÀM',
  subjectName: 'Toán học 12 - Giải tích',
  grade: '12',
  bloom: 'VẬN DỤNG CAO',
  status: 'ready',
  statusText: 'ĐÃ ĐỒNG BỘ CLOUD',
  author: 'Thầy Nam',
  updatedAt: '15/10/2025',
  stemText: 'Cho hàm số bậc ba y = f(x) có đồ thị như hình vẽ bên dưới. Hỏi hàm số g(x) = f(x² - 2x) có bao nhiêu điểm cực trị?',
  
  // 4 phương án lựa chọn
  options: [
    {
      key: 'A',
      text: '3 điểm cực trị',
      percent: '14%',
      isCorrect: false,
    },
    {
      key: 'B',
      text: '5 điểm cực trị',
      percent: '34.2%',
      isCorrect: true,
      badgeText: 'ĐÁP ÁN CHÍNH XÁC',
    },
    {
      key: 'C',
      text: '7 điểm cực trị',
      percent: '26%',
      isCorrect: false,
    },
    {
      key: 'D',
      text: '9 điểm cực trị',
      percent: '25.8%',
      isCorrect: false,
    },
  ],

  // Các bước lời giải chi tiết
  steps: [
    {
      number: 1,
      title: 'Bước 1: Tính đạo hàm của hàm hợp g(x)',
      intro: 'Ta có hàm số: g(x) = f(x² - 2x).',
      formula: "g'(x) = (x² - 2x)' • f'(x² - 2x) = (2x - 2) • f'(x² - 2x).",
    },
    {
      number: 2,
      title: "Bước 2: Tìm nghiệm của phương trình g'(x) = 0",
      intro: 'Phương trình đạo hàm triệt tiêu khi và chỉ khi:',
      cases: [
        '• Trường hợp 1: 2x - 2 = 0 ⇔ x = 1 (nghiệm bội đơn).',
        "• Trường hợp 2: f'(x² - 2x) = 0.",
      ],
      observation: "Quan sát đồ thị hàm số y = f(x), ta thấy f'(x) = 0 tại hai điểm cực trị: x = -1 và x = 2.",
      equations: [
        '⇒ x² - 2x = -1 ⇔ x² - 2x + 1 = 0 ⇔ x = 1 (nghiệm kép).',
        '⇒ x² - 2x = 2 ⇔ x² - 2x - 2 = 0 có hai nghiệm phân biệt: x = 1 - √3 và x = 1 + √3.',
      ],
    },
    {
      number: 3,
      title: 'Bước 3: Biện luận nghiệm đơn & Kết luận',
      intro: "Tại điểm x = 1: là nghiệm đơn của (2x - 2) đồng thời là nghiệm kép của f'(x² - 2x) = 0, do đó x = 1 là nghiệm bội 3 (bội lẻ) nên g'(x) vẫn đổi dấu qua x = 1.",
      analysis: 'Xét kỹ đồ thị f(x) cắt trục hoành và các điểm uốn: Tổng số điểm cực trị của hàm số g(x) = f(u(x)) bằng số điểm cực trị của u(x) cộng với số nghiệm đơn của phương trình u(x) = xᵢ (với xᵢ là các điểm cực trị của f(x)). Ở đây u(x) = x² - 2x có 1 cực trị (x = 1). Các đường nằm ngang cắt u(x): y = 2 cắt tại 2 nghiệm phân biệt; y = -1 tiếp xúc tại x = 1; y = u(x) có 1 đỉnh. Tổng số điểm làm g\'(x) đổi dấu là 5 điểm cực trị (bao gồm cả phân tích hệ quả cực tiểu đối xứng).',
      conclusion: 'KẾT LUẬN: ĐÁP ÁN ĐÚNG LÀ B (5 điểm cực trị)',
    },
  ],

  // Mẹo giải nhanh
  quickTip: {
    title: 'Mẹo giải nhanh dạng toán hàm hợp g(x) = f(u(x)):',
    content: 'Số điểm cực trị của g(x) = f(u(x)) = (Số điểm cực trị của u(x)) + (Số nghiệm đơn / bội lẻ của phương trình u(x) = c_i, với c_i là các điểm cực trị của f(x)). Cách này giúp tiết kiệm 70% thời gian làm bài thi trắc nghiệm.',
  },

  // Tags
  tags: ['Hàm hợp', 'Cực trị', 'Đồ thị hàm số', 'Giải tích 12'],

  // Thống kê hiệu suất làm bài
  stats: {
    totalAttempts: '1,248',
    attemptsTrend: '+12% tuần này',
    correctRate: '34.2%',
    classification: 'Phân loại HS Giỏi',
    discriminationIndex: '0.58',
    discriminationLabel: 'RẤT TỐT',
    discriminationPercent: 74,
    discriminationNote: 'Chỉ số > 0.40 phản ánh câu hỏi đánh giá xuất sắc năng lực học sinh.',
    selectionDistribution: [
      { key: 'A', percent: 14, isCorrect: false },
      { key: 'B', percent: 34.2, isCorrect: true },
      { key: 'C', percent: 26, isCorrect: false },
      { key: 'D', percent: 25.8, isCorrect: false },
    ],
  },

  // Đề thi đang sử dụng câu hỏi
  examUsages: [
    {
      id: 1,
      title: 'Đề thi thử THPT Quốc gia 2025 - Lần 1',
      subtitle: 'Câu số 46 • 50 câu trắc nghiệm',
    },
    {
      id: 2,
      title: 'Đề kiểm tra giữa kỳ 1 Toán 12 - Chuyên đề Hàm số',
      subtitle: 'Câu số 48 • Khối THPT Chuyên',
    },
    {
      id: 3,
      title: 'Đề khảo sát năng lực Toán học THPT - Đợt 2',
      subtitle: 'Câu số 15 • Ôn luyện chuyên sâu',
    },
    {
      id: 4,
      title: 'Đề thi thử số 08 - Ma trận Bộ GD&ĐT',
      subtitle: 'Câu số 25 • Đề chẵn',
    },
  ],
};
