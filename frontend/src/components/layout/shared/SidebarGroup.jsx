import SidebarNavItem from './SidebarNavItem';

/**
 * SidebarGroup - Nhóm menu gồm tiêu đề nhóm và danh sách các mục
 * @param {Object} props
 * @param {string} [props.title] - Tiêu đề nhóm (ví dụ: 'TỔNG QUAN', 'QUẢN LÝ THI')
 * @param {React.ReactNode|React.ComponentType} [props.icon] - Icon nhỏ trước tiêu đề nhóm
 * @param {Array} [props.items] - Mảng các mục { to, label, icon, badge, end }
 * @param {React.ReactNode} [props.children] - Children tùy chỉnh nếu không truyền items
 * @param {Function} [props.onItemClick] - Callback khi click mục
 */
export default function SidebarGroup({
  title,
  icon,
  items,
  children,
  onItemClick,
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
    <div className="sidebar-group">
      {title && (
        <div className="sidebar-group__header">
          {icon && <span className="sidebar-group__icon">{renderIcon()}</span>}
          <span className="sidebar-group__title">{title}</span>
        </div>
      )}
      <ul className="sidebar-group__items">
        {items
          ? items.map((item) => (
              <li key={item.to || item.label}>
                <SidebarNavItem
                  to={item.to}
                  label={item.label}
                  icon={item.icon}
                  badge={item.badge}
                  end={item.end}
                  onClick={onItemClick}
                />
              </li>
            ))
          : children}
      </ul>
    </div>
  );
}
