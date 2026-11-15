import { useState } from 'react';
import {
  IconSearch,
  IconEye,
  IconEdit,
  IconCopy,
  IconArrowRight,
  IconExams,
} from '../ui/icons';

// Dữ liệu mẫu danh sách đề thi
export const RECENT_EXAMS_DATA = [
  {
    id: 'exam-1',
    title: 'Cơ sở dữ liệu nâng cao - HK2',
    codeInfo: 'Mã: CSDL-02 • 4 mã đề hoán vị',
    questionsCount: 50,
    duration: '60p',
    status: 'Đang thi',
    statusVariant: 'active', // nền #DCE9FF, chữ #0051D5
    category: 'ongoing',
  },
  {
    id: 'exam-2',
    title: 'Cấu trúc dữ liệu & Giải thuật',
    codeInfo: 'Mã: CTDL-01 • 2 mã đề',
    questionsCount: 40,
    duration: '45p',
    status: 'Sắp diễn ra',
    statusVariant: 'upcoming', // nền #DCE9FF, chữ #0051D5
    category: 'upcoming',
  },
  {
    id: 'exam-3',
    title: 'Lập trình mạng căn bản',
    codeInfo: 'Mã: LTM-04 • Tự luận + Trắc nghiệm',
    questionsCount: 30,
    duration: '45p',
    status: 'Đã chấm',
    statusVariant: 'completed', // nền #E5EEFF, chữ #45464D
    category: 'completed',
  },
  {
    id: 'exam-4',
    title: 'Kiến trúc máy tính & Vi xử lý',
    codeInfo: 'Mã: KTMT-01 • Ngân hàng đề mở',
    questionsCount: 60,
    duration: '90p',
    status: 'Bản nháp',
    statusVariant: 'draft', // nền #DCE9FF, chữ #45464D
    category: 'draft',
  },
];

const FILTER_PILLS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'ongoing', label: 'Đang thi' },
  { id: 'upcoming', label: 'Sắp diễn ra' },
  { id: 'completed', label: 'Đã kết thúc' },
];

/**
 * RecentExamsTable - Bảng danh sách đề thi gần đây kèm tìm kiếm, bộ lọc và phân trang
 */
export default function RecentExamsTable({ initialData = RECENT_EXAMS_DATA }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Lọc dữ liệu theo từ khóa tìm kiếm và pill trạng thái
  const filteredExams = initialData.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.codeInfo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' || exam.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="recent-exams-card">
      {/* Tiêu đề & Ô tìm kiếm */}
      <div className="recent-exams-card__header">
        <div className="recent-exams-card__title-group">
          <h2 className="recent-exams-card__heading">Đề thi gần đây</h2>
          <p className="recent-exams-card__subheading">
            Quản lý và thống kê ngân hàng đề thi được cập nhật
          </p>
        </div>

        {/* Ô tìm kiếm theo Figma: rộng 224px, cao 32px, nền #F8F9FF */}
        <div className="recent-exams-card__search-wrap">
          <span className="recent-exams-card__search-icon">
            <IconSearch width={13.5} height={13.5} color="#45464D" />
          </span>
          <input
            type="text"
            className="recent-exams-card__search-input"
            placeholder="Tìm tên đề thi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Bộ lọc Filter Pills (Tất cả, Đang thi, Sắp diễn ra, Đã kết thúc) */}
      <div className="recent-exams-card__filters">
        {FILTER_PILLS.map((pill) => (
          <button
            key={pill.id}
            type="button"
            className={`filter-pill ${selectedFilter === pill.id ? 'active' : ''}`}
            onClick={() => setSelectedFilter(pill.id)}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Bảng dữ liệu đề thi */}
      <div className="recent-exams-card__table-container">
        <table className="recent-exams-table">
          <thead>
            <tr>
              <th className="th-exam-name">TÊN ĐỀ THI & HỌC PHẦN</th>
              <th className="th-questions">CÂU</th>
              <th className="th-duration">THỜI GIAN</th>
              <th className="th-status">TRẠNG THÁI</th>
              <th className="th-actions">THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.length > 0 ? (
              filteredExams.map((exam) => (
                <tr key={exam.id}>
                  {/* Cột Tên đề thi & Học phần */}
                  <td className="td-exam-name">
                    <div className="exam-name-cell">
                      <div className="exam-name-cell__icon-box">
                        <IconExams width={15} height={13} color="#0051D5" />
                      </div>
                      <div className="exam-name-cell__info">
                        <span className="exam-name-cell__title">{exam.title}</span>
                        <span className="exam-name-cell__code">{exam.codeInfo}</span>
                      </div>
                    </div>
                  </td>

                  {/* Cột Số câu */}
                  <td className="td-questions">{exam.questionsCount}</td>

                  {/* Cột Thời gian */}
                  <td className="td-duration">{exam.duration}</td>

                  {/* Cột Trạng thái */}
                  <td className="td-status">
                    <span className={`exam-status-badge exam-status-badge--${exam.statusVariant}`}>
                      {exam.status}
                    </span>
                  </td>

                  {/* Cột Thao tác */}
                  <td className="td-actions">
                    <div className="table-actions-group">
                      <button type="button" className="table-action-btn" title="Xem chi tiết">
                        <IconEye width={15} height={12} color="#45464D" />
                      </button>
                      <button type="button" className="table-action-btn" title="Chỉnh sửa">
                        <IconEdit width={12} height={12} color="#45464D" />
                      </button>
                      <button type="button" className="table-action-btn" title="Nhân bản">
                        <IconCopy width={13} height={13} color="#45464D" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="td-empty">
                  Không tìm thấy đề thi phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang / Chân bảng */}
      <div className="recent-exams-card__footer">
        <span className="recent-exams-card__pagination-info">
          Hiển thị 1 - {filteredExams.length} trong {initialData.length} đề thi
        </span>
        <button type="button" className="recent-exams-card__all-link">
          <span>Xem tất cả ngân hàng đề</span>
          <IconArrowRight width={10} height={10} color="#0051D5" />
        </button>
      </div>
    </div>
  );
}
