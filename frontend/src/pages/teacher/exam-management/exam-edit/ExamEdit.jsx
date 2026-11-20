import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { INITIAL_EXAM_EDIT_DATA } from './examEditData';
import ExamEditHeaderBar from './ExamEditHeaderBar';
import ExamEditMetadataCard from './ExamEditMetadataCard';
import ExamEditQuestionEditor from './ExamEditQuestionEditor';
import ExamEditQuestionList from './ExamEditQuestionList';
import ExamEditMatrixSidebar from './ExamEditMatrixSidebar';
import ExamEditBottomBar from './ExamEditBottomBar';
import SelectQuestionsModal from './SelectQuestionsModal';
import ImportExamFileModal from './ImportExamFileModal';
import { IconFileText, IconEdit } from '../../../../components/ui/icons';
import './exam-edit.css';

/**
 * ExamEdit - Màn hình Sửa đề thi (Exam Edit)
 * Tính năng nổi bật:
 * 1. Chế độ xem linh hoạt:
 *    - 📑 Dạng danh sách chi tiết (xếp các câu thành danh sách giống như xem chi tiết câu hỏi/đề thi)
 *    - ✏️ Dạng soạn thảo chuyên sâu từng câu
 * 2. Popup chọn câu hỏi từ Ngân hàng câu hỏi (khi ấn "+ Thêm câu hỏi mới")
 * 3. Ma trận câu hỏi 4x4 bên phải đồng bộ và điều hướng nhanh
 */
