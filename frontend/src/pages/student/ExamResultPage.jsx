import { useState } from 'react'
import './exam-result.css'

export default function ExamResultPage({ exam, onBack, onRetake }) {
  const currentExam = exam || {
    title: 'Đề thi thử THPT Quốc Gia 2025 - Môn Toán (Mã đề 101)',
    roomCode: 'HA5',
    candidateName: 'Đặng Mai Anh',
    candidateSBD: '2024HUBT102',
    submitTime: '15:42 - 24/10/2026',
    durationTotal: '90 phút',
    timeSpent: '41p 40s',
    totalScore: '8.6',
    maxScore: '10',
    correctCount: 43,
    wrongCount: 5,
    skipCount: 2,
    totalQuestions: 50
  }

  const [activeFilter, setActiveFilter] = useState('all') // 'all' | 'correct' | 'wrong' | 'skip'

  // Danh sách câu hỏi mẫu chi tiết theo đúng thiết kế Figma
  const questionsData = [
    {
      id: 1,
      status: 'correct',
      title: 'Cho hàm số y = f(x) có bảng biến thiên như sau. Hàm số đã cho đồng biến trên khoảng nào dưới đây?',
      mathSnippet: '(2; +∞)',
      points: '+0.20 ĐIỂM',
      options: [
        { key: 'A', text: '(2; +∞)', isChosen: true, isCorrect: true },
        { key: 'B', text: '(0; 2)', isChosen: false, isCorrect: false },
        { key: 'C', text: '(-∞; 2)', isChosen: false, isCorrect: false },
        { key: 'D', text: '(0; +∞)', isChosen: false, isCorrect: false }
      ],
      solution: 'Dựa vào bảng biến thiên, ta thấy trên khoảng (2; +∞) đạo hàm f\'(x) > 0 nên hàm số đồng biến trên khoảng (2; +∞). Phương án A là đáp án chính xác.'
    },
    {
      id: 2,
      status: 'wrong',
      title: 'Tìm giá trị của tham số m để biểu thức thỏa mãn điều kiện tích phân I:',
      mathSnippet: '∫(2x + m)dx = 4',
      points: '0.00 / 0.20 ĐIỂM',
      options: [
        { key: 'A', text: 'I = 0', isChosen: true, isCorrect: false },
        { key: 'B', text: 'I = 6', isChosen: false, isCorrect: false },
        { key: 'C', text: 'I = 12', isChosen: false, isCorrect: true },
        { key: 'D', text: 'I = -12', isChosen: false, isCorrect: false }
      ],
      solution: 'Ta có tích phân ∫(2x + m)dx từ 0 đến 1 bằng [x² + mx] = 1 + m = 4 => m = 3. Thay vào biểu thức đề bài yêu cầu tìm I, ta được I = 12. Phương án C là đáp án chính xác.'
    },
    {
      id: 3,
      status: 'skip',
      title: 'Trong không gian Oxyz, tính khoảng cách từ điểm A(1; 2; -1) đến mặt phẳng (P): 2x - 2y + z + 5 = 0:',
      mathSnippet: 'd(A, (P))',
      points: '0.00 / 0.20 ĐIỂM',
      options: [
        { key: 'A', text: 'd(A, (P)) = 1', isChosen: false, isCorrect: false },
        { key: 'B', text: 'd(A, (P)) = 7/3', isChosen: false, isCorrect: true },
        { key: 'C', text: 'd(A, (P)) = 3', isChosen: false, isCorrect: false },
        { key: 'D', text: 'd(A, (P)) = 5/3', isChosen: false, isCorrect: false }
      ],
      solution: 'Áp dụng công thức tính khoảng cách từ điểm A đến mặt phẳng (P): d(A, (P)) = |2(1) - 2(2) + (-1) + 5| / √(2² + (-2)² + 1²) = |2 - 4 - 1 + 5| / √9 = 7/3. Chọn B.'
    },
    {
      id: 4,
      status: 'correct',
      title: 'Gieo một con xúc xắc cân đối và đồng chất hai lần liên tiếp. Xác suất để tổng số chấm xuất hiện trong hai lần gieo bằng 7 là:',
      mathSnippet: 'P(A) = n(A) / n(Ω)',
      points: '+0.20 ĐIỂM',
      options: [
        { key: 'A', text: '1/12', isChosen: false, isCorrect: false },
        { key: 'B', text: '1/6', isChosen: true, isCorrect: true },
        { key: 'C', text: '5/36', isChosen: false, isCorrect: false },
        { key: 'D', text: '7/36', isChosen: false, isCorrect: false }
      ],
      solution: 'Số phần tử không gian mẫu n(Ω) = 6 x 6 = 36. Các biến cố thuận lợi có tổng số chấm bằng 7 là: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) => có 6 phần tử. Xác suất P = 6/36 = 1/6. Chọn B.'
    }
  ]

  // Lọc câu hỏi theo filter
  const filteredQuestions = questionsData.filter(q => {
    if (activeFilter === 'all') return true
    return q.status === activeFilter
  })

  // In trang kết quả
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="result-page-canvas">
      
      {/* A. Header / Top Bar nhẹ nhàng */}
      <header className="result-header-topbar">
        <div className="result-header-inner">
          <div className="result-brand-group">
            <div className="result-logo-wrap" onClick={onBack}>
              <div className="result-logo-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="result-logo-text-col">
                <h1 className="result-logo-title">EduQuiz</h1>
                <span className="result-logo-sub">ONLINE EXAM PLATFORM</span>
              </div>
            </div>

            <div className="result-header-divider"></div>

            <div className="result-exam-meta">
              <span className="result-exam-meta-title">{currentExam.title}</span>
              <span className="result-exam-meta-sub">Thời gian nộp: {currentExam.submitTime}</span>
            </div>
          </div>

          <div className="result-header-actions">
            <button className="btn-header-back-list" onClick={onBack}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Về danh sách</span>
            </button>
            <div className="result-user-avatar-badge" title={currentExam.candidateName}>
              <span>{currentExam.candidateName ? currentExam.candidateName.split(' ').map(n=>n[0]).slice(-2).join('') : 'MA'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="result-main-canvas">

        {/* B. Khối thông tin kết quả & thống kê tổng quan (Dashboard Summary) */}
        <section className="result-summary-section">
          
          {/* Cột trái: Thông tin học sinh, điểm số & thời gian */}
          <div className="result-summary-left">
            <div className="result-badge-row">
              <div className="badge-completed">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Đã hoàn thành</span>
              </div>
              <div className="badge-on-time">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Nộp bài đúng giờ</span>
              </div>
            </div>

            <div className="result-score-block">
              <span className="score-label-heading">ĐIỂM SỐ ĐẠT ĐƯỢC</span>
              <div className="score-display-row">
                <span className="score-big-number">{currentExam.totalScore}</span>
                <span className="score-scale-number">/ {currentExam.maxScore}</span>
              </div>
            </div>

            <div className="result-candidate-info-line">
              <span>Thí sinh: <strong className="candidate-name">{currentExam.candidateName}</strong></span>
              <span>SBD: <code className="candidate-sbd">{currentExam.candidateSBD}</code></span>
            </div>

            {/* Các chỉ số nhanh: Thời gian & 3 trạng thái câu hỏi */}
            <div className="result-stats-strip">
              
              {/* Thời gian */}
              <div className="stat-metric-card time">
                <div className="stat-metric-header">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Thời gian</span>
                </div>
                <div className="stat-metric-value-row">
                  <span className="big-val">{currentExam.timeSpent}</span>
                </div>
                <span className="stat-metric-subtext">/ {currentExam.durationTotal}</span>
              </div>

              {/* Đúng */}
              <div className="stat-metric-card correct">
                <div className="stat-metric-header">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Đúng</span>
                </div>
                <div className="stat-metric-value-row">
                  <span className="big-val">{currentExam.correctCount}</span>
                  <span style={{ fontSize: '12px', color: '#065F46' }}>câu</span>
                </div>
                <span className="stat-metric-subtext">86%</span>
              </div>

              {/* Sai */}
              <div className="stat-metric-card wrong">
                <div className="stat-metric-header">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Sai</span>
                </div>
                <div className="stat-metric-value-row">
                  <span className="big-val">{currentExam.wrongCount}</span>
                  <span style={{ fontSize: '12px', color: '#9F1239' }}>câu</span>
                </div>
                <span className="stat-metric-subtext">10%</span>
              </div>

              {/* Bỏ qua */}
              <div className="stat-metric-card skip">
                <div className="stat-metric-header">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                  </svg>
                  <span>Bỏ qua</span>
                </div>
                <div className="stat-metric-value-row">
                  <span className="big-val">{currentExam.skipCount}</span>
                  <span style={{ fontSize: '12px', color: '#475569' }}>câu</span>
                </div>
                <span className="stat-metric-subtext">4%</span>
              </div>

            </div>
          </div>

          {/* Cột phải: Biểu đồ trực quan Donut SVG Chart & Legend */}
          <div className="result-donut-chart-box">
            <div className="donut-graphic-container">
              
              {/* Donut SVG: Chu vi C = 2 * PI * 40 ≈ 251.32. Đúng 86% = 216.14, Sai 10% = 25.13, Bỏ qua 4% = 10.05 */}
              <svg className="donut-svg-element" viewBox="0 0 100 100">
                {/* Vòng nền xám */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E2E8F0" strokeWidth="15" />
                
                {/* Đúng 86% (Xanh lá #10B981) */}
                <circle 
                  cx="50" cy="50" r="40" fill="transparent" 
                  stroke="#10B981" strokeWidth="15" 
                  strokeDasharray="216.14 251.32" 
                  strokeDashoffset="0" 
                />

                {/* Sai 10% (Đỏ #F43F5E) */}
                <circle 
                  cx="50" cy="50" r="40" fill="transparent" 
                  stroke="#F43F5E" strokeWidth="15" 
                  strokeDasharray="25.13 251.32" 
                  strokeDashoffset="-216.14" 
                />

                {/* Bỏ qua 4% (Xám #94A3B8) */}
                <circle 
                  cx="50" cy="50" r="40" fill="transparent" 
                  stroke="#94A3B8" strokeWidth="15" 
                  strokeDasharray="10.05 251.32" 
                  strokeDashoffset="-241.27" 
                />
              </svg>

              <div className="donut-center-labels">
                <span className="donut-label-sub">TỔNG SỐ</span>
                <span className="donut-label-number">{currentExam.totalQuestions}</span>
                <span className="donut-label-status">CÂU HỎI</span>
              </div>
            </div>

            {/* Legend dưới biểu đồ */}
            <div className="donut-legend-strip">
              <div className="donut-legend-entry">
                <span className="donut-legend-dot green"></span>
                <span>Đúng (43)</span>
              </div>
              <div className="donut-legend-entry">
                <span className="donut-legend-dot red"></span>
                <span>Sai (5)</span>
              </div>
              <div className="donut-legend-entry">
                <span className="donut-legend-dot gray"></span>
                <span>Bỏ qua (2)</span>
              </div>
            </div>
          </div>

        </section>

        {/* C. Cụm nút hành động chính (Action Buttons Bar) */}
        <section className="result-action-bar-card">
          <div className="action-bar-info-note">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#0051D5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Học sinh có thể xem lại chi tiết bài làm và đáp án giải thích bên dưới.</span>
          </div>

          <div className="action-bar-buttons-group">
            <button className="btn-action-outline-pdf" onClick={handlePrint}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>In kết quả</span>
            </button>

            <button className="btn-action-primary-retake" onClick={onRetake || onBack}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Làm lại bài</span>
            </button>
          </div>
        </section>

        {/* D. Section - Danh sách câu hỏi và Đáp án (Review Answers) */}
        <section className="result-review-section">
          
          <div className="review-section-header-row">
            <div className="review-title-col">
              <h2 className="review-heading-2">Chi tiết bài thi & Đáp án</h2>
              <span className="review-sub-desc">Xem lại từng câu hỏi, lựa chọn của bạn và lời giải chi tiết</span>
            </div>

            <div className="review-filter-group">
              <button 
                className={`filter-badge-btn all ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                Tất cả (50)
              </button>
              <button 
                className={`filter-badge-btn correct ${activeFilter === 'correct' ? 'active' : ''}`}
                onClick={() => setActiveFilter('correct')}
              >
                Đúng (43)
              </button>
              <button 
                className={`filter-badge-btn wrong ${activeFilter === 'wrong' ? 'active' : ''}`}
                onClick={() => setActiveFilter('wrong')}
              >
                Sai (5)
              </button>
              <button 
                className={`filter-badge-btn skip ${activeFilter === 'skip' ? 'active' : ''}`}
                onClick={() => setActiveFilter('skip')}
              >
                Bỏ qua (2)
              </button>
            </div>
          </div>

          {/* Question Cards List */}
          <div className="result-question-cards-list">
            {filteredQuestions.map(q => {
              const isCorrect = q.status === 'correct'
              const isWrong = q.status === 'wrong'
              const isSkip = q.status === 'skip'

              let statusLabel = 'ĐÚNG'
              let statusClass = 'correct'
              if (isWrong) {
                statusLabel = 'SAI'
                statusClass = 'wrong'
              } else if (isSkip) {
                statusLabel = 'CHƯA LÀM'
                statusClass = 'skip'
              }

              return (
                <article key={q.id} className={`result-question-card status-${statusClass}`}>
                  
                  {/* Card Header Strip */}
                  <div className="result-card-header-strip">
                    <div className="result-card-header-left">
                      <span className="question-index-title">CÂU {q.id}</span>
                      <div className={`badge-result-status ${statusClass}`}>
                        {isCorrect && (
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {isWrong && (
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        {isSkip && (
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                          </svg>
                        )}
                        <span>{statusLabel}</span>
                      </div>
                    </div>

                    <span className="question-points-scored">{q.points}</span>
                  </div>

                  {/* Question Prompt */}
                  <div className="result-card-prompt-text">
                    <span>{q.title} </span>
                    {q.mathSnippet && (
                      <span className="math-inline-tag">{q.mathSnippet}</span>
                    )}
                  </div>

                  {/* Options Grid (2x2) */}
                  <div className="result-options-grid">
                    {q.options.map(opt => {
                      let optionItemClass = ''
                      let verdictText = ''
                      let verdictClass = ''

                      if (opt.isCorrect) {
                        optionItemClass = 'correct-answer'
                        verdictText = opt.isChosen ? 'ĐÚNG' : 'ĐÁP ÁN ĐÚNG'
                        verdictClass = 'correct'
                      } else if (opt.isChosen && !opt.isCorrect) {
                        optionItemClass = 'candidate-wrong'
                        verdictText = 'LỰA CHỌN CỦA BẠN'
                        verdictClass = 'wrong'
                      }

                      return (
                        <div key={opt.key} className={`review-option-item ${optionItemClass}`}>
                          <div className="review-option-badge">{opt.key}</div>
                          <span className="review-option-text">{opt.text}</span>
                          
                          {verdictText && (
                            <div className={`tag-option-verdict ${verdictClass}`}>
                              {verdictClass === 'correct' ? (
                                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                              <span>{verdictText}</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Solution Box */}
                  <div className="result-solution-box">
                    <div className={`solution-box-header ${isWrong ? 'wrong' : ''}`}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span>LỜI GIẢI CHI TIẾT:</span>
                    </div>
                    <div className="solution-box-content">
                      <p style={{ margin: 0 }}>{q.solution}</p>
                    </div>
                  </div>

                </article>
              )
            })}
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="result-footer-bar">
        <div className="result-footer-inner">
          <span>© 2026 HUCE EXAM Academic Platform. Bản quyền thuộc Trường Đại học Xây dựng Hà Nội (HUCE).</span>
          <div className="result-footer-links">
            <a href="#rules">Quy chế thi</a>
            <a href="#support">Hỗ trợ kỹ thuật</a>
          </div>
        </div>
      </footer>

    </div>
  )
}

