import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import TeacherHeader from './TeacherHeader';
import './teacher-layout.css';

/**
 * TeacherLayout - Master Page (App Shell cố định) cho Giao diện Giáo viên
 * Ghép TeacherSidebar + TeacherHeader + <Outlet />
 * KHÔNG chứa nội dung trang (breadcrumb, bộ lọc, KPI, bảng...).
 */
export default function TeacherLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handlePrimaryAction = () => {
    // Có thể điều hướng đến trang tạo đề thi
    window.location.hash = '#/teacher/exams/create';
  };

  return (
    <div className="teacher-layout">
      {/* Sidebar cố định bên trái (Aside) */}
      <TeacherSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* Vùng còn lại (margin-left: 288px) */}
      <div className="teacher-main-wrapper">
        {/* Header dính trên cùng */}
        <TeacherHeader
          onToggleSidebar={handleToggleSidebar}
          onPrimaryAction={handlePrimaryAction}
        />

        {/* Vùng nội dung hoán đổi theo route con */}
        <main className="teacher-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
