import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SubjectBreadcrumb from '../../question-bank/subject-chapters/SubjectBreadcrumb';
import SubjectHeaderCard from '../../question-bank/subject-chapters/SubjectHeaderCard';
import ChapterCard from '../../question-bank/subject-chapters/ChapterCard';
import AddChapterDottedButton from '../../question-bank/subject-chapters/AddChapterDottedButton';
import SingleInputModal from '../../../../components/ui/SingleInputModal';
import { IconFolder } from '../../../../components/ui/icons';
import { EXAM_SUBJECT_CHAPTERS_DATA } from './examChaptersData';
import '../../question-bank/subject-chapters/subject-chapters.css';

/**
 * ExamChapters - Màn hình Quản lý Chương / Chuyên đề đề thi của Môn học (Level 2)
 * Kế thừa 100% giao diện & component từ SubjectChapters (Ngân hàng câu hỏi)
 * Route: /teacher/exams/:subjectId
 */
export default function ExamChapters() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  // Dữ liệu môn học & danh sách chương
  const [subjectData, setSubjectData] = useState({
    ...EXAM_SUBJECT_CHAPTERS_DATA,
    subjectId: subjectId || EXAM_SUBJECT_CHAPTERS_DATA.subjectId,
  });

  const [chapters, setChapters] = useState(EXAM_SUBJECT_CHAPTERS_DATA.chapters);

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

  // Mở danh sách đề thi trong một chương (Level 3)
  const handleOpenChapter = (chapter) => {
    navigate(`/teacher/exams/${subjectData.subjectId}/list`, {
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
      title: 'Thêm chương mới',
      subtitle: `Thêm chương phân loại đề thi vào môn ${subjectData.title}`,
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
      subtitle: 'Cập nhật lại tiêu đề chương trong kho đề thi',
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
        `Bạn có chắc chắn muốn xóa "${chapter.title}" cùng toàn bộ đề thi liên quan?`
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
      const title =
        inputValue.startsWith('Chương') || inputValue.startsWith('Chuyên đề')
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
      {/* 1. Wireframe Breadcrumbs (Kế thừa trực tiếp SubjectBreadcrumb) */}
      <SubjectBreadcrumb
        subjectTitle={subjectData.title}
        statusTag={subjectData.statusTag}
        rootLabel="Quản lý đề thi"
        rootPath="/teacher/exams"
      />

      {/* 2. Wireframe Subject Header Card (Kế thừa trực tiếp SubjectHeaderCard) */}
      <SubjectHeaderCard
        subject={subjectData}
        onEditSubject={handleEditSubject}
        onSubjectSettings={handleSubjectSettings}
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
              unitLabel="đề thi"
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
    </div>
  );
}
