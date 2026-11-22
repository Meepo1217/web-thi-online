import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './admin-notification-detail.css';

// Dữ liệu mẫu mặc định chuẩn xác theo Figma Auto Layout Spec
const SPEC_NOTIFICATION = {
  id: 'NOTIF-001',
  title: 'Bảo trì hệ thống máy chủ thi trực tuyến ca chiều',
  category: 'Bảo trì hệ thống',
  target: 'Toàn bộ người dùng',
  time: '13:00',
  date: '24/10/2026',
  status: 'published',
  statusLabel: 'Đã phát hành',
  greeting: 'Kính gửi toàn thể Giảng viên coi thi và Thí sinh tham dự đợt khảo thí trực tuyến Học kỳ II,',
  body: 'Do lưu lượng truy cập tăng đột biến tại cụm máy chủ Khảo thí Trung tâm (Cluster ASIA-VN02), Ban Quản trị Kỹ thuật HuceExam xin thông báo lịch bảo trì nóng khẩn cấp như sau:',
  startTime: '13:30, 24/10/2026',
  endTime: '14:15, 24/10/2026',
  impact: 'Trong thời gian này, toàn bộ bài thi đang làm sẽ được tự động lưu tạm thời. Thí sinh được cộng bù 45 phút thời gian làm bài sau khi máy chủ hoạt động bình thường trở lại.',
};

