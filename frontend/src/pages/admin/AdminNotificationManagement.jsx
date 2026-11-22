import { useState, useMemo } from 'react';
import './admin-notifications.css';

// Dữ liệu mẫu chuẩn xác từ Figma Spec
const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-001',
    title: '[KHẨN CẤP] Bảo trì hệ thống máy chủ thi trực tuyến',
    type: 'emergency',
    typeLabel: 'Khẩn cấp',
    badgeClass: 'type-emergency',
    time: '08:30',
    date: '28/10/2026',
    target: 'Toàn trường',
    status: 'published',
    isEmergency: true,
    content:
      'Hệ thống thi trực tuyến sẽ tiến hành nâng cấp và bảo trì định kỳ cụm máy chủ Cloud vào lúc 08:30 ngày 28/10/2026. Trong thời gian này, các ca thi sẽ tạm ngưng kết nối trong 15 phút. Vui lòng lưu bài thi trước thời gian bảo trì.',
  },
  {
    id: 'NOTIF-002',
    title: 'Cập nhật kết quả & Mở cổng phúc khảo bài thi Đánh giá năng lực 2026',
    type: 'appeal',
    typeLabel: 'Phúc khảo',
    badgeClass: 'type-appeal',
    time: '16:45',
    date: '26/10/2026',
    target: 'Sinh viên & Thí sinh',
    status: 'published',
    isEmergency: false,
    content:
      'Hội đồng khảo thí đã cập nhật đầy đủ điểm thi kỳ thi ĐGNL 2026 đợt 1. Thí sinh có nhu cầu phúc khảo có thể nộp đơn trực tuyến qua cổng sinh viên từ 16:45 ngày 26/10/2026 đến hết 17:00 ngày 02/11/2026.',
  },
  {
    id: 'NOTIF-003',
    title: 'Mở cổng phòng thi thử nghiệm trực tuyến chứng chỉ AI & Khoa học dữ liệu',
    type: 'session',
    typeLabel: 'Ca thi',
    badgeClass: 'type-session',
    time: '14:15',
    date: '26/10/2026',
    target: 'Thí sinh tự do & SV',
    status: 'published',
    isEmergency: false,
    content:
      'Phòng thi trực tuyến số 04 đã mở ca thi thử nghiệm chứng chỉ AI & Khoa học dữ liệu. Thí sinh có thể vào phòng trước 15 phút để kiểm tra webcam, micro và hệ thống giám sát AI.',
  },
  {
    id: 'NOTIF-004',
    title: 'Cập nhật Quy chế phòng thi trực tuyến và cơ chế giám sát AI chống gian lận',
    type: 'rules',
    typeLabel: 'Quy chế',
    badgeClass: 'type-rules',
    time: '09:00',
    date: '25/10/2026',
    target: 'Toàn trường',
    status: 'published',
    isEmergency: false,
    content:
      'Nhà trường ban hành quy chế phòng thi trực tuyến áp dụng phiên bản AI proctoring v2.5. Thí sinh vi phạm chuyển tab quá 3 lần hoặc phát hiện có khuôn mặt thứ 2 sẽ bị tự động khóa bài thi.',
  },
  {
    id: 'NOTIF-005',
    title: 'Thông báo nâng cấp tính năng làm bài dạng cuộn và mục lục câu hỏi',
    type: 'feature',
    typeLabel: 'Tính năng',
    badgeClass: 'type-feature',
    time: '11:20',
    date: '24/10/2026',
    target: 'Sinh viên & Giảng viên',
    status: 'published',
    isEmergency: false,
    content:
      'Nền tảng thi trực tuyến đã ra mắt giao diện làm bài dạng cuộn kết hợp thanh điều hướng nhanh mục lục câu hỏi giúp thí sinh dễ dàng rà soát và đánh dấu câu chưa trả lời.',
  },
  {
    id: 'NOTIF-006',
    title: 'Hướng dẫn kích hoạt tài khoản và kiểm tra thiết bị trước giờ thi trực tuyến',
    type: 'guide',
    typeLabel: 'Hướng dẫn',
    badgeClass: 'type-guide',
    time: '08:00',
    date: '23/10/2026',
    target: 'Sinh viên',
    status: 'published',
    isEmergency: false,
    content:
      'Tất cả sinh viên tham gia kỳ thi học kỳ cần đăng nhập hệ thống trước 24 giờ để xác thực camera, micro và kiểm tra tốc độ đường truyền internet tối thiểu 5 Mbps.',
  },
];

