import React from 'react';

/**
 * CreateSolutionEditor - Card 3: Lời giải chi tiết & Phương pháp giải (Không bắt buộc)
 */
export default function CreateSolutionEditor({ solution, onChangeSolution }) {
  const handleInsertMath = () => {
    const math = prompt('Nhập công thức toán (LaTeX):', '\\Delta = b^2 - 4ac');
    if (math) {
      onChangeSolution((prev) => `${prev} $${math}$`);
    }
  };

  return (
    <div className="qc-card qc-solution-card">
      {/* 1. Header */}
      <div className="qc-card-header">
        <div className="qc-card-label">
          <span className="qc-step-badge qc-step-badge--soft">3</span>
          <h2 className="qc-card-title">Lời giải chi tiết & Phương pháp giải</h2>
        </div>
        <span className="qc-optional-badge">Không bắt buộc</span>
      </div>

      {/* 2. Mini Solution Editor */}
      <div className="qc-solution-editor-box">
        <div className="qc-solution-toolbar">
          <button
            type="button"
            className="qc-solution-math-btn"
            onClick={handleInsertMath}
          >
            Chèn công thức toán
          </button>
        </div>

        <div className="qc-solution-textarea-wrapper">
          <textarea
            className="qc-solution-textarea"
            value={solution}
            onChange={(e) => onChangeSolution(e.target.value)}
            placeholder="Nhập hướng dẫn giải hoặc lời giải chi tiết (nếu có)..."
            rows={5}
          />
        </div>
      </div>
    </div>
  );
}
