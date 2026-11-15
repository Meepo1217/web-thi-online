import { NavLink } from 'react-router-dom';

/**
 * SidebarNavItem - Một mục menu trong Sidebar
 * @param {Object} props
 * @param {string} props.to - Đường dẫn route (ví dụ: '/teacher/dashboard')
 * @param {string} props.label - Tên hiển thị của mục
 * @param {React.ReactNode|React.ComponentType} [props.icon] - Icon SVG hoặc component
 * @param {string|number} [props.badge] - Huy hiệu / số lượng thông báo (nếu có)
 * @param {boolean} [props.end] - Khớp đường dẫn chính xác
 * @param {Function} [props.onClick] - Callback khi click
 */
export default function SidebarNavItem({
  to,
  label,
  icon,
  badge,
  end = false,
  onClick,
}) {
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'function') {
      const IconComp = icon;
      return <IconComp />;
    }
    return icon;
  };

  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `sidebar-nav-item ${isActive ? 'active' : ''}`
      }
    >
      {icon && <span className="sidebar-nav-item__icon">{renderIcon()}</span>}
      <span className="sidebar-nav-item__label">{label}</span>
      {badge !== undefined && badge !== null && (
        <span className="sidebar-nav-item__badge">{badge}</span>
      )}
    </NavLink>
  );
}
