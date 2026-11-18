import { useState } from 'react'
import './pages.css'

export default function StudentDashboardPage({ onSelectExam }) {
  // Trạng thái tìm kiếm & lọc
  const [searchKeyword, setSearchKeyword] = useState('')
  const [activeFilterTag, setActiveFilterTag] = useState('all')
  const [activeSubFilter, setActiveSubFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Danh sách 6 đề thi chuẩn Figma
  const examCards = [
    {
      id: 'HA6',
      department: 'KHOA CÔNG NGHỆ THÔNG TIN',
      room: 'HA6',
      roomClass: '',
      statusTime: 'BẮT ĐẦU: 08:00',
      shift: 'CA 1',
      title: 'Lập trình ứng dụng Web với PHP & Laravel',
      date: '12/11/2026',
      duration: '60 phút',
      questions: '40 câu',
      mode: 'Trực tuyến',
      school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
      category: 'ongoing'
    },
    {
      id: 'DANG',
      department: 'KHOA LÝ LUẬN CHÍNH TRỊ',
      room: 'LỊCH SỬ ĐẢNG',
      roomClass: 'font-md',
      statusTime: 'BẮT ĐẦU: 13:30',
      shift: 'CA 2',
      title: 'Lịch sử Đảng Cộng sản Việt Nam',
      date: '15/11/2026',
      duration: '45 phút',
      questions: '50 câu',
      mode: 'Trực tuyến',
      school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
      category: 'upcoming'
    },
    {
      id: 'HA5',
      department: 'KHOA CÔNG NGHỆ THÔNG TIN',
      room: 'HA5 - P.302',
      roomClass: '',
      statusTime: '09:30 - 11:00',
      shift: 'CA 3',
      title: 'Cơ sở dữ liệu nâng cao & Hệ quản trị SQL',
      date: '18/11/2026',
      duration: '90 phút',
      questions: '40 câu',
      mode: 'Trực tuyến',
      school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
      category: 'upcoming'
    },
    {
      id: 'HA4',
      department: 'KHOA ĐIỆN - ĐIỆN TỬ',
      room: 'HA4',
      roomClass: '',
      statusTime: 'BẮT ĐẦU: 07:30',
      shift: 'CA 1',
      title: 'Kỹ thuật số và Vi xử lý chuyên ngành',
      date: '20/11/2026',
      duration: '60 phút',
      questions: '35 câu',
      mode: 'Trực tuyến',
      school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
      category: 'upcoming'
    },
    {
      id: 'TIN4',
      department: 'KHOA TIẾNG ANH & NGOẠI NGỮ',
      room: 'TIN 4',
      roomClass: '',
      statusTime: 'BẮT ĐẦU: 15:00',
      shift: 'CA 4',
      title: 'Tiếng Anh chuyên ngành Công nghệ thông tin 2',
      date: '22/11/2026',
      duration: '60 phút',
      questions: '50 câu',
      mode: 'Trực tuyến',
      school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
      category: 'trial'
    },
    {
      id: 'HA3',
      department: 'KHOA CÔNG NGHỆ THÔNG TIN',
      room: 'HA3',
      roomClass: '',
      statusTime: 'BẮT ĐẦU: 10:15',
      shift: 'CA 2',
      title: 'Cấu trúc dữ liệu và Giải thuật ứng dụng',
      date: '25/11/2026',
      duration: '75 phút',
      questions: '40 câu',
      mode: 'Trực tuyến',
      school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
      category: 'completed'
    }
  ]

  const filteredCards = examCards.filter((card) => {
    const matchSearch =
      card.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      card.room.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      card.department.toLowerCase().includes(searchKeyword.toLowerCase())

    if (activeFilterTag === 'ongoing') return matchSearch && card.category === 'ongoing'
    if (activeFilterTag === 'upcoming') return matchSearch && card.category === 'upcoming'
    if (activeFilterTag === 'trial') return matchSearch && card.category === 'trial'
    if (activeFilterTag === 'completed') return matchSearch && card.category === 'completed'
    return matchSearch
  })

  return (
    <main className="dashboard-content-canvas">
      <div className="dashboard-container-960">
        
        {/* Khối Tìm Kiếm & Bộ Lọc Nhanh */}
        <section className="exam-search-box-card">
          <div className="exam-search-heading-block">
            <h1 className="exam-main-title">DANH SÁCH BÀI THI</h1>
            <p className="exam-main-desc">
              Tìm kiếm và tham gia các kỳ thi trực tuyến của trường Đại học Kinh doanh và Công nghệ Hà Nội
            </p>
          </div>

          <div className="search-controls-row">
            <div className="search-input-wrapper">
              <svg className="search-leading-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                className="search-input-field"
                placeholder="Tìm kiếm bài thi, môn học, giáo viên hoặc mã đề..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <div className="search-kbd-badge">
                <span>Ctrl</span>
                <span>+</span>
                <span>K</span>
              </div>
            </div>

            <button className="btn-search-primary">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Tìm kiếm</span>
            </button>
          </div>

          <div className="filter-tags-row">
            <div className="filter-tags-label">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Bộ lọc:</span>
            </div>

            <button 
              className={`filter-tag-pill ${activeFilterTag === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilterTag('all')}
            >
              Tất cả
            </button>
            <button 
              className={`filter-tag-pill ${activeFilterTag === 'ongoing' ? 'active' : ''}`}
              onClick={() => setActiveFilterTag('ongoing')}
            >
              Kỳ thi đang diễn ra
            </button>
            <button 
              className={`filter-tag-pill ${activeFilterTag === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveFilterTag('upcoming')}
            >
              Kỳ thi sắp tới
            </button>
            <button 
              className={`filter-tag-pill ${activeFilterTag === 'trial' ? 'active' : ''}`}
              onClick={() => setActiveFilterTag('trial')}
            >
              Bài thi thử
            </button>
            <button 
              className={`filter-tag-pill ${activeFilterTag === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveFilterTag('completed')}
            >
              Đã hoàn thành
            </button>
          </div>
        </section>

        {/* Khối Danh Sách & Điều Khiển Bài Thi */}
        <div className="exams-section-wrapper">
          <div className="section-controls-bar">
            <div className="section-controls-top-row">
              <div className="section-heading-with-icon">
                <svg width="20" height="17" viewBox="0 0 24 24" fill="#0051D5">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                <h2 className="section-h2-title">Bài thi khả dụng</h2>
              </div>

              <button 
                className="btn-refresh-sm"
                onClick={() => { setSearchKeyword(''); setActiveFilterTag('all') }}
              >
                Làm mới
              </button>
            </div>

            <div className="section-filter-btns-row">
              <button 
                className={`filter-btn-pill-sm ${activeSubFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveSubFilter('all')}
              >
                Tất cả
              </button>
              <button 
                className={`filter-btn-pill-sm ${activeSubFilter === 'open' ? 'active' : ''}`}
                onClick={() => setActiveSubFilter('open')}
              >
                Đang mở
              </button>
              <button 
                className={`filter-btn-pill-sm ${activeSubFilter === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveSubFilter('upcoming')}
              >
                Sắp tới
              </button>
            </div>
          </div>

          {/* Lưới 6 Thẻ Bài Thi */}
          <div className="exams-cards-grid">
            {filteredCards.map((card) => (
              <article key={card.id} className="exam-figma-card">
                <div className="card-header-top">
                  <div className="card-department-title">{card.department}</div>
                  <div className={`card-room-badge ${card.roomClass}`}>{card.room}</div>
                  <div className="card-status-time">{card.statusTime}</div>
                  <div className="card-shift-text">{card.shift}</div>
                </div>

                <div className="card-body-content">
                  <h3 className="card-exam-name">{card.title}</h3>

                  <div className="card-meta-line">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{card.date}</span>
                  </div>

                  <div className="card-meta-dual-row">
                    <div className="card-meta-subitem">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#D97706">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{card.duration}</span>
                    </div>

                    <div className="card-meta-subitem">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#0051D5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>{card.questions}</span>
                    </div>
                  </div>

                  <div className="card-divider-school">
                    <div className="school-tag-row">
                      <div className="school-check-badge">✓</div>
                      <span className="school-status-text">{card.mode}</span>
                    </div>
                    <span className="school-name-text">{card.school}</span>
                  </div>

                  <div className="card-action-btn-wrap">
                    <button 
                      className="btn-card-action"
                      onClick={() => {
                        if (onSelectExam) {
                          onSelectExam(card)
                        } else {
                          alert(`Đang vào phòng thi: ${card.title} (${card.room})`)
                        }
                      }}
                    >
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Vào phòng thi</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Thanh Phân Trang */}
          <div className="bottom-pagination-row">
            <div className="pagination-info-text">
              Hiển thị <strong>1 - 6</strong> trong tổng số <strong>24</strong> bài thi
            </div>

            <div className="pagination-buttons-group">
              <button 
                className="btn-page-nav"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                <svg width="5" height="8" viewBox="0 0 5 8" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 1L1 4l3 3" />
                </svg>
                <span>Trước</span>
              </button>

              <button 
                className={`btn-page-number ${currentPage === 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button 
                className={`btn-page-number ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button 
                className={`btn-page-number ${currentPage === 3 ? 'active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>

              <span className="pagination-ellipsis">...</span>

              <button 
                className={`btn-page-number ${currentPage === 6 ? 'active' : ''}`}
                onClick={() => setCurrentPage(6)}
              >
                6
              </button>

              <button 
                className="btn-page-nav"
                onClick={() => setCurrentPage(Math.min(6, currentPage + 1))}
              >
                <span>Sau</span>
                <svg width="5" height="8" viewBox="0 0 5 8" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3-3 3" />
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}

