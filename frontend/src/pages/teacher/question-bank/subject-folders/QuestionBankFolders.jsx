import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionBankHeader from './QuestionBankHeader';
import QuestionBankKpiCards from './QuestionBankKpiCards';
import QuestionBankFilterBar from './QuestionBankFilterBar';
import SubjectFolderCard from './SubjectFolderCard';
import RecentFoldersWidget from './RecentFoldersWidget';
import ContributionChartWidget from './ContributionChartWidget';
import CreateFolderModal from './CreateFolderModal';
import DeleteFolderModal from './DeleteFolderModal';
import {
  QUESTION_METRICS,
  SUBJECT_FOLDERS_DATA,
  RECENT_ACCESSED_FOLDERS,
  CONTRIBUTION_ANALYTICS,
} from './questionBankData';
import './question-bank.css';

/**
 * QuestionBankFolders - Màn hình Thư mục môn học (Ngân hàng câu hỏi)
 * Route: /teacher/questions
 */
export default function QuestionBankFolders() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState(SUBJECT_FOLDERS_DATA);
  const [metrics, setMetrics] = useState(QUESTION_METRICS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    folder: null,
  });

  // Xử lý mở thư mục môn học (chuyển sang Màn hình Danh sách câu hỏi)
  const handleOpenFolder = (folderId) => {
    navigate(`/teacher/questions/${folderId}`);
  };

  // Mở popup xác nhận xóa thư mục
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

  // Mở popup tạo thư mục mới
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // Xác nhận tạo thư mục mới
  const handleSubmitCreateFolder = (newFolder) => {
    setFolders((prev) => [newFolder, ...prev]);
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
      {/* 1. Top Navigation & Breadcrumbs */}
      <QuestionBankHeader
        onDeleteFolder={() => handleOpenDeleteModal(folders[0])}
        onCreateFolder={handleOpenCreateModal}
      />

      {/* 2. Key Metrics / Academic Pulse */}
      <QuestionBankKpiCards metrics={metrics} />

      {/* 3. Filter & Fast Search Bar */}
      <QuestionBankFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOrder={sortOrder}
        onSortChange={() => setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* 4. Folder Grid (Subject Folder Cards) */}
      <div className="qb-folders-grid">
        {filteredFolders.map((folder) => (
          <SubjectFolderCard
            key={folder.id}
            folder={folder}
            onOpenFolder={handleOpenFolder}
            onDeleteFolder={handleOpenDeleteModal}
          />
        ))}
      </div>

      {/* 5. Bottom Analytics & Recent Activity Split */}
      <div className="qb-bottom-split-row">
        {/* Left: Recent accessed folders */}
        <RecentFoldersWidget
          recentFolders={RECENT_ACCESSED_FOLDERS}
          onOpenFolder={handleOpenFolder}
          onViewAllHistory={() => alert('Xem toàn bộ lịch sử hoạt động')}
        />

        {/* Right: Academic Metrics Sparkline chart */}
        <ContributionChartWidget
          analytics={CONTRIBUTION_ANALYTICS}
          onOpenKpiDetail={() => alert('Xem chi tiết chỉ số KPI biên soạn')}
        />
      </div>

      {/* 6. Popup Tạo thư mục môn học mới */}
      <CreateFolderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleSubmitCreateFolder}
      />

      {/* 7. Popup Xác nhận xóa thư mục */}
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
