import React, { useState } from 'react';
import '../../student/pages.css';
import './teacher-sessions.css';
import { formatExamTimeRange } from './TeacherSessions';

/**
 * TeacherSessionPrep
 * Giao diện chi tiết phòng thi dành cho Giảng viên:
 * - Thông tin phòng thi, ca thi, mã PIN trong một khung thống nhất
 * - Bỏ icon rườm rà, hiển thị thông tin rõ ràng, hiện đại
 * - Nút "Vào giám sát ca thi trực tiếp" nằm gọn gàng bên trong khung
 * - Danh sách thí sinh & Quy chế giám sát
 */
export default function TeacherSessionPrep({
  session,
  onBack,
  onOpenMonitor,
}) {
  const currentSession = session || {
    room: 'HA6 - P.305',
    roomCode: 'HA6',
    shift: 'CA 1 (07:30 - 09:00)',
    title: 'Lập trình ứng dụng Web với PHP & Laravel',
    status: 'Đang mở',
    date: '12/11/2026',
    duration: '60 phút',
    questions: '40 câu',
    timeWindow: '07:30 - 09:00 Hôm nay',
    department: 'KHOA CÔNG NGHỆ THÔNG TIN',
    school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
    studentsCount: '45 thí sinh',
    pinCode: '6868',
    invigilator: 'ThS. Nguyễn Văn A',
  };

  const [activeTab, setActiveTab] = useState('students');

  const mockStudents = [
    { id: 1, mssv: '21020015', name: 'Nguyễn Văn An', class: '12A1', email: 'an.nv@eduquiz.vn', status: 'Sẵn sàng' },
    { id: 2, mssv: '21020016', name: 'Trần Thị Mai', class: '12A1', email: 'mai.tt@eduquiz.vn', status: 'Sẵn sàng' },
    { id: 3, mssv: '21020017', name: 'Lê Hoàng Nam', class: '12A1', email: 'nam.lh@eduquiz.vn', status: 'Sẵn sàng' },
    { id: 4, mssv: '21020018', name: 'Phạm Minh Đức', class: '12A1', email: 'duc.pm@eduquiz.vn', status: 'Sẵn sàng' },
    { id: 5, mssv: '21020019', name: 'Hoàng Thùy Linh', class: '12A1', email: 'linh.ht@eduquiz.vn', status: 'Sẵn sàng' },
  ];

  return (
    <main className="prep-main-canvas" style={{ width: '100%', maxWidth: '960px', margin: '0 auto', padding: 0, background: 'transparent' }}>
      <div className="prep-main-container" style={{ width: '100%', maxWidth: '960px', gap: '20px' }}>
        
        {/* Breadcrumb điều hướng */}
        <div className="prep-breadcrumb-title">
          <button className="btn-back-link" onClick={onBack}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Quản lý ca thi
          </button>
          <span>/</span>
          <span>Chi tiết phòng thi: {currentSession.room}</span>
        </div>

        {/* KHUNG THỐNG NHẤT: THÔNG TIN PHÒNG THI & NÚT GIÁM SÁT TRỰC TIẾP */}
        <section className="teacher-prep-unified-card">
          
          {/* Hàng trên: Badges & Tiêu đề môn thi */}
          <div className="teacher-prep-card-top">
            <div className="teacher-prep-badge-group">
              <span className={`teacher-prep-badge ${currentSession.sessionType === 'practice' || currentSession.type === 'practice' ? 'practice-badge' : 'official-badge'}`}>
                {currentSession.sessionType === 'practice' || currentSession.type === 'practice' ? 'Thi thử' : 'Kỳ thi chính thức'}
              </span>
              <span className="teacher-prep-badge room-badge">
                Phòng thi: {currentSession.room}
              </span>
              <span className="teacher-prep-badge pin-badge">
                Mã PIN: {currentSession.pinCode || '6868'}
              </span>
              <span className="teacher-prep-badge status-badge">
                <span className="live-dot-mini" /> {currentSession.status || 'Đang mở'}
              </span>
            </div>

            <h1 className="teacher-prep-title">{currentSession.title}</h1>

            <div className="teacher-prep-dept">
              {currentSession.department || 'KHOA CÔNG NGHỆ THÔNG TIN'}
            </div>
          </div>

          {/* Hàng giữa: Thông tin chi tiết (Đã bỏ các icon) */}
          <div className="teacher-prep-info-grid">
            <div className="teacher-prep-info-item">
              <span className="teacher-prep-info-label">Ngày thi:</span>
              <span className="teacher-prep-info-value">{currentSession.date}</span>
            </div>

            <div className="teacher-prep-info-item">
              <span className="teacher-prep-info-label">Thời lượng làm bài:</span>
              <span className="teacher-prep-info-value">{currentSession.duration}</span>
            </div>

            <div className="teacher-prep-info-item">
              <span className="teacher-prep-info-label">Số lượng câu hỏi:</span>
              <span className="teacher-prep-info-value">{currentSession.questions}</span>
            </div>

            <div className="teacher-prep-info-item">
              <span className="teacher-prep-info-label">Thời gian thi:</span>
              <span className="teacher-prep-info-value">{formatExamTimeRange(currentSession)}</span>
            </div>
          </div>

          {/* Hàng dưới (Nằm gọn bên trong khung): Lời nhắc & Nút vào giám sát trực tiếp */}
          <div className="teacher-prep-card-bottom">
            <div className="teacher-prep-card-note">
              * Giám thị hướng dẫn thí sinh truy cập đúng phòng thi và nhập mã PIN để bắt đầu làm bài.
            </div>

            <button
              type="button"
              className="btn-start-exam-lg"
              onClick={() => onOpenMonitor(currentSession)}
              title="Mở bảng giám sát trực tiếp ca thi này"
            >
              <span className="live-pulse-dot-wrap">
                <span className="live-pulse-ping" />
                <span className="live-pulse-dot" />
              </span>
              <span>Vào giám sát ca thi trực tiếp</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

        </section>

        {/* KHỐI 2: CÁC TAB NỘI DUNG (Chuẩn phong cách EduQuiz, không icon) */}
        <section className="prep-tabs-card">
          <div className="prep-tab-headers">
            <button
              type="button"
              className={`prep-tab-btn ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              <span>Danh sách thí sinh đăng ký</span>
              <span className="prep-tab-badge">{mockStudents.length}</span>
            </button>
            <button
              type="button"
              className={`prep-tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
              onClick={() => setActiveTab('rules')}
            >
              <span>Quy chế giám sát & Phòng thi</span>
            </button>
          </div>

          <div className="prep-tab-body">
            {activeTab === 'students' ? (
              <div style={{ overflowX: 'auto' }}>
                <table className="session-students-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '50px', textAlign: 'center' }}>STT</th>
                      <th>Mã sinh viên</th>
                      <th>Họ và tên thí sinh</th>
                      <th>Lớp học</th>
                      <th>Email học đường</th>
                      <th style={{ textAlign: 'center' }}>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.map((st, idx) => (
                      <tr key={st.id}>
                        <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                        <td><strong style={{ fontFamily: 'monospace', color: '#0051D5' }}>{st.mssv}</strong></td>
                        <td style={{ fontWeight: 600, color: '#0B1C30' }}>{st.name}</td>
                        <td>
                          <span style={{ color: '#334155', fontSize: '13px', fontWeight: 500 }}>
                            {st.class}
                          </span>
                        </td>
                        <td style={{ color: '#64748B' }}>{st.email}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="session-student-pill submitted">{st.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="prep-rule-card">
                  <div className="prep-rule-num">1</div>
                  <div>Giám thị kiểm tra danh sách thí sinh và đối chiếu thẻ sinh viên trước khi phát mã PIN phòng thi.</div>
                </div>
                <div className="prep-rule-card">
                  <div className="prep-rule-num">2</div>
                  <div>Thí sinh phải bật toàn màn hình khi làm bài. Hệ thống sẽ tự động ghi nhận nhật ký vi phạm nếu thí sinh chuyển tab hoặc thu nhỏ trình duyệt.</div>
                </div>
                <div className="prep-rule-card">
                  <div className="prep-rule-num">3</div>
                  <div>Trong trường hợp xảy ra sự cố mạng, giám thị có quyền gia hạn thêm thời gian hoặc duyệt quyền thi lại cho thí sinh.</div>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
