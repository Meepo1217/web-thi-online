import './layout.css'

export default function Header({ onLogoClick, user }) {
  const currentUser = user || {
    name: 'Nguyễn Văn An',
    role: 'Học sinh • Lớp 12A1',
    initials: 'NA'
  }

  return (
    <header className="layout-header">
      {/* Brand on Top-Left */}
      <div className="layout-header-brand" onClick={onLogoClick}>
        <div className="brand-icon-box">
          <svg width="20" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
          </svg>
        </div>
        <div className="brand-text-col">
          <h1 className="brand-title-wrap">
            <span>HUBT</span>
            <span className="brand-blue">EXAM</span>
          </h1>
          <span className="brand-subtitle">ACADEMIC PLATFORM</span>
        </div>
      </div>

      {/* Right Profile & Utilities */}
      <div className="header-tools-right">
        {/* Calendar / Quick Action Button */}
        <button className="header-tool-btn" title="Lịch thi & Sự kiện">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* Notifications Button */}
        <button className="header-tool-btn" title="Thông báo">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="header-bell-badge"></span>
        </button>

        {/* Vertical Divider */}
        <div className="header-divider-v"></div>

        {/* User Profile Card */}
        <div className="header-user-card" title="Thông tin cá nhân">
          <div className="header-avatar-badge">
            <div className="avatar-circle-navy">{currentUser.initials}</div>
            <span className="online-dot-green"></span>
          </div>
          <div className="header-user-meta">
            <span className="user-meta-name">{currentUser.name}</span>
            <span className="user-meta-role">{currentUser.role}</span>
          </div>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#45464D">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l4 4 4-4" />
          </svg>
        </div>
      </div>
    </header>
  )
}

