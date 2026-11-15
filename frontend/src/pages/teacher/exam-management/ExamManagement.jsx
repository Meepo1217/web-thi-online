import { useState, useMemo } from 'react';
import ExamHeaderActionBar from '../../../components/exam/ExamHeaderActionBar';
import ExamTabsBar from '../../../components/exam/ExamTabsBar';
import ExamFilterToolbar from '../../../components/exam/ExamFilterToolbar';
import ExamTable from '../../../components/exam/ExamTable';
import ExamPagination from '../../../components/exam/ExamPagination';
import {
  INITIAL_TABS,
  INITIAL_SUBJECT_OPTIONS,
  INITIAL_GRADE_OPTIONS,
  INITIAL_SORT_OPTIONS,
  INITIAL_ACTIVE_TAGS,
  INITIAL_EXAMS_LIST,
} from '../../../components/exam/examData';
import './exam-management.css';

/**
 * ExamManagement - Trang Quản lý đề thi của Giảng viên (Index / List)
 * Route: /teacher/exams
 */
export default function ExamManagement() {
  // Trạng thái Tab hiện tại
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' hoặc 'grid'

  // Trạng thái tìm kiếm và bộ lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [selectedGrade, setSelectedGrade] = useState('grade12');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [activeTags, setActiveTags] = useState(INITIAL_ACTIVE_TAGS);

  // Trạng thái chọn hàng (checkboxes)
  const [selectedIds, setSelectedIds] = useState([]);

  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Danh sách đề thi từ mock data
  const [examsList, setExamsList] = useState(INITIAL_EXAMS_LIST);

  // Xử lý chuyển tab
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  // Xử lý xóa tag bộ lọc
  const handleRemoveTag = (tagId) => {
    setActiveTags((prev) => prev.filter((t) => t.id !== tagId));
    if (tagId === 'subject') setSelectedSubject('all');
    if (tagId === 'grade') setSelectedGrade('all');
  };

  // Xóa toàn bộ tag bộ lọc
  const handleClearAllTags = () => {
    setActiveTags([]);
    setSelectedSubject('all');
    setSelectedGrade('all');
  };

  // Xử lý thay đổi môn học
  const handleSubjectChange = (val) => {
    setSelectedSubject(val);
    if (val === 'all') {
      setActiveTags((prev) => prev.filter((t) => t.id !== 'subject'));
    } else {
      const option = INITIAL_SUBJECT_OPTIONS.find((o) => o.value === val);
      if (option) {
        setActiveTags((prev) => {
          const filtered = prev.filter((t) => t.id !== 'subject');
          return [...filtered, { id: 'subject', label: option.label }];
        });
      }
    }
  };

  // Xử lý thay đổi khối lớp
  const handleGradeChange = (val) => {
    setSelectedGrade(val);
    if (val === 'all') {
      setActiveTags((prev) => prev.filter((t) => t.id !== 'grade'));
    } else {
      const option = INITIAL_GRADE_OPTIONS.find((o) => o.value === val);
      if (option) {
        setActiveTags((prev) => {
          const filtered = prev.filter((t) => t.id !== 'grade');
          return [...filtered, { id: 'grade', label: option.label }];
        });
      }
    }
  };

  // Xử lý checkbox chọn tất cả
  const handleToggleSelectAll = () => {
    if (selectedIds.length === examsList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(examsList.map((e) => e.id));
    }
  };

  // Xử lý checkbox chọn một hàng
  const handleToggleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Hành động các nút
  const handleCreateExam = () => {
    alert('Điều hướng tới tính năng: Tạo đề thi mới');
  };

  const handleExport = () => {
    alert('Xuất danh sách đề thi ra file...');
  };

  const handleImportExcel = () => {
    alert('Mở hộp thoại nhập đề thi từ Excel...');
  };

  const handleEditExam = (exam) => {
    alert(`Chỉnh sửa đề thi: "${exam.title}"`);
  };

  const handleDeleteExam = (exam) => {
    if (confirm(`Bạn có chắc chắn muốn xóa đề thi: "${exam.title}"?`)) {
      setExamsList((prev) => prev.filter((item) => item.id !== exam.id));
      setSelectedIds((prev) => prev.filter((id) => id !== exam.id));
    }
  };

  const handleUploadExam = (exam) => {
    alert(`Tải lên / Xuất bản đề thi nháp: "${exam.title}"`);
  };

  const handleOpenAdvancedFilter = () => {
    alert('Mở hộp thoại bộ lọc nâng cao');
  };

  // Lọc đề thi theo từ khóa và tab
  const filteredExams = useMemo(() => {
    return examsList.filter((exam) => {
      // Lọc theo từ khóa tìm kiếm
      if (
        searchTerm &&
        !exam.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      // Lọc theo tab trạng thái
      if (activeTab === 'active' && exam.status !== 'live' && exam.status !== 'open') {
        return false;
      }
      if (activeTab === 'finished' && exam.status !== 'closed') {
        return false;
      }
      if (activeTab === 'draft' && exam.status !== 'draft') {
        return false;
      }
      return true;
    });
  }, [examsList, searchTerm, activeTab]);

  return (
    <div className="exam-management-page">
      {/* 1. Top Action Bar & Page Header */}
      <ExamHeaderActionBar
        totalExams={48}
        onCreateExam={handleCreateExam}
        onExport={handleExport}
        onImportExcel={handleImportExcel}
      />

      {/* 2. Main Container Card */}
      <div className="exam-main-card">
        {/* Tabs Bar */}
        <ExamTabsBar
          tabs={INITIAL_TABS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Search, Filter Toolbar & Active Tags */}
        <ExamFilterToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={() => setSearchTerm('')}
          subjectOptions={INITIAL_SUBJECT_OPTIONS}
          selectedSubject={selectedSubject}
          onSubjectChange={handleSubjectChange}
          gradeOptions={INITIAL_GRADE_OPTIONS}
          selectedGrade={selectedGrade}
          onGradeChange={handleGradeChange}
          sortOptions={INITIAL_SORT_OPTIONS}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          activeTags={activeTags}
          onRemoveTag={handleRemoveTag}
          onClearAllTags={handleClearAllTags}
          onOpenAdvancedFilter={handleOpenAdvancedFilter}
        />

        {/* Table Section */}
        <ExamTable
          exams={filteredExams}
          selectedIds={selectedIds}
          onToggleSelectAll={handleToggleSelectAll}
          onToggleSelectRow={handleToggleSelectRow}
          onEditExam={handleEditExam}
          onDeleteExam={handleDeleteExam}
          onUploadExam={handleUploadExam}
        />

        {/* Pagination & Bottom Actions */}
        <ExamPagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={48}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
}