export default function AdminNotificationManagement() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [targetFilter, setTargetFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal tạo / chỉnh sửa thông báo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotif, setEditingNotif] = useState(null);
  const [previewNotif, setPreviewNotif] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    type: 'guide',
    target: 'Toàn trường',
    content: '',
    isEmergency: false,
  });

  // Hiển thị thông báo Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Thống kê KPI chuẩn xác theo Figma Spec
  const kpiData = useMemo(() => {
    return {
      total: 128,
      published: 114,
      emergency: 6,
      draft: 8,
    };
  }, []);

  // Lọc danh sách thông báo
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      const query = searchTerm.toLowerCase().trim();
      const matchSearch =
        !query ||
        notif.title.toLowerCase().includes(query) ||
        notif.content.toLowerCase().includes(query) ||
        notif.target.toLowerCase().includes(query);

      const matchType = typeFilter === 'all' || notif.type === typeFilter;

      const matchTarget =
        targetFilter === 'all' ||
        (targetFilter === 'student' && notif.target.includes('Sinh viên')) ||
        (targetFilter === 'teacher' && notif.target.includes('Giảng viên')) ||
        (targetFilter === 'school' && notif.target.includes('Toàn trường'));

      return matchSearch && matchType && matchTarget;
    });
  }, [notifications, searchTerm, typeFilter, targetFilter]);

  // Danh sách hiển thị theo phân trang
  const paginatedNotifications = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredNotifications.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredNotifications, currentPage, rowsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredNotifications.length / rowsPerPage));

  // Checkbox lựa chọn
  const isAllSelected =
    paginatedNotifications.length > 0 &&
    paginatedNotifications.every((n) => selectedIds.includes(n.id));

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedNotifications.map((n) => n.id));
    }
  };

  const handleToggleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Xóa đơn thông báo
  const handleDeleteNotif = (id, title) => {
    if (window.confirm(`Bạn có chắc muốn xóa thông báo: "${title}"?`)) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      showToast(`Đã xóa thông báo "${title}".`);
    }
  };

  // Xóa hàng loạt
  const handleBulkDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa ${selectedIds.length} thông báo đã chọn?`)) {
      setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
      showToast(`Đã xóa ${selectedIds.length} thông báo.`);
      setSelectedIds([]);
    }
  };

  // Mở modal tạo mới
  const handleOpenCreateModal = () => {
    setEditingNotif(null);
    setFormData({
      title: '',
      type: 'guide',
      target: 'Toàn trường',
      content: '',
      isEmergency: false,
    });
    setIsModalOpen(true);
  };

  // Mở modal chỉnh sửa
  const handleOpenEditModal = (notif) => {
    setEditingNotif(notif);
    setFormData({
      title: notif.title,
      type: notif.type,
      target: notif.target,
      content: notif.content,
      isEmergency: notif.isEmergency || notif.type === 'emergency',
    });
    setIsModalOpen(true);
  };

  // Lưu thông báo (Tạo hoặc Cập nhật)
  const handleSaveNotif = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Vui lòng nhập đầy đủ tiêu đề và nội dung thông báo.');
      return;
    }

    const typeLabels = {
      emergency: 'Khẩn cấp',
      appeal: 'Phúc khảo',
      session: 'Ca thi',
      rules: 'Quy chế',
      feature: 'Tính năng',
      guide: 'Hướng dẫn',
    };

    const typeBadges = {
      emergency: 'type-emergency',
      appeal: 'type-appeal',
      session: 'type-session',
      rules: 'type-rules',
      feature: 'type-feature',
      guide: 'type-guide',
    };

    const now = new Date();
    const formattedHour = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1
    ).padStart(2, '0')}/${now.getFullYear()}`;

    if (editingNotif) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === editingNotif.id
            ? {
                ...n,
                title: formData.title,
                type: formData.type,
                typeLabel: typeLabels[formData.type] || 'Thông báo',
                badgeClass: typeBadges[formData.type] || 'type-guide',
                target: formData.target,
                content: formData.content,
                isEmergency: formData.isEmergency || formData.type === 'emergency',
              }
            : n
        )
      );
      showToast(`Đã cập nhật thông báo thành công.`);
    } else {
      const newNotif = {
        id: `NOTIF-${String(notifications.length + 1).padStart(3, '0')}`,
        title: formData.title,
        type: formData.type,
        typeLabel: typeLabels[formData.type] || 'Thông báo',
        badgeClass: typeBadges[formData.type] || 'type-guide',
        time: formattedHour,
        date: formattedDate,
        target: formData.target,
        status: 'published',
        isEmergency: formData.isEmergency || formData.type === 'emergency',
        content: formData.content,
      };

      setNotifications([newNotif, ...notifications]);
      showToast(`Đã phát hành thông báo mới thành công.`);
    }

    setIsModalOpen(false);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setTargetFilter('all');
    setTimeFilter('all');
    showToast('Đã đặt lại tất cả bộ lọc tìm kiếm.');
  };

  return (
    <div className="admin-notifications-container">
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
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* 1. Page Header & Action Bar */}
      <div className="notifications-page-header">
        <div className="notifications-page-header__left">
          <h1 className="notifications-page-header__title">Quản lý thông báo</h1>
          <p className="notifications-page-header__subtitle">
            Quản trị các bản tin thông báo khảo thí, cảnh báo khẩn cấp và cập nhật quy chế hệ thống.
          </p>
        </div>

        <div className="notifications-page-header__actions">
          {/* Nút Xuất Excel */}
          <button
            type="button"
            className="btn-export-excel"
            onClick={() => showToast('Đang tạo và tải xuống file Excel danh sách thông báo...')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="16" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>Xuất Excel</span>
          </button>

          {/* Nút Tạo thông báo mới */}
          <button
            type="button"
            className="btn-create-notification"
            onClick={handleOpenCreateModal}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Tạo thông báo mới</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Summary Cards (4 Cards chuẩn Figma) */}
      <div className="notifications-kpi-row">
        {/* Card 1: Tổng thông báo */}
        <div className="notifications-kpi-card">
          <div className="notifications-kpi-card__inner">
            <div className="notifications-kpi-card__left">
              <span className="notifications-kpi-card__label">TỔNG THÔNG BÁO</span>
              <span className="notifications-kpi-card__number">{kpiData.total}</span>
            </div>
            <div className="notifications-kpi-card__icon-box icon-total">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Đã phát hành */}
        <div className="notifications-kpi-card">
          <div className="notifications-kpi-card__inner">
            <div className="notifications-kpi-card__left">
              <span className="notifications-kpi-card__label">ĐÃ PHÁT HÀNH</span>
              <span className="notifications-kpi-card__number">{kpiData.published}</span>
            </div>
            <div className="notifications-kpi-card__icon-box icon-published">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Cảnh báo khẩn */}
        <div className="notifications-kpi-card">
          <div className="notifications-kpi-card__inner">
            <div className="notifications-kpi-card__left">
              <span className="notifications-kpi-card__label alert-label">CẢNH BÁO KHẨN</span>
              <span className="notifications-kpi-card__number alert-number">{kpiData.emergency}</span>
            </div>
            <div className="notifications-kpi-card__icon-box icon-alert">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4: Bản nháp & Hẹn giờ */}
        <div className="notifications-kpi-card">
          <div className="notifications-kpi-card__inner">
            <div className="notifications-kpi-card__left">
              <span className="notifications-kpi-card__label">BẢN NHÁP & HẸN GIỜ</span>
              <span className="notifications-kpi-card__number">{kpiData.draft}</span>
            </div>
            <div className="notifications-kpi-card__icon-box icon-draft">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Controls */}
      <div className="notifications-filter-card">
        {/* Search bar */}
        <div className="notifications-search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="notifications-search-input"
            placeholder="Tìm kiếm theo tiêu đề thông báo..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="notifications-filter-dropdowns">
          {/* Loại tin */}
          <select
            className="notifications-filter-select"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">Tất cả loại tin</option>
            <option value="emergency">Khẩn cấp</option>
            <option value="appeal">Phúc khảo</option>
            <option value="session">Ca thi</option>
            <option value="rules">Quy chế</option>
            <option value="feature">Tính năng</option>
            <option value="guide">Hướng dẫn</option>
          </select>

          {/* Đối tượng */}
          <select
            className="notifications-filter-select"
            value={targetFilter}
            onChange={(e) => {
              setTargetFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">Tất cả đối tượng</option>
            <option value="school">Toàn trường</option>
            <option value="student">Sinh viên</option>
            <option value="teacher">Giảng viên</option>
          </select>

          {/* Thời gian */}
          <select
            className="notifications-filter-select"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">Khoảng thời gian</option>
            <option value="7d">7 ngày qua</option>
            <option value="30d">30 ngày qua</option>
            <option value="oct-2026">Tháng 10/2026</option>
          </select>

          {/* Action Lọc */}
          <button
            type="button"
            className="btn-filter-action"
            onClick={() => showToast(`Tìm thấy ${filteredNotifications.length} thông báo phù hợp.`)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span>Lọc dữ liệu</span>
          </button>

          {/* Nút Reset */}
          {(searchTerm || typeFilter !== 'all' || targetFilter !== 'all' || timeFilter !== 'all') && (
            <button
              type="button"
              className="btn-filter-reset"
              title="Đặt lại bộ lọc"
              onClick={handleResetFilters}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2.5 2v6h6M21.5 22v-6h-6" />
                <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.3" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Bulk action toolbar khi có checkbox được chọn */}
      {selectedIds.length > 0 && (
        <div className="notifications-bulk-bar">
          <span>
            Đã chọn <strong>{selectedIds.length}</strong> thông báo
          </span>
          <div className="notifications-bulk-actions">
            <button
              type="button"
              className="btn-bulk-delete"
              onClick={handleBulkDelete}
            >
              Xóa các mục đã chọn
            </button>
          </div>
        </div>
      )}

      {/* 4. Main Notification Data Table */}
      <div className="notifications-table-card">
        <div className="notifications-table-wrapper">
          <table className="notifications-table">
            <thead>
              <tr>
                <th className="col-checkbox">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={isAllSelected}
                    onChange={handleToggleSelectAll}
                    aria-label="Chọn tất cả"
                  />
                </th>
                <th className="col-title">TIÊU ĐỀ THÔNG BÁO</th>
                <th className="col-type">PHÂN LOẠI</th>
                <th className="col-time">THỜI GIAN</th>
                <th className="col-actions">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {paginatedNotifications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="notifications-empty-row">
                    Không tìm thấy thông báo nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                paginatedNotifications.map((notif) => {
                  const isSelected = selectedIds.includes(notif.id);
                  return (
                    <tr
                      key={notif.id}
                      className={`
                        ${notif.isEmergency ? 'row-emergency' : ''}
                        ${isSelected ? 'row-selected' : ''}
                      `}
                    >
                      {/* Checkbox */}
                      <td className="col-checkbox">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectRow(notif.id)}
                          aria-label={`Chọn thông báo ${notif.title}`}
                        />
                      </td>

                      {/* Tiêu đề & Đối tượng */}
                      <td>
                        <div className="notification-title-container">
                          <span
                            className="notification-title-link"
                            title={notif.title}
                            onClick={() => setPreviewNotif(notif)}
                          >
                            {notif.title}
                          </span>
                          <span className="notification-target-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <span>Gửi tới: {notif.target}</span>
                          </span>
                        </div>
                      </td>

                      {/* Phân loại badge */}
                      <td>
                        <span className={`type-badge ${notif.badgeClass || 'type-guide'}`}>
                          {notif.typeLabel}
                        </span>
                      </td>

                      {/* Thời gian */}
                      <td>
                        <div className="time-cell-container">
                          <span className="time-cell-hour">{notif.time}</span>
                          <span className="time-cell-date">{notif.date}</span>
                        </div>
                      </td>

                      {/* Thao tác */}
                      <td>
                        <div className="actions-cell-container">
                          {/* Sửa */}
                          <button
                            type="button"
                            className="btn-table-action btn-edit-action"
                            title="Chỉnh sửa thông báo"
                            onClick={() => handleOpenEditModal(notif)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>

                          {/* Xóa */}
                          <button
                            type="button"
                            className="btn-table-action btn-delete-action"
                            title="Xóa thông báo"
                            onClick={() => handleDeleteNotif(notif.id, notif.title)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Table Footer / Pagination */}
        <div className="notifications-pagination-footer">
          <div className="pagination-status-group">
            <span className="pagination-status-text">
              Hiển thị 1 - {paginatedNotifications.length} trên tổng số {filteredNotifications.length} thông báo
            </span>

            <div className="pagination-rows-selector">
              <span className="pagination-rows-label">Số dòng:</span>
              <select
                className="pagination-rows-select"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={6}>6 / trang</option>
                <option value={10}>10 / trang</option>
                <option value={20}>20 / trang</option>
                <option value={50}>50 / trang</option>
              </select>
            </div>
          </div>

          <div className="pagination-buttons-group">
            {/* First Page */}
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              title="Trang đầu"
            >
              «
            </button>

            {/* Prev Page */}
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              title="Trang trước"
            >
              ‹
            </button>

            {/* Page 1 */}
            <button
              type="button"
              className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>

            {totalPages >= 2 && (
              <button
                type="button"
                className={`pagination-btn ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
            )}

            {totalPages >= 3 && (
              <button
                type="button"
                className={`pagination-btn ${currentPage === 3 ? 'active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
            )}

            {totalPages >= 4 && (
              <button
                type="button"
                className={`pagination-btn ${currentPage === 4 ? 'active' : ''}`}
                onClick={() => setCurrentPage(4)}
              >
                4
              </button>
            )}

            {totalPages > 5 && <span className="pagination-ellipsis">...</span>}

            {totalPages > 4 && (
              <button
                type="button"
                className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}

            {/* Next Page */}
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              title="Trang tiếp"
            >
              ›
            </button>

            {/* Last Page */}
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              title="Trang cuối"
            >
              »
            </button>
          </div>
        </div>
      </div>

      {/* 6. Modal Tạo / Chỉnh sửa thông báo */}
      {isModalOpen && (
        <div className="notification-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="notification-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="notification-modal-header">
              <h2>{editingNotif ? 'Chỉnh sửa thông báo' : 'Tạo thông báo mới'}</h2>
              <button
                type="button"
                className="notification-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNotif}>
              <div className="notification-modal-body">
                <div className="form-group">
                  <label>
                    Tiêu đề thông báo <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="VD: [KHẨN CẤP] Bảo trì hệ thống máy chủ thi trực tuyến"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phân loại thông báo</label>
                    <select
                      className="form-select"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value,
                          isEmergency: e.target.value === 'emergency',
                        })
                      }
                    >
                      <option value="emergency">Khẩn cấp (Cảnh báo đỏ)</option>
                      <option value="appeal">Phúc khảo điểm thi</option>
                      <option value="session">Ca thi / Phòng thi</option>
                      <option value="rules">Quy chế thi</option>
                      <option value="feature">Tính năng hệ thống</option>
                      <option value="guide">Hướng dẫn thí sinh</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Đối tượng người nhận</label>
                    <select
                      className="form-select"
                      value={formData.target}
                      onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                    >
                      <option value="Toàn trường">Toàn trường</option>
                      <option value="Sinh viên & Thí sinh">Sinh viên & Thí sinh</option>
                      <option value="Sinh viên">Chỉ sinh viên</option>
                      <option value="Giảng viên">Chỉ giảng viên</option>
                      <option value="Thí sinh tự do & SV">Thí sinh tự do & SV</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Nội dung thông báo chi tiết <span className="required">*</span>
                  </label>
                  <textarea
                    rows={4}
                    className="form-textarea"
                    placeholder="Nhập nội dung đầy đủ của thông báo gửi tới người dùng..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.isEmergency}
                      onChange={(e) => setFormData({ ...formData, isEmergency: e.target.checked })}
                    />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#BA1A1A' }}>
                      Ghim ưu tiên và hiển thị cảnh báo đỏ trên thanh tiêu đề
                    </span>
                  </label>
                </div>
              </div>

              <div className="notification-modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-primary">
                  {editingNotif ? 'Lưu thay đổi' : 'Phát hành ngay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Modal Xem chi tiết thông báo */}
      {previewNotif && (
        <div className="notification-modal-backdrop" onClick={() => setPreviewNotif(null)}>
          <div className="notification-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="notification-modal-header">
              <h2>Chi tiết thông báo</h2>
              <button
                type="button"
                className="notification-modal-close-btn"
                onClick={() => setPreviewNotif(null)}
              >
                ✕
              </button>
            </div>
            <div className="notification-modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className={`type-badge ${previewNotif.badgeClass}`}>
                  {previewNotif.typeLabel}
                </span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  {previewNotif.time} ngày {previewNotif.date}
                </span>
              </div>
              <h3 style={{ fontSize: '17px', color: '#0B1C30', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                {previewNotif.title}
              </h3>
              <div
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '14px',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#334155',
                }}
              >
                {previewNotif.content}
              </div>
              <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '12px' }}>
                <strong>Đối tượng gửi:</strong> {previewNotif.target}
              </div>
            </div>
            <div className="notification-modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setPreviewNotif(null)}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  const notifToEdit = previewNotif;
                  setPreviewNotif(null);
                  handleOpenEditModal(notifToEdit);
                }}
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

