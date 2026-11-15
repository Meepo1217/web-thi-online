import { Link } from 'react-router-dom';

/**
 * Login - Trang đăng nhập (Auth nằm NGOÀI TeacherLayout, không có Sidebar/Header)
 */
export default function Login() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#F8F9FF',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          width: '380px',
          padding: '32px',
          background: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0B1C30', margin: '0 0 8px' }}>
          Đăng nhập hệ thống
        </h1>
        <p style={{ fontSize: '13px', color: '#76777D', margin: '0 0 24px' }}>
          Trang xác thực tài khoản (nằm ngoài App Shell)
        </p>
        <Link
          to="/teacher/dashboard"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#0051D5',
            color: '#FFFFFF',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          Đến Trang Giảng Viên &rarr;
        </Link>
      </div>
    </div>
  );
}
