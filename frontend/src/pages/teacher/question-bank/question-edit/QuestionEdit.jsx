import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditHeaderActionBar from './EditHeaderActionBar';
import EditFormatSelector from './EditFormatSelector';
import EditStemEditor from './EditStemEditor';
import EditAnswerOptions from './EditAnswerOptions';
import EditSolutionEditor from './EditSolutionEditor';
import EditTaxonomySidebar from './EditTaxonomySidebar';
import EditMetadataSidebar from './EditMetadataSidebar';
import EditFloatingActionBar from './EditFloatingActionBar';
import { INITIAL_EDIT_QUESTION } from './questionEditData';
import './question-edit.css';

/**
 * QuestionEdit - Màn hình 4: Chỉnh sửa câu hỏi (EduQuiz Studio)
 * Toàn bộ chức năng biên tập câu hỏi chuyên sâu:
 * - Chọn 4 loại định dạng câu hỏi
 * - Soạn thảo đề bài Rich Text & quản lý ảnh minh họa
 * - Cấu hình phương án trắc nghiệm A-D, chọn đáp án đúng
 * - Biên soạn lời giải chi tiết, MathJax, mẹo giải nhanh
 * - Phân loại môn học, khối lớp, chuyên đề, cấp độ Bloom, điểm số
 * - Gắn thẻ (Tags), trạng thái kiểm định, phân tích hiệu suất
 * - Thanh nổi lưu thay đổi & tự động lưu
 */
