import { useState } from 'react';
import './admin-dashboard.css';

// Dữ liệu lượt truy cập 12 tháng
const MONTHLY_TRAFFIC = [
  { month: 'T1', visits: 7200, label: 'Tháng 1' },
  { month: 'T2', visits: 6400, label: 'Tháng 2' },
  { month: 'T3', visits: 8900, label: 'Tháng 3' },
  { month: 'T4', visits: 10200, label: 'Tháng 4' },
  { month: 'T5', visits: 11500, label: 'Tháng 5' },
  { month: 'T6', visits: 12800, label: 'Tháng 6' },
  { month: 'T7', visits: 9100, label: 'Tháng 7' },
  { month: 'T8', visits: 8400, label: 'Tháng 8' },
  { month: 'T9', visits: 14200, label: 'Tháng 9' },
  { month: 'T10', visits: 18450, label: 'Tháng 10 (Cao nhất)' },
  { month: 'T11', visits: 16300, label: 'Tháng 11' },
  { month: 'T12', visits: 15100, label: 'Tháng 12' },
];

// Danh sách kỳ thi gần đây
const INITIAL_EXAMS = [
  {
    id: 'EX-2026-001',
    name: 'Kiểm tra Giữa kỳ Giải tích 1 - Nhóm 03',
    department: 'Khoa Công nghệ Thông tin',
    questions: 50,
    status: 'active',
    statusLabel: 'Đang diễn ra',
    enrolled: 1250,
    total: 1500,
    date: '21/11/2026',
    time: '08:00 - 09:30',
  },
  {
    id: 'EX-2026-002',
    name: 'Khảo sát Năng lực Tiếng Anh Chuyên ngành B2',
    department: 'Trung tâm Khảo thí & Ngoại ngữ',
    questions: 60,
    status: 'upcoming',
    statusLabel: 'Sắp tới',
    enrolled: 2840,
    total: 3000,
    date: '24/11/2026',
    time: '14:00 - 16:00',
  },
  {
    id: 'EX-2026-003',
    name: 'Thi Kết thúc học phần Cơ học Đất & Nền móng',
    department: 'Khoa Xây dựng Dân dụng',
    questions: 40,
    status: 'active',
    statusLabel: 'Đang diễn ra',
    enrolled: 850,
    total: 900,
    date: '21/11/2026',
    time: '10:00 - 11:15',
  },
  {
    id: 'EX-2026-004',
    name: 'Đánh giá Kỹ năng Tin học Văn phòng MOS',
    department: 'Phòng Đào tạo Đại học',
    questions: 45,
    status: 'completed',
    statusLabel: 'Đã kết thúc',
    enrolled: 1420,
    total: 1420,
    date: '19/11/2026',
    time: '15:30 - 17:00',
  },
  {
    id: 'EX-2026-005',
    name: 'Kiểm tra Thường kỳ Sức bền Vật liệu - Lớp CLC',
    department: 'Khoa Cầu đường',
    questions: 35,
    status: 'upcoming',
    statusLabel: 'Sắp tới',
    enrolled: 420,
    total: 450,
    date: '26/11/2026',
    time: '08:30 - 09:30',
  },
];

