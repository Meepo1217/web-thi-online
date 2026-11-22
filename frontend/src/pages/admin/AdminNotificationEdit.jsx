import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './admin-notification-edit.css';

// Dữ liệu mặc định chuẩn theo bản thiết kế Figma
const DEFAULT_NOTIFICATION = {
  id: 'NOTIF-001',
  title: 'Bảo trì hệ thống máy chủ thi trực tuyến ca chiều',
  category: 'Sự cố máy chủ & Khẩn cấp',
  target: 'Toàn bộ người dùng',
  greeting: 'Kính gửi toàn thể Giảng viên coi thi và Thí sinh tham dự đợt khảo thí trực tuyến Học kỳ II,',
  body: 'Do lưu lượng truy cập tăng đột biến tại cụm máy chủ Khảo thí Trung tâm (Cluster ASIA-VN02), Ban Quản trị Kỹ thuật HuceExam xin thông báo lịch bảo trì nóng khẩn cấp như sau:',
  startTime: '13:30, 24/10/2026',
  endTime: '14:15, 24/10/2026',
  impact: 'Trong thời gian này, toàn bộ bài thi đang làm sẽ được tự động lưu tạm thời. Thí sinh được cộng bù 45 phút thời gian làm bài sau khi máy chủ hoạt động bình thường trở lại.',
};

