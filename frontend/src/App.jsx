import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
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
  ExamEdit,
} from './pages/teacher/exam-management';
import StudentManagement from './pages/teacher/student-management';
import TeacherSettings from './pages/teacher/settings';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyOtp from './pages/auth/VerifyOtp';
import StudentPortal from './pages/student/StudentPortal';
import AdminLayout from './components/layout/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import AdminExamManagement from './pages/admin/AdminExamManagement';

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

  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user?.role === 'teacher') {
    return <Navigate to="/teacher/dashboard" replace />;
  }

  return <Navigate to="/student" replace />;
}

/**
 * App - Cấu hình hệ thống Router:
 * 1. Truy cập ban đầu ("/") tự động điều hướng về /login nếu chưa đăng nhập.
 * 2. Khi đăng nhập thành công -> tự động hiển thị theo vai trò (teacher: /teacher/dashboard, student: /student).
 * 3. Bảo vệ các route với ProtectedRoute theo vai trò.
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. Mặc định truy cập đầu tiên ("/") -> chuyển hướng theo auth và role */}
          <Route path="/" element={<RootRedirect />} />

          {/* 2. Route xác thực tài khoản chung cho cả Giảng viên và Học sinh / Sinh viên */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/auth/verify-otp" element={<VerifyOtp />} />
          <Route path="/student/login" element={<Login defaultRole="student" />} />
          <Route path="/student/register" element={<Navigate to="/register" replace />} />
          <Route path="/teacher/login" element={<Login defaultRole="teacher" />} />
          <Route path="/admin/login" element={<Login defaultRole="admin" />} />

          {/* Route kiểm tra kết nối ban đầu */}
          <Route path="/test-connection" element={<ConnectionTest />} />

          {/* 3. Cổng Sinh viên (Student Portal) - Chỉ sinh viên được truy cập */}
          <Route path="/profile" element={<Navigate to="/student/profile" replace />} />
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
            <Route path="exams/edit/:examId" element={<ExamEdit />} />
            <Route path="exams/edit" element={<ExamEdit />} />
            <Route path="exams/:subjectId" element={<ExamChapters />} />
            <Route path="exams/:subjectId/chapters" element={<ExamChapters />} />
            <Route path="exams/:subjectId/list" element={<ExamList />} />
            <Route path="exams/:subjectId/chapters/:chapterId" element={<ExamList />} />
            <Route path="exams/:subjectId/detail/:examId" element={<ExamDetail />} />
            <Route path="exams/:subjectId/edit/:examId" element={<ExamEdit />} />
            <Route path="exams/:subjectId/edit" element={<ExamEdit />} />
            <Route path="exams/list" element={<ExamList />} />
            <Route path="exam-management" element={<Navigate to="/teacher/exams" replace />} />

            <Route path="sessions" element={<TeacherDashboard />} />
            <Route path="results" element={<TeacherDashboard />} />
            <Route path="classes" element={<TeacherDashboard />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="statistics" element={<TeacherDashboard />} />
            <Route path="settings" element={<TeacherSettings />} />
            <Route path="help" element={<TeacherDashboard />} />
            <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
          </Route>

          {/* 6. Cổng Quản trị viên (Admin Portal) - Chỉ quản trị viên được truy cập */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="exams" element={<AdminExamManagement />} />
            <Route path="questions" element={<AdminDashboard />} />
            <Route path="subjects" element={<AdminDashboard />} />
            <Route path="logs" element={<AdminDashboard />} />
            <Route path="settings" element={<AdminDashboard />} />
            <Route path="help" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          {/* 7. Bắt mọi route lạ -> Chuyển về RootRedirect */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