export default function AdminDashboard() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [hoveredData, setHoveredData] = useState(MONTHLY_TRAFFIC[9]); // Mặc định tháng 10
  const [exams, setExams] = useState(INITIAL_EXAMS);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteExam = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kỳ thi này khỏi danh sách quản lý?')) {
      setExams((prev) => prev.filter((item) => item.id !== id));
      showToast('Đã xóa kỳ thi thành công.');
    }
  };

  // Tính toán tọa độ biểu đồ SVG
  const maxVisits = 20000;
  const chartHeight = 200;
  const chartWidth = 800;
  const barWidth = 28;
  const spacing = chartWidth / MONTHLY_TRAFFIC.length;

  const points = MONTHLY_TRAFFIC.map((item, idx) => {
    const x = idx * spacing + spacing / 2;
    const y = chartHeight - (item.visits / maxVisits) * (chartHeight - 30);
    return { x, y, ...item };
  });

  const polylineStr = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPathStr = `M ${points[0].x},${chartHeight} L ${polylineStr.replace(/ /g, ' L ')} L ${points[points.length - 1].x},${chartHeight} Z`;

  return (
    <div className="admin-dashboard-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
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
        }}>
          {toastMessage}
        </div>
      )}

      {/* 1. Header Row: Title & Action Buttons */}
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <h1 className="admin-page-header__title">Thống kê hệ thống</h1>
          <p className="admin-page-header__subtitle">
            Tổng quan các chỉ số vận hành, lưu lượng truy cập và hoạt động khảo thí thời gian thực.
          </p>
        </div>

        <div className="admin-page-header__actions">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={() => showToast('Đang tạo báo cáo thống kê PDF...')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>Xuất báo cáo PDF</span>
          </button>

          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={() => showToast('Điều hướng tới trình tạo kỳ thi mới...')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Tạo bài thi mới</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 KPI Stat Cards */}
      <div className="admin-kpi-grid">
        {/* Card 1: Tổng số thí sinh */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-card__top">
            <span className="admin-kpi-card__title">Tổng số thí sinh</span>
            <div className="admin-kpi-card__icon-box blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          <div className="admin-kpi-card__middle">
            <span className="admin-kpi-card__value">48,250</span>
            <span className="admin-kpi-card__unit">thí sinh</span>
          </div>
          <div className="admin-kpi-card__bottom">
            <span className="admin-kpi-badge positive">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              +12.5%
            </span>
            <span className="admin-kpi-card__subtext">so với tháng trước</span>
          </div>
        </div>

        {/* Card 2: Đề thi kích hoạt */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-card__top">
            <span className="admin-kpi-card__title">Đề thi kích hoạt</span>
            <div className="admin-kpi-card__icon-box green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
          </div>
          <div className="admin-kpi-card__middle">
            <span className="admin-kpi-card__value">1,420</span>
            <span className="admin-kpi-card__unit">đề thi</span>
          </div>
          <div className="admin-kpi-card__bottom">
            <span className="admin-kpi-badge positive">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              +8.2%
            </span>
            <span className="admin-kpi-card__subtext">so với tháng trước</span>
          </div>
        </div>

        {/* Card 3: Lượt thi hoàn thành */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-card__top">
            <span className="admin-kpi-card__title">Lượt thi hoàn thành</span>
            <div className="admin-kpi-card__icon-box purple">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <div className="admin-kpi-card__middle">
            <span className="admin-kpi-card__value">128,450</span>
            <span className="admin-kpi-card__unit">lượt thi</span>
          </div>
          <div className="admin-kpi-card__bottom">
            <span className="admin-kpi-badge positive">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              +15.3%
            </span>
            <span className="admin-kpi-card__subtext">so với tháng trước</span>
          </div>
        </div>

        {/* Card 4: Tỷ lệ hoàn thành */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-card__top">
            <span className="admin-kpi-card__title">Tỷ lệ hoàn thành</span>
            <div className="admin-kpi-card__icon-box amber">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          </div>
          <div className="admin-kpi-card__middle">
            <span className="admin-kpi-card__value">94.2%</span>
            <span className="admin-kpi-card__unit">tỷ lệ đạt</span>
          </div>
          <div className="admin-kpi-card__bottom">
            <span className="admin-kpi-badge positive">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              +2.1%
            </span>
            <span className="admin-kpi-card__subtext">so với tháng trước</span>
          </div>
        </div>
      </div>

      {/* 3. Monthly Traffic Statistics Chart Card */}
      <div className="admin-card">
        <div className="admin-card__header">
          <div className="admin-card__title-wrap">
            <h2 className="admin-card__title">
              Thống kê số lượt truy cập hệ thống theo tháng
            </h2>
            <p className="admin-card__subtitle">
              Monthly Traffic & Access Statistics — Theo dõi tần suất truy cập phục vụ các đợt thi tập trung
            </p>
          </div>

          <div className="admin-card__controls">
            <select
              className="admin-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2026">Năm 2026</option>
              <option value="2025">Năm 2025</option>
            </select>
          </div>
        </div>

        {/* 3 Summary Mini Sub-Cards */}
        <div className="admin-chart-subcards">
          <div className="admin-chart-subcard">
            <span className="admin-chart-subcard__label">Lượt truy cập cao nhất</span>
            <span className="admin-chart-subcard__value">18,450 lượt</span>
            <span className="admin-chart-subcard__detail">Tháng 10 • Kỳ thi Giữa kỳ HK1</span>
          </div>

          <div className="admin-chart-subcard">
            <span className="admin-chart-subcard__label">Trung bình mỗi tháng</span>
            <span className="admin-chart-subcard__value">10,704 lượt</span>
            <span className="admin-chart-subcard__detail">Tăng trưởng ổn định +18% so với 2025</span>
          </div>

          <div className="admin-chart-subcard">
            <span className="admin-chart-subcard__label">Tăng trưởng đỉnh điểm</span>
            <span className="admin-chart-subcard__value">+34.8%</span>
            <span className="admin-chart-subcard__detail">Giai đoạn chuyển giao Q3 — Q4</span>
          </div>
        </div>

        {/* Interactive 12-Month SVG Chart */}
        <div className="admin-chart-area">
          {hoveredData && (
            <div className="chart-tooltip-box">
              <span>{hoveredData.label}:</span>
              <strong>{hoveredData.visits.toLocaleString('vi-VN')} lượt truy cập</strong>
            </div>
          )}

          <svg
            className="admin-chart-svg"
            viewBox={`0 0 ${chartWidth} ${chartHeight + 35}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0051D5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
              </linearGradient>

              <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0051D5" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>

              <linearGradient id="barGradientActive" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>

            {/* Grid Lines & Y-Axis Labels */}
            {[0, 5000, 10000, 15000, 20000].map((val) => {
              const y = chartHeight - (val / maxVisits) * (chartHeight - 30);
              return (
                <g key={val}>
                  <line
                    x1="0"
                    y1={y}
                    x2={chartWidth}
                    y2={y}
                    className="chart-grid-line"
                  />
                  <text
                    x="4"
                    y={y - 4}
                    className="chart-axis-label"
                  >
                    {val === 0 ? '0' : `${val / 1000}k`}
                  </text>
                </g>
              );
            })}

            {/* Area Fill under the line */}
            <path d={areaPathStr} className="chart-area-fill" />

            {/* Trendline */}
            <polyline points={polylineStr} className="chart-line" />

            {/* Columns (Bars) & X-Axis Month Labels */}
            {points.map((p) => {
              const bHeight = (p.visits / maxVisits) * (chartHeight - 30);
              const bY = chartHeight - bHeight;
              const isHovered = hoveredData?.month === p.month;

              return (
                <g
                  key={p.month}
                  onMouseEnter={() => setHoveredData(p)}
                >
                  {/* Bar */}
                  <rect
                    x={p.x - barWidth / 2}
                    y={bY}
                    width={barWidth}
                    height={bHeight}
                    rx="5"
                    fill={isHovered ? 'url(#barGradientActive)' : 'url(#barGradient)'}
                    opacity={isHovered ? 1 : 0.85}
                    className="chart-bar"
                  />

                  {/* Dot on line */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? 6 : 4}
                    className="chart-dot"
                  />

                  {/* Month Label */}
                  <text
                    x={p.x}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    className="chart-axis-label"
                    fontWeight={isHovered ? '700' : '500'}
                    fill={isHovered ? '#0051D5' : '#64748B'}
                  >
                    {p.month}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 4. Recent Online Exams Table Card */}
      <div className="admin-card admin-table-card">
        <div className="admin-table-header">
          <div className="admin-table-header__left">
            <h2 className="admin-card__title">Các kỳ thi trực tuyến gần đây</h2>
            <span className="admin-badge-count">{exams.length} kỳ thi</span>
          </div>

          <div className="admin-page-header__actions">
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={() => showToast('Đang xuất dữ liệu bảng ra file Excel...')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Xuất dữ liệu</span>
            </button>

            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={() => showToast('Mở danh sách quản lý tất cả kỳ thi...')}
            >
              <span>Xem tất cả</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tên kỳ thi & Đơn vị</th>
                <th>Số câu</th>
                <th>Trạng thái</th>
                <th>Số lượng thí sinh</th>
                <th>Thời gian thi</th>
                <th style={{ textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => {
                const percent = Math.round((exam.enrolled / exam.total) * 100);

                return (
                  <tr key={exam.id}>
                    {/* Tên kỳ thi */}
                    <td>
                      <div className="exam-name-cell">
                        <span className="exam-name-cell__title">{exam.name}</span>
                        <div className="exam-name-cell__meta">
                          <span className="exam-code-tag">{exam.id}</span>
                          <span>•</span>
                          <span>{exam.department}</span>
                        </div>
                      </div>
                    </td>

                    {/* Số câu */}
                    <td>
                      <strong>{exam.questions}</strong> câu
                    </td>

                    {/* Trạng thái */}
                    <td>
                      <span className={`exam-status-pill ${exam.status}`}>
                        {exam.status === 'active' && <span className="status-dot-pulse" />}
                        {exam.statusLabel}
                      </span>
                    </td>

                    {/* Số lượng thí sinh */}
                    <td>
                      <div className="candidate-cell">
                        <div className="candidate-cell__numbers">
                          <span>{exam.enrolled.toLocaleString('vi-VN')} / {exam.total.toLocaleString('vi-VN')}</span>
                          <span>{percent}%</span>
                        </div>
                        <div className="candidate-cell__bar">
                          <div
                            className="candidate-cell__fill"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Thời gian thi */}
                    <td>
                      <div className="time-cell">
                        <span className="time-cell__date">{exam.date}</span>
                        <span className="time-cell__window">{exam.time}</span>
                      </div>
                    </td>

                    {/* Thao tác */}
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="table-action-btn"
                          title="Xem chi tiết kỳ thi"
                          onClick={() => showToast(`Chi tiết kỳ thi: ${exam.name}`)}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          className="table-action-btn"
                          title="Chỉnh sửa thông số"
                          onClick={() => showToast(`Chỉnh sửa kỳ thi: ${exam.name}`)}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          className="table-action-btn delete"
                          title="Xóa kỳ thi"
                          onClick={() => handleDeleteExam(exam.id)}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

