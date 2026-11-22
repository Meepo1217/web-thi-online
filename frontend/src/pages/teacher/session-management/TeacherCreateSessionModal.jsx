import React, { useState } from 'react';

/**
 * TeacherCreateSessionModal
 * Modal mở thêm ca thi / phòng thi mới cho giảng viên
 */
export default function TeacherCreateSessionModal({
  isOpen,
  onClose,
  onCreate,
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: '',
    room: '',
    department: 'KHOA CÔNG NGHỆ THÔNG TIN',
    shift: 'CA 1',
    date: new Date().toLocaleDateString('vi-VN'),
    statusTime: 'BẮT ĐẦU: 08:00',
    duration: '60 phút',
    questions: '40 câu',
    studentsCount: '45 thí sinh',
    allowedClass: '12A1',
    pinCode: '6868',
    mode: 'Trực tuyến',
    school: 'Đại học Kinh doanh và Công nghệ Hà Nội',
    category: 'upcoming',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.room.trim()) {
      alert('Vui lòng nhập đầy đủ tên bài thi và mã phòng thi!');
      return;
    }

    onCreate({
      ...formData,
      id: `SES-${Date.now().toString().slice(-4)}`,
      submittedCount: 0,
      activeStudents: 0,
    });
    onClose();
  };

  return (
    <div className="session-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="session-modal-box" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="session-modal-header">
          <div className="session-modal-header-meta">
            <h2 className="session-modal-title">➕ Tạo ca thi / Mở phòng thi mới</h2>
            <p className="session-modal-subtitle">Thiết lập thông số ca thi trực tuyến cho sinh viên</p>
          </div>
          <button type="button" className="session-modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="session-modal-body" style={{ gap: '16px' }}>
            {/* Tên bài thi */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0B1C30' }}>
                Tên bài thi / Môn học *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="VD: Kiểm tra chuyên đề: Lập trình Web với React & Laravel"
                style={{
                  padding: '9px 12px',
                  border: '1px solid #DCE9FF',
                  borderRadius: '6px',
                  background: '#F8F9FF',
                  fontSize: '13.5px'
                }}
              />
            </div>

            {/* Phòng thi & Ca thi */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0B1C30' }}>
                  Phòng thi / Mã phòng *
                </label>
                <input
                  type="text"
                  name="room"
                  required
                  value={formData.room}
                  onChange={handleChange}
                  placeholder="VD: HA6 - P.305"
                  style={{
                    padding: '9px 12px',
                    border: '1px solid #DCE9FF',
                    borderRadius: '6px',
                    background: '#F8F9FF',
                    fontSize: '13.5px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0B1C30' }}>
                  Ca thi
                </label>
                <select
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                  style={{
                    padding: '9px 12px',
                    border: '1px solid #DCE9FF',
                    borderRadius: '6px',
                    background: '#F8F9FF',
                    fontSize: '13.5px'
                  }}
                >
                  <option value="CA 1">CA 1 (07:30 - 09:00)</option>
                  <option value="CA 2">CA 2 (09:30 - 11:00)</option>
                  <option value="CA 3">CA 3 (13:30 - 15:00)</option>
                  <option value="CA 4">CA 4 (15:30 - 17:00)</option>
                </select>
              </div>
            </div>

            {/* Khoa & Lớp */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0B1C30' }}>
                  Khoa / Bộ môn
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  style={{
                    padding: '9px 12px',
                    border: '1px solid #DCE9FF',
                    borderRadius: '6px',
                    background: '#F8F9FF',
                    fontSize: '13.5px'
                  }}
                >
                  <option value="KHOA CÔNG NGHỆ THÔNG TIN">KHOA CÔNG NGHỆ THÔNG TIN</option>
                  <option value="KHOA LÝ LUẬN CHÍNH TRỊ">KHOA LÝ LUẬN CHÍNH TRỊ</option>
                  <option value="KHOA ĐIỆN - ĐIỆN TỬ">KHOA ĐIỆN - ĐIỆN TỬ</option>
                  <option value="KHOA TIẾNG ANH & NGOẠI NGỮ">KHOA TIẾNG ANH & NGOẠI NGỮ</option>
                  <option value="TỔ TOÁN HỌC THPT">TỔ TOÁN HỌC THPT</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0B1C30' }}>
                  Lớp tham gia
                </label>
                <input
                  type="text"
                  name="allowedClass"
                  value={formData.allowedClass}
                  onChange={handleChange}
                  placeholder="VD: 12A1, CNTT1..."
                  style={{
                    padding: '9px 12px',
                    border: '1px solid #DCE9FF',
                    borderRadius: '6px',
                    background: '#F8F9FF',
                    fontSize: '13.5px'
                  }}
                />
              </div>
            </div>

            {/* Thời lượng & Số câu hỏi & Mã PIN */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0B1C30' }}>
                  Thời lượng
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  style={{
                    padding: '9px 12px',
                    border: '1px solid #DCE9FF',
                    borderRadius: '6px',
                    background: '#F8F9FF',
                    fontSize: '13.5px'
                  }}
                >
                  <option value="45 phút">45 phút</option>
                  <option value="60 phút">60 phút</option>
                  <option value="90 phút">90 phút</option>
                  <option value="120 phút">120 phút</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0B1C30' }}>
                  Số câu hỏi
                </label>
                <input
                  type="text"
                  name="questions"
                  value={formData.questions}
                  onChange={handleChange}
                  placeholder="40 câu"
                  style={{
                    padding: '9px 12px',
                    border: '1px solid #DCE9FF',
                    borderRadius: '6px',
                    background: '#F8F9FF',
                    fontSize: '13.5px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0B1C30' }}>
                  Mã PIN phòng thi
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="6868"
                  style={{
                    padding: '9px 12px',
                    border: '1px solid #DCE9FF',
                    borderRadius: '6px',
                    background: '#F8F9FF',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    color: '#0051D5'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="session-modal-footer">
            <button type="button" className="btn-session-sub" onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn-create-session-primary" style={{ borderRadius: '6px' }}>
              ✓ Kích hoạt & Mở ca thi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