export default function QuestionEdit() {
  const { questionId } = useParams();
  const navigate = useNavigate();

  // Khởi tạo state câu hỏi từ initial data
  const [question, setQuestion] = useState({
    ...INITIAL_EDIT_QUESTION,
    code: questionId || INITIAL_EDIT_QUESTION.code,
  });

  const [isSaving, setIsSaving] = useState(false);

  // Xử lý đổi định dạng câu hỏi
  const handleSelectFormat = (formatId) => {
    setQuestion((prev) => ({ ...prev, format: formatId }));
  };

  // Xử lý cập nhật đề bài
  const handleChangeStem = (stemText) => {
    setQuestion((prev) => ({ ...prev, stem: stemText }));
  };

  // Xử lý ảnh đính kèm
  const handleReplaceImage = () => {
    const newName = prompt('Nhập tên tệp hình ảnh mới:', question.attachment?.fileName || 'dothi_f(x)_update.jpg');
    if (newName) {
      setQuestion((prev) => ({
        ...prev,
        attachment: {
          fileName: newName,
          fileSize: '156 KB',
          dimensions: '1280x850px',
        },
      }));
    }
  };

  const handleRemoveImage = () => {
    if (window.confirm('Bạn có chắc muốn xóa ảnh minh họa này?')) {
      setQuestion((prev) => ({ ...prev, attachment: null }));
    }
  };

  // Xử lý chọn đáp án đúng
  const handleSelectCorrectOption = (optId) => {
    setQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt) => ({
        ...opt,
        isCorrect: opt.id === optId,
      })),
    }));
  };

  // Xử lý sửa nội dung đáp án
  const handleChangeOptionText = (optId, text) => {
    setQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt) =>
        opt.id === optId ? { ...opt, text } : opt
      ),
    }));
  };

  // Xử lý xóa phương án
  const handleDeleteOption = (optId) => {
    if (question.options.length <= 2) {
      alert('Câu hỏi trắc nghiệm cần tối thiểu 2 phương án lựa chọn.');
      return;
    }
    setQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((opt) => opt.id !== optId),
    }));
  };

  // Xử lý thêm phương án
  const handleAddOption = () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const nextIndex = question.options.length;
    if (nextIndex >= letters.length) {
      alert('Đã đạt giới hạn tối đa phương án lựa chọn.');
      return;
    }
    const newLetter = letters[nextIndex];
    const newOpt = {
      id: `opt-${newLetter.toLowerCase()}`,
      letter: newLetter,
      text: '',
      isCorrect: false,
    };
    setQuestion((prev) => ({
      ...prev,
      options: [...prev.options, newOpt],
    }));
  };

  // Xử lý cập nhật lời giải
  const handleChangeExplanation = (explanation) => {
    setQuestion((prev) => ({ ...prev, explanation }));
  };

  const handleInsertMathJax = () => {
    const mathFormula = ' \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0} ';
    setQuestion((prev) => ({
      ...prev,
      explanation: prev.explanation + mathFormula,
    }));
  };

  const handleInsertQuickTip = () => {
    const tip = '\n\n💡 [Mẹo giải nhanh]: Đạo hàm hàm hợp [f(u)]\' = u\' · f\'(u), chú ý xét riêng các điểm mà u\'(x) = 0.';
    setQuestion((prev) => ({
      ...prev,
      explanation: prev.explanation + tip,
    }));
  };

  // Xử lý thay đổi taxonomy
  const handleChangeTaxonomy = (updatedTaxonomy) => {
    setQuestion((prev) => ({ ...prev, taxonomy: updatedTaxonomy }));
  };

  // Xử lý tags
  const handleRemoveTag = (tagToRemove) => {
    setQuestion((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleAddTag = (newTag) => {
    if (!question.tags.includes(newTag)) {
      setQuestion((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
    }
  };

  // Actions Top Bar
  const handlePreview = () => {
    alert(`Xem trước câu hỏi #${question.code}:\n\nĐề bài: ${question.stem}\nĐáp án đúng: ${question.options.find(o => o.isCorrect)?.letter}`);
  };

  const handleHistory = () => {
    alert(`Lịch sử cập nhật #${question.code}:\n• 15/10/2025: Thầy Nam chỉnh sửa đáp án và độ khó Bloom.\n• 12/10/2025: Tạo mới câu hỏi.`);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert(`Đã lưu thành công các thay đổi cho câu hỏi ${question.code}!`);
      navigate(`/teacher/questions/detail/${question.code}`);
    }, 600);
  };

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc muốn hủy các thay đổi chưa lưu?')) {
      navigate(`/teacher/questions/detail/${question.code}`);
    }
  };

  return (
    <div className="qe-page-root">
      {/* 1. Sticky Context Header & Navigation */}
      <EditHeaderActionBar
        question={question}
        onPreview={handlePreview}
        onHistory={handleHistory}
        onSave={handleSave}
      />

      {/* 2. Responsive 2-Column Workspace Grid */}
      <div className="qe-workspace-grid">
        {/* Left Column: Main Editor Canvas (8 cols) */}
        <div className="qe-canvas-column">
          {/* Card: Format Selector */}
          <EditFormatSelector
            selectedFormat={question.format}
            onSelectFormat={handleSelectFormat}
          />

          {/* Card: Question Stem Editor */}
          <EditStemEditor
            stem={question.stem}
            onChangeStem={handleChangeStem}
            attachment={question.attachment}
            onReplaceImage={handleReplaceImage}
            onRemoveImage={handleRemoveImage}
          />

          {/* Card: Answer Options (A, B, C, D) */}
          <EditAnswerOptions
            options={question.options}
            onSelectCorrect={handleSelectCorrectOption}
            onChangeOptionText={handleChangeOptionText}
            onDeleteOption={handleDeleteOption}
            onAddOption={handleAddOption}
          />

          {/* Card: Detailed Explanation & Methodology */}
          <EditSolutionEditor
            explanation={question.explanation}
            onChangeExplanation={handleChangeExplanation}
            onInsertMathJax={handleInsertMathJax}
            onInsertQuickTip={handleInsertQuickTip}
          />
        </div>

        {/* Right Column: Taxonomy & Meta Attributes (4 cols) */}
        <div className="qe-sidebar-column">
          {/* Card: Subject & Bloom Classification */}
          <EditTaxonomySidebar
            taxonomy={question.taxonomy}
            onChangeTaxonomy={handleChangeTaxonomy}
          />

          {/* Card: Tags & Context Metadata */}
          <EditMetadataSidebar
            tags={question.tags}
            onRemoveTag={handleRemoveTag}
            onAddTag={handleAddTag}
            approvalStatus={question.approvalStatus}
            insights={question.insights}
            author={question.author}
            lastUpdated={question.lastUpdated}
            hashId={question.hashId}
          />
        </div>
      </div>

      {/* 3. Persistent Bottom Floating Action Bar */}
      <EditFloatingActionBar
        autoSaveTime={question.autoSaveTime}
        onCancel={handleCancel}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}
