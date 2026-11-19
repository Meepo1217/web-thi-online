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

          <button 
            className={`sidebar-nav-btn ${activeNav === 'recent' ? 'active' : ''}`}
            onClick={() => handleNav('recent')}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Truy cập gần đây</span>
            <span className="nav-badge-gray">7</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeNav === 'followers' ? 'active' : ''}`}
            onClick={() => handleNav('followers')}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Người dùng theo dõi</span>
            <span className="nav-badge-blue">12</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeNav === 'saved' ? 'active' : ''}`}
            onClick={() => handleNav('saved')}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>Bài thi đã lưu</span>
            <span className="nav-badge-gray">6</span>
          </button>
        </div>

        {/* Tài Nguyên & Cài Đặt */}
        <div className="sidebar-group sidebar-secondary-divider">
          <div className="sidebar-group-title">TÀI NGUYÊN & CÀI ĐẶT</div>

          <button className="sidebar-nav-btn">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Tài liệu học tập</span>
          </button>

          <button className="sidebar-nav-btn">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Lịch thi & Sự kiện</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeNav === 'profile' ? 'active' : ''}`}
            onClick={() => handleNav('profile')}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Cài đặt tài khoản</span>
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

