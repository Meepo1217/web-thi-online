import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  IconSearch,
  IconPlus,
  IconBell,
  IconCalendar,
  IconUser,
} from '../../ui/icons';

/**
 * TeacherHeader - Thanh Header trên cùng dành riêng cho Giảng viên
 * Tuân thủ chính xác từng giá trị thiết kế Figma từ comment "/* Header *"
 */
export default function TeacherHeader({
  onToggleSidebar,
  user: userProp,
  onPrimaryAction,
}) {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const user = userProp || authUser || {
    name: 'ThS. Nguyễn Văn A',
    role: 'Giảng viên',
  };
  return (
    <header className="teacher-header">
      {/* Vùng trái: Nút toggle mobile + Ô tìm kiếm */}
      <div className="teacher-header__left">
        {/* Nút toggle mở sidebar trên mobile */}
        <button
          type="button"
          className="teacher-header__mobile-toggle"
          onClick={onToggleSidebar}
          aria-label="Mở danh mục điều hướng"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#45464D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Ô tìm kiếm: rộng ~384px, cao 28px, nền #EFF4FF, bo 8px, icon #76777D */}
        <div className="teacher-header__search">
          <span className="teacher-header__search-icon">
            <IconSearch width={15} height={15} color="#76777D" />
          </span>
          <input
            type="text"
            className="teacher-header__search-input"
            placeholder="Tìm kiếm sinh viên, đề thi, ngân hàng câu hỏi..."
          />
        </div>
      </div>

      {/* Vùng phải: Nút chính + Chuông + Icon phụ + Divider + Khối người dùng */}
      <div className="teacher-header__right">
        {/* Nút chính: nền #0051D5, bo 8px, cao 28px, padding 4px 16px, icon trắng 10.5px, chữ Inter 600 14px */}
        <button
          type="button"
          className="teacher-header__primary-btn"
          onClick={onPrimaryAction}
        >
          <span className="teacher-header__primary-btn-icon">
            <IconPlus width={11} height={11} color="#FFFFFF" />
          </span>
          <span className="teacher-header__primary-btn-text">Tạo đề thi</span>
        </button>

        {/* Nút chuông thông báo: icon #45464D, chấm đỏ #BA1A1A (8x8) góc trên bên phải */}
        <button
          type="button"
          className="teacher-header__icon-btn teacher-header__icon-btn--bell"
          aria-label="Thông báo"
          title="Thông báo"
        >
          <span className="teacher-header__bell-icon">
            <IconBell width={15} height={18} color="#45464D" />
          </span>
          <span className="teacher-header__badge-dot" />
        </button>

        {/* Nút icon thứ hai: icon #45464D (18.33x18.33px) dẫn tới Lịch giảng & Ca thi */}
        <button
          type="button"
          className="teacher-header__icon-btn"
          aria-label="Lịch giảng & Ca thi"
          title="Lịch giảng & Ca thi"
          onClick={() => navigate('/teacher/schedule')}
        >
          <span className="teacher-header__second-icon">
            <IconCalendar width={18} height={18} color="#45464D" />
          </span>
        </button>

        {/* Vạch ngăn dọc: 1x24px, #DCE9FF */}
        <div className="teacher-header__divider" />

        {/* Khối người dùng: Tên (Inter 600 14px), Vai trò (Inter 600 11px), Avatar 32x32 */}
        <div
          className="teacher-header__user-block"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/teacher/settings')}
          title="Bấm để vào Cài đặt tài khoản"
        >
          <div className="teacher-header__user-meta">
            <span className="teacher-header__user-name">{user.name}</span>
            <span className="teacher-header__user-role">{user.role === 'teacher' ? 'Giảng viên' : user.role}</span>
          </div>
          <div
            className="teacher-header__avatar"
            style={{
              background: user.avatarColor || '#000000',
              overflow: 'hidden',
            }}
            title={`Tài khoản: ${user.name}`}
          >
            {user.avatarImg ? (
              <img src={user.avatarImg} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <IconUser width={12} height={12} color="#FFFFFF" />
            )}
          </div>
          <button
            type="button"
            className="teacher-header__icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              logout();
              navigate('/login');
            }}
            aria-label="Đăng xuất"
            title="Đăng xuất khỏi hệ thống"
            style={{ marginLeft: '4px', color: '#BA1A1A' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
