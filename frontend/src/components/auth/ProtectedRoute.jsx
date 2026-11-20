import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute - Bảo vệ các route yêu cầu đăng nhập và phân quyền theo Vai trò
 * @param {Array<string>} allowedRoles - Danh sách các role được phép truy cập (vd: ['teacher'], ['student'])
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // 1. Nếu chưa đăng nhập: Chuyển hướng ngay về /login và ghi nhớ đường dẫn đang cố truy cập
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 2. Nếu đã đăng nhập nhưng truy cập sai quyền (Role-based Authorization)
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Nếu là Giảng viên mà vào route Sinh viên -> Điều hướng về Dashboard Giảng viên
    if (user?.role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    }
    // Nếu là Sinh viên mà vào route Giảng viên -> Điều hướng về Cổng Sinh viên
    return <Navigate to="/student" replace />;
  }

  // 3. Đúng quyền -> Cho phép hiển thị nội dung trang
  return children;
}
