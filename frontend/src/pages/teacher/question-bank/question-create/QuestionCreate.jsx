import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import CreateHeaderActionBar from './CreateHeaderActionBar';
import CreateStemEditor from './CreateStemEditor';
import CreateAnswerOptions from './CreateAnswerOptions';
import CreateSolutionEditor from './CreateSolutionEditor';
import CreateTaxonomyPanel from './CreateTaxonomyPanel';
import CreateSettingsPanel from './CreateSettingsPanel';
import { INITIAL_CREATE_QUESTION } from './questionCreateData';
import './question-create.css';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

/**
 * QuestionCreate - Màn hình Thêm câu hỏi mới (EduQuiz Studio)
 * Tuyệt đối tuân thủ Auto layout và thiết kế Figma:
 * - Standalone In-Canvas Header với 4 nút hành động
 * - Lưới 2 cột bất đối xứng (Trái 8 cột / Phải 4 cột)
 * - Card 1: Soạn thảo đề bài (Rich Text & Công thức Toán)
 * - Card 2: Các phương án lựa chọn (A, B, C, D) & chọn đáp án đúng
 * - Card 3: Hướng dẫn giải chi tiết (Không bắt buộc)
 * - Cột phải Card A: Phân loại học thuật (Môn, Lớp, Chương, Bài, Thang Bloom)
 * - Cột phải Card B: Cài đặt & Điểm số (Điểm mặc định, Xáo trộn)
 */
