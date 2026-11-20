/**
 * examChaptersData.js
 * Dữ liệu danh sách chương / chuyên đề quản lý đề thi theo môn học
 * Kế thừa cấu trúc giống hệt subjectChaptersData.js
 */

export const EXAM_SUBJECT_CHAPTERS_DATA = {
  subjectId: 'math',
  code: 'MATH-12',
  title: 'Toán học 12',
  description: 'Kho đề thi và ma trận kiểm tra môn Toán lớp 12 chuẩn Bộ GD&ĐT • 5 chuyên đề trọng tâm',
  statusTag: 'HỌC KỲ I',
  totalExams: 128,
  chapters: [
    {
      id: 'chap-1',
      order: 1,
      title: 'Chương I: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số',
      questionCount: 24,
      status: 'active',
    },
    {
      id: 'chap-2',
      order: 2,
      title: 'Chương II: Hàm số lũy thừa, hàm số mũ và hàm số logarit',
      questionCount: 18,
      status: 'active',
    },
    {
      id: 'chap-3',
      order: 3,
      title: 'Chương III: Nguyên hàm, tích phân và ứng dụng trong hình học',
      questionCount: 22,
      status: 'active',
    },
    {
      id: 'chap-4',
      order: 4,
      title: 'Chương IV: Hình học không gian & Tọa độ Oxyz',
      questionCount: 20,
      status: 'active',
    },
    {
      id: 'chap-5',
      order: 5,
      title: 'Chuyên đề Tổng hợp: Đề thi thử THPT Quốc gia',
      questionCount: 44,
      status: 'active',
    },
  ],
};
