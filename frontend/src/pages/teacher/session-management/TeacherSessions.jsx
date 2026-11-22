import React, { useState, useEffect } from 'react';
import { useNavigate } from '../../../shims/react-router-dom';
import '../../student/pages.css';
import './teacher-sessions.css';
import TeacherSessionMonitorModal from './TeacherSessionMonitorModal';
import TeacherSessionPrep from './TeacherSessionPrep';

// Helper tính toán và hiển thị khoảng thời gian thi: Từ .. đến ..
export const formatExamTimeRange = (session) => {
  if (!session) return 'Từ 07:30 đến 09:00';
  if (session.isUnlimitedTime || session.duration?.includes('Không giới hạn')) {
    if (session.statusTime?.includes('BẮT ĐẦU:')) {
      const start = session.statusTime.replace('BẮT ĐẦU:', '').trim();
      return `Từ ${start} (Không giới hạn thời gian)`;
    }
    return 'Không giới hạn thời gian làm bài';
  }
  if (session.timeRange) return session.timeRange;
  if (session.timeWindow) {
    const clean = session.timeWindow.replace(' Hôm nay', '').trim();
    if (clean.includes(' - ')) {
      const parts = clean.split(' - ');
      return `Từ ${parts[0]} đến ${parts[1]}`;
    }
  }
  if (session.statusTime) {
    if (session.statusTime.includes(' - ')) {
      const parts = session.statusTime.split(' - ');
      return `Từ ${parts[0]} đến ${parts[1]}`;
    }
    if (session.statusTime.includes('BẮT ĐẦU:')) {
      const start = session.statusTime.replace('BẮT ĐẦU:', '').trim();
      const dur = parseInt(session.duration, 10) || 60;
      const [h, m] = start.split(':').map(Number);
      if (!isNaN(h) && !isNaN(m)) {
        const total = h * 60 + m + dur;
        const endH = String(Math.floor(total / 60) % 24).padStart(2, '0');
        const endM = String(total % 60).padStart(2, '0');
        return `Từ ${start} đến ${endH}:${endM}`;
      }
      return `Từ ${start}`;
    }
  }
  return 'Từ 07:30 đến 09:00';
};

const STORAGE_KEY = 'eduquiz_teacher_sessions';

const INITIAL_SESSIONS = [
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
    studentsCount: '45 thí sinh',
    submittedCount: 18,
    activeStudents: 26,
    invigilator: 'ThS. Nguyễn Văn A',
    mode: 'Trực tuyến',
    school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
    category: 'ongoing',
    pinCode: '6868',
    allowedClasses: ['12A1', 'CNTT1', 'CNTT2'],
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
    studentsCount: '52 thí sinh',
    submittedCount: 0,
    activeStudents: 0,
    invigilator: 'TS. Trần Thị Bích',
    mode: 'Trực tuyến',
    school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
    category: 'upcoming',
    pinCode: '2026',
    allowedClasses: ['K28-THPT', '12A2'],
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
    studentsCount: '40 thí sinh',
    submittedCount: 0,
    activeStudents: 0,
    invigilator: 'ThS. Nguyễn Văn A',
    mode: 'Trực tuyến',
    school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
    category: 'upcoming',
    pinCode: '9999',
    allowedClasses: ['CNTT3', '12A3'],
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
    studentsCount: '38 thí sinh',
    submittedCount: 0,
    activeStudents: 0,
    invigilator: 'ThS. Lê Hoàng C',
    mode: 'Trực tuyến',
    school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
    category: 'upcoming',
    pinCode: '3535',
    allowedClasses: ['DTVT1', '12A1'],
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
    studentsCount: '60 thí sinh',
    submittedCount: 45,
    activeStudents: 15,
    invigilator: 'ThS. Đặng Thu H',
    mode: 'Trực tuyến',
    school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
    category: 'trial',
    pinCode: '1234',
    allowedClasses: ['NN1', 'NN2'],
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
    studentsCount: '48 thí sinh',
    submittedCount: 48,
    activeStudents: 0,
    invigilator: 'TS. Vũ Đình T',
    mode: 'Trực tuyến',
    school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
    category: 'completed',
    pinCode: '7777',
    allowedClasses: ['CNTT1', 'CNTT2'],
  },
];

/**
 * TeacherSessions - Quản lý Ca thi dành cho Giảng viên
 * Kế thừa 100% bố cục, cấu trúc, tìm kiếm & bộ lọc từ trang StudentDashboardPage (Cổng sinh viên)
 */
