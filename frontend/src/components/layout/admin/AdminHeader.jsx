import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function AdminHeader({ onToggleSidebar, onSearch }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <header className="admin-header">
      {/* Left: Mobile Toggle & Global Search Bar */}
      <div className="admin-header__left">
        <button
          type="button"
          className="admin-header__mobile-toggle"
          onClick={onToggleSidebar}
          aria-label="Mở thanh điều hướng"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <form className="admin-header__search" onSubmit={handleSearchSubmit}>
          <span className="admin-header__search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            className="admin-header__search-input"
            placeholder="Tìm kiếm người dùng, đề thi, câu hỏi, hệ thống..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <span className="admin-header__search-shortcut">⌘K</span>
        </form>
      </div>

      {/* Right: Server Status, Notifications, User Menu */}
      <div className="admin-header__right">
        {/* Status Badge */}
        <div className="admin-header__status-badge">
          <span className="admin-status-dot" />
          <span>Hệ thống: Bình thường</span>
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          className="admin-header__icon-btn"
          title="Thông báo hệ thống (3 mới)"
          aria-label="Thông báo hệ thống"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="admin-header__badge-dot" />
        </button>

        <div className="admin-header__divider" />

        {/* User Profile Dropdown */}
        <div className="admin-profile-dropdown" ref={dropdownRef}>
          <button
            type="button"
            className="admin-profile-btn"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-expanded={showDropdown}
          >
            <div className="admin-avatar">
              {user?.initials || 'AD'}
            </div>
            <div className="admin-profile-info">
              <span className="admin-profile-name">{user?.name || 'Quản trị viên'}</span>
              <span className="admin-profile-role">Super Admin</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {showDropdown && (
            <div className="admin-dropdown-menu">
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #F1F5F9' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Đăng nhập với email:</p>
                <p style={{ margin: '2px 0 0', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  {user?.email || 'admin@huce.edu.vn'}
                </p>
              </div>

              <button
                type="button"
                className="admin-dropdown-item"
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/admin/settings');
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <span>Cài đặt hệ thống</span>
              </button>

              <button
                type="button"
                className="admin-dropdown-item"
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/admin/logs');
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <span>Nhật ký hệ thống</span>
              </button>

              <div style={{ margin: '4px 0', borderTop: '1px solid #F1F5F9' }} />

              <button
                type="button"
                className="admin-dropdown-item danger"
                onClick={handleLogout}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
