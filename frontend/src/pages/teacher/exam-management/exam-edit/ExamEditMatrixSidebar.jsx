import React from 'react';
import { IconViewGrid, IconPlus } from '../../../../components/ui/icons';

/**
 * ExamEditMatrixSidebar
 * RIGHT COLUMN: QUESTION MATRIX PALETTE (WIREFRAME GRID 4x4)
 * Điều phối ma trận câu hỏi và theo dõi tiến độ hoàn thiện đề thi
 */
export default function ExamEditMatrixSidebar({
  questions = [],
  currentQuestionId,
  onSelectQuestion,
  onAddQuestion,
}) {
  const total = questions.length || 16;
  const completedCount = questions.filter((q) => q.isCompleted || (q.stem && q.correctOption)).length;
  const progressPercent = Math.round((completedCount / total) * 100);

  const completedCountStr = String(completedCount).padStart(2, '0');
  const totalStr = String(total).padStart(2, '0');

  return (
    <aside className="ee-matrix-card" aria-label="Ma trận câu hỏi 4x4">
      {/* 1. Header Ma trận & Bộ đếm tiến độ */}
      <div className="ee-matrix-header">
        <div className="ee-matrix-title-block">
          <div className="ee-matrix-heading-row">
            <span style={{ color: '#0051D5', display: 'flex' }}>
              <IconViewGrid width={15} height={15} color="#0051D5" />
            </span>
            <h2 className="ee-matrix-heading">Ma trận câu hỏi</h2>
          </div>
          <span className="ee-matrix-subtitle">{total} câu hỏi • Lưới ma trận</span>
        </div>

        <div className="ee-matrix-counter-block">
          <span className="ee-matrix-counter-val">
            {completedCountStr}/{totalStr}
          </span>
          <span className="ee-matrix-counter-label">ĐÃ HOÀN TẤT</span>
        </div>
      </div>

      {/* 2. Thanh hiển thị phần trăm tiến độ */}
      <div className="ee-matrix-progress-section">
        <div className="ee-matrix-progress-text-row">
          <span className="ee-matrix-progress-label">Tiến độ soạn đề</span>
          <span className="ee-matrix-progress-percent">{progressPercent}%</span>
        </div>

        <div className="ee-matrix-progress-track">
          <div
            className="ee-matrix-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3. Lưới ô vuông 4x4 (01 -> 16) */}
      <div className="ee-matrix-grid">
        {questions.map((q, idx) => {
          const isActive = q.id === currentQuestionId;
          const isDone = q.isCompleted || (q.stem && q.correctOption);

          let stateClass = 'inactive';
          if (isActive) {
            stateClass = 'active';
          } else if (isDone) {
            stateClass = 'completed-inactive';
          }

          return (
            <button
              key={q.id || idx}
              type="button"
              className={`ee-matrix-btn ${stateClass}`}
              onClick={() => onSelectQuestion(q.id)}
              title={`Chuyển đến Câu ${q.number || idx + 1}`}
            >
              {q.number || idx + 1}
            </button>
          );
        })}
      </div>

      {/* 4. Phím tắt thêm câu hỏi */}
      <button
        type="button"
        className="ee-btn-add-question"
        onClick={onAddQuestion}
        title="Thêm một câu hỏi trắc nghiệm mới vào cuối đề"
      >
        <IconPlus width={13} height={13} color="#0051D5" />
        <span>Thêm câu hỏi mới</span>
      </button>
    </aside>
  );
}