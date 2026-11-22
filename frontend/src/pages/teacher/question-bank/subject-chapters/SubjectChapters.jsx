import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SubjectBreadcrumb from './SubjectBreadcrumb';
import SubjectHeaderCard from './SubjectHeaderCard';
import ChapterCard from './ChapterCard';
import AddChapterDottedButton from './AddChapterDottedButton';
import SingleInputModal from '../../../../components/ui/SingleInputModal';
import AutoShuffleModal from './AutoShuffleModal';
import { SUBJECT_CHAPTERS_DATA } from './subjectChaptersData';
import { IconFolder } from '../../../../components/ui/icons';
import './subject-chapters.css';

/**
 * SubjectChapters - Màn hình Quản lý Chương / Chuyên đề của Môn học
 * Nằm giữa 'Thư mục các môn học' (subject-folders) và 'Danh sách câu hỏi' (question-list).
 * - Breadcrumbs & Tag trạng thái
 * - Card thông tin môn học & nút Trộn đề thi, nút sửa/cài đặt
 * - Danh sách các thẻ chương & nút sửa/xóa từng chương
 * - Nút thêm chương mới dạng viền nét đứt
 * - Tích hợp Modal Trộn đề thi tự động theo ma trận câu hỏi (Section 3 Figma)
 */