export default function ExamEdit() {
  const { subjectId, examId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Khởi tạo dữ liệu từ router state hoặc dữ liệu mẫu
  const initialData = useMemo(() => {
    const passed = location.state?.exam;
    if (!passed) return INITIAL_EXAM_EDIT_DATA;

    return {
      ...INITIAL_EXAM_EDIT_DATA,
      id: passed.id || INITIAL_EXAM_EDIT_DATA.id,
      code: passed.code || INITIAL_EXAM_EDIT_DATA.code,
      title: passed.title || INITIAL_EXAM_EDIT_DATA.title,
      description: passed.description || INITIAL_EXAM_EDIT_DATA.description,
    };
  }, [location.state]);

  const [examInfo, setExamInfo] = useState({
    title: initialData.title,
    subject: initialData.subject,
    description: initialData.description,
  });

  const [questions, setQuestions] = useState(initialData.questions);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [viewMode, setViewMode] = useState('list'); // 'list' (Danh sách) hoặc 'editor' (Soạn từng câu)
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const [lastSavedTime, setLastSavedTime] = useState('Vừa xong');

  // Lấy câu hỏi hiện tại đang chỉnh sửa
  const currentQuestion = useMemo(() => {
    return questions.find((q) => q.id === currentQuestionId) || questions[0];
  }, [questions, currentQuestionId]);

  const currentIndex = useMemo(() => {
    return questions.findIndex((q) => q.id === currentQuestionId);
  }, [questions, currentQuestionId]);

  // Cập nhật trường thông tin chung
  const handleMetadataChange = (field, value) => {
    setExamInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Cập nhật nội dung câu hỏi (Stem)
  const handleStemChange = (newStem) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === currentQuestionId
          ? { ...q, stem: newStem, isCompleted: Boolean(newStem && q.correctOption) }
          : q
      )
    );
  };

  // Cập nhật nội dung phương án lựa chọn trong single editor
  const handleOptionChange = (optionId, newText) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== currentQuestionId) return q;
        const updatedOptions = q.options.map((opt) =>
          opt.id === optionId ? { ...opt, text: newText } : opt
        );
        return { ...q, options: updatedOptions };
      })
    );
  };

  // Chọn phương án đúng (A, B, C hoặc D) trong single editor
  const handleSelectCorrectOption = (optionId) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== currentQuestionId) return q;
        const updatedOptions = q.options.map((opt) => ({
          ...opt,
          isCorrect: opt.id === optionId,
        }));
        return {
          ...q,
          correctOption: optionId,
          options: updatedOptions,
          isCompleted: Boolean(q.stem),
        };
      })
    );
  };

  // Chọn phương án đúng trực tiếp từ danh sách câu hỏi
  const handleSelectCorrectOptionInList = (questionId, optionId) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId) return q;
        const updatedOptions = q.options.map((opt) => ({
          ...opt,
          isCorrect: opt.id === optionId,
        }));
        return {
          ...q,
          correctOption: optionId,
          options: updatedOptions,
          isCompleted: Boolean(q.stem),
        };
      })
    );
    showAlert('success', `Đã cập nhật đáp án đúng của câu thành (${optionId}).`);
  };

  // Thêm câu hỏi trắng mới vào cuối danh sách
  const handleAddNewBlankQuestion = () => {
    const nextNum = questions.length + 1;
    const newQuestion = {
      id: Date.now(),
      number: nextNum,
      type: 'Trắc nghiệm 1 đáp án',
      points: '1.00 Điểm',
      bloom: 'Thông hiểu',
      stem: '',
      correctOption: 'A',
      isCompleted: false,
      options: [
        { id: 'A', text: '', isCorrect: true },
        { id: 'B', text: '', isCorrect: false },
        { id: 'C', text: '', isCorrect: false },
        { id: 'D', text: '', isCorrect: false },
      ],
    };

    setQuestions((prev) => [...prev, newQuestion]);
    setCurrentQuestionId(newQuestion.id);
    showAlert('success', `Đã thêm Câu ${nextNum} vào đề thi.`);

    if (viewMode === 'list') {
      setTimeout(() => {
        const el = document.getElementById(`exam-question-${newQuestion.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  // Thêm các câu hỏi đã chọn từ Ngân hàng câu hỏi
  const handleAddFromQuestionBank = (selectedBankQuestions) => {
    const currentLen = questions.length;
    const newItems = selectedBankQuestions.map((bq, i) => {
      const num = currentLen + i + 1;
      const correctOpt = bq.options?.find((o) => o.isCorrect)?.key || 'A';
      return {
        id: Date.now() + i,
        number: num,
        type: 'Trắc nghiệm 1 đáp án',
        points: '1.00 Điểm',
        bloom: bq.bloom
          ? bq.bloom.charAt(0).toUpperCase() + bq.bloom.slice(1).toLowerCase()
          : 'Thông hiểu',
        stem: bq.content || '',
        correctOption: correctOpt,
        isCompleted: true,
        options: bq.options
          ? bq.options.map((opt) => ({
              id: opt.key,
              text: opt.text,
              isCorrect: opt.isCorrect,
            }))
          : [
              { id: 'A', text: '', isCorrect: true },
              { id: 'B', text: '', isCorrect: false },
              { id: 'C', text: '', isCorrect: false },
              { id: 'D', text: '', isCorrect: false },
            ],
      };
    });

    setQuestions((prev) => [...prev, ...newItems]);
    const firstAddedId = newItems[0]?.id;
    if (firstAddedId) {
      setCurrentQuestionId(firstAddedId);
      if (viewMode === 'list') {
        setTimeout(() => {
          const el = document.getElementById(`exam-question-${firstAddedId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 120);
      }
    }
    showAlert(
      'success',
      `Đã thêm thành công ${newItems.length} câu hỏi từ Ngân hàng câu hỏi vào đề thi!`
    );
  };

  // Gỡ câu hỏi khỏi đề thi
  const handleRemoveQuestion = (questionId) => {
    if (questions.length <= 1) {
      showAlert('error', 'Đề thi phải có ít nhất 1 câu hỏi!');
      return;
    }

    setQuestions((prev) => {
      const filtered = prev.filter((q) => q.id !== questionId);
      return filtered.map((q, idx) => ({
        ...q,
        number: idx + 1,
      }));
    });

    if (currentQuestionId === questionId) {
      const remaining = questions.filter((q) => q.id !== questionId);
      if (remaining.length > 0) {
        setCurrentQuestionId(remaining[0].id);
      }
    }

    showAlert('success', 'Đã gỡ câu hỏi khỏi đề thi.');
  };

  // Chuyển sang câu hỏi trước
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      const prevId = questions[currentIndex - 1].id;
      setCurrentQuestionId(prevId);
      if (viewMode === 'list') {
        document.getElementById(`exam-question-${prevId}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  };

  // Chuyển sang câu hỏi tiếp theo
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const nextId = questions[currentIndex + 1].id;
      setCurrentQuestionId(nextId);
      if (viewMode === 'list') {
        document.getElementById(`exam-question-${nextId}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  };

  // Chọn câu hỏi từ ma trận bên phải
  const handleSelectQuestionFromMatrix = (qId) => {
    setCurrentQuestionId(qId);
    if (viewMode === 'list') {
      const el = document.getElementById(`exam-question-${qId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Chuyển sang chế độ soạn chi tiết cho câu hỏi cụ thể
  const handleEditDetail = (qId) => {
    setCurrentQuestionId(qId);
    setViewMode('editor');
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  const showAlert = (type, message) => {
    setAlertInfo({ type, message });
    setTimeout(() => {
      setAlertInfo(null);
    }, 3500);
  };

  // Lưu thay đổi
  const handleSave = () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setLastSavedTime(timeStr);
    showAlert('success', 'Đã lưu thành công toàn bộ thay đổi của đề thi!');
  };

  // Lưu & Xuất bản đề
  const handlePublish = () => {
    handleSave();
    showAlert('success', 'Đề thi đã được xuất bản thành công vào kho đề chính thức!');
    setTimeout(() => {
      navigate(`/teacher/exams/${subjectId || 'math'}/list`);
    }, 1200);
  };

  // Mở popup đẩy file lên
  const handleImportFile = () => {
    setIsImportModalOpen(true);
  };

  // Xử lý nạp câu hỏi thành công từ file
  const handleImportSuccess = (importedQuestions, mode, fileName) => {
    if (mode === 'replace') {
      const renumbered = importedQuestions.map((q, idx) => ({
        ...q,
        number: idx + 1,
      }));
      setQuestions(renumbered);
      setCurrentQuestionId(renumbered[0]?.id || 1);
      showAlert(
        'success',
        `Đã thay thế toàn bộ đề thi bằng ${renumbered.length} câu hỏi nạp từ file "${fileName}"!`
      );
    } else {
      const currentLen = questions.length;
      const renumbered = importedQuestions.map((q, idx) => ({
        ...q,
        number: currentLen + idx + 1,
      }));
      setQuestions((prev) => [...prev, ...renumbered]);
      const firstId = renumbered[0]?.id;
      if (firstId) {
        setCurrentQuestionId(firstId);
        if (viewMode === 'list') {
          setTimeout(() => {
            document.getElementById(`exam-question-${firstId}`)?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }, 120);
        }
      }
      showAlert(
        'success',
        `Đã thêm thành công ${renumbered.length} câu hỏi từ file "${fileName}" vào đề thi!`
      );
    }
  };

  // Xuất File
  const handleExportFile = () => {
    showAlert('success', 'Đang chuẩn bị file tải về (PDF & Word)...');
  };

  const handleBack = () => {
    navigate(`/teacher/exams/${subjectId || 'math'}/list`);
  };

  return (
    <div className="ee-page-wrapper">
      {/* 1. Thanh Header / Status trên cùng */}
      <ExamEditHeaderBar
        exam={{
          ...initialData,
          title: examInfo.title,
        }}
        totalQuestions={questions.length}
        onBack={handleBack}
        onImportFile={handleImportFile}
        onExportFile={handleExportFile}
        onSave={handleSave}
      />

      {/* Thông báo Alert Toast */}
      {alertInfo && (
        <div
          style={{
            maxWidth: '1280px',
            margin: '16px auto 0',
            padding: '10px 24px',
            borderRadius: '6px',
            fontSize: '14px',
            background: alertInfo.type === 'error' ? '#FEE2E2' : '#DCFCE7',
            color: alertInfo.type === 'error' ? '#991B1B' : '#166534',
            border: `1px solid ${alertInfo.type === 'error' ? '#FCA5A5' : '#86EFAC'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10,
          }}
        >
          <span>{alertInfo.type === 'error' ? '⚠️' : '✅'}</span>
          <span>{alertInfo.message}</span>
        </div>
      )}

      {/* 2. MAIN 2-COLUMN WORKSPACE */}
      <main className="ee-workspace-container">
        {/* CỘT TRÁI: Metadata & Danh sách / Soạn thảo câu hỏi */}
        <div className="ee-col-left">
          {/* BLOCK 1: OVERVIEW METADATA */}
          <ExamEditMetadataCard
            examInfo={examInfo}
            onChange={handleMetadataChange}
          />

          {/* THANH CHUYỂN ĐỔI CHẾ ĐỘ HIỂN THỊ: DANH SÁCH TOÀN BỘ VS SOẠN TỪNG CÂU */}
          <div className="ee-view-tabs">
            <button
              type="button"
              className={`ee-view-tab ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Hiển thị toàn bộ câu hỏi xếp thành danh sách giống như xem chi tiết câu hỏi"
            >
              <IconFileText width={16} height={16} color="currentColor" />
              <span>Danh sách toàn bộ câu hỏi ({questions.length} câu)</span>
            </button>

            <button
              type="button"
              className={`ee-view-tab ${viewMode === 'editor' ? 'active' : ''}`}
              onClick={() => setViewMode('editor')}
              title="Biên soạn sâu từng từ và phương án của câu đang chọn"
            >
              <IconEdit width={15} height={15} color="currentColor" />
              <span>Soạn thảo chi tiết (Câu {currentIndex + 1})</span>
            </button>
          </div>

          {/* BLOCK 2: NỘI DUNG THEO CHẾ ĐỘ ĐANG CHỌN */}
          {viewMode === 'list' ? (
            <ExamEditQuestionList
              questions={questions}
              currentQuestionId={currentQuestionId}
              onSelectQuestion={setCurrentQuestionId}
              onEditDetail={handleEditDetail}
              onRemoveQuestion={handleRemoveQuestion}
              onSelectCorrectOption={handleSelectCorrectOptionInList}
              onOpenSelectModal={() => setIsSelectModalOpen(true)}
            />
          ) : (
            <ExamEditQuestionEditor
              question={currentQuestion}
              onStemChange={handleStemChange}
              onOptionChange={handleOptionChange}
              onSelectCorrectOption={handleSelectCorrectOption}
            />
          )}
        </div>

        {/* CỘT PHẢI: QUESTION MATRIX PALETTE (4x4 GRID HOẶC MỞ RỘNG) */}
        <div className="ee-col-right">
          <ExamEditMatrixSidebar
            questions={questions}
            currentQuestionId={currentQuestionId}
            onSelectQuestion={handleSelectQuestionFromMatrix}
            onAddQuestion={() => setIsSelectModalOpen(true)}
          />
        </div>
      </main>

      {/* 3. BOTTOM ACTION BAR (FOOTER BAR) */}
      <ExamEditBottomBar
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        onPrev={handlePrevQuestion}
        onNext={handleNextQuestion}
        onPublish={handlePublish}
        lastSavedTime={lastSavedTime}
      />

      {/* 4. POPUP: CHỌN CÂU HỎI TỪ NGÂN HÀNG CÂU HỎI */}
      <SelectQuestionsModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onAddSelected={handleAddFromQuestionBank}
        existingCount={questions.length}
      />

      {/* 5. POPUP: ĐẨY FILE ĐỀ THI LÊN */}
      <ImportExamFileModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={handleImportSuccess}
        currentCount={questions.length}
      />
    </div>
  );
}
