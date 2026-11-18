import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import TeacherLayout from './components/layout/teacher/TeacherLayout';
import TeacherHome from './pages/teacher/TeacherHome';
import { QuestionBankFolders, QuestionList, QuestionDetail, QuestionEdit } from './pages/teacher/question-bank';
import ExamManagement from './pages/teacher/exam-management/ExamManagement';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
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
          to="/student"
          style={{
            padding: '8px 16px',
            background: '#059669',
            color: '#FFFFFF',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 600,
          }}
        >
          👨‍🎓 Cổng Sinh viên &rarr;
        </Link>
        <Link
          to="/teacher/dashboard"
          style={{
            padding: '8px 16px',
            background: '#0051D5',
            color: '#FFFFFF',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 600,
          }}
        >
          👨‍🏫 Cổng Giảng viên &rarr;
        </Link>
        <Link
          to="/login"
          style={{
            padding: '8px 16px',
            background: '#45464D',
            color: '#FFFFFF',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 600,
          }}
        >
          Trang Đăng nhập (Auth)
        </Link>
      </div>
    </div>
  );
}

/**
 * App - Cấu hình hệ thống Router phân chia theo Roles:
 * - /student/* : Cổng Sinh viên (Student Portal)
 * - /teacher/* : Cổng Giảng viên (Teacher Portal)
 * - /login     : Xác thực tài khoản (Auth)
 */
function App() {
  return (
    <BrowserRouter>
      {/* Thanh chuyển đổi Role nhanh nổi ở góc trên màn hình */}
      <div style={{
        position: 'fixed',
        top: '12px',
        right: '20px',
        zIndex: 99999,
        background: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(8px)',
        color: '#FFFFFF',
        padding: '6px 12px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
        fontSize: '12px',
        fontFamily: "'Inter', sans-serif"
      }}>
        <span style={{ color: '#94A3B8', fontWeight: 600 }}>Vai trò:</span>
        <Link
          to="/student"
          style={{
            color: '#FFFFFF',
            textDecoration: 'none',
            padding: '4px 10px',
            borderRadius: '16px',
            background: '#059669',
            fontWeight: 600,
            fontSize: '11px'
          }}
        >
          👨‍🎓 Học sinh
        </Link>
        <Link
          to="/teacher/dashboard"
          style={{
            color: '#FFFFFF',
            textDecoration: 'none',
            padding: '4px 10px',
            borderRadius: '16px',
            background: '#0051D5',
            fontWeight: 600,
            fontSize: '11px'
          }}
        >
          👨‍🏫 Giảng viên
        </Link>
        <Link
          to="/login"
          style={{
            color: '#CBD5E1',
            textDecoration: 'none',
            padding: '4px 8px',
            borderRadius: '16px',
            fontWeight: 500,
            fontSize: '11px'
          }}
        >
          🔐 Đăng nhập
        </Link>
      </div>

      <Routes>
        {/* Route xác thực tài khoản chung cho cả Giảng viên và Học sinh / Sinh viên */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/login" element={<Navigate to="/login" replace />} />
        <Route path="/student/register" element={<Navigate to="/register" replace />} />
        <Route path="/teacher/login" element={<Navigate to="/login" replace />} />

        {/* Route Cổng Sinh viên (Student Portal) */}
        <Route path="/student/*" element={<StudentPortal />} />

        {/* Route kiểm tra kết nối ban đầu */}
        <Route path="/test-connection" element={<ConnectionTest />} />

        {/* Layout Route cha dành cho Giảng viên (Teacher Portal) */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherHome />} />
          <Route path="dashboard" element={<TeacherHome />} />
          <Route path="schedule" element={<TeacherDashboard />} />
          <Route path="questions" element={<QuestionBankFolders />} />
          <Route path="questions/:subjectId" element={<QuestionList />} />
          <Route path="questions/list" element={<QuestionList />} />
          <Route path="questions/detail/:questionId" element={<QuestionDetail />} />
          <Route path="questions/detail" element={<QuestionDetail />} />
          <Route path="questions/edit/:questionId" element={<QuestionEdit />} />
          <Route path="questions/edit" element={<QuestionEdit />} />
          <Route path="exams" element={<ExamManagement />} />
          <Route path="exam-management" element={<ExamManagement />} />
          <Route path="sessions" element={<TeacherDashboard />} />
          <Route path="results" element={<TeacherDashboard />} />
          <Route path="classes" element={<TeacherDashboard />} />
          <Route path="students" element={<TeacherDashboard />} />
          <Route path="statistics" element={<TeacherDashboard />} />
          <Route path="settings" element={<TeacherDashboard />} />
          <Route path="help" element={<TeacherDashboard />} />
          <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
        </Route>

        {/* Mặc định điều hướng vào cổng sinh viên */}
        <Route path="/" element={<Navigate to="/student" replace />} />

        {/* Bắt mọi route lạ điều hướng về cổng sinh viên */}
        <Route path="*" element={<Navigate to="/student" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
