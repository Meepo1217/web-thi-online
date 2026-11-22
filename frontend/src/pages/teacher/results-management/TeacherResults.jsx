import React, { useState, useMemo, useEffect } from 'react';
import { Link } from '../../../shims/react-router-dom';
import {
  IconSearch,
  IconExcel,
  IconEye,
  IconFileText,
  IconCheck,
  IconTrendUp,
  IconSparkles,
  IconCalendar,
  IconClock,
  IconFilter
} from '../../../components/ui/icons';
import TeacherResultDetailModal from './TeacherResultDetailModal';
import ExamResultPage from '../../student/ExamResultPage';
import './teacher-results.css';

// Dữ liệu các kỳ thi đã kết thúc và danh sách sinh viên đã nộp bài
const INITIAL_FINISHED_SESSIONS = [
  {
    id: 'SES-HA5',
    sessionCode: 'HA5 - Ca 15:00',
    title: 'Đề thi thử THPT Quốc Gia - Môn Toán',
    room: 'HA5 - P.302',
    department: 'KHOA CÔNG NGHỆ THÔNG TIN',
    date: '24/10/2026',
    timeWindow: '15:00 - 15:50',
    duration: '50 phút',
    questionsCount: 50,
    totalStudents: 45,
    submittedCount: 45,
    gpa: 8.5,
    passRate: '98%',
    maxScore: 9.6,
    submissions: [
      {
        id: 'SUB-001',
        studentName: 'Đặng Mai Anh',
        studentMssv: '2024HUBT102',
        className: '12A1',
        submittedAt: '15:42 - 24/10/2026',
        durationSpent: '41 phút 40 giây',
        correctCount: 43,
        wrongCount: 5,
        skipCount: 2,
        totalQuestions: 50,
        score: 8.6,
        rank: 'Giỏi'
      },
      {
        id: 'SUB-002',
        studentName: 'Nguyễn Văn Minh',
        studentMssv: '2024HUBT088',
        className: '12A1',
        submittedAt: '15:38 - 24/10/2026',
        durationSpent: '38 phút 15 giây',
        correctCount: 46,
        wrongCount: 4,
        skipCount: 0,
        totalQuestions: 50,
        score: 9.2,
        rank: 'Xuất sắc'
      },
      {
        id: 'SUB-003',
        studentName: 'Trần Bảo Ngọc',
        studentMssv: '2024HUBT115',
        className: '12A2',
        submittedAt: '15:44 - 24/10/2026',
        durationSpent: '44 phút 02 giây',
        correctCount: 37,
        wrongCount: 10,
        skipCount: 3,
        totalQuestions: 50,
        score: 7.4,
        rank: 'Khá'
      },
      {
        id: 'SUB-004',
        studentName: 'Lê Hoàng Nam',
        studentMssv: '2024HUBT042',
        className: '12A1',
        submittedAt: '15:40 - 24/10/2026',
        durationSpent: '40 phút 10 giây',
        correctCount: 40,
        wrongCount: 8,
        skipCount: 2,
        totalQuestions: 50,
        score: 8.0,
        rank: 'Giỏi'
      },
      {
        id: 'SUB-008',
        studentName: 'Hoàng Anh Tuấn',
        studentMssv: '2024HUBT189',
        className: '12A1',
        submittedAt: '15:32 - 24/10/2026',
        durationSpent: '32 phút 45 giây',
        correctCount: 48,
        wrongCount: 2,
        skipCount: 0,
        totalQuestions: 50,
        score: 9.6,
        rank: 'Xuất sắc'
      },
      {
        id: 'SUB-009',
        studentName: 'Đinh Phương Linh',
        studentMssv: '2024HUBT203',
        className: '12A2',
        submittedAt: '15:45 - 24/10/2026',
        durationSpent: '43 phút 12 giây',
        correctCount: 42,
        wrongCount: 6,
        skipCount: 2,
        totalQuestions: 50,
        score: 8.4,
        rank: 'Giỏi'
      },
      {
        id: 'SUB-010',
        studentName: 'Ngô Thùy Trang',
        studentMssv: '2024HUBT144',
        className: '12A1',
        submittedAt: '15:39 - 24/10/2026',
        durationSpent: '39 phút 20 giây',
        correctCount: 45,
        wrongCount: 5,
        skipCount: 0,
        totalQuestions: 50,
        score: 9.0,
        rank: 'Xuất sắc'
      },
      {
        id: 'SUB-011',
        studentName: 'Bùi Quang Huy',
        studentMssv: '2024HUBT167',
        className: '12A3',
        submittedAt: '15:48 - 24/10/2026',
        durationSpent: '46 phút 50 giây',
        correctCount: 34,
        wrongCount: 12,
        skipCount: 4,
        totalQuestions: 50,
        score: 6.8,
        rank: 'Khá'
      }
    ]
  },
  {
    id: 'SES-HB2',
    sessionCode: 'HB2 - Ca 08:00',
    title: 'Kiểm tra 1 tiết Đại số 12 - Chương 1',
    room: 'HB2 - P.201',
    department: 'KHOA KHOA HỌC CƠ BẢN',
    date: '23/10/2026',
    timeWindow: '08:00 - 08:45',
    duration: '45 phút',
    questionsCount: 50,
    totalStudents: 42,
    submittedCount: 42,
    gpa: 7.4,
    passRate: '90%',
    maxScore: 9.2,
    submissions: [
      {
        id: 'SUB-005',
        studentName: 'Phạm Quỳnh Chi',
        studentMssv: '2024HUBT156',
        className: '12A3',
        submittedAt: '08:41 - 23/10/2026',
        durationSpent: '41 phút 00 giây',
        correctCount: 33,
        wrongCount: 12,
        skipCount: 5,
        totalQuestions: 50,
        score: 6.5,
        rank: 'Khá'
      },
      {
        id: 'SUB-006',
        studentName: 'Vũ Đức Thịnh',
        studentMssv: '2024HUBT099',
        className: '12A2',
        submittedAt: '08:35 - 23/10/2026',
        durationSpent: '35 phút 20 giây',
        correctCount: 45,
        wrongCount: 4,
        skipCount: 1,
        totalQuestions: 50,
        score: 8.9,
        rank: 'Giỏi'
      },
      {
        id: 'SUB-007',
        studentName: 'Đỗ Thảo Vy',
        studentMssv: '2024HUBT073',
        className: '12B1',
        submittedAt: '08:43 - 23/10/2026',
        durationSpent: '43 phút 10 giây',
        correctCount: 29,
        wrongCount: 16,
        skipCount: 5,
        totalQuestions: 50,
        score: 5.8,
        rank: 'Trung bình'
      },
      {
        id: 'SUB-012',
        studentName: 'Trần Thùy Dung',
        studentMssv: '2024HUBT058',
        className: '12A2',
        submittedAt: '08:38 - 23/10/2026',
        durationSpent: '38 phút 00 giây',
        correctCount: 41,
        wrongCount: 7,
        skipCount: 2,
        totalQuestions: 50,
        score: 8.2,
        rank: 'Giỏi'
      },
      {
        id: 'SUB-013',
        studentName: 'Nguyễn Thế Anh',
        studentMssv: '2024HUBT011',
        className: '12A3',
        submittedAt: '08:40 - 23/10/2026',
        durationSpent: '39 phút 40 giây',
        correctCount: 38,
        wrongCount: 9,
        skipCount: 3,
        totalQuestions: 50,
        score: 7.6,
        rank: 'Khá'
      },
      {
        id: 'SUB-014',
        studentName: 'Lê Đức Mạnh',
        studentMssv: '2024HUBT132',
        className: '12B1',
        submittedAt: '08:44 - 23/10/2026',
        durationSpent: '44 phút 50 giây',
        correctCount: 24,
        wrongCount: 20,
        skipCount: 6,
        totalQuestions: 50,
        score: 4.8,
        rank: 'Chưa đạt'
      }
    ]
  },
  {
    id: 'SES-HA3',
    sessionCode: 'HA3 - Ca 10:15',
    title: 'Cấu trúc dữ liệu và Giải thuật ứng dụng',
    room: 'HA3 - P.401',
    department: 'KHOA CÔNG NGHỆ THÔNG TIN',
    date: '18/10/2026',
    timeWindow: '10:15 - 11:30',
    duration: '75 phút',
    questionsCount: 40,
    totalStudents: 48,
    submittedCount: 48,
    gpa: 8.1,
    passRate: '95%',
    maxScore: 9.8,
    submissions: [
      {
        id: 'SUB-015',
        studentName: 'Hoàng Kim Ngân',
        studentMssv: '2024HUBT262',
        className: 'CNTT1',
        submittedAt: '11:15 - 18/10/2026',
        durationSpent: '58 phút 15 giây',
        correctCount: 39,
        wrongCount: 1,
        skipCount: 0,
        totalQuestions: 40,
        score: 9.8,
        rank: 'Xuất sắc'
      },
      {
        id: 'SUB-016',
        studentName: 'Nguyễn Đức Thắng',
        studentMssv: '2024HUBT210',
        className: 'CNTT1',
        submittedAt: '11:20 - 18/10/2026',
        durationSpent: '64 phút 30 giây',
        correctCount: 37,
        wrongCount: 3,
        skipCount: 0,
        totalQuestions: 40,
        score: 9.3,
        rank: 'Xuất sắc'
      },
      {
        id: 'SUB-017',
        studentName: 'Phạm Minh Trang',
        studentMssv: '2024HUBT248',
        className: 'CNTT1',
        submittedAt: '11:22 - 18/10/2026',
        durationSpent: '66 phút 40 giây',
        correctCount: 35,
        wrongCount: 4,
        skipCount: 1,
        totalQuestions: 40,
        score: 8.8,
        rank: 'Giỏi'
      },
      {
        id: 'SUB-018',
        studentName: 'Lê Thị Hương',
        studentMssv: '2024HUBT225',
        className: 'CNTT2',
        submittedAt: '11:25 - 18/10/2026',
        durationSpent: '69 phút 10 giây',
        correctCount: 34,
        wrongCount: 5,
        skipCount: 1,
        totalQuestions: 40,
        score: 8.5,
        rank: 'Giỏi'
      },
      {
        id: 'SUB-019',
        studentName: 'Trần Văn Kiên',
        studentMssv: '2024HUBT231',
        className: 'CNTT2',
        submittedAt: '11:27 - 18/10/2026',
        durationSpent: '71 phút 00 giây',
        correctCount: 31,
        wrongCount: 7,
        skipCount: 2,
        totalQuestions: 40,
        score: 7.8,
        rank: 'Khá'
      },
      {
        id: 'SUB-020',
        studentName: 'Đỗ Thành Đạt',
        studentMssv: '2024HUBT255',
        className: 'CNTT2',
        submittedAt: '11:29 - 18/10/2026',
        durationSpent: '73 phút 20 giây',
        correctCount: 25,
        wrongCount: 13,
        skipCount: 2,
        totalQuestions: 40,
        score: 6.3,
        rank: 'Khá'
      }
    ]
  },
  {
    id: 'SES-HA6',
    sessionCode: 'HA6 - Ca 08:00',
    title: 'Lập trình ứng dụng Web với PHP & Laravel',
    room: 'HA6 - P.305',
    department: 'KHOA CÔNG NGHỆ THÔNG TIN',
    date: '15/10/2026',
    timeWindow: '08:00 - 09:00',
    duration: '60 phút',
    questionsCount: 40,
    totalStudents: 40,
    submittedCount: 40,
    gpa: 8.4,
    passRate: '97%',
    maxScore: 10.0,
    submissions: [
      {
        id: 'SUB-021',
        studentName: 'Bùi Quốc Huy',
        studentMssv: '2024HUBT301',
        className: 'CNTT3',
        submittedAt: '08:45 - 15/10/2026',
        durationSpent: '45 phút 10 giây',
        correctCount: 40,
        wrongCount: 0,
        skipCount: 0,
        totalQuestions: 40,
        score: 10.0,
        rank: 'Xuất sắc'
      },
      {
        id: 'SUB-022',
        studentName: 'Nguyễn Thu Trang',
        studentMssv: '2024HUBT312',
        className: 'CNTT3',
        submittedAt: '08:52 - 15/10/2026',
        durationSpent: '52 phút 40 giây',
        correctCount: 36,
        wrongCount: 3,
        skipCount: 1,
        totalQuestions: 40,
        score: 9.0,
        rank: 'Xuất sắc'
      },
      {
        id: 'SUB-023',
        studentName: 'Phan Thị Mai',
        studentMssv: '2024HUBT339',
        className: 'CNTT3',
        submittedAt: '08:54 - 15/10/2026',
        durationSpent: '54 phút 30 giây',
        correctCount: 33,
        wrongCount: 6,
        skipCount: 1,
        totalQuestions: 40,
        score: 8.3,
        rank: 'Giỏi'
      },
      {
        id: 'SUB-024',
        studentName: 'Vũ Thành Long',
        studentMssv: '2024HUBT325',
        className: '12A1',
        submittedAt: '08:56 - 15/10/2026',
        durationSpent: '56 phút 00 giây',
        correctCount: 30,
        wrongCount: 8,
        skipCount: 2,
        totalQuestions: 40,
        score: 7.5,
        rank: 'Khá'
      },
      {
        id: 'SUB-025',
        studentName: 'Đặng Tuấn Kiệt',
        studentMssv: '2024HUBT341',
        className: '12A1',
        submittedAt: '08:58 - 15/10/2026',
        durationSpent: '58 phút 20 giây',
        correctCount: 27,
        wrongCount: 11,
        skipCount: 2,
        totalQuestions: 40,
        score: 6.8,
        rank: 'Khá'
      }
    ]
  }
];

