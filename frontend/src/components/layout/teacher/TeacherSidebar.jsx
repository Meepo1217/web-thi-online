import { Link, NavLink } from 'react-router-dom';
import SidebarGroup from '../shared/SidebarGroup';
import { teacherNavGroups, teacherBottomNav } from './teacherNavItems';
import { IconLogo, IconArrowRight } from '../../ui/icons';

/**
 * TeacherSidebar - Sidebar cố định dành riêng cho Giảng viên
 * Tuân thủ chính xác từng thông số thiết kế trong Figma Aside
 */
export default function TeacherSidebar({ isOpen, onClose }) {
  const BottomIcon = teacherBottomNav.icon;

  return (
    <>
      {/* Overlay hỗ trợ trên màn hình nhỏ */}
      {isOpen && (
        <div
          className="teacher-sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`teacher-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Phần trên: Brand + Navigation */}
        <div className="teacher-sidebar__top">
          {/* Brand header */}
          <div className="teacher-sidebar__brand">
            <Link to="/teacher/dashboard" className="teacher-sidebar__brand-link" onClick={onClose}>
              <div className="teacher-sidebar__logo">
                <IconLogo width={22} height={18} color="#FFFFFF" />
              </div>
              <div className="teacher-sidebar__brand-meta">
                <span className="teacher-sidebar__app-name">Thi Trực Tuyến</span>
                <span className="teacher-sidebar__app-sub">CỔNG GIẢNG VIÊN</span>
              </div>
            </Link>

            {/* Nút đóng trên mobile */}
            <button
              type="button"
              className="teacher-sidebar__mobile-close"
              onClick={onClose}
              aria-label="Đóng thanh điều hướng"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#76777D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Danh sách các nhóm và mục điều hướng (4 nhóm, 10 mục) */}
          <nav className="teacher-sidebar__nav">
            {teacherNavGroups.map((group) => (
              <SidebarGroup
                key={group.title}
                title={group.title}
                icon={group.icon}
                items={group.items.map((item) => ({
                  to: item.path,
                  label: item.label,
                  icon: item.icon,
                  end: item.end,
                }))}
                onItemClick={onClose}
              />
            ))}
          </nav>
        </div>

        {/* Khối dưới cùng: Thẻ dung lượng + Link phụ */}
        <div className="teacher-sidebar__bottom">
          {/* Thẻ dung lượng lưu trữ (Figma: nền #EFF4FF, padding 16px, bo 8px) */}
          <div className="teacher-storage-card">
            <div className="teacher-storage-card__row">
              <span className="teacher-storage-card__label">Dung lượng lưu trữ</span>
              <span className="teacher-storage-card__percent">78%</span>
            </div>

            <div className="teacher-storage-card__track">
              <div
                className="teacher-storage-card__bar"
                style={{ width: '78%' }}
              />
            </div>

            <span className="teacher-storage-card__caption">
              Đã dùng 15.6 GB / 20 GB
            </span>
          </div>

          {/* Link phụ dưới cùng (Figma: justify-content space-between, icon trái + mũi tên phải) */}
          <NavLink
            to={teacherBottomNav.path}
            onClick={onClose}
            className={({ isActive }) =>
              `teacher-sidebar__sublink ${isActive ? 'active' : ''}`
            }
          >
            <div className="teacher-sidebar__sublink-left">
              <span className="teacher-sidebar__sublink-icon">
                {BottomIcon && <BottomIcon width={15} height={15} />}
              </span>
              <span className="teacher-sidebar__sublink-text">
                {teacherBottomNav.label}
              </span>
            </div>

            <span className="teacher-sidebar__sublink-arrow">
              <IconArrowRight width={5} height={8} />
            </span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
