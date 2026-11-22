import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import TeacherLayout from './components/layout/teacher/TeacherLayout';
import TeacherHome from './pages/teacher/TeacherHome';
import {
  QuestionBankFolders,
  SubjectChapters,
  QuestionList,
  QuestionDetail,
  QuestionEdit,
  QuestionCreate,
  QuestionDeletePage,
} from './pages/teacher/question-bank';
import {
  ExamFolders,
  ExamChapters,
  ExamList,
  ExamDetail,
} from './pages/teacher/exam-management';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import Login from './pages/auth/Login';
import StudentPortal from './pages/student/StudentPortal';

/**
 * Component kiểm tra kết nối với Laravel Backend
 */
function ConnectionTest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/test-connection')
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error('Lỗi kết nối:', err);
        setError(
          'Không thể kết nối đến Laravel. Hãy kiểm tra xem server Laravel đã bật chưa hoặc có lỗi CORS không.'
        );
      });
  }, []);
  return (
    <div style={{ padding: '32px', fontFamily: "'Inter', sans-serif" }}>
      <h2>Kiểm tra kết nối Frontend (React) và Backend (Laravel)</h2>

      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      {data ? (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '5px',
            color: '#155724',
            marginTop: '16px',
          }}
        >
          <h3>Trạng thái: {data.status}</h3>
          <p>{data.message}</p>
        </div>
      ) : (
        !error && <p>Đang tải dữ liệu từ Backend Laravel...</p>
      )}

      <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
        <Link
          to="/login"
          style={{
            padding: '8px 16px',
            background: '#0051D5',
            color: '#FFFFFF',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 600,
          }}
        >
          Trang Đăng nhập (Auth) &rarr;
        </Link>
      </div>
    </div>
  );
}

/**
 * Thanh chuyển đổi và kiểm soát Vai trò nhanh ở góc trên màn hình
 */
function RoleSwitcherBar() {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: 'fixed',
        top: '12px',
        right: '20px',
        zIndex: 99999,
        background: 'rgba(15, 23, 42, 0.90)',
        backdropFilter: 'blur(8px)',
        color: '#FFFFFF',
        padding: '6px 14px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
        fontSize: '12px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {isAuthenticated ? (
        <>
          <span style={{ color: '#94A3B8', fontSize: '11px' }}>
            Đang đăng nhập:
          </span>
          <span
            style={{
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '12px',
              maxWidth: '130px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={user?.name}
          >
            {user?.name}
          </span>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '12px',
              background: user?.role === 'teacher' ? '#0051D5' : '#059669',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            {user?.role === 'teacher' ? '👨‍🏫 Giảng viên' : '👨‍🎓 Sinh viên'}
          </span>

          {/* Nút đổi vai trò nhanh để test */}
          <button
            type="button"
            onClick={() => {
              const newRole = user?.role === 'teacher' ? 'student' : 'teacher';
              switchRole(newRole);
              navigate(newRole === 'teacher' ? '/teacher/dashboard' : '/student');
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.16)',
              border: 'none',
              color: '#E2E8F0',
              padding: '3px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
            title={`Chuyển nhanh sang vai trò ${user?.role === 'teacher' ? 'Sinh viên' : 'Giảng viên'}`}
          >
            ⇄ Đổi vai trò
          </button>

          {/* Nút đăng xuất */}
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/login');
            }}
            style={{
              background: '#BA1A1A',
              border: 'none',
              color: '#FFFFFF',
              padding: '3px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            title="Đăng xuất khỏi hệ thống"
          >
            Thoát
          </button>
        </>
      ) : (
        <>
          <span style={{ color: '#94A3B8', fontSize: '11px' }}>Hệ thống Khảo thí EduQuiz</span>
          <Link
            to="/login"
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              padding: '4px 10px',
              borderRadius: '16px',
              background: '#0051D5',
              fontWeight: 600,
              fontSize: '11px',
            }}
          >
            🔐 Đăng nhập
          </Link>
        </>
      )}
    </div>
  );
}

/**
 * Điều hướng root "/" theo trạng thái xác thực và vai trò:
 * - Chưa đăng nhập -> /login
 * - Giảng viên -> /teacher/dashboard
 * - Học sinh / Sinh viên -> /student
 */
