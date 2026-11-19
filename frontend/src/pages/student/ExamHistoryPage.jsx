import { useState, useMemo } from 'react';
import './exam-history.css';

/**
 * ExamHistoryPage - Màn hình Lịch sử & Kết quả thi của Học sinh / Sinh viên
 * Chuẩn Figma pixel-perfect theo thông số Auto Layout
 */
export default function ExamHistoryPage({ onViewResult }) {
  // Bộ lọc tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedScore, setSelectedScore] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  // Phân trang
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpPageInput, setJumpPageInput] = useState('1');

  // Danh sách kết quả thi mẫu chuẩn Figma
  const mockExamHistory = [
    {
      id: 'EX-01',
      title: 'Thi thử môn Tin học đại cương - Kỳ I',
      roomCode: '#HUBT-2025',
      examCode: '01',
      subjectCode: 'TIN101',
      subjectColor: 'yellow',
      mode: 'Thi thử',
      modeColor: 'green',
      score: 4.5,
      correctCount: '18/40',
      duration: '38 phút',
      status: 'Đã nộp bài',
      date: '15/10/2026',
      totalQuestions: 40,
      passingScore: 5.0
    },
    {
      id: 'EX-02',
      title: 'Kiểm tra giữa kỳ Toán rời rạc & Giải tích',
      roomCode: '#839-204',
      examCode: 'MTH-102',
      subjectCode: 'MTH102',
      subjectColor: 'blue',
      mode: 'Chính thức',
      modeColor: 'blue',
      score: 8.5,
      correctCount: '34/40',
      duration: '45 phút',
      status: 'Đạt kết quả',
      date: '18/10/2026',
      totalQuestions: 40,
      passingScore: 5.0
    },
    {
      id: 'EX-03',
      title: 'Khảo sát năng lực Tiếng Anh đầu khóa B1',
      roomCode: '#712-901',
      examCode: 'ENG-102',
      subjectCode: 'ENG102',
      subjectColor: 'purple',
      mode: 'Khảo sát',
      modeColor: 'purple',
      score: 9.2,
      correctCount: '46/50',
      duration: '40 phút',
      status: 'Đạt chuẩn',
      date: '22/10/2026',
      totalQuestions: 50,
      passingScore: 6.0
    },
    {
      id: 'EX-04',
      title: 'Lập trình C/C++ Căn bản & Cấu trúc dữ liệu',
      roomCode: '#HUBT-3012',
      examCode: 'PRG-101',
      subjectCode: 'PRG101',
      subjectColor: 'yellow',
      mode: 'Chính thức',
      modeColor: 'blue',
      score: 7.8,
      correctCount: '31/40',
      duration: '42 phút',
      status: 'Đạt kết quả',
      date: '25/10/2026',
      totalQuestions: 40,
      passingScore: 5.0
    },
    {
      id: 'EX-05',
      title: 'Hệ quản trị Cơ sở dữ liệu quan hệ SQL',
      roomCode: '#DB-9901',
      examCode: 'DBS-201',
      subjectCode: 'DBS201',
      subjectColor: 'blue',
      mode: 'Thi thử',
      modeColor: 'green',
      score: 8.0,
      correctCount: '32/40',
      duration: '35 phút',
      status: 'Đạt kết quả',
      date: '02/11/2026',
      totalQuestions: 40,
      passingScore: 5.0
    },
    {
      id: 'EX-06',
      title: 'Pháp luật đại cương & Nhà nước Việt Nam',
      roomCode: '#LAW-4001',
      examCode: 'LAW-101',
      subjectCode: 'LAW101',
      subjectColor: 'purple',
      mode: 'Chính thức',
      modeColor: 'blue',
      score: 9.0,
      correctCount: '45/50',
      duration: '48 phút',
      status: 'Đạt kết quả',
      date: '08/11/2026',
      totalQuestions: 50,
      passingScore: 5.0
    }
  ];

  // Lọc dữ liệu thời gian thực
  const filteredExams = useMemo(() => {
    return mockExamHistory.filter((exam) => {
      // 1. Tìm kiếm theo tên môn, mã phòng, mã đề
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchTitle = exam.title.toLowerCase().includes(term);
        const matchRoom = exam.roomCode.toLowerCase().includes(term);
        const matchExamCode = exam.examCode.toLowerCase().includes(term);
        if (!matchTitle && !matchRoom && !matchExamCode) return false;
      }

      // 2. Chế độ thi
      if (selectedMode !== 'all') {
        if (selectedMode === 'official' && exam.mode !== 'Chính thức') return false;
        if (selectedMode === 'practice' && exam.mode !== 'Thi thử') return false;
        if (selectedMode === 'survey' && exam.mode !== 'Khảo sát') return false;
      }

      // 3. Mức điểm
      if (selectedScore !== 'all') {
        if (selectedScore === 'high' && exam.score < 9.0) return false;
        if (selectedScore === 'good' && (exam.score < 8.0 || exam.score >= 9.0)) return false;
        if (selectedScore === 'medium' && (exam.score < 5.0 || exam.score >= 8.0)) return false;
        if (selectedScore === 'fail' && exam.score >= 5.0) return false;
      }

      return true;
    });
  }, [searchTerm, selectedMode, selectedScore]);

  // Đặt lại toàn bộ bộ lọc
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedMode('all');
    setSelectedScore('all');
    setDateFilter('');
    setCurrentPage(1);
    setJumpPageInput('1');
  };

  const handleReviewClick = (exam) => {
    if (onViewResult) {
      onViewResult(exam);
    } else {
      alert(`Đang mở bảng điểm chi tiết bài thi: ${exam.title}`);
    }
  };

  const handleJumpPage = (e) => {
    if (e.key === 'Enter') {
      const pageNum = parseInt(jumpPageInput, 10);
      if (pageNum >= 1 && pageNum <= 5) {
        setCurrentPage(pageNum);
      }
    }
  };

  return (
    <main className="exam-history-main">
      <div className="exam-history-container">
        {/* 1. Tiêu đề trang */}
        <div className="history-header-row">
          <div>
            <h1 className="history-heading-title">Lịch sử thi</h1>
            <p className="history-subtitle-meta">Xem lại kết quả, bài làm chi tiết và tiến độ các kỳ thi đã hoàn thành</p>
          </div>
        </div>

        {/* 2. Thẻ Bộ lọc tìm kiếm chuẩn Figma */}
        <div className="history-filter-card">
          <div className="filter-card-header">
            <div className="filter-header-left">
              <span className="filter-icon-blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </span>
              <span className="filter-header-title">Bộ lọc tìm kiếm</span>
              <span className="filter-header-desc">• Tra cứu kết quả các kỳ thi đã tham gia</span>
            </div>
            <button type="button" onClick={handleResetFilters} className="btn-filter-reset">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M8 16H3v5"></path>
              </svg>
              <span>Đặt lại</span>
            </button>
          </div>

          <div className="filter-controls-row">
            {/* Control 1: Tìm kiếm */}
            <div className="filter-control-item">
              <label className="filter-control-label">Tìm kiếm đề thi</label>
              <div className="filter-input-wrap">
                <span className="filter-input-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <input
                  type="text"
                  className="filter-input-field"
                  placeholder="Tìm theo tên môn, mã phòng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Control 2: Chế độ thi */}
            <div className="filter-control-item">
              <label className="filter-control-label">Chế độ thi</label>
              <div className="filter-input-wrap">
                <select
                  className="filter-select-field"
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                >
                  <option value="all">Tất cả chế độ</option>
                  <option value="official">Thi chính thức</option>
                  <option value="practice">Thi thử</option>
                  <option value="survey">Khảo sát</option>
                </select>
                <span className="filter-select-chevron">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Control 3: Mức điểm đạt được */}
            <div className="filter-control-item">
              <label className="filter-control-label">Mức điểm đạt được</label>
              <div className="filter-input-wrap">
                <select
                  className="filter-select-field"
                  value={selectedScore}
                  onChange={(e) => setSelectedScore(e.target.value)}
                >
                  <option value="all">Tất cả mức điểm</option>
                  <option value="high">Xuất sắc (≥ 9.0)</option>
                  <option value="good">Giỏi (8.0 - 8.9)</option>
                  <option value="medium">Đạt (5.0 - 7.9)</option>
                  <option value="fail">Chưa đạt (&lt; 5.0)</option>
                </select>
                <span className="filter-select-chevron">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Control 4: Từ ngày */}
            <div className="filter-control-item">
              <label className="filter-control-label">Từ ngày</label>
              <div className="filter-input-wrap">
                <span className="filter-input-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </span>
                <input
                  type="text"
                  className="filter-input-field"
                  placeholder="dd/mm/yyyy"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bảng Dữ liệu Kết quả thi chuẩn Figma */}
        <div className="history-table-card">
          <div className="history-table-scroll">
            <table className="history-data-table">
              <thead>
                <tr>
                  <th>ĐỀ THI & HỌC PHẦN</th>
                  <th>CHẾ ĐỘ</th>
                  <th>ĐIỂM SỐ</th>
                  <th>SỐ CÂU ĐÚNG</th>
                  <th>THỜI GIAN</th>
                  <th>TRẠNG THÁI</th>
                  <th className="text-right">THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <tr key={exam.id}>
                      {/* Đề thi & Học phần */}
                      <td>
                        <div className="exam-item-info-cell">
                          <div className={`subject-icon-box ${exam.subjectColor}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                            </svg>
                          </div>
                          <div className="exam-meta-text-col">
                            <span className="exam-item-title">{exam.title}</span>
                            <span className="exam-item-submeta">
                              Mã phòng: {exam.roomCode} • Mã đề: {exam.examCode}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Chế độ thi */}
                      <td>
                        <span className={`mode-badge ${exam.modeColor}`}>
                          {exam.mode}
                        </span>
                      </td>

                      {/* Điểm số */}
                      <td>
                        <span className={`exam-score-text ${exam.score >= 8.5 ? 'high' : exam.score >= 5.0 ? 'pass' : 'fail'}`}>
                          {exam.score.toFixed(1)}
                        </span>
                      </td>

                      {/* Số câu đúng */}
                      <td>
                        <span className="exam-correct-text">{exam.correctCount}</span>
                      </td>

                      {/* Thời gian */}
                      <td>
                        <span className="exam-time-text">{exam.duration}</span>
                      </td>

                      {/* Trạng thái */}
                      <td>
                        <span className="status-pill">
                          <span className="status-pill-dot"></span>
                          <span>{exam.status}</span>
                        </span>
                      </td>

                      {/* Nút Thao tác */}
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-view-result"
                          onClick={() => handleReviewClick(exam)}
                          title="Xem lại bài thi & đáp án chi tiết"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span>Xem lại</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                      Không tìm thấy bài thi nào phù hợp với bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 4. Thanh phân trang chuẩn Figma */}
          <div className="history-pagination-row">
            <div className="pagination-left-info">
              <span>Hiển thị</span>
              <select
                className="pagination-select-limit"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>trong <strong>{filteredExams.length}</strong> bài thi</span>
            </div>

            <div className="pagination-controls-center">
              <button
                type="button"
                className="btn-page-nav"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                title="Trang đầu"
              >
                &laquo;
              </button>
              <button
                type="button"
                className="btn-page-nav"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                title="Trang trước"
              >
                &lsaquo;
              </button>
              <button type="button" className={`btn-page-nav ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>
                1
              </button>
              <button type="button" className={`btn-page-nav ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>
                2
              </button>
              <button
                type="button"
                className="btn-page-nav"
                onClick={() => setCurrentPage((p) => Math.min(2, p + 1))}
                disabled={currentPage === 2}
                title="Trang sau"
              >
                &rsaquo;
              </button>
              <button
                type="button"
                className="btn-page-nav"
                onClick={() => setCurrentPage(2)}
                disabled={currentPage === 2}
                title="Trang cuối"
              >
                &raquo;
              </button>
            </div>

            <div className="pagination-jump-right">
              <span>Đến trang</span>
              <input
                type="text"
                className="pagination-jump-input"
                value={jumpPageInput}
                onChange={(e) => setJumpPageInput(e.target.value)}
                onKeyDown={handleJumpPage}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

