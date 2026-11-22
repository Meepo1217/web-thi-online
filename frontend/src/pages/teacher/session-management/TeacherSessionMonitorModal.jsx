import React, { useState } from 'react';

/**
 * TeacherSessionMonitorModal
 * Popup giám sát trực tiếp phòng thi / ca thi thời gian thực dành cho Giảng viên:
 * - Thống kê thí sinh đang làm bài, đã nộp, cảnh báo vi phạm
 * - Bảng danh sách thí sinh trong phòng
 * - Điều khiển ca thi: gia hạn thời gian, thu bài, nhắc nhở
 */
export default function TeacherSessionMonitorModal({
  isOpen,
  session,
  onClose,
  onShowAlert,
}) {
  if (!isOpen || !session) return null;

  // Dữ liệu mẫu thí sinh trong phòng thi
  const [students, setStudents] = useState([
    { id: '1', mssv: '21020015', name: 'Nguyễn Văn An', class: '12A1', progress: '36/40', status: 'working', warnings: 0, score: null },
    { id: '2', mssv: '21020016', name: 'Trần Thị Mai', class: '12A1', progress: '40/40', status: 'submitted', warnings: 0, score: '9.2' },
    { id: '3', mssv: '21020017', name: 'Lê Hoàng Nam', class: '12A1', progress: '28/40', status: 'working', warnings: 1, score: null },
    { id: '4', mssv: '21020018', name: 'Phạm Minh Đức', class: '12A1', progress: '40/40', status: 'submitted', warnings: 0, score: '8.6' },
    { id: '5', mssv: '21020019', name: 'Hoàng Thùy Linh', class: '12A1', progress: '32/40', status: 'working', warnings: 0, score: null },
    { id: '6', mssv: '21020020', name: 'Vũ Quốc Huy', class: '12A1', progress: '19/40', status: 'working', warnings: 2, score: null },
    { id: '7', mssv: '21020021', name: 'Đặng Thu Hằng', class: '12A1', progress: '40/40', status: 'submitted', warnings: 0, score: '9.5' },
    { id: '8', mssv: '21020022', name: 'Bùi Gia Bảo', class: '12A1', progress: '12/40', status: 'working', warnings: 0, score: null },
    { id: '9', mssv: '21020023', name: 'Đỗ Tuấn Kiệt', class: '12A1', progress: '25/40', status: 'working', warnings: 0, score: null },
    { id: '10', mssv: '21020024', name: 'Ngô Phương Thảo', class: '12A1', progress: '40/40', status: 'submitted', warnings: 0, score: '8.8' },
    { id: '11', mssv: '21020025', name: 'Dương Văn Toàn', class: '12A1', progress: '34/40', status: 'working', warnings: 1, score: null },
    { id: '12', mssv: '21020026', name: 'Hà Thị Bích Ngọc', class: '12A1', progress: '40/40', status: 'submitted', warnings: 0, score: '9.0' },
    { id: '13', mssv: '21020027', name: 'Trịnh Công Sơn', class: '12A1', progress: '22/40', status: 'working', warnings: 0, score: null },
    { id: '14', mssv: '21020028', name: 'Phan Như Quỳnh', class: '12A1', progress: '39/40', status: 'working', warnings: 0, score: null },
  ]);

  const [remainingTime, setRemainingTime] = useState('28 phút 15 giây');

  const handleExtendTime = () => {
    setRemainingTime('38 phút 15 giây');
    if (onShowAlert) {
      onShowAlert('success', `Đã gia hạn thêm +10 phút cho toàn bộ phòng thi ${session.room}!`);
    }
  };

  const handleWarnStudent = (studentName) => {
    if (onShowAlert) {
      onShowAlert('error', `Đã gửi cảnh báo vi phạm quy chế phòng thi đến thí sinh ${studentName}!`);
    }
  };

  const handleForceEndSession = () => {
    if (window.confirm(`Bạn có chắc chắn muốn kết thúc và thu bài toàn bộ thí sinh trong phòng ${session.room}?`)) {
      setStudents(prev => prev.map(s => ({
        ...s,
        status: 'submitted',
        progress: '40/40',
        score: s.score || '7.5'
      })));
      if (onShowAlert) {
        onShowAlert('success', `Đã thu bài thành công toàn bộ ca thi ${session.title}!`);
      }
    }
  };

  const submittedCount = students.filter(s => s.status === 'submitted').length;
  const workingCount = students.filter(s => s.status === 'working').length;
  const warningCount = students.filter(s => s.warnings > 0).length;

  return (
    <div className="session-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="session-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header Modal */}
        <div className="session-modal-header">
          <div className="session-modal-header-meta">
            <h2 className="session-modal-title">
              🔴 Giám sát trực tiếp: Phòng {session.room} ({session.shift})
            </h2>
            <p className="session-modal-subtitle">
              {session.title} • Thời gian còn lại: <strong style={{ color: '#0051D5' }}>{remainingTime}</strong>
            </p>
          </div>
          <button type="button" className="session-modal-close-btn" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>

        {/* Body Modal */}
        <div className="session-modal-body">
          {/* Dải thống kê nhanh */}
          <div className="session-monitor-stats">
            <div className="session-stat-card">
              <span className="session-stat-label">Tổng số thí sinh</span>
              <span className="session-stat-val">{session.studentsCount || `${students.length} thí sinh`}</span>
            </div>
            <div className="session-stat-card">
              <span className="session-stat-label">Đang làm bài</span>
              <span className="session-stat-val" style={{ color: '#0051D5' }}>{workingCount}</span>
            </div>
            <div className="session-stat-card">
              <span className="session-stat-label">Đã nộp bài</span>
              <span className="session-stat-val" style={{ color: '#059669' }}>{submittedCount}</span>
            </div>
            <div className="session-stat-card">
              <span className="session-stat-label">Cảnh báo rời màn hình</span>
              <span className="session-stat-val" style={{ color: '#D97706' }}>{warningCount}</span>
            </div>
          </div>

          {/* Bảng danh sách thí sinh */}
          <div className="session-students-table-wrap">
            <table className="session-students-table">
              <thead>
                <tr>
                  <th>MSSV</th>
                  <th>Họ và tên thí sinh</th>
                  <th>Lớp</th>
                  <th>Tiến độ câu hỏi</th>
                  <th>Trạng thái</th>
                  <th>Cảnh báo</th>
                </tr>
              </thead>
              <tbody>
                {students.map((st) => (
                  <tr key={st.id}>
                    <td><strong className="font-mono">{st.mssv}</strong></td>
                    <td>{st.name}</td>
                    <td>{st.class}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: '#0051D5' }}>{st.progress}</span>
                    </td>
                    <td>
                      {st.status === 'submitted' ? (
                        <span className="session-student-pill submitted">
                          ✓ Đã nộp ({st.score}đ)
                        </span>
                      ) : (
                        <span className="session-student-pill working">
                          ● Đang làm
                        </span>
                      )}
                    </td>
                    <td>
                      {st.warnings > 0 ? (
                        <span className="session-student-pill warning">
                          ⚠️ {st.warnings} lần
                        </span>
                      ) : (
                        <span style={{ color: '#64748B', fontSize: '12px' }}>An toàn</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Modal với các nút điều khiển ca thi */}
        <div className="session-modal-footer">
          <button type="button" className="btn-session-sub" onClick={onClose}>
            Đóng giám sát
          </button>
          <button type="button" className="btn-session-extend" onClick={handleExtendTime}>
            + Gia hạn +10 phút
          </button>
          <button type="button" className="btn-session-end" onClick={handleForceEndSession}>
            Thu bài & Kết thúc ca
          </button>
        </div>
      </div>
    </div>
  );
}