export default function SubjectChapters() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  // Dữ liệu môn học & danh sách chương
  const [subjectData, setSubjectData] = useState({
    ...SUBJECT_CHAPTERS_DATA,
    subjectId: subjectId || SUBJECT_CHAPTERS_DATA.subjectId,
  });

  const [chapters, setChapters] = useState(SUBJECT_CHAPTERS_DATA.chapters);

  // State mở modal Trộn đề thi tự động
  const [isShuffleModalOpen, setIsShuffleModalOpen] = useState(false);

  // Cấu hình Popup chung cho các tác vụ thêm / sửa 1 trường dữ liệu
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
    label: '',
    placeholder: '',
    defaultValue: '',
    confirmText: 'Xác nhận',
    iconType: 'folder',
    actionType: null, // 'ADD_CHAPTER' | 'EDIT_CHAPTER' | 'EDIT_SUBJECT'
    targetData: null,
  });

  // Mở danh sách câu hỏi trong một chương
  const handleOpenChapter = (chapter) => {
    navigate(`/teacher/questions/${subjectData.subjectId}/list`, {
      state: {
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        subjectTitle: subjectData.title,
      },
    });
  };

  // 1. Thêm chương mới -> Mở Popup chung
  const handleAddChapter = () => {
    setModalConfig({
      isOpen: true,
      title: 'Thêm chương học mới',
      subtitle: `Thêm chương học phân loại vào môn ${subjectData.title}`,
      label: 'TÊN CHƯƠNG HỌC MỚI',
      placeholder: 'Ví dụ: Số phức và ứng dụng hình học Oxyz',
      defaultValue: '',
      confirmText: 'Thêm chương',
      cancelText: 'Hủy bỏ',
      iconType: 'plus',
      actionType: 'ADD_CHAPTER',
      targetData: null,
    });
  };

  // 2. Chỉnh sửa tên chương -> Mở Popup chung
  const handleEditChapter = (chapter) => {
    setModalConfig({
      isOpen: true,
      title: 'Chỉnh sửa tên chương',
      subtitle: 'Cập nhật lại tiêu đề chương học trong ngân hàng câu hỏi',
      label: 'TÊN CHƯƠNG HỌC',
      placeholder: 'Nhập tên chương học...',
      defaultValue: chapter.title,
      confirmText: 'Lưu thay đổi',
      cancelText: 'Hủy bỏ',
      iconType: 'edit',
      actionType: 'EDIT_CHAPTER',
      targetData: chapter,
    });
  };

  // 3. Đổi tên môn học -> Mở Popup chung
  const handleEditSubject = () => {
    setModalConfig({
      isOpen: true,
      title: 'Đổi tên môn học',
      subtitle: `Cập nhật thông tin tiêu đề cho mã môn ${subjectData.code}`,
      label: 'TÊN MÔN HỌC',
      placeholder: 'Ví dụ: Toán học 12 Nâng cao',
      defaultValue: subjectData.title,
      confirmText: 'Lưu thay đổi',
      cancelText: 'Hủy bỏ',
      iconType: 'edit',
      actionType: 'EDIT_SUBJECT',
      targetData: null,
    });
  };

  // Xóa chương (Xác nhận nhanh)
  const handleDeleteChapter = (chapter) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa "${chapter.title}" cùng toàn bộ câu hỏi liên quan?`
      )
    ) {
      setChapters((prev) => prev.filter((c) => c.id !== chapter.id));
    }
  };

  const handleSubjectSettings = () => {
    alert(`Cài đặt ma trận đề và phân quyền giáo viên môn: ${subjectData.title}`);
  };

  // Xử lý khi xác nhận trên Popup chung
  const handleModalConfirm = (inputValue) => {
    if (modalConfig.actionType === 'ADD_CHAPTER') {
      const nextIndex = chapters.length + 1;
      const romanNums = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
      const roman = romanNums[nextIndex - 1] || `${nextIndex}`;
      const title = inputValue.startsWith('Chương')
        ? inputValue
        : `Chương ${roman}: ${inputValue}`;

      const newChapter = {
        id: `chap-${Date.now()}`,
        order: nextIndex,
        title,
        questionCount: 0,
        status: 'active',
      };
      setChapters((prev) => [...prev, newChapter]);
    } else if (modalConfig.actionType === 'EDIT_CHAPTER') {
      setChapters((prev) =>
        prev.map((c) =>
          c.id === modalConfig.targetData.id ? { ...c, title: inputValue } : c
        )
      );
    } else if (modalConfig.actionType === 'EDIT_SUBJECT') {
      setSubjectData((prev) => ({ ...prev, title: inputValue }));
    }

    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleModalClose = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="sc-page-container">
      {/* 1. Wireframe Breadcrumbs */}
      <SubjectBreadcrumb
        subjectTitle={subjectData.title}
        statusTag={subjectData.statusTag}
      />

      {/* 2. Wireframe Subject Header Card */}
      <SubjectHeaderCard
        subject={subjectData}
        onEditSubject={handleEditSubject}
        onSubjectSettings={handleSubjectSettings}
        onOpenShuffleModal={() => setIsShuffleModalOpen(true)}
      />

      {/* 3. Wireframe Chapter List Section */}
      <section className="sc-chapters-section">
        {/* Section Header */}
        <div className="sc-section-header">
          <div className="sc-section-title-wrap">
            <IconFolder width={14.67} height={10.67} color="#6C757D" />
            <span className="sc-section-heading">DANH SÁCH CHƯƠNG</span>
          </div>
          <span className="sc-section-count">{chapters.length} chương</span>
        </div>

        {/* List of Chapter Cards */}
        <div className="sc-chapter-cards-list">
          {chapters.map((chap) => (
            <ChapterCard
              key={chap.id}
              chapter={chap}
              onOpenChapter={handleOpenChapter}
              onEditChapter={handleEditChapter}
              onDeleteChapter={handleDeleteChapter}
            />
          ))}
        </div>

        {/* 4. Wireframe Dotted Bottom Button */}
        <AddChapterDottedButton onAddChapter={handleAddChapter} />
      </section>

      {/* 5. Popup chung cho các tác vụ thêm / sửa 1 trường dữ liệu */}
      <SingleInputModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        subtitle={modalConfig.subtitle}
        label={modalConfig.label}
        placeholder={modalConfig.placeholder}
        defaultValue={modalConfig.defaultValue}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        iconType={modalConfig.iconType}
        onConfirm={handleModalConfirm}
        onClose={handleModalClose}
      />

      {/* 6. Modal Trộn đề thi tự động từ Ngân hàng câu hỏi */}
      <AutoShuffleModal
        isOpen={isShuffleModalOpen}
        onClose={() => setIsShuffleModalOpen(false)}
        chapters={chapters}
        subject={subjectData}
      />
    </div>
  );
}
