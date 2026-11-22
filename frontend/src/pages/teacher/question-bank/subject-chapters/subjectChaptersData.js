/**
 * subjectChaptersData.js
 * Mock data cho Màn hình Quản lý Chương / Chuyên đề của Môn học
 * Dựa trên cấu trúc Figma Wireframe "Chương"
 */

export const SUBJECT_CHAPTERS_DATA = {
  subjectId: 'math',
  code: 'MATH-12',
  title: 'Toán học 12',
  description: 'Chương trình ôn luyện Toán học lớp 12 chuẩn Bộ GD&ĐT • 6 chuyên đề trọng tâm',
  statusTag: 'HỌC KỲ I',
  totalQuestions: 120,
  chapters: [
    {
      id: 'chap-1',
      order: 1,
      title: 'Chương I: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số',
      questionCount: 45,
      status: 'active',
    },
    {
      id: 'chap-2',
      order: 2,
      title: 'Chương II: Hàm số lũy thừa, hàm số mũ và hàm số logarit',
      questionCount: 38,
      status: 'active',
    },
    {
      id: 'chap-3',
      order: 3,
      title: 'Chương III: Nguyên hàm, tích phân và ứng dụng trong hình học',
      questionCount: 37,
      status: 'active',
    },
    {
      id: 'chap-4',
      order: 4,
      title: 'Chương IV: Số phức và phương pháp toạ độ trong không gian Oxyz',
      questionCount: 35,
      status: 'active',
    },
  ],
};
