import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionBankHeader from './QuestionBankHeader';
import QuestionBankKpiCards from './QuestionBankKpiCards';
import QuestionBankFilterBar from './QuestionBankFilterBar';
import SubjectFolderCard from './SubjectFolderCard';
import RecentFoldersWidget from './RecentFoldersWidget';
import ContributionChartWidget from './ContributionChartWidget';
import {
  QUESTION_METRICS,
  GRADE_FILTER_TABS,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGrade, setActiveGrade] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  // Xử lý mở thư mục môn học (chuyển sang Màn hình 2: Danh sách câu hỏi)
  const handleOpenFolder = (folderId) => {
    navigate(`/teacher/questions/${folderId}`);
  };

  // Menu tùy chọn trên thẻ thư mục
  const handleFolderMenu = (folder) => {
    alert(`Tùy chọn cho thư mục: "${folder.title}" (Đổi tên, cấu hình ma trận, phân quyền)`);
  };

  // Hành động các nút trên Header
  const handleImportExcel = () => {
    alert('Mở hộp thoại: Nhập câu hỏi từ file Excel');
  };

  const handleCreateFolder = () => {
    alert('Mở hộp thoại: Tạo thư mục môn học mới');
  };

  // Lọc thư mục theo từ khóa và khối lớp
  const filteredFolders = useMemo(() => {
    return SUBJECT_FOLDERS_DATA.filter((folder) => {
      // Lọc theo từ khóa
      if (
        searchTerm &&
        !folder.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !folder.code.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !folder.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      // Lọc theo khối lớp
      if (activeGrade !== 'all' && folder.grade.toLowerCase() !== activeGrade.toLowerCase()) {
        // Mock data hiện tại là Khối 12, nên nếu lọc khối khác sẽ trống hoặc lọc chuẩn
        if (activeGrade === 'grade12' && folder.grade === 'Khối 12') return true;
        if (activeGrade !== 'grade12') return false;
      }
      return true;
    });
  }, [searchTerm, activeGrade]);

  return (
    <div className="qb-folders-page">
      {/* 1. Top Navigation & Breadcrumbs */}
      <QuestionBankHeader
        onImportExcel={handleImportExcel}
        onCreateFolder={handleCreateFolder}
      />

      {/* 2. Key Metrics / Academic Pulse */}
      <QuestionBankKpiCards metrics={QUESTION_METRICS} />

      {/* 3. Filter & Fast Search Bar */}
      <QuestionBankFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeGrade={activeGrade}
        onGradeChange={setActiveGrade}
        gradeTabs={GRADE_FILTER_TABS}
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
            onFolderMenu={handleFolderMenu}
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
    </div>
  );
}
