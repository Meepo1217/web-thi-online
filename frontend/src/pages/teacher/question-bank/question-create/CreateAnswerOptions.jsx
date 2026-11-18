import React from 'react';
import {
  IconGripVertical,
  IconCheck,
  IconFunction,
  IconImage,
  IconTrash,
  IconPlus,
} from '../../../../components/ui/icons';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

/**
 * CreateAnswerOptions - Card 2: Các phương án lựa chọn (Options A, B, C, D...)
 */
export default function CreateAnswerOptions({
  options,
  onSelectCorrect,
  onChangeOptionText,
  onDeleteOption,
  onAddOption,
}) {
  return (
    <div className="qc-card qc-options-card">
      {/* 1. Header */}
      <div className="qc-card-header qc-card-header--with-subtitle">
        <div className="qc-card-label">
          <span className="qc-step-badge qc-step-badge--primary">2</span>
          <h2 className="qc-card-title">Các phương án trả lời</h2>
          <span className="qc-required-star" aria-label="Bắt buộc">*</span>
        </div>
        <p className="qc-card-subtitle">
          Chọn một phương án đúng bằng cách đánh dấu vào ô tròn bên cạnh
        </p>
      </div>

      {/* 2. Options Stack */}
      <div className="qc-options-stack">
        {options.map((opt, index) => {
          const letter = OPTION_LETTERS[index] || opt.letter || String.fromCharCode(65 + index);
          const isSelected = opt.isCorrect;

          return (
            <div
              key={opt.id || index}
              className={`qc-option-row ${isSelected ? 'qc-option-row--selected' : ''}`}
            >
              {/* Drag handle */}
              <button
                type="button"
                className="qc-option-drag-handle"
                title="Kéo thả để sắp xếp lại vị trí"
                aria-label="Kéo thả vị trí"
              >
                <IconGripVertical width={9} height={14} color="#C6C6CD" />
              </button>

              {/* Custom Radio Selector */}
              <button
                type="button"
                className={`qc-option-radio ${isSelected ? 'qc-option-radio--checked' : ''}`}
                onClick={() => onSelectCorrect(opt.id)}
                title={`Đánh dấu đáp án ${letter} là đáp án đúng`}
                aria-checked={isSelected}
                role="radio"
              >
                {isSelected && (
                  <span className="qc-radio-check-icon">
                    <IconCheck width={12} height={10} color="#FFFFFF" />
                  </span>
                )}
              </button>

              {/* Option Letter Badge (A, B, C, D) */}
              <div className={`qc-option-badge ${isSelected ? 'qc-option-badge--active' : ''}`}>
                <span className="qc-option-badge-text">{letter}</span>
              </div>

              {/* Input text and option quick tools */}
              <div className="qc-option-input-block">
                <input
                  type="text"
                  className="qc-option-input"
                  value={opt.text}
                  onChange={(e) => onChangeOptionText(opt.id, e.target.value)}
                  placeholder={`Nhập nội dung phương án ${letter}...`}
                />

                <div className="qc-option-tools-row">
                  <button
                    type="button"
                    className="qc-option-tool-btn"
                    title="Chèn công thức toán vào phương án"
                    onClick={() => {
                      const formula = prompt('Nhập công thức toán (LaTeX):', '\\sqrt{x}');
                      if (formula) onChangeOptionText(opt.id, `${opt.text} $${formula}$`);
                    }}
                  >
                    <IconFunction width={12} height={12} color="#76777D" />
                  </button>

                  <button
                    type="button"
                    className="qc-option-tool-btn"
                    title="Đính kèm hình ảnh minh họa cho phương án"
                    onClick={() => {
                      const url = prompt('Nhập đường dẫn hình ảnh (URL):');
                      if (url) onChangeOptionText(opt.id, `${opt.text} [Hình: ${url}]`);
                    }}
                  >
                    <IconImage width={14} height={14} color="#76777D" />
                  </button>
                </div>
              </div>

              {/* Delete button */}
              <button
                type="button"
                className="qc-option-delete-btn"
                onClick={() => onDeleteOption(opt.id)}
                title={`Xóa phương án ${letter}`}
                disabled={options.length <= 2}
              >
                <IconTrash width={14} height={15} color="#C6C6CD" />
              </button>
            </div>
          );
        })}
      </div>

      {/* 3. Add Option Action */}
      <div className="qc-add-option-wrapper">
        <button
          type="button"
          className="qc-add-option-btn"
          onClick={onAddOption}
        >
          <span className="qc-add-option-icon">
            <IconPlus width={15} height={15} color="#0051D5" />
          </span>
          <span className="qc-add-option-text">Thêm phương án lựa chọn</span>
        </button>
      </div>
    </div>
  );
}
