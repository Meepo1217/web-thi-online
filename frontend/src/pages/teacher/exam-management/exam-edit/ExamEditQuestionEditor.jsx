import React from 'react';

/**
 * ExamEditQuestionEditor
 * BLOCK 2: QUESTION EDITOR CARD
 * Trình biên soạn chi tiết câu hỏi đang được chọn trong ma trận đề
 */
export default function ExamEditQuestionEditor({
  question,
  onStemChange,
  onOptionChange,
  onSelectCorrectOption,
}) {
  if (!question) {
    return (
      <div className="ee-question-editor-card">
        <p style={{ color: '#64748B', textAlign: 'center', margin: '24px 0' }}>
          Vui lòng chọn một câu hỏi từ Ma trận bên phải để chỉnh sửa.
        </p>
      </div>
    );
  }

  const questionNumStr = String(question.number).padStart(2, '0');

  return (
    <section className="ee-question-editor-card" aria-label={`Soạn thảo Câu ${question.number}`}>
      {/* 1. Header câu hỏi: Badge Số câu + Loại câu + Điểm số */}
      <div className="ee-question-meta-bar">
        <div className="ee-question-meta-left">
          <span className="ee-question-num-badge">CÂU {questionNumStr}</span>
          <span className="ee-question-type-text">{question.type || 'Trắc nghiệm 1 đáp án'}</span>
          <span className="ee-question-points-pill">{question.points || '1.00 Điểm'}</span>
        </div>
      </div>

      {/* 2. Nội dung câu hỏi (Stem) */}
      <div className="ee-stem-group">
        <label htmlFor={`stem-input-${question.id}`} className="ee-form-label">
          Nội dung câu hỏi:
        </label>
        <textarea
          id={`stem-input-${question.id}`}
          className="ee-stem-textarea"
          rows={3}
          value={question.stem || ''}
          onChange={(e) => onStemChange(e.target.value)}
          placeholder="Nhập nội dung câu hỏi, định dạng bài toán hoặc biểu thức..."
        />
      </div>

      {/* 3. Các phương án lựa chọn (A, B, C, D) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        <label className="ee-form-label">
          Các phương án lựa chọn (Chọn đáp án đúng):
        </label>

        <div className="ee-options-list">
          {question.options.map((option) => {
            const isCorrect = option.isCorrect || question.correctOption === option.id;

            return (
              <div
                key={option.id}
                className={`ee-option-row ${isCorrect ? 'selected' : 'unselected'}`}
                onClick={() => onSelectCorrectOption(option.id)}
              >
                {/* Radio button tròn */}
                <div className={`ee-radio-circle ${isCorrect ? 'selected' : 'unselected'}`}>
                  {isCorrect && <div className="ee-radio-dot" />}
                </div>

                {/* Ký tự phương án (A, B, C, D) */}
                <span className={`ee-option-letter ${isCorrect ? 'selected' : 'unselected'}`}>
                  {option.id}
                </span>

                {/* Ô nhập nội dung phương án */}
                <input
                  type="text"
                  className="ee-option-input"
                  value={option.text || ''}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => onOptionChange(option.id, e.target.value)}
                  placeholder={`Nhập nội dung lựa chọn ${option.id}...`}
                />

                {/* Badge Đáp án đúng nếu được chọn */}
                {isCorrect && (
                  <span className="ee-badge-correct">ĐÁP ÁN ĐÚNG</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
