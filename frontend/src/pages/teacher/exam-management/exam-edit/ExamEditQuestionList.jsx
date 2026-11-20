import React from 'react';
import {
  IconEdit,
  IconTrash,
  IconCheck,
  IconPlus,
} from '../../../../components/ui/icons';

/**
 * ExamEditQuestionList
 * Hiển thị toàn bộ câu hỏi trong đề thi xếp thành danh sách dọc
 * Chuẩn phong cách hiển thị "Xem chi tiết câu hỏi / Xem chi tiết đề thi"
 * Cho phép giáo viên:
 * - Xem lướt toàn bộ danh sách câu hỏi và 4 đáp án trực quan
 * - Bấm trực tiếp vào phương án bất kỳ để chuyển đáp án đúng nhanh chóng
 * - Bấm "Soạn chi tiết" để chuyển sang chế độ biên soạn sâu từng từ
 * - Bấm "Gỡ khỏi đề" để loại câu hỏi
 * - Thêm câu hỏi từ Ngân hàng hoặc tạo câu hỏi mới
 */
export default function ExamEditQuestionList({
  questions = [],
  currentQuestionId,
  onSelectQuestion,
  onEditDetail,
  onRemoveQuestion,
  onSelectCorrectOption,
  onOpenSelectModal,
}) {
  return (
    <div className="ee-list-wrapper">
      {/* 1. Header danh sách & Thống kê nhanh */}
      <div className="ee-list-header-bar">
        <div className="ee-list-header-left">
          <h2 className="ee-list-title">Danh sách câu hỏi trong đề thi</h2>
          <span className="ee-list-counter-tag">
            Tổng cộng {questions.length} câu hỏi
          </span>
        </div>

        <div className="ee-list-header-actions">
          <button
            type="button"
            className="ee-list-btn-bank"
            onClick={onOpenSelectModal}
            title="Mở ngân hàng câu hỏi để chọn thêm vào đề"
          >
            <IconPlus width={14} height={14} color="#0051D5" />
            <span>Thêm từ Ngân hàng câu hỏi</span>
          </button>
        </div>
      </div>

      {/* 2. Danh sách từng câu hỏi xếp theo thứ tự (Continuous Question Feed) */}
      <div className="ee-list-feed">
        {questions.map((q, idx) => {
          const isFocused = q.id === currentQuestionId;
          const numberLabel = `CÂU ${String(q.number || idx + 1).padStart(2, '0')}`;
          const isDone = q.isCompleted || (q.stem && q.correctOption);

          return (
            <article
              key={q.id || idx}
              id={`exam-question-${q.id}`}
              className={`ee-list-card ${isFocused ? 'is-focused' : ''}`}
              onClick={() => onSelectQuestion(q.id)}
            >
              {/* Card Header: Số câu, Mức độ, Điểm, Nút hành động */}
              <div className="ee-list-card-header">
                <div className="ee-list-meta-left">
                  <span className="ee-list-number-badge">{numberLabel}</span>
                  <span className="ee-list-bloom-badge">{q.bloom || 'Thông hiểu'}</span>
                  <span className="ee-list-points-badge">{q.points || '1.00 Điểm'}</span>
                  <span className={`ee-list-status-pill ${isDone ? 'is-done' : 'is-pending'}`}>
                    <span className="ee-list-status-dot" />
                    <span>{isDone ? 'Đã hoàn tất' : 'Chưa hoàn tất'}</span>
                  </span>
                </div>

                <div className="ee-list-actions-right">
                  <button
                    type="button"
                    className="ee-list-action-btn ee-list-action-btn--edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditDetail(q.id);
                    }}
                    title="Chuyển sang chế độ soạn thảo chi tiết câu này"
                  >
                    <IconEdit width={13} height={13} color="#0051D5" />
                    <span>Soạn chi tiết</span>
                  </button>

                  <button
                    type="button"
                    className="ee-list-action-btn ee-list-action-btn--danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveQuestion(q.id);
                    }}
                    title="Gỡ câu hỏi này khỏi đề thi"
                  >
                    <IconTrash width={13} height={13} color="#BA1A1A" />
                    <span>Gỡ</span>
                  </button>
                </div>
              </div>

              {/* Card Body: Nội dung câu hỏi (Stem) */}
              <div className="ee-list-card-body">
                <p className="ee-list-stem">
                  {q.stem ? (
                    q.stem
                  ) : (
                    <em style={{ color: '#94A3B8' }}>(Chưa nhập nội dung câu hỏi...)</em>
                  )}
                </p>

                {/* Option 2x2 Grid (A, B, C, D) */}
                <div className="ee-list-options-grid">
                  {q.options?.map((opt) => {
                    const isCorrect = opt.id === q.correctOption || opt.isCorrect;
                    return (
                      <div
                        key={opt.id}
                        className={`ee-list-option-card ${isCorrect ? 'is-correct' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCorrectOption(q.id, opt.id);
                        }}
                        title={`Bấm để chọn đáp án ${opt.id} là đáp án đúng`}
                      >
                        <div className="ee-list-opt-left">
                          <span className={`ee-list-opt-letter ${isCorrect ? 'is-correct' : ''}`}>
                            {opt.id}
                          </span>
                          <span className="ee-list-opt-text">
                            {opt.text || <em style={{ color: '#94A3B8' }}>Chưa nhập đáp án</em>}
                          </span>
                        </div>

                        {isCorrect && (
                          <div className="ee-list-opt-badge-correct" title="Đáp án chính xác">
                            <IconCheck width={13} height={13} color="#059669" />
                            <span>Đúng</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* 3. Bottom Action Strip của Danh sách */}
      <div className="ee-list-bottom-strip">
        <button
          type="button"
          className="ee-list-btn-add-bank"
          onClick={onOpenSelectModal}
        >
          <IconPlus width={16} height={16} color="#FFFFFF" />
          <span>Thêm câu hỏi từ Ngân hàng câu hỏi</span>
        </button>
      </div>
    </div>
  );
}
