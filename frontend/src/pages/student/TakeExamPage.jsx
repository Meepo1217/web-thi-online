import { useState, useEffect } from 'react'
import './take-exam.css'

export default function TakeExamPage({ exam, onBack, onComplete }) {
  const currentExam = exam || {
    room: 'LỊCH SỬ ĐẢNG',
    roomCode: 'HA5',
    title: 'Lịch sử Đảng cộng sản Việt Nam HUBT (chuẩn 2025) - Lsđ - lsd',
    duration: '45 phút',
    totalQuestions: 50
  }

  // Khởi tạo danh sách 50 câu hỏi phong phú & chuẩn Figma
  const initialQuestions = [
    {
      id: 1,
      title: 'Đảng Cộng sản Việt Nam được thành lập vào ngày tháng năm nào và tại đâu?',
      codeSnippet: 'Hội nghị hợp nhất 03/02/1930',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Ngày 03/02/1930 tại Hương Cảng (Trung Quốc)' },
        { key: 'B', text: 'Ngày 03/02/1930 tại Quảng Châu (Trung Quốc)' },
        { key: 'C', text: 'Ngày 09/03/1930 tại Cao Bằng' },
        { key: 'D', text: 'Ngày 19/08/1945 tại Hà Nội' }
      ]
    },
    {
      id: 2,
      title: 'Văn kiện nào sau đây được coi là Cương lĩnh chính trị đầu tiên của Đảng ta?',
      codeSnippet: 'Cương lĩnh chính trị tháng 02/1930',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Luận cương chính trị tháng 10/1930' },
        { key: 'B', text: 'Chánh cương vắn tắt, Sách lược vắn tắt của Đảng' },
        { key: 'C', text: 'Chỉ thị Kháng chiến kiến quốc (1945)' },
        { key: 'D', text: 'Báo cáo Bàn về cách mạng Việt Nam (1951)' }
      ]
    },
    {
      id: 3,
      title: 'Ai là Tổng Bí thư đầu tiên của Ban Chấp hành Trung ương Đảng Cộng sản Việt Nam?',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Đồng chí Nguyễn Ái Quốc' },
        { key: 'B', text: 'Đồng chí Trần Phú' },
        { key: 'C', text: 'Đồng chí Lê Hồng Phong' },
        { key: 'D', text: 'Đồng chí Hà Huy Tập' }
      ]
    },
    {
      id: 4,
      title: 'Hội nghị Ban Chấp hành Trung ương Đảng lần thứ 8 (tháng 5/1941) đã chủ trương thành lập mặt trận nào?',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Mặt trận Liên Việt' },
        { key: 'B', text: 'Mặt trận Tổ quốc Việt Nam' },
        { key: 'C', text: 'Mặt trận Việt Nam Độc lập Đồng minh (Việt Minh)' },
        { key: 'D', text: 'Mặt trận Dân chủ Đông Dương' }
      ]
    },
    {
      id: 5,
      title: 'Chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta" ra đời vào thời gian nào?',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Ngày 12/03/1945' },
        { key: 'B', text: 'Ngày 09/03/1945' },
        { key: 'C', text: 'Ngày 15/08/1945' },
        { key: 'D', text: 'Ngày 02/09/1945' }
      ]
    },
    {
      id: 6,
      title: 'Bản "Tuyên ngôn Độc lập" khai sinh ra nước Việt Nam Dân chủ Cộng hòa được đọc tại đâu?',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Quảng trường Ba Đình, Hà Nội' },
        { key: 'B', text: 'Nhà hát Lớn Hà Nội' },
        { key: 'C', text: 'Quảng trường Cách mạng Tháng Tám' },
        { key: 'D', text: 'Chiến khu Tân Trào, Tuyên Quang' }
      ]
    },
    {
      id: 7,
      title: 'Đại hội đại biểu toàn quốc lần thứ II của Đảng (tháng 2/1951) quyết định đổi tên Đảng thành gì?',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Đảng Lao động Việt Nam' },
        { key: 'B', text: 'Đảng Cộng sản Đông Dương' },
        { key: 'C', text: 'Đảng Dân chủ Việt Nam' },
        { key: 'D', text: 'Hội Nghiên cứu Chủ nghĩa Mác' }
      ]
    },
    {
      id: 8,
      title: 'Chiến dịch lịch sử Điện Biên Phủ toàn thắng vào ngày tháng năm nào?',
      codeSnippet: 'Chiến dịch lịch sử 1954',
      hasDiagram: false,
      options: [
        { key: 'A', text: '07/05/1954' },
        { key: 'B', text: '13/03/1954' },
        { key: 'C', text: '21/07/1954' },
        { key: 'D', text: '10/10/1954' }
      ]
    },
    {
      id: 9,
      title: 'Hiệp định Giơ-ne-vơ về chấm dứt chiến tranh, lập lại hòa bình ở Đông Dương được ký kết vào năm nào?',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Năm 1954' },
        { key: 'B', text: 'Năm 1953' },
        { key: 'C', text: 'Năm 1973' },
        { key: 'D', text: 'Năm 1975' }
      ]
    },
    {
      id: 10,
      title: 'Hội nghị Trung ương lần thứ 15 (tháng 1/1959) đã mở đường cho phong trào nào bùng nổ ở miền Nam?',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Phong trào Đồng Khởi' },
        { key: 'B', text: 'Phong trào Ba sẵn sàng' },
        { key: 'C', text: 'Phong trào Năm xung phong' },
        { key: 'D', text: 'Tổng tiến công và nổi dậy Tết Mậu Thân' }
      ]
    },
    {
      id: 11,
      title: 'Đại hội nào của Đảng đã đề ra đường lối đổi mới toàn diện đất nước?',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Đại hội đại biểu toàn quốc lần thứ VI (12/1986)' },
        { key: 'B', text: 'Đại hội đại biểu toàn quốc lần thứ V (1982)' },
        { key: 'C', text: 'Đại hội đại biểu toàn quốc lần thứ VII (1991)' },
        { key: 'D', text: 'Đại hội đại biểu toàn quốc lần thứ VIII (1996)' }
      ]
    },
    {
      id: 12,
      title: 'Đặc trưng bản chất của nền kinh tế thị trường định hướng xã hội chủ nghĩa ở nước ta là gì?',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Kinh tế nhà nước giữ vai trò chủ đạo' },
        { key: 'B', text: 'Kinh tế tư nhân giữ vai trò chủ đạo' },
        { key: 'C', text: 'Tập trung bao cấp và bình quân tuyệt đối' },
        { key: 'D', text: 'Tự do cạnh tranh không có sự quản lý của Nhà nước' }
      ]
    },
    {
      id: 13,
      title: 'Chiến dịch Hồ Chí Minh lịch sử giải phóng hoàn toàn miền Nam, thống nhất đất nước toàn thắng vào ngày nào?',
      hasDiagram: false,
      options: [
        { key: 'A', text: '30/04/1975' },
        { key: 'B', text: '26/03/1975' },
        { key: 'C', text: '01/05/1975' },
        { key: 'D', text: '19/05/1975' }
      ]
    },
    {
      id: 14,
      title: 'Dựa vào biểu đồ phân tích chu kỳ tăng trưởng kinh tế và các giai đoạn thực hiện kế hoạch 5 năm (như hình minh họa bên dưới), giai đoạn nào ghi nhận tốc độ phục hồi GDP vượt ngưỡng biên độ f(x)?',
      codeSnippet: 'Đồ thị phân tích hàm chu kỳ: f(x) = k * log(x) + C',
      hasDiagram: true,
      options: [
        { key: 'A', text: 'Giai đoạn chuyển đổi cơ cấu (x > 2.5) với tốc độ tăng trưởng ổn định' },
        { key: 'B', text: 'Điểm uốn cực trị tại tọa độ O(1.5, 2.0)' },
        { key: 'C', text: 'Vùng bão hòa tiệm cận trục ngang Ox' },
        { key: 'D', text: 'Chu kỳ suy thoái cục bộ thời kỳ mở cửa' }
      ]
    },
    {
      id: 15,
      title: 'Đại hội XIII của Đảng (2021) xác định mục tiêu đến năm 2045 nước ta trở thành quốc gia như thế nào?',
      codeSnippet: 'Chiến lược phát triển 2021 - 2030, tầm nhìn 2045',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Nước đang phát triển có thu nhập trung bình thấp' },
        { key: 'B', text: 'Nước phát triển, thu nhập cao theo định hướng XHCN' },
        { key: 'C', text: 'Nước công nghiệp hóa nông nghiệp truyền thống' },
        { key: 'D', text: 'Quốc gia trung hòa carbon hoàn toàn' }
      ]
    },
    {
      id: 16,
      title: 'Bài học kinh nghiệm hàng đầu về công tác xây dựng, chỉnh đốn Đảng được khẳng định xuyên suốt là gì?',
      hasDiagram: false,
      options: [
        { key: 'A', text: 'Giữ vững bản chất giai cấp công nhân và nguyên tắc tập trung dân chủ' },
        { key: 'B', text: 'Phân quyền độc lập tuyệt đối giữa các cơ sở Đảng địa phương' },
        { key: 'C', text: 'Mở rộng quy mô đảng viên không kèm theo tiêu chuẩn chất lượng' },
        { key: 'D', text: 'Cắt giảm các kỳ sinh hoạt chi bộ định kỳ để tăng năng suất' }
      ]
    }
  ]

  // Bổ sung đầy đủ cho đủ 50 câu
  for (let i = 17; i <= 50; i++) {
    initialQuestions.push({
      id: i,
      title: `Câu hỏi số ${i}: Nội dung quan điểm chỉ đạo của Đảng về công tác phát triển giáo dục, đào tạo và khoa học công nghệ trong kỷ nguyên mới?`,
      hasDiagram: false,
      options: [
        { key: 'A', text: `Phương án A cho câu hỏi ${i}: Là quốc sách hàng đầu và động lực then chốt` },
        { key: 'B', text: `Phương án B cho câu hỏi ${i}: Trách nhiệm riêng của các trường đại học` },
        { key: 'C', text: `Phương án C cho câu hỏi ${i}: Phát triển tự phát theo quy luật thị trường` },
        { key: 'D', text: `Phương án D cho câu hỏi ${i}: Chỉ đầu tư khi hoàn thành công nghiệp hóa` }
      ]
    })
  }

  // Pre-fill answers theo đúng Figma (câu 1..7, 9..13 đã làm; câu 8 đặt cờ; câu 14 đang xem)
  const [selectedAnswers, setSelectedAnswers] = useState({
    1: 'A',
    2: 'B',
    3: 'B',
    4: 'C',
    5: 'A',
    6: 'A',
    7: 'A',
    9: 'A',
    10: 'A',
    11: 'A',
    12: 'A',
    13: 'A'
  })

  // Trạng thái cờ (Câu 8 được đặt cờ như trong Figma)
  const [flaggedQuestions, setFlaggedQuestions] = useState({ 8: true })

  // Câu hỏi đang hoạt động (Figma focus vào câu 14)
  const [activeQuestion, setActiveQuestion] = useState(14)

  // Đếm ngược 44 phút 59 giây
  const [timeLeft, setTimeLeft] = useState(44 * 60 + 59)

  // Modal xác nhận nộp bài
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  // Kết quả sau khi nộp (Figma Screen 2)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Timer đếm ngược mỗi giây
  useEffect(() => {
    if (isSubmitted) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleConfirmSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isSubmitted])

  // Format thời gian mm:ss
  const formatTime = seconds => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Chọn đáp án
  const handleSelectOption = (questionId, optionKey) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }))
    setActiveQuestion(questionId)
  }

  // Toggle cờ câu hỏi
  const handleToggleFlag = questionId => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }))
  }

  // Cuộn tới câu hỏi khi bấm trên matrix
  const handleScrollToQuestion = questionId => {
    setActiveQuestion(questionId)
    const el = document.getElementById(`question-card-${questionId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Nộp bài
  const handleConfirmSubmit = () => {
    setShowConfirmModal(false)
    if (onComplete) {
      onComplete({
        title: currentExam.title,
        roomCode: currentExam.roomCode,
        candidateName: 'Đặng Mai Anh',
        candidateSBD: '2024HUBT102',
        submitTime: '15:42 - Hôm nay',
        durationTotal: currentExam.duration || '45 phút',
        timeSpent: '41p 40s',
        totalScore: '8.6',
        maxScore: '10',
        correctCount: 43,
        wrongCount: 5,
        skipCount: 2,
        totalQuestions: 50
      })
    } else {
      setIsSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Tính số liệu thống kê
  const answeredCount = Object.keys(selectedAnswers).length
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length
  const unansweredCount = 50 - answeredCount

  // ========================================================
  // RENDER: SCREEN 2 - KẾT QUẢ BÀI THI (FIGMA SCREEN 2)
  // ========================================================
  if (isSubmitted) {
    return (
      <main className="exam-take-canvas">
        <div className="result-view-container">
          
          {/* Top navigation */}
          <div className="result-top-nav">
            <button className="btn-result-back" onClick={onBack}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Về trang chủ</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16A34A', fontWeight: 600, fontSize: '14px' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Đã nộp bài thi thành công</span>
            </div>
          </div>

          {/* Khối Hero điểm số (Score Hero Card) */}
          <section className="score-hero-card">
            <div className="score-hero-left">
              <span className="score-title-sub">KẾT QUẢ ĐÁNH GIÁ NĂNG LỰC HỌC TẬP</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span className="score-value-big">8.4</span>
                <span className="score-value-max">/ 10.0</span>
              </div>
              <div className="grade-badge-box">XẾP LOẠI: GIỎI</div>
            </div>

            <div style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(0, 81, 213, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '6px solid #0051D5'
            }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: '#0051D5', lineHeight: 1 }}>84%</span>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>TỶ LỆ ĐÚNG</span>
            </div>
          </section>

          {/* Grid 4 Chỉ số cốt lõi (Academic Indicators Grid) */}
          <section className="academic-indicators-grid">
            <div className="indicator-card">
              <span className="indicator-label">Số câu đúng</span>
              <span className="indicator-value green">42 / 50</span>
              <span className="indicator-sub">Đạt 84% khối lượng</span>
            </div>

            <div className="indicator-card">
              <span className="indicator-label">Số câu sai</span>
              <span className="indicator-value red">5 / 50</span>
              <span className="indicator-sub">Tương đương 10%</span>
            </div>

            <div className="indicator-card">
              <span className="indicator-label">Bỏ trống</span>
              <span className="indicator-value yellow">3 / 50</span>
              <span className="indicator-sub">Chưa trả lời</span>
            </div>

            <div className="indicator-card">
              <span className="indicator-label">An toàn thi cử</span>
              <span className="indicator-value blue">100%</span>
              <span className="indicator-sub">0 vi phạm giám sát</span>
            </div>
          </section>

          {/* Phân tích năng lực theo nhóm kiến thức (Competency Breakdown) */}
          <section className="competency-card">
            <h3 className="competency-title">Phân tích năng lực theo từng nhóm chuyên đề</h3>
            
            <div className="topic-row">
              <div className="topic-meta">
                <span>Chuyên đề 1: Khái niệm & Cơ sở lí luận thành lập Đảng</span>
                <span style={{ fontWeight: 700, color: '#0051D5' }}>90%</span>
              </div>
              <div className="topic-bar-bg">
                <div className="topic-bar-fill" style={{ width: '90%' }}></div>
              </div>
            </div>

            <div className="topic-row">
              <div className="topic-meta">
                <span>Chuyên đề 2: Đường lối kháng chiến giải phóng dân tộc (1945 - 1975)</span>
                <span style={{ fontWeight: 700, color: '#0051D5' }}>85%</span>
              </div>
              <div className="topic-bar-bg">
                <div className="topic-bar-fill" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="topic-row">
              <div className="topic-meta">
                <span>Chuyên đề 3: Công cuộc Đổi mới và hội nhập quốc tế (1986 đến nay)</span>
                <span style={{ fontWeight: 700, color: '#0051D5' }}>80%</span>
              </div>
              <div className="topic-bar-bg">
                <div className="topic-bar-fill" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="topic-row">
              <div className="topic-meta">
                <span>Chuyên đề 4: Công tác xây dựng Đảng và bài học kinh nghiệm</span>
                <span style={{ fontWeight: 700, color: '#0051D5' }}>78%</span>
              </div>
              <div className="topic-bar-bg">
                <div className="topic-bar-fill" style={{ width: '78%' }}></div>
              </div>
            </div>
          </section>

        </div>
      </main>
    )
  }

  // ========================================================
  // RENDER: SCREEN 1 - TRANG LÀM BÀI THI CHÍNH (FIGMA SCREEN 1)
  // ========================================================
  return (
    <main className="exam-take-canvas">
      
      {/* 1. Exam Sub-Header: Progress, Quick Settings & Status Indicators */}
      <div className="exam-sticky-subheader">
        <div className="exam-subheader-left">
          <span className="exam-badge-room">{currentExam.roomCode}</span>
          <span className="exam-subheader-title" title={currentExam.title}>
            {currentExam.title}
          </span>
        </div>

        <div className="exam-subheader-center">
          {/* Đồng hồ đếm ngược */}
          <div className={`exam-timer-box ${timeLeft < 300 ? 'warning' : ''}`}>
            <svg className="exam-timer-icon" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="exam-timer-digits">{formatTime(timeLeft)}</span>
          </div>

          {/* Thanh tiến độ làm bài */}
          <div className="exam-progress-wrap">
            <div className="exam-progress-labels">
              <span>Tiến độ</span>
              <span>{answeredCount}/50 câu</span>
            </div>
            <div className="exam-progress-bar-bg">
              <div 
                className="exam-progress-bar-fill" 
                style={{ width: `${(answeredCount / 50) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="exam-subheader-right">
          <div className="exam-sync-status">
            <span className="exam-sync-dot"></span>
            <span>Đã lưu</span>
          </div>

          <button className="btn-quit-exam" onClick={onBack} title="Rời phòng thi">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Thoát</span>
          </button>
        </div>
      </div>

      {/* 2. Primary Canvas Grid: Split-screen architecture with continuous scroll questions */}
      <div className="exam-split-grid">
        
        {/* CỘT TRÁI: DÒNG CÂU HỎI CUỘN LIÊN TỤC (8 columns ~ 802.67px) */}
        <section className="exam-question-stream">
          {initialQuestions.map(q => {
            const isFlagged = !!flaggedQuestions[q.id]
            const isSelected = selectedAnswers[q.id]
            const isActive = activeQuestion === q.id

            return (
              <article 
                key={q.id}
                id={`question-card-${q.id}`}
                className={`exam-question-card ${isActive ? 'active' : ''} ${isFlagged ? 'flagged' : ''}`}
                onClick={() => setActiveQuestion(q.id)}
              >
                {/* Thanh tiêu đề câu hỏi */}
                <div className="question-header-strip">
                  <div className="question-meta-tags">
                    <span className="tag-question-num">CÂU {q.id}</span>
                    <span className="tag-question-points">1.0 ĐIỂM</span>
                    <span className="tag-question-type">ĐƠN LỰA CHỌN</span>
                  </div>

                  {/* Nút đặt cờ */}
                  <button 
                    type="button"
                    className={`btn-flag-question ${isFlagged ? 'flagged' : 'neutral'}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleFlag(q.id)
                    }}
                  >
                    <svg width="14" height="14" fill={isFlagged ? '#BA1A1A' : 'none'} viewBox="0 0 24 24" stroke={isFlagged ? '#BA1A1A' : '#45464D'}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                    <span>{isFlagged ? 'Bỏ cờ' : 'Đặt cờ'}</span>
                  </button>
                </div>

                {/* Nội dung câu hỏi */}
                <div className="question-prompt-text">
                  <span>{q.title} </span>
                  {q.codeSnippet && (
                    <span className="code-inline">{q.codeSnippet}</span>
                  )}
                </div>

                {/* Question 14: Đồ thị minh họa chuẩn SVG Figma (Academic Diagram Illustration) */}
                {q.hasDiagram && (
                  <div className="academic-diagram-container">
                    <svg className="academic-svg-canvas" viewBox="0 0 512 288" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Lưới tọa độ phụ */}
                      <line x1="50" y1="50" x2="470" y2="50" stroke="#CBD5E1" strokeDasharray="3 3" strokeWidth="1" />
                      <line x1="50" y1="120" x2="470" y2="120" stroke="#CBD5E1" strokeDasharray="3 3" strokeWidth="1" />
                      <line x1="50" y1="200" x2="470" y2="200" stroke="#94A3B8" strokeWidth="1.5" />
                      <line x1="150" y1="20" x2="150" y2="260" stroke="#94A3B8" strokeWidth="1.5" />
                      <line x1="260" y1="20" x2="260" y2="260" stroke="#CBD5E1" strokeDasharray="3 3" strokeWidth="1" />
                      <line x1="370" y1="20" x2="370" y2="260" stroke="#CBD5E1" strokeDasharray="3 3" strokeWidth="1" />

                      {/* Trục hoành Ox với mũi tên */}
                      <path d="M40 200 H480" stroke="#0B1C30" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="480,196 488,200 480,204" fill="#0B1C30" />
                      <text x="490" y="204" fontFamily="Liberation Mono" fontSize="14" fontWeight="700" fill="#0B1C30">x</text>

                      {/* Trục tung Oy với mũi tên */}
                      <path d="M150 260 V25" stroke="#0B1C30" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="146,25 150,17 154,25" fill="#0B1C30" />
                      <text x="146" y="14" fontFamily="Liberation Mono" fontSize="14" fontWeight="700" fill="#0B1C30">y</text>

                      {/* Gốc tọa độ O */}
                      <text x="136" y="216" fontFamily="Liberation Mono" fontSize="13" fontWeight="600" fill="#0B1C30">O</text>
                      
                      {/* Tọa độ x1, x2 */}
                      <circle cx="260" cy="200" r="3" fill="#0051D5" />
                      <text x="254" y="218" fontFamily="Liberation Mono" fontSize="12" fill="#0B1C30">x₁</text>
                      <circle cx="370" cy="200" r="3" fill="#0051D5" />
                      <text x="364" y="218" fontFamily="Liberation Mono" fontSize="12" fill="#0B1C30">x₂</text>

                      {/* Đường cong đồ thị f(x) */}
                      <path 
                        d="M70 240 C110 220 130 180 170 120 C210 60 260 70 300 130 C340 190 390 150 450 60" 
                        stroke="#0051D5" 
                        strokeWidth="3" 
                        fill="none" 
                        strokeLinecap="round" 
                      />

                      {/* Điểm cực trị nổi bật */}
                      <circle cx="235" cy="65" r="5" fill="#DC2626" />
                      <text x="245" y="65" fontFamily="Inter" fontSize="12" fontWeight="600" fill="#DC2626">Cực đại P(x₀, y₀)</text>
                    </svg>
                  </div>
                )}

                {/* Danh sách 4 đáp án A, B, C, D */}
                <div className="question-options-group">
                  <div className="options-heading-sub">CHỌN MỘT ĐÁP ÁN ĐÚNG:</div>
                  {q.options.map(opt => {
                    const isOptionSelected = isSelected === opt.key

                    return (
                      <div
                        key={opt.key}
                        className={`option-item-row ${isOptionSelected ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectOption(q.id, opt.key)
                        }}
                      >
                        <div className="option-left-content">
                          <div className="option-badge-key">{opt.key}</div>
                          <span className="option-label-text">{opt.text}</span>
                        </div>

                        <div className="option-radio-indicator">
                          {isOptionSelected && <div className="option-radio-dot-white"></div>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </section>

        {/* CỘT PHẢI: BẢNG MATRIX CÂU HỎI (Sticky Sidebar 389.33px) */}
        <aside className="exam-sticky-sidebar">
          <div className="sidebar-palette-card">
            
            {/* Tiêu đề & Badge số câu */}
            <div className="palette-header-strip">
              <h3 className="palette-heading-text">Bảng câu hỏi</h3>
              <span className="palette-count-badge">50 CÂU</span>
            </div>

            {/* Chú thích màu sắc */}
            <div className="palette-legend-grid">
              <div className="legend-item">
                <div className="legend-swatch answered"></div>
                <span>Đã làm ({answeredCount})</span>
              </div>
              <div className="legend-item">
                <div className="legend-swatch current"></div>
                <span>Đang xem</span>
              </div>
              <div className="legend-item">
                <div className="legend-swatch flagged"></div>
                <span>Đặt cờ ({flaggedCount})</span>
              </div>
              <div className="legend-item">
                <div className="legend-swatch unanswered"></div>
                <span>Chưa làm ({unansweredCount})</span>
              </div>
            </div>

            {/* Matrix 50 câu (5 cột x 10 hàng) */}
            <div className="palette-50-grid">
              {Array.from({ length: 50 }, (_, i) => i + 1).map(num => {
                const isAnswered = !!selectedAnswers[num]
                const isFlag = !!flaggedQuestions[num]
                const isCurrent = activeQuestion === num

                let stateClass = 'unanswered'
                if (isCurrent) {
                  stateClass = 'current'
                } else if (isAnswered) {
                  stateClass = 'answered'
                }

                return (
                  <button
                    key={num}
                    type="button"
                    className={`palette-num-btn ${stateClass}`}
                    onClick={() => handleScrollToQuestion(num)}
                    title={`Câu ${num}: ${isAnswered ? 'Đã làm' : 'Chưa làm'}${isFlag ? ' • Đang đặt cờ' : ''}`}
                  >
                    <span>{num < 10 ? `0${num}` : num}</span>
                    {isFlag && <span className="palette-flag-dot"></span>}
                  </button>
                )
              })}
            </div>

            {/* Nút nộp bài nổi bật (Prominent Submit Button) */}
            <button 
              type="button" 
              className="btn-submit-exam-primary"
              onClick={() => setShowConfirmModal(true)}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>NỘP BÀI</span>
            </button>

          </div>
        </aside>

      </div>

      {/* Modal xác nhận nộp bài */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="submit-confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-icon-circle">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="modal-title">Xác nhận nộp bài thi?</h4>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B' }}>
                  Thời gian làm bài vẫn còn {formatTime(timeLeft)}. Hãy kiểm tra lại các câu chưa làm hoặc đánh dấu cờ.
                </p>
              </div>
            </div>

            <div className="modal-summary-grid">
              <div className="modal-stat-box">
                <span className="stat-num" style={{ color: '#0051D5' }}>{answeredCount}</span>
                <span className="stat-label">Đã trả lời</span>
              </div>
              <div className="modal-stat-box">
                <span className="stat-num" style={{ color: '#E11D48' }}>{unansweredCount}</span>
                <span className="stat-label">Chưa trả lời</span>
              </div>
              <div className="modal-stat-box">
                <span className="stat-num" style={{ color: '#D97706' }}>{flaggedCount}</span>
                <span className="stat-label">Đang đặt cờ</span>
              </div>
            </div>

            <div className="modal-actions-row">
              <button 
                type="button" 
                className="btn-modal-cancel" 
                onClick={() => setShowConfirmModal(false)}
              >
                Tiếp tục làm bài
              </button>
              <button 
                type="button" 
                className="btn-modal-confirm" 
                onClick={handleConfirmSubmit}
              >
                Xác nhận nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}

