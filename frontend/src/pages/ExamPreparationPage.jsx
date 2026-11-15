import { useState } from 'react'
import './pages.css'

export default function ExamPreparationPage({ exam, onBack, onStartExam }) {
  // Dữ liệu mặc định nếu chưa chọn bài từ Dashboard
  const currentExam = exam || {
    room: 'LỊCH SỬ ĐẢNG',
    roomCode: 'HA5',
    shift: 'BẮT ĐẦU: 13:30',
    title: 'Lịch sử Đảng cộng sản Việt Nam HUBT (chuẩn 2025) - Lsđ - lsd',
    status: 'Đang mở',
    date: '15/03/2025',
    duration: '45 phút',
    questions: '50 câu',
    timeWindow: '15:10 26/10/2026 - 15h15 26/10/2026',
    school: 'Đại học Kinh doanh và Công nghệ Hà Nội'
  }

  const [activeTab, setActiveTab] = useState('review')

  const handleStart = () => {
    if (onStartExam) {
      onStartExam(currentExam)
    } else {
      alert(`Bắt đầu làm bài: ${currentExam.title}\nThời gian: ${currentExam.duration}. Chúc bạn thi tốt!`)
    }
  }

  return (
    <main className="prep-main-canvas">
      <div className="prep-main-container">
        
        {/* Breadcrumb / Tiêu đề mục */}
        <div className="prep-breadcrumb-title">
          {onBack && (
            <button className="btn-back-link" onClick={onBack}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Trang chủ
            </button>
          )}
          {onBack && <span>/</span>}
          <span>Thông tin đề thi</span>
        </div>

        {/* KHỐI 1: THÔNG TIN ĐỀ THI (1152px x 307.5px) */}
        <section className="prep-exam-info-card">
          
          {/* Cột trái: Thẻ phòng thi Gradient xanh */}
          <div className="prep-room-card-left">
            <div className="prep-room-tag-top">
              <span className="prep-room-tag-text">MÃ PHÒNG THI / HỌC PHẦN</span>
              <div className="prep-room-tag-icon">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>

            <div className="prep-room-center-box">
              <h3 className="prep-room-center-heading">{currentExam.room}</h3>
              <div className="prep-shift-badge-red">{currentExam.shift}</div>
            </div>

            <div className="prep-room-footer-row">
              <span className="prep-room-code-text">{currentExam.roomCode || 'HA5'}</span>
              <div className="prep-room-footer-icon">
                <svg width="15" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Cột phải: Chi tiết đề thi & Các nút hành động */}
          <div className="prep-exam-details-right">
            <div className="prep-exam-details-content">
              <h1 className="prep-exam-h1-title">{currentExam.title}</h1>

              <div className="prep-status-row">
                <div className="prep-status-icon-circle">✓</div>
                <span className="prep-status-label">{currentExam.status || 'Đang mở'}</span>
              </div>

              <div className="prep-meta-tags-row">
                <div className="prep-meta-item">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{currentExam.date || '15/03/2025'}</span>
                </div>

                <span className="prep-meta-separator">|</span>

                <div className="prep-meta-item">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#0051D5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{currentExam.duration}</span>
                </div>

                <span className="prep-meta-separator">|</span>

                <div className="prep-meta-item">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#D97706">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>{currentExam.questions}</span>
                </div>
              </div>

              <div className="prep-time-window-section">
                <span className="prep-time-window-label">Thời gian làm bài</span>
                <div className="prep-time-window-val">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{currentExam.timeWindow}</span>
                </div>
              </div>
            </div>

            <div className="prep-action-buttons-row">
              <button className="btn-start-exam-blue" onClick={handleStart}>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>Vào làm bài</span>
              </button>

              <button className="btn-back-exam-outline" onClick={onBack}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#059669">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Quay lại</span>
              </button>
            </div>
          </div>

        </section>

        {/* KHỐI 2: KẾT QUẢ ÔN TẬP / THI THỬ (1152px x 280px) */}
        <section className="prep-results-card">
          <div className="prep-tab-header-strip">
            <button 
              className="prep-active-tab-btn"
              onClick={() => setActiveTab('review')}
            >
              Kết quả ôn tập
            </button>
          </div>

          <div className="prep-results-body">
            <span className="prep-mode-text">Chế độ: Thi thử</span>
            <span className="prep-score-subtext">Điểm số</span>

            <div className="prep-metrics-row">
              <div className="prep-metric-box">
                <div className="prep-score-square-badge">0</div>
                <div className="prep-metric-texts">
                  <span className="prep-metric-title">Điểm số đạt được</span>
                  <span className="prep-metric-num">0.0 / 10</span>
                </div>
              </div>

              <div className="prep-metric-box">
                <div className="prep-metric-texts">
                  <span className="prep-metric-title">Số câu đúng</span>
                  <span className="prep-metric-num">0</span>
                </div>
              </div>

              <div className="prep-metric-box">
                <div className="prep-metric-texts">
                  <span className="prep-metric-title">Số câu sai</span>
                  <span className="prep-metric-num">0</span>
                </div>
              </div>

              <div className="prep-metric-box">
                <div className="prep-metric-texts">
                  <span className="prep-metric-title">Bỏ trống</span>
                  <span className="prep-metric-num">120</span>
                </div>
              </div>
            </div>

            <div className="prep-results-footer-strip">
              <div className="prep-results-meta-list">
                <span>Thời gian làm bài: <strong>00:00:00</strong></span>
                <span>Lượt thi: <strong>1/1</strong></span>
                <span>Trạng thái: <strong>Chưa hoàn thành</strong></span>
              </div>

              <button 
                className="btn-detail-sm"
                onClick={() => alert('Xem chi tiết các câu trả lời lần thi trước.')}
              >
                Chi tiết
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