export default function TeacherSessions() {
  // Quản lý danh sách ca thi (lưu localStorage)
  const [sessions, setSessions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_SESSIONS;
    } catch {
      return INITIAL_SESSIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Lỗi khi lưu danh sách ca thi:', e);
    }
  }, [sessions]);

  // Bộ lọc & Tìm kiếm (kế thừa StudentDashboardPage)
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeFilterTag, setActiveFilterTag] = useState('all');
  const [activeSubFilter, setActiveSubFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Điều hướng xem chi tiết phòng thi (tương tự chuyển sang ExamPreparationPage)
  const [selectedSessionForPrep, setSelectedSessionForPrep] = useState(null);

  // Điều hướng
  const navigate = useNavigate();

  // Modal Giám sát trực tiếp
  const [monitorModalSession, setMonitorModalSession] = useState(null);

  // Thông báo toast
  const [alertInfo, setAlertInfo] = useState(null);

  const showAlert = (type, message) => {
    setAlertInfo({ type, message });
    setTimeout(() => setAlertInfo(null), 3500);
  };

  // Lọc danh sách ca thi
  const filteredSessions = sessions.filter((card) => {
    const matchSearch =
      card.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      card.room.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      card.department.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (card.pinCode && card.pinCode.includes(searchKeyword));

    if (activeFilterTag === 'ongoing') {
      if (card.category !== 'ongoing') return false;
    } else if (activeFilterTag === 'upcoming') {
      if (card.category !== 'upcoming') return false;
    } else if (activeFilterTag === 'trial') {
      if (card.category !== 'trial') return false;
    } else if (activeFilterTag === 'completed') {
      if (card.category !== 'completed') return false;
    }

    if (activeSubFilter === 'open') {
      if (card.category !== 'ongoing') return false;
    } else if (activeSubFilter === 'upcoming') {
      if (card.category !== 'upcoming') return false;
    }

    return matchSearch;
  });

  // Tạo ca thi mới
  const handleCreateSession = (newSession) => {
    setSessions(prev => [newSession, ...prev]);
    showAlert('success', `Đã mở thành công ca thi mới: ${newSession.title} (Phòng ${newSession.room})!`);
  };

  // Nếu đang xem chi tiết phòng thi (tương đương ExamPreparationPage của học sinh)
  if (selectedSessionForPrep) {
    return (
      <div className="teacher-sessions-wrapper">
        <TeacherSessionPrep
          session={selectedSessionForPrep}
          onBack={() => setSelectedSessionForPrep(null)}
          onOpenMonitor={(session) => {
            setMonitorModalSession(session);
          }}
        />

        {/* Modal giám sát nếu bật từ trang chi tiết */}
        <TeacherSessionMonitorModal
          isOpen={!!monitorModalSession}
          session={monitorModalSession}
          onClose={() => setMonitorModalSession(null)}
          onShowAlert={showAlert}
        />
      </div>
    );
  }

  return (
    <div className="teacher-sessions-wrapper">
      <main className="dashboard-content-canvas">
        <div className="dashboard-container-960">

          {/* Thông báo toast nổi */}
          {alertInfo && (
            <div
              style={{
                width: '100%',
                padding: '12px 18px',
                borderRadius: '8px',
                background: alertInfo.type === 'error' ? '#FEF2F2' : '#ECFDF5',
                color: alertInfo.type === 'error' ? '#991B1B' : '#065F46',
                border: `1px solid ${alertInfo.type === 'error' ? '#FECACA' : '#A7F3D0'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '13.5px',
                fontWeight: 500,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}
            >
              <span>{alertInfo.type === 'error' ? '⚠️' : '✅'}</span>
              <span>{alertInfo.message}</span>
            </div>
          )}

          {/* 1. Khối Tìm Kiếm & Bộ Lọc Nhanh (Kế thừa nguyên bản cấu trúc thẻ Figma) */}
          <section className="exam-search-box-card">
            <div className="exam-search-heading-block">
              <h1 className="exam-main-title">QUẢN LÝ CA THI & PHÒNG THI</h1>
              <p className="exam-main-desc">
                Tra cứu, giám sát thời gian thực và quản lý các ca thi trực tuyến trong toàn trường
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
                  placeholder="Tìm kiếm ca thi, môn học, phòng thi hoặc mã PIN..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <div className="search-kbd-badge">
                  <span>Ctrl</span>
                  <span>+</span>
                  <span>K</span>
                </div>
              </div>

              <button className="btn-search-primary" onClick={() => {}}>
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
                Ca thi đang diễn ra
              </button>
              <button 
                className={`filter-tag-pill ${activeFilterTag === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveFilterTag('upcoming')}
              >
                Ca thi sắp tới
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

          {/* 2. Khối Danh Sách & Điều Khiển Ca Thi */}
          <div className="exams-section-wrapper">
            <div className="section-controls-bar">
              <div className="section-controls-top-row">
                <div className="section-heading-with-icon">
                  <svg width="20" height="17" viewBox="0 0 24 24" fill="#0051D5">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                  <h2 className="section-h2-title">Danh sách ca thi</h2>
                </div>

                <div className="teacher-section-actions">
                  <button 
                    className="btn-refresh-sm"
                    onClick={() => { setSearchKeyword(''); setActiveFilterTag('all'); setActiveSubFilter('all'); }}
                  >
                    Làm mới
                  </button>

                  <button
                    type="button"
                    className="btn-create-session-primary"
                    onClick={() => navigate('/teacher/sessions/create')}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Mở ca thi mới</span>
                  </button>
                </div>
              </div>

              <div className="section-filter-btns-row">
                <button 
                  className={`filter-btn-pill-sm ${activeSubFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveSubFilter('all')}
                >
                  Tất cả ({sessions.length})
                </button>
                <button 
                  className={`filter-btn-pill-sm ${activeSubFilter === 'open' ? 'active' : ''}`}
                  onClick={() => setActiveSubFilter('open')}
                >
                  Đang mở ({sessions.filter(s => s.category === 'ongoing').length})
                </button>
                <button 
                  className={`filter-btn-pill-sm ${activeSubFilter === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setActiveSubFilter('upcoming')}
                >
                  Sắp tới ({sessions.filter(s => s.category === 'upcoming').length})
                </button>
              </div>
            </div>

            {/* 3. Lưới Các Thẻ Ca Thi (Kế thừa nguyên bản .exam-figma-card) */}
            <div className="exams-cards-grid">
              {filteredSessions.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0', color: '#64748B' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
                  <h3 style={{ margin: '0 0 6px', color: '#0B1C30' }}>Không tìm thấy ca thi nào phù hợp</h3>
                  <p style={{ margin: 0, fontSize: '13px' }}>Thử tìm kiếm với từ khóa khác hoặc bấm nút làm mới bộ lọc.</p>
                </div>
              ) : (
                filteredSessions.map((card) => (
                  <article key={card.id} className="exam-figma-card">
                    <div className="card-body-content" style={{ padding: '16px', width: '100%' }}>
                      <h3
                        className="card-exam-name"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedSessionForPrep(card)}
                        title="Bấm để xem chi tiết phòng thi"
                      >
                        {card.title}
                      </h3>

                      <div className="card-meta-line">
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{card.date}</span>
                        {card.room && (
                          <>
                            <span style={{ margin: '0 4px', color: '#CBD5E1' }}>•</span>
                            <span style={{ color: '#0051D5', fontWeight: 600 }}>Phòng: {card.room}</span>
                          </>
                        )}

                        {card.sessionType === 'practice' && (
                          <span style={{ marginLeft: 'auto', background: '#D1FAE5', color: '#065F46', padding: '1px 6px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 600 }}>
                            Thi thử
                          </span>
                        )}
                        {card.sessionType === 'official' && (
                          <span style={{ marginLeft: 'auto', background: '#DBE1FF', color: '#003EA8', padding: '1px 6px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 600 }}>
                            Chính thức
                          </span>
                        )}
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

                      <div className="card-exam-time-box">
                        <span className="card-exam-time-label">Thời gian thi:</span>
                        <span className="card-exam-time-val">{formatExamTimeRange(card)}</span>
                      </div>

                      {/* Hai nút thao tác dành riêng cho Giảng viên */}
                      <div className="card-teacher-dual-actions">
                        <button 
                          type="button"
                          className="btn-teacher-monitor"
                          onClick={() => setMonitorModalSession(card)}
                          title="Vào màn hình giám sát thời gian thực"
                        >
                          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>Giám sát</span>
                        </button>

                        <button 
                          type="button"
                          className="btn-teacher-prep"
                          onClick={() => setSelectedSessionForPrep(card)}
                          title="Xem chi tiết phòng thi & danh sách thí sinh"
                        >
                          <span>Chi tiết &rarr;</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* 4. Thanh Phân Trang (Kế thừa StudentDashboardPage) */}
            <div className="bottom-pagination-row">
              <div className="pagination-info-text">
                Hiển thị <strong>1 - {filteredSessions.length}</strong> trong tổng số <strong>{sessions.length}</strong> ca thi
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
                  className="btn-page-nav"
                  onClick={() => setCurrentPage(currentPage + 1)}
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

      {/* Modal giám sát thời gian thực */}
      <TeacherSessionMonitorModal
        isOpen={!!monitorModalSession}
        session={monitorModalSession}
        onClose={() => setMonitorModalSession(null)}
        onShowAlert={showAlert}
      />
    </div>
  );
}
