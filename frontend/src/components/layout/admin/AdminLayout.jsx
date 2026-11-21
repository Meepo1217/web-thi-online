import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import './admin-layout.css';

/**
 * AdminLayout - Master App Shell dành riêng cho Quản trị viên (Super Admin)
 * Cấu trúc gồm Sidebar 288px cố định bên trái, Header 64px dính trên cùng,
 * vùng nội dung động <Outlet /> và Footer hệ thống.
 */
export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="admin-layout-root">
      {/* Sidebar 288px */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* Main Area (margin-left: 288px) */}
      <div className="admin-main-wrapper">
        {/* Sticky Header 64px */}
        <AdminHeader
          onToggleSidebar={handleToggleSidebar}
        />

        {/* Dynamic Route Content */}
        <main className="admin-main-content">
          <Outlet />
        </main>

        {/* Global Admin Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}
