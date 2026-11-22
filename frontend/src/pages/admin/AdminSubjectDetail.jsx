import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminSubjectEditModal from '../../components/admin/AdminSubjectEditModal';
import './admin-subject-detail.css';

// Dữ liệu môn học mẫu chuẩn xác từ Figma Spec
const DEFAULT_SUBJECT = {
  id: 'IT4043',
  code: 'IT4043',
  name: 'Học máy',
  description:
    'Nền tảng học thuật về các thuật toán Machine Learning cổ điển, hồi quy, phân lớp, học sâu và ứng dụng thực nghiệm với Python & Scikit-learn.',
  faculty: 'Công nghệ thông tin',
  credits: 3,
  chapters: [
    {
      id: 'CH-01',
      title: 'Chương 1: Tổng quan về Học máy',
      questions: 15,
    },
    {
      id: 'CH-02',
      title: 'Chương 2: Hồi quy tuyến tính & Logistic Regression',
      questions: 20,
    },
    {
      id: 'CH-03',
      title: 'Chương 3: Cây quyết định & Rừng ngẫu nhiên',
      questions: 18,
    },
  ],
};

const MOCK_SUBJECTS_MAP = {
  'IT4043': DEFAULT_SUBJECT,
  'SUB-001': {
    id: 'SUB-001',
    code: 'MATH-101',
    name: 'Toán cao cấp 1 (Giải tích 1)',
    description:
      'Trang bị kiến thức cơ bản về phép tính vi tích phân hàm một biến, chuỗi số, phương trình vi phân và các ứng dụng kỹ thuật.',
    faculty: 'Khoa Toán - Tin',
    credits: 3,
    chapters: [
      { id: 'CH-M1', title: 'Chương 1: Hàm số và Giới hạn', questions: 25 },
      { id: 'CH-M2', title: 'Chương 2: Phép tính vi phân hàm một biến', questions: 30 },
      { id: 'CH-M3', title: 'Chương 3: Tích phân bất định và xác định', questions: 35 },
    ],
  },
  'SUB-002': {
    id: 'SUB-002',
    code: 'IT-201',
    name: 'Lập trình C / C++',
    description:
      'Cung cấp nền tảng tư duy lập trình cấu trúc, kiểu dữ liệu, con trỏ, mảng, cấu trúc struct và nhập môn lập trình hướng đối tượng với C++.',
    faculty: 'Công nghệ thông tin',
    credits: 4,
    chapters: [
      { id: 'CH-C1', title: 'Chương 1: Cú pháp cơ bản và Kiểu dữ liệu', questions: 20 },
      { id: 'CH-C2', title: 'Chương 2: Con trỏ và Quản lý bộ nhớ động', questions: 28 },
      { id: 'CH-C3', title: 'Chương 3: Lập trình Hướng đối tượng OOP', questions: 32 },
    ],
  },
};