export default function AdminNotificationDetail() {
  const { notificationId } = useParams();
  const navigate = useNavigate();

  const [notification, setNotification] = useState({
    ...SPEC_NOTIFICATION,
    id: notificationId || SPEC_NOTIFICATION.id,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...notification });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Mở trang sửa thông báo
  const handleOpenEdit = () => {
    navigate(`/admin/notifications/edit/${notification.id}`);
  };

  // Lưu chỉnh sửa
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setNotification({ ...editFormData });
    setIsEditModalOpen(false);
    showToast('Đã lưu thay đổi thông báo thành công!');
  };

  // Xóa thông báo
  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa thông báo "${notification.title}"?`)) {
      showToast('Đã xóa thông báo thành công.');
      setTimeout(() => {
        navigate('/admin/notifications');
      }, 1000);
    }
  };

  // Thu hồi / Tạm ngưng
  const handleToggleArchive = () => {
    const isCurrentlyArchived = notification.status === 'archived';
    const nextStatus = isCurrentlyArchived ? 'published' : 'archived';
    const nextLabel = isCurrentlyArchived ? 'Đã phát hành' : 'Đã thu hồi';

    setNotification((prev) => ({
      ...prev,
      status: nextStatus,
      statusLabel: nextLabel,
    }));

    showToast(isCurrentlyArchived ? 'Đã mở lại thông báo!' : 'Đã thu hồi thông báo khỏi bảng tin!');
  };

  return (
    <div className="admin-notification-detail-container">
      {/* Toast thông báo */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#0B1C30',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            zIndex: 9999,
            fontSize: '13.5px',
            fontWeight: 500,
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* 1. Breadcrumbs & Tiêu đề trang */}
      <div className="notif-detail-header-block">
        <nav aria-label="Breadcrumb" className="notif-detail-breadcrumb">
          <Link to="/admin/notifications">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Quản lý thông báo</span>
          </Link>
          <span className="notif-detail-breadcrumb-sep">/</span>
          <span>Chi tiết thông báo</span>
        </nav>

        <div className="notif-detail-title-row">
          <h1 className="notif-detail-page-title">Chi tiết thông báo</h1>
        </div>
      </div>

      {/* 2. Main Canvas: Gồm 2 thẻ chuẩn Figma */}
      <div className="notif-detail-main-canvas">
        {/* Card 1: Configuration Form (Thông tin cấu hình) */}
        <div className="notif-config-card">
          {/* Header Card 1 */}
          <div className="notif-card-header">
            <div className="notif-card-header__left">
              <div className="notif-card-header__icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="notif-card-header__title">Thông tin cấu hình</h3>
            </div>

            {/* Cụm 3 nút hành động chuẩn Figma */}
            <div className="notif-card-header__actions">
              {/* Nút Xóa (viền đỏ) */}
              <button
                type="button"
                className="btn-notif-action btn-delete"
                title="Xóa thông báo"
                onClick={handleDelete}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                <span>Xóa</span>
              </button>

              {/* Nút Chỉnh sửa (viền xanh nhạt) */}
              <button
                type="button"
                className="btn-notif-action btn-edit"
                title="Chỉnh sửa thông báo"
                onClick={handleOpenEdit}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <span>Sửa</span>
              </button>

              {/* Nút Thu hồi / Tạm ngưng */}
              <button
                type="button"
                className="btn-notif-action btn-archive"
                title={notification.status === 'archived' ? 'Mở lại thông báo' : 'Thu hồi thông báo'}
                onClick={handleToggleArchive}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
                <span>{notification.status === 'archived' ? 'Mở lại' : 'Thu hồi'}</span>
              </button>
            </div>
          </div>

          {/* Cụm thông tin Fields */}
          <div className="notif-config-fields">
            {/* Field 1: Tiêu đề */}
            <div className="notif-field-box">
              <span className="notif-field-label">Tiêu đề</span>
              <span className="notif-field-title-value">{notification.title}</span>
            </div>

            {/* Row 2: Phân loại & Gửi tới */}
            <div className="notif-config-row-2">
              {/* Phân loại */}
              <div className="notif-field-box">
                <span className="notif-field-label">Phân loại</span>
                <span className="notif-field-sub-value">
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#0051D5',
                    }}
                  />
                  {notification.category}
                </span>
              </div>

              {/* Gửi tới */}
              <div className="notif-field-box">
                <span className="notif-field-label">Gửi tới</span>
                <span className="notif-field-sub-value">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {notification.target}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Rich Editor Form (Nội dung chi tiết thông báo) */}
        <div className="notif-details-card">
          {/* Header Card 2 */}
          <div className="notif-card-header">
            <div className="notif-card-header__left">
              <div className="notif-card-header__icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="notif-card-header__title">Nội dung chi tiết thông báo</h3>
            </div>
          </div>

          {/* Vùng nội dung xem chi tiết chuẩn Figma */}
          <div className="notif-content-preview-box">
            {/* Lời chào */}
            <p className="notif-para-greeting">{notification.greeting}</p>

            {/* Nội dung dẫn nhập */}
            <p className="notif-para-body">{notification.body}</p>

            {/* Khung lịch bảo trì & tác động */}
            <div className="notif-schedule-callout">
              {/* Mục 1: Thời gian bắt đầu */}
              <div className="notif-callout-item">
                <span className="notif-callout-bullet">•</span>
                <span>
                  <strong>Thời gian bắt đầu:</strong> {notification.startTime}
                </span>
              </div>

              {/* Mục 2: Thời gian dự kiến hoàn tất */}
              <div className="notif-callout-item">
                <span className="notif-callout-bullet">•</span>
                <span>
                  <strong>Thời gian dự kiến hoàn tất:</strong> {notification.endTime}
                </span>
              </div>

              {/* Mục 3: Tác động tới bài thi */}
              <div className="notif-callout-item impact-item">
                <div className="impact-title-row">
                  <span className="notif-callout-bullet">•</span>
                  <strong>Tác động tới bài thi:</strong>
                </div>
                <div className="impact-desc">{notification.impact}</div>
              </div>
            </div>
          </div>

          {/* Footer thông tin thời gian & trạng thái */}
          <div className="notif-meta-footer">
            <div className="notif-meta-footer__time">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                Phát hành lúc {notification.time} ngày {notification.date}
              </span>
            </div>

            <span className={`notif-status-pill ${notification.status}`}>
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'currentColor',
                }}
              />
              {notification.statusLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Modal Chỉnh sửa thông báo */}
      {isEditModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11, 28, 48, 0.45)',
            backdropFilter: 'blur(2px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              width: '680px',
              maxWidth: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: '1px solid #E5EEFF',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0B1C30' }}>
                Chỉnh sửa thông báo
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: '#64748B',
                }}
              >
                ✕
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveEdit}>
              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  maxHeight: 'calc(80vh - 120px)',
                  overflowY: 'auto',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#0B1C30' }}>Tiêu đề</label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    required
                    style={{
                      height: '40px',
                      padding: '0 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#0B1C30' }}>Phân loại</label>
                    <input
                      type="text"
                      value={editFormData.category}
                      onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                      required
                      style={{
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#0B1C30' }}>Gửi tới</label>
                    <input
                      type="text"
                      value={editFormData.target}
                      onChange={(e) => setEditFormData({ ...editFormData, target: e.target.value })}
                      required
                      style={{
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#0B1C30' }}>Nội dung chi tiết</label>
                  <textarea
                    rows={3}
                    value={editFormData.body}
                    onChange={(e) => setEditFormData({ ...editFormData, body: e.target.value })}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#0B1C30' }}>Thời gian bắt đầu</label>
                    <input
                      type="text"
                      value={editFormData.startTime}
                      onChange={(e) => setEditFormData({ ...editFormData, startTime: e.target.value })}
                      style={{
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#0B1C30' }}>Thời gian hoàn tất</label>
                    <input
                      type="text"
                      value={editFormData.endTime}
                      onChange={(e) => setEditFormData({ ...editFormData, endTime: e.target.value })}
                      style={{
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '14px',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#0B1C30' }}>Tác động tới bài thi</label>
                  <textarea
                    rows={2}
                    value={editFormData.impact}
                    onChange={(e) => setEditFormData({ ...editFormData, impact: e.target.value })}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>
              </div>

              {/* Footer Modal */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 24px',
                  borderTop: '1px solid #E5EEFF',
                  background: '#F8FAFC',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '13px',
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#0051D5',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '13px',
                  }}
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

