import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionDetailActionBar from './QuestionDetailActionBar';
import QuestionStemCard from './QuestionStemCard';
import QuestionAnswerOptions from './QuestionAnswerOptions';
import QuestionDetailedSolution from './QuestionDetailedSolution';
import QuestionMetaCard from './QuestionMetaCard';
import QuestionPerformanceCard from './QuestionPerformanceCard';
import QuestionExamUsageCard from './QuestionExamUsageCard';
import QuestionDeleteModal from '../question-delete/QuestionDeleteModal';
import { QUESTION_DETAIL_DATA } from './questionDetailData';
import './question-detail.css';

/**
 * QuestionDetail - Màn hình 3: Chi tiết câu hỏi
 * Hiển thị toàn diện câu hỏi, các lựa chọn, đáp án chính xác,
 * bản vẽ đồ thị SVG khoa học, lời giải chi tiết 3 bước, mẹo giải nhanh,
 * thống kê hiệu suất học thuật và đề thi liên quan.
 */
export default function QuestionDetail() {
  const { questionId } = useParams();
  const navigate = useNavigate();

  // Dữ liệu câu hỏi chi tiết
  const [question, setQuestion] = useState(QUESTION_DETAIL_DATA);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Xử lý các hành động
  const handleHistoryClick = () => {
    alert(`Lịch sử cập nhật của câu hỏi ${question.code}:\n• 15/10/2025: Thầy Nam duyệt bài và đồng bộ lên Cloud.\n• 12/10/2025: Biên soạn đề bài và đồ thị hàm số.`);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      alert(`Đã xóa vĩnh viễn câu hỏi ${question.code} thành công.`);
      navigate('/teacher/questions/math/list');
    }, 600);
  };

  const handleEditClick = () => {
    navigate(`/teacher/questions/edit/${question.code}`);
  };

  const handleViewAllExams = () => {
    alert(`Mở danh sách toàn bộ các kỳ thi và đề kiểm tra đã sử dụng câu hỏi ${question.code}`);
  };

  return (
    <div className="qd-page-container">
      {/* 1. Minimalist Contextual Action Bar */}
      <QuestionDetailActionBar
        question={question}
        onHistoryClick={handleHistoryClick}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
      />

      {/* 2. Primary Assessment Layout (2 Columns Grid) */}
      <div className="qd-primary-layout">
        {/* Left Column: Core Question Canvas (8 Cols) */}
        <div className="qd-left-column">
          {/* Question Stem Card with Scientific SVG Graph */}
          <QuestionStemCard question={question} />

          {/* Answer Options Card */}
          <QuestionAnswerOptions options={question.options} />

          {/* Detailed Solution & Step-by-step logic */}
          <QuestionDetailedSolution
            steps={question.steps}
            quickTip={question.quickTip}
          />
        </div>

        {/* Right Column: Metadata & Performance Analytics (4 Cols) */}
        <div className="qd-right-column">
          {/* Academic Information Card */}
          <QuestionMetaCard question={question} />

          {/* Performance Statistics Card */}
          <QuestionPerformanceCard stats={question.stats} />

          {/* Usage in Exams Card */}
          <QuestionExamUsageCard
            examUsages={question.examUsages}
            onViewAllExams={handleViewAllExams}
          />
        </div>
      </div>

      {/* Popup xác nhận xóa câu hỏi */}
      <QuestionDeleteModal
        isOpen={isDeleteModalOpen}
        question={question}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