export default function AdminSubjectDetail() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  // Khởi tạo thông tin môn học
  const [subject, setSubject] = useState(() => {
    if (subjectId && MOCK_SUBJECTS_MAP[subjectId]) {
      return MOCK_SUBJECTS_MAP[subjectId];
    }
    return DEFAULT_SUBJECT;
  });

  const [toastMessage, setToastMessage] = useState(null);

  // State Modal Môn học
  const [isEditSubjectModalOpen, setIsEditSubjectModalOpen] = useState(false);
  const [subjectFormData, setSubjectFormData] = useState({
    name: subject.name,
    code: subject.code,
    description: subject.description,
  });

  // State Modal Chương
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [chapterFormData, setChapterFormData] = useState({
    title: '',
    questions: 15,
  });

  // State Modal Xóa
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'subject' | 'chapter', data }

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Mở modal sửa môn học
  const handleOpenEditSubject = () => {
    setSubjectFormData({
      name: subject.name,
      code: subject.code,
      description: subject.description,
    });
    setIsEditSubjectModalOpen(true);
  };

  // Lưu môn học
  const handleSaveSubject = (e) => {
    e.preventDefault();
    if (!subjectFormData.name.trim() || !subjectFormData.code.trim()) {
      showToast('Tên và mã môn học không được để trống!');
      return;
    }
    setSubject((prev) => ({
      ...prev,
      name: subjectFormData.name,
      code: subjectFormData.code,
      description: subjectFormData.description,
    }));
    setIsEditSubjectModalOpen(false);
    showToast(`Đã cập nhật thông tin môn học ${subjectFormData.code}!`);
  };

  // Mở modal thêm chương
  const handleOpenAddChapter = () => {
    setEditingChapter(null);
    setChapterFormData({
      title: `Chương ${subject.chapters.length + 1}: `,
      questions: 15,
    });
    setIsChapterModalOpen(true);
  };

  // Mở modal sửa chương
  const handleOpenEditChapter = (ch) => {
    setEditingChapter(ch);
    setChapterFormData({
      title: ch.title,
      questions: ch.questions,
    });
    setIsChapterModalOpen(true);
  };

  // Lưu chương
  const handleSaveChapter = (e) => {
    e.preventDefault();
    if (!chapterFormData.title.trim()) {
      showToast('Vui lòng nhập tên chương!');
      return;
    }

    if (editingChapter) {
      setSubject((prev) => ({
        ...prev,
        chapters: prev.chapters.map((item) =>
          item.id === editingChapter.id
            ? { ...item, title: chapterFormData.title, questions: Number(chapterFormData.questions) }
            : item
        ),
      }));
      showToast(`Đã cập nhật "${chapterFormData.title}"!`);
    } else {
      const newCh = {
        id: `CH-${Date.now()}`,
        title: chapterFormData.title,
        questions: Number(chapterFormData.questions) || 0,
      };
      setSubject((prev) => ({
        ...prev,
        chapters: [...prev.chapters, newCh],
      }));
      showToast(`Đã thêm mới "${chapterFormData.title}"!`);
    }

    setIsChapterModalOpen(false);
  };

  // Xác nhận xóa
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'chapter') {
      setSubject((prev) => ({
        ...prev,
        chapters: prev.chapters.filter((ch) => ch.id !== deleteTarget.data.id),
      }));
      showToast(`Đã xóa "${deleteTarget.data.title}" thành công.`);
      setDeleteTarget(null);
    } else if (deleteTarget.type === 'subject') {
      setDeleteTarget(null);
      showToast(`Đã xóa môn học ${subject.name} khỏi hệ thống.`);
      setTimeout(() => {
        navigate('/admin/subjects');
      }, 1200);
    }
  };

  return (
    <div className="admin-subject-detail-container">
      {/* Toast thông báo */}
      {toastMessage && (
        <div className="subject-detail-toast">
          {toastMessage}
        </div>
      )}

      {/* 1. Breadcrumb điều hướng */}
      <div className="subject-detail-breadcrumb">
        <Link to="/admin/subjects" className="subject-detail-back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Quay lại Quản lý môn học</span>
        </Link>
        <span>/</span>
        <span>{subject.name}</span>
      </div>

      {/* 2. Course Hero Card / Banner Block (944x181px) */}
      <div className="subject-hero-card">
        <div className="subject-hero-card__top">
          <div className="subject-hero-card__left">
            <div className="subject-hero-card__title-row">
              <h1 className="subject-hero-card__title">{subject.name}</h1>
              <span className="subject-hero-card__badge">{subject.code}</span>
            </div>
            <p className="subject-hero-card__desc">{subject.description}</p>
          </div>

          {/* Action Buttons: Sửa & Xóa môn học */}
          <div className="subject-hero-card__actions">
            {/* Nút Sửa môn học */}
            <button
              type="button"
              className="btn-subject-action edit-action"
              title="Chỉnh sửa môn học"
              onClick={handleOpenEditSubject}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>

            {/* Nút Xóa môn học */}
            <button
              type="button"
              className="btn-subject-action delete-action"
              title="Xóa môn học"
              onClick={() => setDeleteTarget({ type: 'subject', data: subject })}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Course Stream Layout / Chapters Stream (944px width) */}
      <div className="subject-chapters-stream">
        {/* Section Toolbar Header */}
        <div className="subject-chapters-toolbar">
          <div className="subject-chapters-toolbar__left">
            <span className="subject-chapters-toolbar__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </span>
            <span className="subject-chapters-toolbar__title">DANH SÁCH CÁC CHƯƠNG</span>
          </div>
          <span className="subject-chapters-toolbar__count">
            Tổng số: {subject.chapters.length} chương
          </span>
        </div>

        {/* Danh sách các thẻ chương */}
        {subject.chapters.map((ch) => (
          <div key={ch.id} className="subject-chapter-card">
            <div className="subject-chapter-card__left">
              {/* Folder/Book Icon */}
              <div className="subject-chapter-card__icon-box">
                <svg width="20" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>

              {/* Tên chương & Số câu hỏi */}
              <div className="subject-chapter-card__info">
                <h3
                  className="subject-chapter-card__title"
                  title="Nhấn để xem ngân hàng câu hỏi của chương"
                  onClick={() => showToast(`Mở danh sách câu hỏi: ${ch.title}`)}
                >
                  {ch.title}
                </h3>
                <div className="subject-chapter-card__meta">
                  <span className="subject-chapter-card__question-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </span>
                  <span className="subject-chapter-card__question-count">
                    {ch.questions} câu hỏi
                  </span>
                </div>
              </div>
            </div>

            {/* Cụm nút sửa & xóa chương */}
            <div className="subject-chapter-card__actions">
              <button
                type="button"
                className="btn-subject-action edit-action"
                title="Chỉnh sửa chương"
                onClick={() => handleOpenEditChapter(ch)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </button>
              <button
                type="button"
                className="btn-subject-action delete-action"
                title="Xóa chương"
                onClick={() => setDeleteTarget({ type: 'chapter', data: ch })}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Nút Thêm chương mới nét đứt (56px) */}
        <button
          type="button"
          className="btn-add-chapter-dashed"
          onClick={handleOpenAddChapter}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Thêm chương mới</span>
        </button>
      </div>

      {/* Modal Sửa Môn Học chuẩn Figma Auto Layout */}
      <AdminSubjectEditModal
        isOpen={isEditSubjectModalOpen}
        onClose={() => setIsEditSubjectModalOpen(false)}
        subject={subject}
        onSave={(updatedData) => {
          setSubject((prev) => ({
            ...prev,
            name: updatedData.name,
            code: updatedData.code,
            description: updatedData.description,
            teacher: updatedData.teacher || prev.teacher,
          }));
          showToast(`Đã lưu thay đổi cho môn học ${updatedData.code}!`);
        }}
      />

      {/* Modal Thêm / Sửa Chương */}
      {isChapterModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '480px',
              width: '90%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ margin: '0 0 16px', fontSize: '18px', color: '#0F172A', fontWeight: 700 }}>
              {editingChapter ? 'Chỉnh sửa chương' : 'Thêm chương mới'}
            </h3>
            <form onSubmit={handleSaveChapter} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Tên chương
                </label>
                <input
                  type="text"
                  value={chapterFormData.title}
                  onChange={(e) => setChapterFormData({ ...chapterFormData, title: e.target.value })}
                  placeholder="Ví dụ: Chương 1: Giới thiệu tổng quan..."
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    padding: '0 12px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Số lượng câu hỏi dự kiến
                </label>
                <input
                  type="number"
                  min="0"
                  value={chapterFormData.questions}
                  onChange={(e) => setChapterFormData({ ...chapterFormData, questions: e.target.value })}
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    padding: '0 12px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsChapterModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
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
                    borderRadius: '8px',
                    border: 'none',
                    background: '#0051D5',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '13px',
                  }}
                >
                  {editingChapter ? 'Lưu thay đổi' : 'Thêm chương'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xác nhận Xóa */}
      {deleteTarget && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '420px',
              width: '90%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ margin: '0 0 12px', fontSize: '18px', color: '#BA1A1A', fontWeight: 700 }}>
              {deleteTarget.type === 'subject' ? 'Xác nhận xóa môn học?' : 'Xác nhận xóa chương?'}
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>
              {deleteTarget.type === 'subject'
                ? `Bạn có chắc chắn muốn xóa môn học "${deleteTarget.data.name}" (${deleteTarget.data.code})? Hành động này sẽ xóa toàn bộ các chương và câu hỏi liên quan.`
                : `Bạn có chắc chắn muốn xóa "${deleteTarget.data.title}"? Các câu hỏi thuộc chương này sẽ không còn liên kết.`}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
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
                type="button"
                onClick={handleConfirmDelete}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#BA1A1A',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '13px',
                }}
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

