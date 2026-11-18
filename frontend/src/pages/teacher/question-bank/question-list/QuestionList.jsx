import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionListHeader from './QuestionListHeader';
import QuestionListFilterBar from './QuestionListFilterBar';
import QuestionBatchToolbar from './QuestionBatchToolbar';
import QuestionCard from './QuestionCard';
import QuestionPagination from './QuestionPagination';
import QuestionDeleteModal from '../question-delete/QuestionDeleteModal';
import {
  SUBJECT_INFO,
  INITIAL_QUESTIONS,
} from './questionListData';
import './question-list.css';

/**
 * QuestionList - Màn hình Danh sách câu hỏi theo môn học
 * Thiết kế pixel-perfect theo Figma:
 * - Breadcrumbs & Sync cloud status
 * - Main header banner & 4 quick actions
 * - Smart search & 4 filters & Active chips
 * - Batch action toolbar khi chọn câu hỏi
 * - 5 Question cards với nhiều format (MCQ, True/False, Short Answer)
 * - Academic pagination footer
 * - Chi tiết câu hỏi modal & Xóa câu hỏi confirmation modal
 */
export default function QuestionList() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  // Dữ liệu danh sách câu hỏi
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);

  // Danh sách ID các câu hỏi được chọn (mặc định chọn 3 câu đầu như Figma: Card 1, 2, 3)
  const [selectedIds, setSelectedIds] = useState([
    'MATH-12-0482',
    'MATH-12-0391',
    'MATH-12-0215',
  ]);

  // Bộ lọc & Tìm kiếm (chỉ giữ lại mức độ theo yêu cầu)
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    bloom: 'all',
  });

  // Active filter chips (như trong Figma: TOÁN 12, VẬN DỤNG CAO)
  const [activeChips, setActiveChips] = useState([
    { id: 'grade', label: 'TOÁN 12', color: 'blue' },
  ]);

  // Modal xem chi tiết câu hỏi
  const [viewingQuestion, setViewingQuestion] = useState(null);

  // Modal xác nhận xóa câu hỏi
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    target: null, // null nếu xóa hàng loạt
    count: 1,
  });

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Toggle chọn 1 câu hỏi
  const handleToggleSelect = (questionId) => {
    setSelectedIds((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  // Toggle chọn tất cả câu hỏi đang hiển thị
  const handleToggleSelectAll = () => {
    if (selectedIds.length === questions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(questions.map((q) => q.id));
    }
  };

  // Thay đổi bộ lọc select
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === 'bloom') {
      if (value === 'all') {
        setActiveChips((prev) => prev.filter((c) => c.id !== 'bloom'));
      } else {
        const found = FILTER_OPTIONS.bloomLevels.find((b) => b.value === value);
        const label = found ? found.label.toUpperCase() : value.toUpperCase();
        setActiveChips((prev) => {
          const others = prev.filter((c) => c.id !== 'bloom');
          return [...others, { id: 'bloom', label, color: 'slate' }];
        });
      }
    }
  };

  // Xóa chip lọc
  const handleRemoveChip = (chipId) => {
    setActiveChips((prev) => prev.filter((c) => c.id !== chipId));
    if (chipId === 'bloom') {
      setFilters((prev) => ({ ...prev, bloom: 'all' }));
    }
  };

  // Xóa tất cả bộ lọc
  const handleClearAllFilters = () => {
    setActiveChips([]);
    setSearchTerm('');
    setFilters({
      bloom: 'all',
    });
  };

  // Mở modal xóa đơn lẻ
  const handleRequestDelete = (question) => {
    setDeleteModalState({
      isOpen: true,
      target: question,
      count: 1,
    });
  };

  // Mở modal xóa hàng loạt đã chọn
  const handleRequestBatchDelete = () => {
    if (selectedIds.length === 0) return;
    setDeleteModalState({
      isOpen: true,
      target: null,
      count: selectedIds.length,
    });
  };

  // Xác nhận xóa
  const handleConfirmDelete = () => {
    if (deleteModalState.target) {
      // Xóa 1 câu hỏi
      const targetId = deleteModalState.target.id;
      setQuestions((prev) => prev.filter((q) => q.id !== targetId));
      setSelectedIds((prev) => prev.filter((id) => id !== targetId));
    } else {
      // Xóa hàng loạt
      setQuestions((prev) => prev.filter((q) => !selectedIds.includes(q.id)));
      setSelectedIds([]);
    }
    setDeleteModalState({ isOpen: false, target: null, count: 1 });
  };

  // Action handlers
  const handleAddQuestion = () => {
    navigate(subjectId ? `/teacher/questions/${subjectId}/create` : '/teacher/questions/create');
  };

  const handleAutoShuffle = () => {
    alert('Hệ thống đang mở trình khởi tạo đề thi tự động từ ngân hàng câu hỏi...');
  };

  const handleExport = () => {
    alert('Đang kết xuất dữ liệu toàn bộ ngân hàng câu hỏi môn Toán học THPT...');
  };

  const handleDownloadTemplate = () => {
    alert('Đang tải file Excel mẫu ma trận câu hỏi THPT chuẩn Quốc gia...');
  };

  const handleViewDetail = (question) => {
    navigate(`/teacher/questions/detail/${question.id}`);
  };

  const handleEditQuestion = (question) => {
    navigate(`/teacher/questions/edit/${question.id}`);
  };

  // Lọc câu hỏi theo từ khóa tìm kiếm và mức độ nhận thức
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        const matchSearch =
          q.code.toLowerCase().includes(lower) ||
          q.content.toLowerCase().includes(lower) ||
          q.chapter.toLowerCase().includes(lower) ||
          q.tags?.some((t) => t.toLowerCase().includes(lower));
        if (!matchSearch) return false;
      }

      if (filters.bloom && filters.bloom !== 'all') {
        const matchBloom =
          q.bloomType === filters.bloom ||
          (filters.bloom === 'van-dung-cao' && q.bloomType === 'vd-cao');
        if (!matchBloom) return false;
      }

      return true;
    });
  }, [questions, searchTerm, filters.bloom]);

  return (
    <div className="ql-page-container">
      {/* 1. Thanh tiêu đề & Điều hướng & 4 Nút hành động */}
      <QuestionListHeader
        subject={SUBJECT_INFO}
        onAddQuestion={handleAddQuestion}
        onAutoShuffle={handleAutoShuffle}
        onExport={handleExport}
        onDownloadTemplate={handleDownloadTemplate}
      />

      {/* 2. Thanh tìm kiếm thông minh & 4 bộ lọc & Active Chips */}
      <QuestionListFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
        activeChips={activeChips}
        onRemoveChip={handleRemoveChip}
        onClearAllFilters={handleClearAllFilters}
      />

      {/* 3. Thanh thao tác hàng loạt (Hiển thị khi có câu hỏi được chọn) */}
      <QuestionBatchToolbar
        selectedCount={selectedIds.length}
        isAllSelected={
          questions.length > 0 && selectedIds.length === questions.length
        }
        onToggleSelectAll={handleToggleSelectAll}
        onMoveFolder={() =>
          alert(`Chuyển ${selectedIds.length} câu hỏi sang chuyên đề khác`)
        }
        onChangeBloom={() =>
          alert(`Thay đổi mức độ Bloom cho ${selectedIds.length} câu hỏi`)
        }
        onExportSelected={() =>
          alert(`Kết xuất ${selectedIds.length} câu hỏi đã chọn`)
        }
        onDeleteSelected={handleRequestBatchDelete}
      />

      {/* 4. Canvas danh sách câu hỏi */}
      <div className="ql-canvas">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              isSelected={selectedIds.includes(question.id)}
              onToggleSelect={handleToggleSelect}
              onViewDetail={handleViewDetail}
              onEdit={handleEditQuestion}
              onDelete={handleRequestDelete}
            />
          ))
        ) : (
          <div className="ql-empty-state">
            <div className="ql-empty-icon">🔍</div>
            <h3 className="ql-empty-title">Không tìm thấy câu hỏi phù hợp</h3>
            <p className="ql-empty-desc">
              Vui lòng thử điều chỉnh lại từ khóa tìm kiếm hoặc xóa các bộ lọc đang
              áp dụng.
            </p>
          </div>
        )}
      </div>

      {/* 5. Phân trang học thuật */}
      <QuestionPagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={1420}
        totalPages={142}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />

      {/* 6. Popup xác nhận xóa câu hỏi chuẩn Figma */}
      <QuestionDeleteModal
        isOpen={deleteModalState.isOpen}
        question={
          deleteModalState.target || {
            code: selectedIds[0] || 'MATH-12-0482',
            linkedExamsCount: selectedIds.length > 1 ? selectedIds.length * 2 : 3,
            studentSubmissionsCount: '1,420',
          }
        }
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteModalState({ isOpen: false, target: null, count: 1 })
        }
      />
    </div>
  );
}
