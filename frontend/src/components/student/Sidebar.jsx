import './layout.css'

export default function Sidebar({ activeNav = 'home', onNavChange }) {
  const handleNav = (navKey) => {
    if (onNavChange) onNavChange(navKey)
  }

  return (
    <aside className="layout-sidebar">
      <div className="sidebar-nav-groups">
        
        {/* Điều Hướng Chính */}
        <div className="sidebar-group">
          <div className="sidebar-group-title">ĐIỀU HƯỚNG CHÍNH</div>

          {/* 1. Trang chủ */}
          <button 
            className={`sidebar-nav-btn ${activeNav === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>Trang chủ</span>
            {activeNav === 'home' && <span className="nav-active-dot"></span>}
          </button>

          {/* 2. Lịch sử thi */}
          <button 
            className={`sidebar-nav-btn ${activeNav === 'history' ? 'active' : ''}`}
            onClick={() => handleNav('history')}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>Lịch sử thi</span>
            {activeNav === 'history' && <span className="nav-active-dot"></span>}
          </button>

          {/* 3. Quản lý tài khoản */}
          <button 
            className={`sidebar-nav-btn ${activeNav === 'profile' ? 'active' : ''}`}
            onClick={() => handleNav('profile')}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Quản lý tài khoản</span>
            {activeNav === 'profile' && <span className="nav-active-dot"></span>}
          </button>
        </div>

      </div>

      {/* Thẻ Mini Profile Chân Sidebar */}
      <div 
        className="sidebar-profile-card"
        onClick={() => handleNav('profile')}
        style={{ cursor: 'pointer' }}
        title="Xem tài khoản cá nhân"
      >
        <div className="profile-card-user-row">
          <div className="profile-card-badge">SV</div>
          <div className="profile-card-info">
            <span className="profile-card-name">Nguyễn Văn An</span>
            <span className="profile-card-sub">SV2026-0812</span>
          </div>
        </div>
        <div className="profile-card-status-row">
          <span className="status-label-text">Đang trực tuyến</span>
          <span className="status-indicator-dot"></span>
        </div>
      </div>
    </aside>
  )
}