export default function QuestionCreate() {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const location = useLocation();

  // Khởi tạo state câu hỏi mới
  const [question, setQuestion] = useState({
    ...INITIAL_CREATE_QUESTION,
    taxonomy: {
      ...INITIAL_CREATE_QUESTION.taxonomy,
      subject: subjectId || INITIAL_CREATE_QUESTION.taxonomy.subject,
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  // 1. Cập nhật đề bài
  const handleChangeStem = (stemText) => {
    setQuestion((prev) => ({ ...prev, stem: stemText }));
  };

  // 2. Chọn đáp án đúng
  const handleSelectCorrect = (optId) => {
    setQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt) => ({
        ...opt,
        isCorrect: opt.id === optId,
      })),
    }));
  };

  // 3. Sửa nội dung phương án
  const handleChangeOptionText = (optId, text) => {
    setQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt) =>
        opt.id === optId ? { ...opt, text } : opt
      ),
    }));
  };

  // 4. Xóa phương án lựa chọn
  const handleDeleteOption = (optId) => {
    if (question.options.length <= 2) {
      alert('Câu hỏi trắc nghiệm cần tối thiểu 2 phương án lựa chọn.');
      return;
    }
    setQuestion((prev) => {
      const remaining = prev.options.filter((opt) => opt.id !== optId);
      // Đánh số lại chữ cái A, B, C...
      const reindexed = remaining.map((opt, idx) => ({
        ...opt,
        letter: OPTION_LETTERS[idx] || String.fromCharCode(65 + idx),
      }));
      // Nếu phương án xóa là đáp án đúng, tự động gán đáp án đầu tiên là đúng
      const hasCorrect = reindexed.some((opt) => opt.isCorrect);
      if (!hasCorrect && reindexed.length > 0) {
        reindexed[0].isCorrect = true;
      }
      return { ...prev, options: reindexed };
    });
  };

  // 5. Thêm phương án lựa chọn mới
  const handleAddOption = () => {
    if (question.options.length >= 8) {
      alert('Tối đa 8 phương án lựa chọn cho một câu hỏi.');
      return;
    }
    setQuestion((prev) => {
      const nextIndex = prev.options.length;
      const nextLetter = OPTION_LETTERS[nextIndex] || String.fromCharCode(65 + nextIndex);
      const newOption = {
        id: `opt_${Date.now()}_${nextIndex}`,
        letter: nextLetter,
        text: '',
        isCorrect: false,
      };
      return {
        ...prev,
        options: [...prev.options, newOption],
      };
    });
  };

  // 6. Cập nhật lời giải
  const handleChangeSolution = (solutionText) => {
    setQuestion((prev) => ({ ...prev, solution: solutionText }));
  };

  // 7. Cập nhật phân loại học thuật
  const handleChangeTaxonomy = (updater) => {
    setQuestion((prev) => ({
      ...prev,
      taxonomy: typeof updater === 'function' ? updater(prev.taxonomy) : updater,
    }));
  };

  // 8. Cập nhật cài đặt & điểm số
  const handleChangeSettings = (updater) => {
    setQuestion((prev) => ({
      ...prev,
      settings: typeof updater === 'function' ? updater(prev.settings) : updater,
    }));
  };

  // Kiểm tra tính hợp lệ của câu hỏi
  const validateQuestion = () => {
    if (!question.stem.trim()) {
      alert('Vui lòng nhập nội dung đề bài câu hỏi.');
      return false;
    }
    const emptyOption = question.options.find((opt) => !opt.text.trim());
    if (emptyOption) {
      alert(`Vui lòng nhập nội dung cho phương án ${emptyOption.letter}.`);
      return false;
    }
    const hasCorrect = question.options.some((opt) => opt.isCorrect);
    if (!hasCorrect) {
      alert('Vui lòng chọn ít nhất một đáp án đúng bằng cách đánh dấu vào nút tròn.');
      return false;
    }
    return true;
  };

  // Điều hướng quay lại
  const handleBack = () => {
    navigate(-1);
  };

  // Hủy bỏ
  const handleCancel = () => {
    if (question.stem || question.options.some((opt) => opt.text)) {
      if (window.confirm('Bạn có thay đổi chưa lưu. Bạn có chắc chắn muốn hủy không?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  // Xem trước câu hỏi
  const handlePreview = () => {
    const correctOpt = question.options.find((o) => o.isCorrect);
    alert(
      `XEM TRƯỚC CÂU HỎI:\n\nĐề bài: ${question.stem || '(Trống)'}\n\nCác đáp án:\n${question.options
        .map((o) => `${o.letter}. ${o.text || '(Chưa nhập)'} ${o.isCorrect ? '★ (ĐÚNG)' : ''}`)
        .join('\n')}\n\nĐáp án đúng: ${correctOpt ? correctOpt.letter : 'Chưa chọn'}`
    );
  };

  // Lưu câu hỏi
  const handleSave = () => {
    if (!validateQuestion()) return;

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Lưu câu hỏi mới thành công vào Ngân hàng câu hỏi!');
      navigate(-1);
    }, 400);
  };

  // Lưu & Thêm câu khác
  const handleSaveAndAddAnother = () => {
    if (!validateQuestion()) return;

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Đã lưu câu hỏi thành công! Form đã được làm mới để nhập câu tiếp theo.');
      // Reset nội dung đề bài và đáp án, giữ nguyên cấu hình phân loại
      setQuestion((prev) => ({
        ...INITIAL_CREATE_QUESTION,
        taxonomy: prev.taxonomy,
        settings: prev.settings,
      }));
    }, 400);
  };

  return (
    <div className="qc-create-page">
      {/* 1. Top Navigation & Action Bar */}
      <CreateHeaderActionBar
        onBack={handleBack}
        onCancel={handleCancel}
        onPreview={handlePreview}
        onSaveAndAddAnother={handleSaveAndAddAnother}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* 2. Main Canvas Grid (2 Columns) */}
      <main className="qc-main-canvas">
        {/* CỘT TRÁI (8 Cột / ~68%): Question Canvas */}
        <section className="qc-left-column">
          {/* Card 1: Question Stem Editor */}
          <CreateStemEditor
            stem={question.stem}
            onChangeStem={handleChangeStem}
          />

          {/* Card 2: Question Options */}
          <CreateAnswerOptions
            options={question.options}
            onSelectCorrect={handleSelectCorrect}
            onChangeOptionText={handleChangeOptionText}
            onDeleteOption={handleDeleteOption}
            onAddOption={handleAddOption}
          />

          {/* Card 3: Detailed Solution Editor */}
          <CreateSolutionEditor
            solution={question.solution}
            onChangeSolution={handleChangeSolution}
          />
        </section>

        {/* CỘT PHẢI (4 Cột / ~32%): Taxonomy & Settings Panel */}
        <aside className="qc-right-column">
          {/* Card A: Taxonomy & Knowledge Matrix */}
          <CreateTaxonomyPanel
            taxonomy={question.taxonomy}
            onChangeTaxonomy={handleChangeTaxonomy}
          />

          {/* Card B: Settings & Scoring */}
          <CreateSettingsPanel
            settings={question.settings}
            onChangeSettings={handleChangeSettings}
          />
        </aside>
      </main>
    </div>
  );
}