function RootRedirect() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 'teacher') {
    return <Navigate to="/teacher/dashboard" replace />;
  }

  return <Navigate to="/student" replace />;
}

/**
 * App - Cấu hình hệ thống Router:
 * 1. Truy cập ban đầu ("/") tự động điều hướng về /login.
 * 2. Khi đăng nhập thành công -> tự động hiển thị theo vai trò (teacher: /teacher/dashboard, student: /student).
 * 3. Bảo vệ các route với ProtectedRoute theo vai trò.
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Thanh chuyển đổi / thông tin Role nổi trên góc phải */}
        <RoleSwitcherBar />

        <Routes>
          {/* 1. Mặc định truy cập đầu tiên ("/") -> chuyển hướng theo auth và role */}
          <Route path="/" element={<RootRedirect />} />

          {/* 2. Route Đăng nhập chung */}
          <Route path="/login" element={<Login />} />
          <Route path="/student/login" element={<Login defaultRole="student" />} />
          <Route path="/teacher/login" element={<Login defaultRole="teacher" />} />

          {/* Route kiểm tra kết nối ban đầu */}
          <Route path="/test-connection" element={<ConnectionTest />} />

          {/* 3. Cổng Sinh viên (Student Portal) - Chỉ sinh viên được truy cập */}
          <Route
            path="/student/*"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentPortal />
              </ProtectedRoute>
            }
          />

          {/* 4. Route xác nhận xóa câu hỏi - Chỉ giảng viên được truy cập */}
          <Route
            path="/teacher/questions/delete/:questionId"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <QuestionDeletePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/questions/delete"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <QuestionDeletePage />
              </ProtectedRoute>
            }
          />

          {/* 5. Cổng Giảng viên (Teacher Portal) - Chỉ giảng viên được truy cập */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="dashboard" element={<TeacherHome />} />
            <Route path="schedule" element={<TeacherDashboard />} />
            <Route path="questions" element={<QuestionBankFolders />} />
            <Route path="questions/:subjectId" element={<SubjectChapters />} />
            <Route path="questions/:subjectId/chapters" element={<SubjectChapters />} />
            <Route path="questions/:subjectId/list" element={<QuestionList />} />
            <Route path="questions/:subjectId/chapters/:chapterId" element={<QuestionList />} />
            <Route path="questions/list" element={<QuestionList />} />
            <Route path="questions/detail/:questionId" element={<QuestionDetail />} />
            <Route path="questions/detail" element={<QuestionDetail />} />
            <Route path="questions/create" element={<QuestionCreate />} />
            <Route path="questions/:subjectId/create" element={<QuestionCreate />} />
            <Route path="questions/edit/:questionId" element={<QuestionEdit />} />
            <Route path="questions/edit" element={<QuestionEdit />} />

            {/* Quản lý đề thi (Exam Management) */}
            <Route path="exams" element={<ExamFolders />} />
            <Route path="exams/detail/:examId" element={<ExamDetail />} />
            <Route path="exams/detail" element={<ExamDetail />} />
            <Route path="exams/:subjectId" element={<ExamChapters />} />
            <Route path="exams/:subjectId/chapters" element={<ExamChapters />} />
            <Route path="exams/:subjectId/list" element={<ExamList />} />
            <Route path="exams/:subjectId/chapters/:chapterId" element={<ExamList />} />
            <Route path="exams/:subjectId/detail/:examId" element={<ExamDetail />} />
            <Route path="exams/list" element={<ExamList />} />
            <Route path="exam-management" element={<Navigate to="/teacher/exams" replace />} />

            <Route path="sessions" element={<TeacherDashboard />} />
            <Route path="results" element={<TeacherDashboard />} />
            <Route path="classes" element={<TeacherDashboard />} />
            <Route path="students" element={<TeacherDashboard />} />
            <Route path="statistics" element={<TeacherDashboard />} />
            <Route path="settings" element={<TeacherDashboard />} />
            <Route path="help" element={<TeacherDashboard />} />
            <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
          </Route>

          {/* 6. Bắt mọi route lạ -> Chuyển về RootRedirect */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