export default function TeacherResults() {
  const [sessions, setSessions] = useState(INITIAL_FINISHED_SESSIONS);
  // selectedSession: null => Xem danh sách các kỳ thi kết thúc; object => Xem danh sách sinh viên của kỳ thi đó
  const [selectedSession, setSelectedSession] = useState(null);
  // viewingStudent: null => Xem danh sách sinh viên; object => Kế thừa màn hình ExamResultPage của sinh viên đó
  const [viewingStudent, setViewingStudent] = useState(null);

  // Bộ lọc cho danh sách kỳ thi (Level 1)
  const [searchSession, setSearchSession] = useState('');

  // Bộ lọc cho danh sách sinh viên (Level 2)
  const [searchStudent, setSearchStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedScoreRank, setSelectedScoreRank] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Modal xem chi tiết bài làm
  const [activeSubmission, setActiveSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lấy thêm các ca thi completed từ localStorage nếu có
  useEffect(() => {
    try {
      const stored = localStorage.getItem('eduquiz_teacher_sessions');
      if (stored) {
        const parsed = JSON.parse(stored);
        const completedStored = parsed.filter(s => s.category === 'completed');
        if (completedStored.length > 0) {
          // Merge tránh trùng id
          setSessions(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newOnes = completedStored
              .filter(s => !existingIds.has(s.id))
              .map(s => ({
                id: s.id,
                sessionCode: `${s.room} - ${s.shift || 'Ca thi'}`,
                title: s.title,
                room: s.room,
                department: s.department || 'KHOA CÔNG NGHỆ THÔNG TIN',
                date: s.date || 'Hôm nay',
                timeWindow: s.timeRange || '08:00 - 09:30',
                duration: s.duration || '60 phút',
                questionsCount: parseInt(s.questions, 10) || 40,
                totalStudents: parseInt(s.studentsCount, 10) || 45,
                submittedCount: s.submittedCount || 45,
                gpa: 8.2,
                passRate: '96%',
                maxScore: 9.8,
                submissions: INITIAL_FINISHED_SESSIONS[0].submissions.map(sub => ({
                  ...sub,
                  id: `SUB-${s.id}-${sub.studentMssv}`
                }))
              }));
            return [...prev, ...newOnes];
          });
        }
      }
    } catch {
      // Bỏ qua lỗi parse
    }
  }, []);

  // Lọc danh sách kỳ thi kết thúc (Level 1)
  const filteredSessions = useMemo(() => {
    return sessions.filter((ses) => {
      if (searchSession.trim()) {
        const q = searchSession.toLowerCase();
        const matchTitle = ses.title.toLowerCase().includes(q);
        const matchCode = ses.sessionCode.toLowerCase().includes(q);
        const matchRoom = ses.room.toLowerCase().includes(q);
        if (!matchTitle && !matchCode && !matchRoom) return false;
      }
      return true;
    });
  }, [sessions, searchSession]);

  // Danh sách sinh viên thuộc kỳ thi đang chọn (Level 2)
  const currentSubmissions = useMemo(() => {
    if (!selectedSession) return [];
    return selectedSession.submissions || [];
  }, [selectedSession]);

  // Các lớp học độc nhất trong kỳ thi đang chọn
  const availableClasses = useMemo(() => {
    const setClasses = new Set(currentSubmissions.map(s => s.className));
    return Array.from(setClasses);
  }, [currentSubmissions]);

  // Lọc sinh viên trong kỳ thi đang chọn (Level 2)
  const filteredSubmissions = useMemo(() => {
    return currentSubmissions.filter((item) => {
      if (searchStudent.trim()) {
        const query = searchStudent.toLowerCase();
        const matchName = item.studentName.toLowerCase().includes(query);
        const matchMssv = item.studentMssv.toLowerCase().includes(query);
        if (!matchName && !matchMssv) return false;
      }
      if (selectedClass !== 'all' && item.className !== selectedClass) {
        return false;
      }
      if (selectedScoreRank !== 'all') {
        if (selectedScoreRank === 'excellent' && item.score < 9.0) return false;
        if (selectedScoreRank === 'good' && (item.score < 8.0 || item.score >= 9.0)) return false;
        if (selectedScoreRank === 'average' && (item.score < 5.0 || item.score >= 8.0)) return false;
        if (selectedScoreRank === 'failed' && item.score >= 5.0) return false;
      }
      return true;
    });
  }, [currentSubmissions, searchStudent, selectedClass, selectedScoreRank]);

  // Thống kê KPI của riêng kỳ thi đang chọn
  const examStats = useMemo(() => {
    const total = filteredSubmissions.length;
    if (total === 0) {
      return { total: 0, gpa: '0.0', passRate: '0%', maxScore: '0.0' };
    }
    const sum = filteredSubmissions.reduce((acc, curr) => acc + curr.score, 0);
    const gpa = (sum / total).toFixed(2);
    const passCount = filteredSubmissions.filter(i => i.score >= 5.0).length;
    const passRate = `${Math.round((passCount / total) * 100)}%`;
    const maxScore = Math.max(...filteredSubmissions.map(i => i.score)).toFixed(1);

    return { total, gpa, passRate, maxScore };
  }, [filteredSubmissions]);

  // Xử lý Checkbox chọn hàng
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredSubmissions.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Xem chi tiết bài làm của 1 sinh viên (kế thừa màn hình ExamResultPage)
  const handleViewDetail = (submission) => {
    setViewingStudent(submission);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset bộ lọc sinh viên
  const handleResetStudentFilter = () => {
    setSearchStudent('');
    setSelectedClass('all');
    setSelectedScoreRank('all');
  };

  // Xuất file Excel
  const handleExportExcel = () => {
    const rows = filteredSubmissions.map((s, index) => ({
      STT: index + 1,
      'Họ và tên': s.studentName,
      MSSV: s.studentMssv,
      Lớp: s.className,
      'Bài thi': selectedSession ? selectedSession.title : '',
      'Ca thi': selectedSession ? selectedSession.sessionCode : '',
      'Thời gian nộp': s.submittedAt,
      'Số câu đúng': `${s.correctCount}/${s.totalQuestions}`,
      'Điểm số': s.score,
      'Xếp loại': s.rank
    }));

    if (rows.length === 0) {
      setToastMessage('Không có dữ liệu để xuất file Excel!');
      setTimeout(() => setToastMessage(''), 3000);
      return;
    }

    const headers = Object.keys(rows[0]).join(',');
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [
      headers,
      ...rows.map(row => Object.values(row).map(v => `"${v}"`).join(','))
    ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const fileName = selectedSession
      ? `Bang_Diem_${selectedSession.id}_${new Date().toISOString().slice(0, 10)}.csv`
      : `Bang_Diem_Thi_${new Date().toISOString().slice(0, 10)}.csv`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Đã xuất dữ liệu bảng điểm Excel thành công!');
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Helper trả về style pill của điểm số
  const getScorePillClass = (score) => {
    if (score >= 9.0) return 'excellent';
    if (score >= 8.0) return 'good';
    if (score >= 5.0) return 'average';
    return 'failed';
  };

  // LEVEL 3: MÀN HÌNH KẾ THỪA KẾT QUẢ BÀI THI CỦA SINH VIÊN (EXAM RESULT PAGE)
  if (viewingStudent) {
    const studentExamData = {
      title: selectedSession ? selectedSession.title : 'Đề thi thử THPT Quốc Gia - Môn Toán',
      roomCode: selectedSession ? selectedSession.room : (viewingStudent.className || 'HA5 - P.302'),
      candidateName: viewingStudent.studentName,
      candidateSBD: viewingStudent.studentMssv,
      submitTime: viewingStudent.submittedAt,
      durationTotal: selectedSession ? selectedSession.duration : '50 phút',
      timeSpent: viewingStudent.durationSpent || '41 phút 40 giây',
      totalScore: Number(viewingStudent.score).toFixed(1),
      maxScore: '10',
      correctCount: viewingStudent.correctCount,
      wrongCount: viewingStudent.wrongCount,
      skipCount: viewingStudent.skipCount !== undefined ? viewingStudent.skipCount : (viewingStudent.totalQuestions - viewingStudent.correctCount - viewingStudent.wrongCount),
      totalQuestions: viewingStudent.totalQuestions || 50,
      questions: viewingStudent.questions
    };

    return (
      <div className="tr-page-container" style={{ padding: '24px 28px 40px' }}>
        {/* Breadcrumb cấp 3 điều hướng tiện lợi & Nút quay lại */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <nav className="tr-breadcrumb-nav" style={{ margin: 0 }}>
            <Link to="/teacher/dashboard" className="tr-breadcrumb-link">Trang chủ</Link>
            <span className="tr-breadcrumb-sep">/</span>
            <span>Chấm thi</span>
            <span className="tr-breadcrumb-sep">/</span>
            <span
              className="tr-breadcrumb-link"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setViewingStudent(null);
                setSelectedSession(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Kỳ thi đã kết thúc
            </span>
            <span className="tr-breadcrumb-sep">/</span>
            <span
              className="tr-breadcrumb-link"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setViewingStudent(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {selectedSession?.title || 'Danh sách sinh viên'}
            </span>
            <span className="tr-breadcrumb-sep">/</span>
            <span className="tr-breadcrumb-current">
              Bài làm: {viewingStudent.studentName} ({viewingStudent.studentMssv})
            </span>
          </nav>

          <button
            type="button"
            onClick={() => {
              setViewingStudent(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Quay lại danh sách thí sinh</span>
          </button>
        </div>

        {/* Kế thừa màn hình kết quả sinh viên */}
        <div style={{ marginTop: '8px' }}>
          <ExamResultPage
            exam={studentExamData}
            onBack={() => {
              setViewingStudent(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isTeacherView={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="tr-page-container">
      {/* Toast thông báo */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          background: '#0051D5',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0, 81, 213, 0.3)',
          zIndex: 10000,
          fontWeight: 600,
          fontSize: '13.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <IconCheck width={16} height={16} color="#FFFFFF" />
          {toastMessage}
        </div>
      )}

      {/* 1. Breadcrumbs */}
      <nav className="tr-breadcrumb-nav">
        <Link to="/teacher/dashboard" className="tr-breadcrumb-link">Trang chủ</Link>
        <span className="tr-breadcrumb-sep">/</span>
        <span>Chấm thi</span>
        <span className="tr-breadcrumb-sep">/</span>
        {selectedSession ? (
          <>
            <span
              className="tr-breadcrumb-link"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedSession(null)}
            >
              Kết quả bài làm
            </span>
            <span className="tr-breadcrumb-sep">/</span>
            <span className="tr-breadcrumb-current">{selectedSession.title}</span>
          </>
        ) : (
          <span className="tr-breadcrumb-current">Kết quả bài làm theo kỳ thi</span>
        )}
      </nav>

      {/* =========================================================================
          VIEW 1: DANH SÁCH CÁC KỲ THI ĐÃ KẾT THÚC (HIỂN THỊ ĐẦU TIÊN)
          ========================================================================= */}
      {!selectedSession && (
        <>
          {/* Header Banner */}
          <div className="tr-header-banner">
            <div className="tr-header-left">
              <span className="tr-header-badge">Chấm thi tự động & Tổng hợp</span>
              <h1 className="tr-header-title">Danh sách các kỳ thi đã kết thúc</h1>
              <p className="tr-header-desc">
                Chọn một kỳ thi đã kết thúc dưới đây để xem chi tiết danh sách sinh viên đã nộp bài, phổ điểm và tải bảng điểm.
              </p>
            </div>
          </div>

          {/* Search Toolbar cho kỳ thi */}
          <div className="tr-filter-toolbar">
            <div className="tr-search-box" style={{ maxWidth: '420px' }}>
              <IconSearch width={16} height={16} color="#64748B" />
              <input
                type="text"
                className="tr-search-input"
                placeholder="Tìm kiếm kỳ thi theo tên môn học..."
                value={searchSession}
                onChange={(e) => setSearchSession(e.target.value)}
              />
            </div>

            {searchSession && (
              <button
                className="tr-btn-reset"
                onClick={() => setSearchSession('')}
              >
                Xóa tìm kiếm
              </button>
            )}
          </div>

          {/* Bảng danh sách các kỳ thi đã kết thúc */}
          <div className="tr-table-wrapper" style={{ marginTop: '16px' }}>
            <table className="tr-table">
              <thead>
                <tr>
                  <th style={{ width: '50px', textAlign: 'center' }}>STT</th>
                  <th>Kỳ thi / Môn học</th>
                  <th>Ngày thi</th>
                  <th style={{ textAlign: 'center' }}>Điểm trung bình (GPA)</th>
                  <th style={{ textAlign: 'center' }}>Tỷ lệ đạt</th>
                  <th style={{ textAlign: 'center', width: '140px' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '48px 16px', color: '#64748B' }}>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#334155' }}>
                        Không tìm thấy kỳ thi đã kết thúc nào
                      </div>
                      <div style={{ fontSize: '13px', marginTop: '4px' }}>
                        Vui lòng thử tìm kiếm với từ khóa khác.
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSessions.map((ses, index) => (
                    <tr
                      key={ses.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedSession(ses);
                        setSelectedClass('all');
                        setSelectedScoreRank('all');
                        setSearchStudent('');
                        setSelectedIds([]);
                      }}
                    >
                      <td style={{ textAlign: 'center', color: '#64748B', fontWeight: 600 }}>
                        #{index + 1}
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <span style={{ fontWeight: 700, color: '#0051D5', fontSize: '14px' }}>
                            {ses.title}
                          </span>
                          <span style={{ fontSize: '12px', color: '#64748B' }}>
                            Thời lượng: {ses.duration} ({ses.questionsCount} câu hỏi)
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="tr-time-text">
                          {ses.date}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontWeight: 600, fontSize: '13.5px', color: '#0B1C30' }}>
                          {ses.gpa}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ color: '#059669', fontWeight: 600, fontSize: '13px' }}>
                          {ses.passRate}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className="tr-btn-detail"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSession(ses);
                            setSelectedClass('all');
                            setSelectedScoreRank('all');
                            setSearchStudent('');
                            setSelectedIds([]);
                          }}
                        >
                          <IconEye width={14} height={14} color="currentColor" />
                          <span>Xem điểm</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* =========================================================================
          VIEW 2: DANH SÁCH SINH VIÊN ĐÃ LÀM BÀI CỦA KỲ THI ĐƯỢC CHỌN
          ========================================================================= */}
      {selectedSession && (
        <>
          {/* Nút quay lại danh sách kỳ thi */}
          <button
            type="button"
            className="tr-back-btn"
            onClick={() => setSelectedSession(null)}
          >
            ← Quay lại danh sách kỳ thi đã kết thúc
          </button>

          {/* Header Banner Kỳ thi đang chọn */}
          <div className="tr-header-banner">
            <div className="tr-header-left">
              <span className="tr-header-badge" style={{ background: '#ECFDF5', color: '#059669' }}>
                Kỳ thi đã kết thúc • {selectedSession.sessionCode}
              </span>
              <h1 className="tr-header-title">{selectedSession.title}</h1>
              <p className="tr-header-desc">
                Phòng thi: <strong>{selectedSession.room}</strong> | Ngày thi: <strong>{selectedSession.date}</strong> | Thời lượng: <strong>{selectedSession.duration}</strong> ({selectedSession.questionsCount} câu hỏi) | Khoa: <strong>{selectedSession.department}</strong>
              </p>
            </div>

            <div className="tr-header-actions">
              <button className="tr-btn-export" onClick={handleExportExcel}>
                <IconExcel width={16} height={16} color="#FFFFFF" />
                Xuất file Excel
              </button>
            </div>
          </div>

          {/* 4 Thẻ KPI của riêng kỳ thi này */}
          <div className="tr-kpi-grid">
            <div className="tr-kpi-card">
              <div className="tr-kpi-icon-box" style={{ background: '#EFF6FF', color: '#0051D5' }}>
                <IconFileText width={22} height={22} color="#0051D5" />
              </div>
              <div className="tr-kpi-info">
                <span className="tr-kpi-value">{examStats.total} bài</span>
                <span className="tr-kpi-label">Tổng bài thi đã nộp</span>
              </div>
            </div>

            <div className="tr-kpi-card">
              <div className="tr-kpi-icon-box" style={{ background: '#F5F3FF', color: '#7C3AED' }}>
                <IconTrendUp width={22} height={22} color="#7C3AED" />
              </div>
              <div className="tr-kpi-info">
                <span className="tr-kpi-value">{examStats.gpa}</span>
                <span className="tr-kpi-label">Điểm trung bình (GPA)</span>
              </div>
            </div>

            <div className="tr-kpi-card">
              <div className="tr-kpi-icon-box" style={{ background: '#ECFDF5', color: '#059669' }}>
                <IconCheck width={22} height={22} color="#059669" />
              </div>
              <div className="tr-kpi-info">
                <span className="tr-kpi-value">{examStats.passRate}</span>
                <span className="tr-kpi-label">Tỷ lệ đạt chuẩn (≥ 5.0)</span>
              </div>
            </div>

            <div className="tr-kpi-card">
              <div className="tr-kpi-icon-box" style={{ background: '#FFFBEB', color: '#D97706' }}>
                <IconSparkles width={22} height={22} color="#D97706" />
              </div>
              <div className="tr-kpi-info">
                <span className="tr-kpi-value">{examStats.maxScore}</span>
                <span className="tr-kpi-label">Điểm cao nhất</span>
              </div>
            </div>
          </div>

          {/* Filter Toolbar cho sinh viên */}
          <div className="tr-filter-toolbar">
            <div className="tr-search-box">
              <IconSearch width={16} height={16} color="#64748B" />
              <input
                type="text"
                className="tr-search-input"
                placeholder="Tìm kiếm theo tên sinh viên hoặc MSSV..."
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
              />
            </div>

            <div className="tr-filter-groups">
              {/* Lọc theo lớp */}
              <select
                className="tr-filter-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="all">Tất cả lớp học</option>
                {availableClasses.map(cls => (
                  <option key={cls} value={cls}>Lớp {cls}</option>
                ))}
              </select>

              {/* Lọc theo mức điểm */}
              <select
                className="tr-filter-select"
                value={selectedScoreRank}
                onChange={(e) => setSelectedScoreRank(e.target.value)}
              >
                <option value="all">Tất cả phổ điểm</option>
                <option value="excellent">Xuất sắc (≥ 9.0)</option>
                <option value="good">Giỏi (8.0 - 8.9)</option>
                <option value="average">Khá & TB (5.0 - 7.9)</option>
                <option value="failed">Chưa đạt (&lt; 5.0)</option>
              </select>

              {/* Nút reset bộ lọc */}
              {(searchStudent || selectedClass !== 'all' || selectedScoreRank !== 'all') && (
                <button className="tr-btn-reset" onClick={handleResetStudentFilter}>
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>

          {/* Bảng danh sách sinh viên */}
          <div className="tr-table-wrapper">
            <table className="tr-table">
              <thead>
                <tr>
                  <th style={{ width: '40px', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Thí sinh</th>
                  <th>Lớp</th>
                  <th>Thời gian nộp bài</th>
                  <th>Thời gian làm bài</th>
                  <th style={{ textAlign: 'center' }}>Số câu đúng</th>
                  <th style={{ textAlign: 'center' }}>Điểm số</th>
                  <th>Xếp loại</th>
                  <th style={{ textAlign: 'center', width: '130px' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '48px 16px', color: '#64748B' }}>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#334155' }}>
                        Không tìm thấy bài làm nào của sinh viên phù hợp
                      </div>
                      <div style={{ fontSize: '13px', marginTop: '4px' }}>
                        Vui lòng thử điều chỉnh lại từ khóa hoặc các tiêu chí bộ lọc phía trên.
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((sub) => {
                    const scoreClass = getScorePillClass(sub.score);
                    const isChecked = selectedIds.includes(sub.id);

                    return (
                      <tr key={sub.id} style={{ background: isChecked ? '#F8FAFF' : undefined }}>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleSelectRow(sub.id)}
                          />
                        </td>
                        <td>
                          <div className="tr-candidate-cell">
                            <div className="tr-candidate-avatar">
                              {sub.studentName.split(' ').pop().charAt(0)}
                            </div>
                            <div className="tr-candidate-meta">
                              <span
                                className="tr-candidate-name"
                                onClick={() => handleViewDetail(sub)}
                              >
                                {sub.studentName}
                              </span>
                              <span className="tr-candidate-mssv">{sub.studentMssv}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="tr-class-badge">{sub.className}</span>
                        </td>
                        <td>
                          <span className="tr-time-text">{sub.submittedAt}</span>
                        </td>
                        <td>
                          <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                            {sub.durationSpent}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="tr-score-text">
                            <strong>{sub.correctCount}</strong>/{sub.totalQuestions}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span style={{ fontWeight: 600, fontSize: '13.5px', color: '#0B1C30' }}>
                            {sub.score.toFixed(1)}
                          </span>
                        </td>
                        <td>
                          <span className={`tr-rank-badge ${scoreClass}`}>
                            {sub.rank}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="tr-btn-detail"
                            onClick={() => handleViewDetail(sub)}
                            title="Xem chi tiết bài thi"
                          >
                            <IconEye width={14} height={14} color="currentColor" />
                            <span>Xem bài</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal xem chi tiết bài làm */}
      <TeacherResultDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submission={activeSubmission}
      />
    </div>
  );
}
