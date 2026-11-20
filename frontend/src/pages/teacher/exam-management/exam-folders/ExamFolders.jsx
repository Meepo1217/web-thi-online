import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconArrowRight,
  IconTrash,
  IconPlus,
} from '../../../../components/ui/icons';
import QuestionBankKpiCards from '../../question-bank/subject-folders/QuestionBankKpiCards';
import QuestionBankFilterBar from '../../question-bank/subject-folders/QuestionBankFilterBar';
import SubjectFolderCard from '../../question-bank/subject-folders/SubjectFolderCard';
import RecentFoldersWidget from '../../question-bank/subject-folders/RecentFoldersWidget';
import ContributionChartWidget from '../../question-bank/subject-folders/ContributionChartWidget';
import CreateFolderModal from '../../question-bank/subject-folders/CreateFolderModal';
import DeleteFolderModal from '../../question-bank/subject-folders/DeleteFolderModal';
import {
  EXAM_METRICS,
  EXAM_FOLDERS_DATA,
  RECENT_EXAMS_FOLDERS,
  EXAM_CONTRIBUTION_ANALYTICS,
} from './examFoldersData';
import '../../question-bank/subject-folders/question-bank.css';

/**
 * ExamFolders - Màn hình Thư mục môn học của Quản lý đề thi (Level 1)
 * Kế thừa toàn bộ giao diện và kiến trúc của Ngân hàng câu hỏi
 * Route: /teacher/exams
 */
export default function ExamFolders() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState(EXAM_FOLDERS_DATA);
  const [metrics, setMetrics] = useState(EXAM_METRICS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    folder: null,
  });

  // Chuyển sang Level 2: Danh sách chương của môn học
  const handleOpenFolder = (folderId) => {
    navigate(`/teacher/exams/${folderId}`);
  };

  // Mở modal xóa thư mục
  const handleOpenDeleteModal = (targetFolder) => {
    setDeleteModalState({
      isOpen: true,
      folder: targetFolder || folders[0] || null,
    });
  };

  // Xác nhận xóa thư mục
  const handleConfirmDelete = (folderToDelete) => {
    if (!folderToDelete?.id) return;
    setFolders((prev) => prev.filter((f) => f.id !== folderToDelete.id));
    setMetrics((prev) => ({
      ...prev,
      totalFolders: {
        ...prev.totalFolders,
        value: String(Math.max(0, folders.length - 1)),
      },
    }));
    setDeleteModalState({ isOpen: false, folder: null });
  };

  // Tạo thư mục mới
  const handleSubmitCreateFolder = (newFolder) => {
    const formatted = {
      ...newFolder,
      totalQuestions: '0',
      totalExams: '0',
    };
    setFolders((prev) => [formatted, ...prev]);
    setMetrics((prev) => ({
      ...prev,
      totalFolders: {
        ...prev.totalFolders,
        value: String(folders.length + 1),
      },
    }));
    setIsCreateModalOpen(false);
  };

  // Lọc thư mục theo từ khóa
  const filteredFolders = useMemo(() => {
    return folders.filter((folder) => {
      if (!searchTerm) return true;
      const lower = searchTerm.toLowerCase();
      return (
        folder.title.toLowerCase().includes(lower) ||
        folder.code.toLowerCase().includes(lower) ||
        folder.description.toLowerCase().includes(lower)
      );
    });
  }, [folders, searchTerm]);

  return (
    <div className="qb-folders-page">
      {/* 1. Header & Breadcrumbs Quản lý đề thi */}
      <div className="qb-top-header">
        <nav aria-label="Breadcrumb" className="qb-breadcrumbs">
          <span className="qb-breadcrumb-item">Quản lý đề thi</span>
          <span className="qb-breadcrumb-separator" aria-hidden="true">
            <IconArrowRight width={4.93} height={8} color="#76777D" />
          </span>
          <span className="qb-breadcrumb-item active">Thư mục chuyên môn</span>
        </nav>

        <div className="qb-heading-action-row">
          <div className="qb-title-desc-block">
            <h1 className="qb-page-title">Quản lý đề thi</h1>
            <p className="qb-page-description">
              Hệ thống ma trận và kho đề thi chuẩn hóa phân theo môn học và cấu trúc ma trận kiểm tra
            </p>
          </div>

          <div className="qb-toolbar-controls">
            <button
              type="button"
              className="qb-btn qb-btn-danger-outline"
              onClick={() => handleOpenDeleteModal(folders[0])}
              title="Xóa thư mục môn học"
            >
              <IconTrash width={13} height={14} color="#BA1A1A" />
              <span>Xóa thư mục</span>
            </button>

            <button
              type="button"
              className="qb-btn qb-btn-primary"
              onClick={() => setIsCreateModalOpen(true)}
              title="Tạo thư mục môn học mới"
            >
              <IconPlus width={15} height={12} color="#FFFFFF" />
              <span>Tạo thư mục mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics / Pulse */}
      <QuestionBankKpiCards metrics={metrics} />

      {/* 3. Filter & Search Bar */}
      <QuestionBankFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOrder={sortOrder}
        onSortChange={() => setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* 4. Folders Grid */}
      <div className="qb-folders-grid">
        {filteredFolders.map((folder) => (
          <SubjectFolderCard
            key={folder.id}
            folder={{
              ...folder,
              totalQuestions: folder.totalExams || folder.totalQuestions,
            }}
            metricsLabel="Tổng số đề thi"
            unitLabel="đề thi"
            openLinkLabel="Xem đề thi"
            onOpenFolder={handleOpenFolder}
            onDeleteFolder={handleOpenDeleteModal}
          />
        ))}
      </div>

      {/* 5. Bottom Widgets */}
      <div className="qb-bottom-split-row">
        <RecentFoldersWidget
          recentFolders={RECENT_EXAMS_FOLDERS}
          onOpenFolder={handleOpenFolder}
          onViewAllHistory={() => alert('Xem toàn bộ lịch sử biên soạn đề')}
        />

        <ContributionChartWidget
          analytics={EXAM_CONTRIBUTION_ANALYTICS}
          onOpenKpiDetail={() => alert('Xem chi tiết chỉ số khởi tạo đề thi')}
        />
      </div>

      {/* 6. Modals */}
      <CreateFolderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleSubmitCreateFolder}
      />

      <DeleteFolderModal
        isOpen={deleteModalState.isOpen}
        folder={deleteModalState.folder}
        foldersList={folders}
        onFolderChange={(selectedFolder) =>
          setDeleteModalState((prev) => ({ ...prev, folder: selectedFolder }))
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalState({ isOpen: false, folder: null })}
      />
    </div>
  );
}
