import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import TeacherLayout from './components/layout/teacher/TeacherLayout';
import TeacherHome from './pages/teacher/TeacherHome';
import { QuestionBankFolders, QuestionList, QuestionDetail, QuestionEdit } from './pages/teacher/question-bank';
import ExamManagement from './pages/teacher/exam-management/ExamManagement';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import Login from './pages/auth/Login';

/**
 * Component kiểm tra kết nối với Laravel Backend (giữ nguyên tính năng ban đầu của dự án)
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
          Đến Giao diện Giảng viên &rarr;
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
 * App - Cấu hình hệ thống Router cho ứng dụng
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route kiểm tra kết nối ban đầu */}
        <Route path="/test-connection" element={<ConnectionTest />} />

        {/* Route xác thực tài khoản (Auth nằm NGOÀI TeacherLayout) */}
        <Route path="/login" element={<Login />} />

        {/* Layout Route cha dành cho Giảng viên */}
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
          {/* Fallback cho các đường dẫn con chưa định nghĩa */}
          <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
        </Route>

        {/* Mặc định điều hướng vào cổng giảng viên */}
        <Route path="/" element={<Navigate to="/teacher/dashboard" replace />} />

        {/* Bắt mọi route lạ điều hướng về trang chủ */}
        <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
