import React, { useState, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ExamDetailHeader from './ExamDetailHeader';
import ExamStatsFilterStrip from './ExamStatsFilterStrip';
import ExamQuestionItem from './ExamQuestionItem';
import ExamMatrixSidebar from './ExamMatrixSidebar';
import QuestionDeleteModal from '../../question-bank/question-delete/QuestionDeleteModal';
import {
  EXAM_DETAIL_INFO,
  EXAM_CHAPTER_FILTERS,
  EXAM_BLOOM_FILTERS,
  EXAM_BLOOM_DISTRIBUTION,
  INITIAL_EXAM_QUESTIONS,
  generateAdditionalExamQuestion,
} from './examDetailData';
import './exam-detail.css';
import '../../question-bank/question-delete/question-delete.css';

/**
 * ExamDetail - Màn hình Chi tiết đề thi (Nội dung bên trong TeacherLayout <Outlet />)
 * Routes: /teacher/exams/detail/:examId | /teacher/exams/:subjectId/detail/:examId
 */
export default function ExamDetail() {
  const { subjectId, examId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Ghép dữ liệu đề thi từ router state (nếu điều hướng từ danh sách đề) hoặc mặc định Figma
  const passedExam = location.state?.exam;
  const examInfo = useMemo(() => {
    if (!passedExam) {
      return {
        ...EXAM_DETAIL_INFO,
        code: examId ? `MÃ ĐỀ: ${examId}` : EXAM_DETAIL_INFO.code,
      };
    }
    return {
      ...EXAM_DETAIL_INFO,
      id: passedExam.id || EXAM_DETAIL_INFO.id,
      title: passedExam.title || EXAM_DETAIL_INFO.title,
      code: passedExam.code ? `MÃ ĐỀ: ${passedExam.code.replace('#', '')}` : EXAM_DETAIL_INFO.code,
      metrics: EXAM_DETAIL_INFO.metrics.map((m) => {
        if (m.id === 'total-questions' && passedExam.questionCount) {
          return { ...m, value: `${passedExam.questionCount} câu` };
        }
        if (m.id === 'duration' && passedExam.duration) {
          return { ...m, value: passedExam.duration };
        }
        return m;
      }),
    };
  }, [passedExam, examId]);

  const totalQuestions = passedExam?.questionCount || EXAM_DETAIL_INFO.totalQuestions;

  // Danh sách câu hỏi đã tải trong đề (mặc định 5 câu đầu theo Figma)
  const [questions, setQuestions] = useState(INITIAL_EXAM_QUESTIONS);
  const [activeChapter, setActiveChapter] = useState('all');
  const [activeBloom, setActiveBloom] = useState('all');
  const [focusedQuestionId, setFocusedQuestionId] = useState(1);

  // Modal xác nhận gỡ câu hỏi khỏi đề
  const [removeModal, setRemoveModal] = useState({
    isOpen: false,
    question: null,
  });

  // Lọc danh sách câu hỏi theo chương & mức độ Bloom
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchChapter = activeChapter === 'all' || q.chapterId === activeChapter;
      const matchBloom = activeBloom === 'all' || q.bloomId === activeBloom;
      return matchChapter && matchBloom;
    });
  }, [questions, activeChapter, activeBloom]);

  // Tải thêm tối đa 10 câu hỏi tiếp theo
  const handleLoadMore = () => {
    setQuestions((prev) => {
      const currentLen = prev.length;
      if (currentLen >= totalQuestions) return prev;
      const targetLen = Math.min(totalQuestions, currentLen + 10);
      const extra = [];
      for (let i = currentLen + 1; i <= targetLen; i += 1) {
        extra.push(generateAdditionalExamQuestion(i));
      }
      return [...prev, ...extra];
    });
  };

  // Hiển thị toàn bộ câu hỏi trong đề
  const handleShowAll = () => {
    setQuestions((prev) => {
      const currentLen = prev.length;
      if (currentLen >= totalQuestions) return prev;
      const extra = [];
      for (let i = currentLen + 1; i <= totalQuestions; i += 1) {
        extra.push(generateAdditionalExamQuestion(i));
      }
      return [...prev, ...extra];
    });
  };

  // Nhảy nhanh tới câu hỏi khi bấm ô trên Bảng câu hỏi (50 ô)
  const handleSelectQuestionNumber = (num) => {
    setActiveChapter('all');
    setActiveBloom('all');
    setFocusedQuestionId(num);

    if (num > questions.length) {
      setQuestions((prev) => {
        const extra = [];
        for (let i = prev.length + 1; i <= num; i += 1) {
          extra.push(generateAdditionalExamQuestion(i));
        }
        return [...prev, ...extra];
      });
    }

    setTimeout(() => {
      const el = document.getElementById(`exam-question-${num}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 60);
  };

  // Xác nhận gỡ câu hỏi khỏi đề
  const handleConfirmRemove = () => {
    if (removeModal.question?.id) {
      setQuestions((prev) => prev.filter((q) => q.id !== removeModal.question.id));
    }
    setRemoveModal({ isOpen: false, question: null });
  };

  const remainingToLoad = Math.max(0, totalQuestions - questions.length);
  const nextBatchEnd = Math.min(totalQuestions, questions.length + 10);
  const backPath = `/teacher/exams/${subjectId || 'math'}/list`;

  return (
    <div className="ed-page-wrapper">
      <div className="ed-page-container">
        {/* 1. Top In-Page Action & Navigation Bar */}
        <ExamDetailHeader
          exam={examInfo}
          backPath={backPath}
          onEditExam={() => alert(`Mở trình chỉnh sửa đề thi: ${examInfo.title}`)}
          onExportExam={() => alert(`Xuất đề thi ${examInfo.code} ra định dạng PDF / Word`)}
          onCreateSession={() => alert(`Trộn mã đề & tạo ca thi mới từ ${examInfo.code}`)}
        />

        {/* 2. Exam Quick Stats & Topic Filter Strip */}
        <ExamStatsFilterStrip
          metrics={examInfo.metrics}
          chapterFilters={EXAM_CHAPTER_FILTERS}
          bloomFilters={EXAM_BLOOM_FILTERS}
          activeChapter={activeChapter}
          activeBloom={activeBloom}
          onChapterChange={setActiveChapter}
          onBloomChange={setActiveBloom}
        />

        {/* 3. Main Asymmetric Workspace: 8 Cols Question Feed & 4 Cols Sticky Matrix Palette */}
        <div className="ed-workspace-grid">
          {/* LEFT: Continuous Question List (8 Cols) */}
          <div className="ed-questions-feed">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <ExamQuestionItem
                  key={question.id}
                  question={question}
                  isFocused={focusedQuestionId === question.id}
                  onEditQuestion={(q) => navigate(`/teacher/questions/edit/MATH-12-00${q.id}`)}
                  onRemoveQuestion={(q) => setRemoveModal({ isOpen: true, question: q })}
                />
              ))
            ) : (
              <div className="ed-empty-box">
                <p className="ed-empty-title">Không có câu hỏi nào khớp với bộ lọc hiện tại</p>
                <button
                  type="button"
                  className="ed-btn ed-btn-soft"
                  onClick={() => {
                    setActiveChapter('all');
                    setActiveBloom('all');
                  }}
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            )}

            {/* Bottom Pagination & Load Indicator */}
            <div className="ed-bottom-load-bar">
              <span className="ed-load-status-text">
                Đang hiển thị {filteredQuestions.length} trên tổng số {totalQuestions} câu hỏi của đề thi
              </span>

              {remainingToLoad > 0 && (
                <div className="ed-load-actions">
                  <button
                    type="button"
                    className="ed-load-btn ed-load-btn-soft"
                    onClick={handleLoadMore}
                  >
                    Tải thêm câu hỏi tiếp theo (Câu {questions.length + 1} - {nextBatchEnd})
                  </button>

                  <button
                    type="button"
                    className="ed-load-btn ed-load-btn-primary"
                    onClick={handleShowAll}
                  >
                    Hiển thị tất cả {totalQuestions} câu
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Sticky Question Palette & Exam Matrix (4 Cols) */}
          <ExamMatrixSidebar
            totalQuestions={totalQuestions}
            loadedCount={questions.length}
            activeQuestionIds={focusedQuestionId === 1 ? [1, 2] : [focusedQuestionId]}
            bloomDistribution={EXAM_BLOOM_DISTRIBUTION}
            specs={examInfo.specs}
            onSelectQuestionNumber={handleSelectQuestionNumber}
          />
        </div>
      </div>

      {/* Modal xác nhận gỡ câu hỏi */}
      <QuestionDeleteModal
        isOpen={removeModal.isOpen}
        question={
          removeModal.question
            ? {
                code: `${examInfo.id}-Q${removeModal.question.id}`,
                linkedExamsCount: 1,
                studentSubmissionsCount: '0',
              }
            : { code: 'Q1' }
        }
        onConfirm={handleConfirmRemove}
        onCancel={() => setRemoveModal({ isOpen: false, question: null })}
      />
    </div>
  );
}
