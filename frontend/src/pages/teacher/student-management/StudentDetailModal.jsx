import React from 'react';
import {
  IconEdit,
  IconCheck,
  IconClock,
  IconFileText,
} from '../../../components/ui/icons';

/**
 * StudentDetailModal
 * Popup xem chi tiết toàn diện hồ sơ học thuật của sinh viên:
 * - Thông tin cá nhân, liên hệ, lớp học
 * - Thống kê KPI kết quả thi & điểm trung bình
 * - Lịch sử làm bài thi gần nhất
 */
export default function StudentDetailModal({
  isOpen,
  student,
  onClose,
  onEdit,
}) {
  if (!isOpen || !student) return null;

  const getInitials = (name) => {
    if (!name) return 'SV';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Dữ liệu mẫu lịch sử bài thi của sinh viên
  const examHistory = [
    {
      id: 'ex-1',
      title: 'Đề thi Khảo sát Chất lượng Toán 12 - Học kỳ II',
      subject: 'Toán học THPT',
      date: '18/10/2025',
      duration: '42 phút',
      score: student.avgScore ? Number(student.avgScore).toFixed(1) : '8.5',
      maxScore: '10.0',
      status: 'passed',
    },
    {
      id: 'ex-2',
      title: 'Kiểm tra 1 tiết: Ứng dụng đạo hàm & Khảo sát hàm số',
      subject: 'Toán học THPT',
      date: '02/10/2025',
      duration: '38 phút',
      score: '9.0',
      maxScore: '10.0',
      status: 'passed',
    },
    {
      id: 'ex-3',
      title: 'Đề kiểm tra giữa kỳ: Tích phân & Hình học không gian',
      subject: 'Toán học THPT',
      date: '15/09/2025',
      duration: '45 phút',
      score: '8.0',
      maxScore: '10.0',
      status: 'passed',
    },
  ];

  return (
    <div className="ee-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="ee-modal-container st-detail-modal-container"
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="student-detail-title"
      >
        {/* 1. Modal Header với Avatar lớn & Thông tin tổng quan */}
        <div className="st-detail-header">
          <div className="st-detail-profile-row">
            <div
              className="st-detail-avatar-large"
              style={{ background: student.avatarColor || '#0051D5' }}
            >
              {getInitials(student.name)}
            </div>

            <div className="st-detail-header-meta">
              <div className="st-detail-name-row">
                <h2 id="student-detail-title" className="st-detail-name">
                  {student.name}
                </h2>
                <span className={`st-status-pill status-${student.status}`}>
                  <span className="st-status-dot" />
                  <span>
                    {student.status === 'active'
                      ? 'Đang học'
                      : student.status === 'reserved'
                      ? 'Bảo lưu'
                      : 'Đình chỉ'}
                  </span>
                </span>
              </div>

              <div className="st-detail-badges-row">
                <span className="st-mssv-badge">{student.mssv}</span>
                <span className="st-class-badge">Lớp {student.className}</span>
                <span className="st-class-badge">{student.grade}</span>
                <span className="st-detail-gender-tag">{student.gender}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="ee-modal-close-btn"
            onClick={onClose}
            aria-label="Đóng popup"
          >
            ✕
          </button>
        </div>

        {/* 2. Modal Body */}
        <div className="st-detail-body">
          {/* 2 Cột thông tin: Hồ sơ bên trái, Lịch sử thi bên phải */}
          <div className="st-detail-grid">
            {/* Cột trái: Thông tin cá nhân & liên hệ */}
            <div className="st-detail-card">
              <h3 className="st-detail-card-title">Thông tin hồ sơ & liên hệ</h3>
              <div className="st-info-list">
                <div className="st-info-item">
                  <span className="st-info-label">Mã số sinh viên:</span>
                  <span className="st-info-value font-mono"><strong>{student.mssv}</strong></span>
                </div>
                <div className="st-info-item">
                  <span className="st-info-label">Email học đường:</span>
                  <span className="st-info-value">{student.email}</span>
                </div>
                <div className="st-info-item">
                  <span className="st-info-label">Số điện thoại:</span>
                  <span className="st-info-value">{student.phone || 'Chưa cập nhật'}</span>
                </div>
                <div className="st-info-item">
                  <span className="st-info-label">Giới tính:</span>
                  <span className="st-info-value">{student.gender || 'Nam'}</span>
                </div>
                <div className="st-info-item">
                  <span className="st-info-label">Lớp sinh hoạt:</span>
                  <span className="st-info-value"><strong>Lớp {student.className}</strong></span>
                </div>
                <div className="st-info-item">
                  <span className="st-info-label">Khối đào tạo:</span>
                  <span className="st-info-value">{student.grade}</span>
                </div>
                <div className="st-info-item">
                  <span className="st-info-label">Số bài thi đã làm:</span>
                  <span className="st-info-value"><strong>{student.examCount || 0} bài</strong></span>
                </div>
                <div className="st-info-item">
                  <span className="st-info-label">Điểm trung bình:</span>
                  <span className="st-info-value font-bold" style={{ color: '#0051D5' }}>
                    {student.avgScore ? Number(student.avgScore).toFixed(1) + ' / 10' : '-'}
                  </span>
                </div>
                <div className="st-info-item">
                  <span className="st-info-label">Ngày tạo hồ sơ:</span>
                  <span className="st-info-value">{student.joinedDate || '05/09/2024'}</span>
                </div>
              </div>
            </div>

            {/* Cột phải: Lịch sử các bài thi gần nhất */}
            <div className="st-detail-card">
              <div className="st-detail-card-header-row">
                <h3 className="st-detail-card-title">Lịch sử bài thi gần đây</h3>
                <span className="st-detail-exam-count-tag">
                  {examHistory.length} bài thi gần nhất
                </span>
              </div>

              <div className="st-exam-history-list">
                {examHistory.map((ex) => (
                  <div key={ex.id} className="st-exam-item">
                    <div className="st-exam-item-left">
                      <div className="st-exam-icon-box">
                        <IconFileText width={16} height={16} color="#0051D5" />
                      </div>
                      <div className="st-exam-meta">
                        <h4 className="st-exam-title">{ex.title}</h4>
                        <div className="st-exam-subrow">
                          <span>{ex.date}</span>
                          <span>•</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <IconClock width={11} height={11} color="#64748B" />
                            {ex.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="st-exam-item-right">
                      <span className="st-exam-score-badge">
                        {ex.score} <span style={{ fontSize: '11px', color: '#64748B' }}>/ 10</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Modal Footer */}
        <div className="ee-modal-footer">
          <button
            type="button"
            className="st-btn-edit-from-detail"
            onClick={() => {
              onClose();
              onEdit(student);
            }}
          >
            <IconEdit width={14} height={14} color="#0051D5" />
            <span>Chỉnh sửa thông tin sinh viên</span>
          </button>

          <div className="ee-modal-footer-actions">
            <button
              type="button"
              className="ee-modal-btn-cancel"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