export default function AdminNotificationEdit() {
  const { notificationId } = useParams();
  const navigate = useNavigate();

  // State biểu mẫu cập nhật thông báo
  const [formData, setFormData] = useState({
    ...DEFAULT_NOTIFICATION,
    id: notificationId || DEFAULT_NOTIFICATION.id,
  });

  // State công cụ định dạng Rich-text
  const [activeFormats, setActiveFormats] = useState({
    bold: true,
    italic: false,
    underline: false,
    align: 'left',
    list: 'none',
  });

  // State toast thông báo kết quả
  const [toastMessage, setToastMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleFormat = (key) => {
    setActiveFormats((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const setAlignment = (align) => {
    setActiveFormats((prev) => ({
      ...prev,
      align,
    }));
  };

  const setListType = (type) => {
    setActiveFormats((prev) => ({
      ...prev,
      list: prev.list === type ? 'none' : type,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast('Vui lòng nhập tiêu đề thông báo');
      return;
    }

    setIsSubmitting(true);

    // Giả lập lưu dữ liệu
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Cập nhật thông báo thành công!');

      // Điều hướng về trang chi tiết hoặc danh sách sau khi lưu
      setTimeout(() => {
        navigate(`/admin/notifications/${formData.id}`);
      }, 900);
    }, 600);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="admin-notification-edit-container">
      {/* Toast Notification */}
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
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Breadcrumbs & Tiêu đề trang */}
      <div className="notif-edit-header-block">
        <nav aria-label="Breadcrumb" className="notif-edit-breadcrumb">
          <Link to="/admin/notifications">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Quản lý thông báo</span>
          </Link>
          <span className="notif-edit-breadcrumb-sep">/</span>
          <Link to={`/admin/notifications/${formData.id}`}>
            <span>Chi tiết</span>
          </Link>
          <span className="notif-edit-breadcrumb-sep">/</span>
          <span>Chỉnh sửa thông báo</span>
        </nav>

        <div className="notif-edit-title-row">
          <h1 className="notif-edit-page-title">Cập nhật thông báo</h1>
        </div>
      </div>

      {/* 2. Main Canvas & Form Containers */}
      <form onSubmit={handleSubmit} className="notif-edit-main-canvas">
        {/* Card 1: Configuration Form (Replicating SCREEN_22 Information block) */}
        <div className="notif-edit-card">
          <div className="notif-edit-card-header">
            <div className="notif-edit-card-header__left">
              <div className="notif-edit-card-header__icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="notif-edit-card-header__title">Thông tin cấu hình</h3>
            </div>
          </div>

          <div className="notif-edit-fields-group">
            {/* Trường: Tiêu đề */}
            <div className="notif-edit-field-box">
              <label className="notif-edit-field-label" htmlFor="notif-title-input">
                Tiêu đề
              </label>
              <input
                id="notif-title-input"
                type="text"
                className="notif-edit-title-input"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Nhập tiêu đề thông báo..."
                required
              />
            </div>

            {/* Hàng 2: Phân loại & Gửi tới */}
            <div className="notif-edit-row-2">
              {/* Phân loại */}
              <div className="notif-edit-field-box">
                <label className="notif-edit-field-label" htmlFor="notif-category-select">
                  Phân loại
                </label>
                <div className="notif-edit-select-wrapper">
                  <select
                    id="notif-category-select"
                    className="notif-edit-select"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <option value="Sự cố máy chủ & Khẩn cấp">Sự cố máy chủ & Khẩn cấp</option>
                    <option value="Bảo trì hệ thống">Bảo trì hệ thống</option>
                    <option value="Quy chế & Quy định">Quy chế & Quy định</option>
                    <option value="Lịch thi & Ca thi">Lịch thi & Ca thi</option>
                    <option value="Phúc khảo & Kết quả">Phúc khảo & Kết quả</option>
                    <option value="Hướng dẫn kỹ thuật">Hướng dẫn kỹ thuật</option>
                  </select>
                  <span className="notif-edit-select-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Gửi tới */}
              <div className="notif-edit-field-box">
                <label className="notif-edit-field-label" htmlFor="notif-target-select">
                  Gửi tới
                </label>
                <div className="notif-edit-select-wrapper">
                  <select
                    id="notif-target-select"
                    className="notif-edit-select"
                    value={formData.target}
                    onChange={(e) => handleInputChange('target', e.target.value)}
                  >
                    <option value="Toàn bộ người dùng">Toàn bộ người dùng</option>
                    <option value="Toàn trường">Toàn trường</option>
                    <option value="Giảng viên">Giảng viên</option>
                    <option value="Sinh viên & Thí sinh">Sinh viên & Thí sinh</option>
                    <option value="Thí sinh tự do & SV">Thí sinh tự do & SV</option>
                  </select>
                  <span className="notif-edit-select-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Rich Editor Form (Replicating SCREEN_22 Details block) */}
        <div className="notif-edit-details-card">
          <div className="notif-edit-card-header">
            <div className="notif-edit-card-header__left">
              <div className="notif-edit-card-header__icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="notif-edit-card-header__title">Nội dung chi tiết thông báo</h3>
            </div>
          </div>

          {/* Thanh công cụ Rich-Text Toolbar */}
          <div className="notif-richtext-toolbar" role="toolbar" aria-label="Định dạng văn bản">
            {/* Bold */}
            <button
              type="button"
              className={`notif-toolbar-btn ${activeFormats.bold ? 'active' : ''}`}
              title="In đậm (Bold)"
              onClick={() => toggleFormat('bold')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
              </svg>
            </button>

            {/* Italic */}
            <button
              type="button"
              className={`notif-toolbar-btn ${activeFormats.italic ? 'active' : ''}`}
              title="In nghiêng (Italic)"
              onClick={() => toggleFormat('italic')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="4" x2="10" y2="4" />
                <line x1="14" y1="20" x2="5" y2="20" />
                <line x1="15" y1="4" x2="9" y2="20" />
              </svg>
            </button>

            {/* Underline */}
            <button
              type="button"
              className={`notif-toolbar-btn ${activeFormats.underline ? 'active' : ''}`}
              title="Gạch chân (Underline)"
              onClick={() => toggleFormat('underline')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 3v7a6 6 0 0 0 12 0V3" />
                <line x1="4" y1="21" x2="20" y2="21" />
              </svg>
            </button>

            <span className="notif-toolbar-divider" />

            {/* Align Left */}
            <button
              type="button"
              className={`notif-toolbar-btn ${activeFormats.align === 'left' ? 'active' : ''}`}
              title="Căn lề trái"
              onClick={() => setAlignment('left')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="17" y1="10" x2="3" y2="10" />
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="14" x2="3" y2="14" />
                <line x1="17" y1="18" x2="3" y2="18" />
              </svg>
            </button>

            {/* Align Center */}
            <button
              type="button"
              className={`notif-toolbar-btn ${activeFormats.align === 'center' ? 'active' : ''}`}
              title="Căn lề giữa"
              onClick={() => setAlignment('center')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="10" x2="6" y2="10" />
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="14" x2="3" y2="14" />
                <line x1="18" y1="18" x2="6" y2="18" />
              </svg>
            </button>

            {/* Align Right */}
            <button
              type="button"
              className={`notif-toolbar-btn ${activeFormats.align === 'right' ? 'active' : ''}`}
              title="Căn lề phải"
              onClick={() => setAlignment('right')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="21" y1="10" x2="7" y2="10" />
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="14" x2="3" y2="14" />
                <line x1="21" y1="18" x2="7" y2="18" />
              </svg>
            </button>

            <span className="notif-toolbar-divider" />

            {/* Bullet List */}
            <button
              type="button"
              className={`notif-toolbar-btn ${activeFormats.list === 'bullet' ? 'active' : ''}`}
              title="Danh sách dấu đầu dòng"
              onClick={() => setListType('bullet')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>

            {/* Number List */}
            <button
              type="button"
              className={`notif-toolbar-btn ${activeFormats.list === 'number' ? 'active' : ''}`}
              title="Danh sách đánh số"
              onClick={() => setListType('number')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="10" y1="6" x2="21" y2="6" />
                <line x1="10" y1="12" x2="21" y2="12" />
                <line x1="10" y1="18" x2="21" y2="18" />
                <path d="M4 6h1v4" />
                <path d="M4 10h2" />
                <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
              </svg>
            </button>

            <span className="notif-toolbar-divider" />

            {/* Insert Link */}
            <button
              type="button"
              className="notif-toolbar-btn"
              title="Chèn liên kết (Link)"
              onClick={() => showToast('Chức năng chèn liên kết khả dụng')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>

            {/* Insert Image */}
            <button
              type="button"
              className="notif-toolbar-btn"
              title="Chèn hình ảnh"
              onClick={() => showToast('Chức năng chèn ảnh đính kèm khả dụng')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </button>
          </div>

          {/* Vùng soạn thảo nội dung (Editable Card Area) */}
          <div className="notif-edit-content-box">
            {/* Đoạn 1: Lời mở đầu */}
            <textarea
              className="notif-edit-textarea-greeting"
              rows={2}
              value={formData.greeting}
              onChange={(e) => handleInputChange('greeting', e.target.value)}
              placeholder="Lời mở đầu..."
            />

            {/* Đoạn 2: Thân bài */}
            <textarea
              className="notif-edit-textarea-body"
              rows={3}
              value={formData.body}
              onChange={(e) => handleInputChange('body', e.target.value)}
              placeholder="Nội dung diễn giải chi tiết..."
            />

            {/* Khung nổi bật lịch trình & tác động (Highlighted Schedule Block) */}
            <div className="notif-edit-schedule-card">
              {/* Thời gian bắt đầu */}
              <div className="notif-edit-schedule-row">
                <strong>• Thời gian bắt đầu:</strong>
                <input
                  type="text"
                  className="notif-edit-schedule-input"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  placeholder="Thời gian bắt đầu..."
                />
              </div>

              {/* Thời gian dự kiến hoàn tất */}
              <div className="notif-edit-schedule-row">
                <strong>• Thời gian dự kiến hoàn tất:</strong>
                <input
                  type="text"
                  className="notif-edit-schedule-input"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  placeholder="Thời gian hoàn tất..."
                />
              </div>

              {/* Tác động tới bài thi */}
              <div className="notif-edit-impact-block">
                <div className="notif-edit-schedule-row">
                  <strong>• Tác động tới bài thi:</strong>
                </div>
                <textarea
                  className="notif-edit-impact-textarea"
                  value={formData.impact}
                  onChange={(e) => handleInputChange('impact', e.target.value)}
                  placeholder="Mô tả tác động tới bài thi và quyền lợi của thí sinh..."
                  rows={2}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Form Action Footer Buttons */}
        <div className="notif-edit-footer-bar">
          <button
            type="button"
            className="btn-notif-edit-cancel"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Hủy
          </button>

          <button
            type="submit"
            className="btn-notif-edit-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Đang lưu...</span>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Cập nhật thông báo</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
