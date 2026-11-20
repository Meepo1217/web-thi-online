import Login from '../auth/Login';

/**
 * StudentLogin - Cung cấp trang đăng nhập với vai trò mặc định là Sinh viên
 */
export default function StudentLogin() {
  return <Login defaultRole="student" />;
}
