import React from 'react';
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconSuperscript,
  IconSubscript,
  IconFunction,
  IconImage,
  IconTable,
  IconCode,
} from '../../../../components/ui/icons';

/**
 * CreateStemEditor - Card 1: Soạn thảo đề bài câu hỏi (Rich Text & Math Formula)
 */
export default function CreateStemEditor({ stem, onChangeStem }) {
  const charCount = stem ? stem.length : 0;
  const wordCount = stem ? stem.trim().split(/\s+/).filter(Boolean).length : 0;

  // Xử lý chèn cú pháp nhanh vào textarea
  const handleInsertTag = (tag) => {
    onChangeStem((prev) => `${prev} ${tag}`);
  };

  return (
    <div className="qc-card qc-stem-card">
      {/* 1. Card Header */}
      <div className="qc-card-header">
        <div className="qc-card-label">
          <span className="qc-step-badge qc-step-badge--primary">1</span>
          <h2 className="qc-card-title">Nội dung câu hỏi</h2>
          <span className="qc-required-star" aria-label="Bắt buộc">*</span>
        </div>
      </div>

      {/* 2. Formatting & Math Formula Toolbar */}
      <div className="qc-toolbar-wrapper">
        <div className="qc-toolbar">
          {/* Text Styling Group */}
          <div className="qc-toolbar-group">
            <button
              type="button"
              className="qc-tool-btn"
              title="In đậm (Ctrl+B)"
              onClick={() => handleInsertTag('**in đậm**')}
            >
              <IconBold width={8} height={11} color="#45464D" />
            </button>
            <button
              type="button"
              className="qc-tool-btn"
              title="In nghiêng (Ctrl+I)"
              onClick={() => handleInsertTag('*in nghiêng*')}
            >
              <IconItalic width={10} height={11} color="#45464D" />
            </button>
            <button
              type="button"
              className="qc-tool-btn"
              title="Gạch chân (Ctrl+U)"
              onClick={() => handleInsertTag('<u>gạch chân</u>')}
            >
              <IconUnderline width={11} height={14} color="#45464D" />
            </button>
            <button
              type="button"
              className="qc-tool-btn"
              title="Gạch ngang"
              onClick={() => handleInsertTag('~~gạch ngang~~')}
            >
              <IconStrikethrough width={15} height={12} color="#45464D" />
            </button>
          </div>

          <span className="qc-toolbar-sep" aria-hidden="true" />

          {/* Math Indices */}
          <div className="qc-toolbar-group">
            <button
              type="button"
              className="qc-tool-btn qc-tool-btn--text"
              title="Chỉ số trên (Số mũ: x²)"
              onClick={() => handleInsertTag('x^{2}')}
            >
              x²
            </button>
            <button
              type="button"
              className="qc-tool-btn qc-tool-btn--text"
              title="Chỉ số dưới (x₁)"
              onClick={() => handleInsertTag('x_{1}')}
            >
              x₁
            </button>
          </div>

          <span className="qc-toolbar-sep" aria-hidden="true" />

          {/* Mathematical Tools & Formula Inserters */}
          <div className="qc-toolbar-group">
            <button
              type="button"
              className="qc-tool-btn qc-tool-btn--highlight"
              title="Chèn công thức toán (LaTeX)"
              onClick={() => handleInsertTag('\\frac{-b \\pm \\sqrt{\\Delta}}{2a}')}
            >
              <span className="qc-formula-icon">∑</span>
              <span className="qc-formula-text">Chèn công thức</span>
            </button>
            <button
              type="button"
              className="qc-tool-btn qc-tool-btn--text"
              title="Chèn hàm số"
              onClick={() => handleInsertTag('f(x) = ax^3 + bx^2 + cx + d')}
            >
              Hàm số
            </button>
            <button
              type="button"
              className="qc-tool-btn qc-tool-btn--text"
              title="Chèn ký hiệu đặc biệt"
              onClick={() => handleInsertTag('∀x ∈ ℝ, ∃y: α ≤ β')}
            >
              Ký hiệu
            </button>
            <button
              type="button"
              className="qc-tool-btn qc-tool-btn--text"
              title="Chèn phân số"
              onClick={() => handleInsertTag('\\frac{a}{b}')}
            >
              Phân số
            </button>
          </div>

          <span className="qc-toolbar-sep" aria-hidden="true" />

          {/* Insert Media & Layout Objects */}
          <div className="qc-toolbar-group">
            <button
              type="button"
              className="qc-tool-btn"
              title="Chèn hình ảnh minh họa"
              onClick={() => {
                const url = prompt('Nhập đường dẫn hình ảnh (URL):');
                if (url) handleInsertTag(`![Hình minh họa](${url})`);
              }}
            >
              <IconImage width={14} height={14} color="#45464D" />
            </button>
            <button
              type="button"
              className="qc-tool-btn"
              title="Chèn bảng dữ liệu"
              onClick={() => handleInsertTag('\n| Cột 1 | Cột 2 |\n|---|---|\n| Giá trị 1 | Giá trị 2 |\n')}
            >
              <IconTable width={14} height={14} color="#45464D" />
            </button>
            <button
              type="button"
              className="qc-tool-btn"
              title="Chèn khối mã lệnh / thuật toán"
              onClick={() => handleInsertTag('\n```python\n# Nhập mã lệnh tại đây\n```\n')}
            >
              <IconCode width={15} height={9} color="#45464D" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Academic Editable Area */}
      <div className="qc-editable-area">
        <textarea
          className="qc-stem-textarea"
          value={stem}
          onChange={(e) => onChangeStem(e.target.value)}
          placeholder="Nhập nội dung đề bài câu hỏi tại đây..."
          rows={4}
        />

        {/* Bottom Information Row */}
        <div className="qc-editor-footer-row">
          <span className="qc-char-counter">
            {wordCount} TỪ • {charCount} KÝ TỰ
          </span>

          <div className="qc-format-indicator">
            <svg width={13} height={8} viewBox="0 0 13 8" fill="none">
              <path d="M1 4L4.5 7L12 1" stroke="#45464D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="qc-format-text">Hỗ trợ LaTeX / KaTeX</span>
          </div>
        </div>
      </div>
    </div>
  );
}
