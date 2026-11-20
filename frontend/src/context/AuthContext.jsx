import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'eduquiz_auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Không thể đọc dữ liệu đăng nhập từ localStorage:', e);
      return null;
    }
  });

  /**
   * Đăng nhập người dùng theo vai trò
   * @param {'teacher' | 'student'} role - Vai trò của người dùng
   * @param {Object} customData - Thông tin bổ sung
   */
  const login = (role = 'student', customData = {}) => {
    let authUser = null;

    if (role === 'teacher') {
      authUser = {
        role: 'teacher',
        name: customData.name || 'ThS. Nguyễn Văn A',
        email: customData.email || 'teacher@hubt.edu.vn',
        title: 'Giảng viên',
        department: 'Tổ Toán - Khoa CNTT',
        initials: 'VA',
        ...customData,
      };
    } else {
      authUser = {
        role: 'student',
        name: customData.name || 'Nguyễn Văn An',
        email: customData.email || 'sv21020015@eduquiz.vn',
        mssv: customData.mssv || 'SV21020015',
        class: '12A1',
        title: 'Học sinh • Lớp 12A1',
        initials: 'NA',
        ...customData,
      };
    }

    setUser(authUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    } catch (e) {
      console.error('Lỗi khi lưu thông tin người dùng vào localStorage:', e);
    }
    return authUser;
  };

  /**
   * Đăng xuất khỏi hệ thống
   */
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Lỗi khi xóa phiên đăng nhập:', e);
    }
  };

  /**
   * Cập nhật thông tin người dùng trong phiên đăng nhập
   * @param {Object} updatedFields - Các trường cần cập nhật
   */
  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...(prev || {}), ...updatedFields };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Lỗi khi cập nhật thông tin người dùng vào localStorage:', e);
      }
      return updated;
    });
  };

  /**
   * Chuyển đổi nhanh vai trò (phục vụ mục đích kiểm thử / demo đồ án)
   */
  const switchRole = (newRole) => {
    return login(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || null,
        login,
        logout,
        switchRole,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng bên trong AuthProvider');
  }
  return context;
}
