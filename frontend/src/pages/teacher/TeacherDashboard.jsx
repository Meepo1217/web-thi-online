/**
 * TeacherDashboard - Trang placeholder tối thiểu cho Giảng viên
 * Hiển thị bên trong <Outlet /> của TeacherLayout để kiểm tra hoạt động của Shell
 */
export default function TeacherDashboard() {
  return (
    <div style={{ padding: '32px 24px' }}>
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '24px',
          fontWeight: 700,
          color: '#0B1C30',
          margin: '0 0 8px 0',
        }}
      >
        Trang chủ Giảng viên
      </h1>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: '#45464D',
          margin: 0,
        }}
      >
        Khung Master Page (App Shell) đã hoạt động chính xác. Nội dung trang sẽ được tích hợp tại đây.
      </p>
    </div>
  );
}
