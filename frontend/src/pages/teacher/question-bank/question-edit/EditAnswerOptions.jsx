import React from 'react';
import {
  IconCheck,
  IconTrash,
  IconImage,
  IconPlus,
} from '../../../../components/ui/icons';

/**
 * EditAnswerOptions
 * Card chỉnh sửa các phương án lựa chọn (Phần 2):
 * - Danh sách phương án A, B, C, D
 * - Radio chọn đáp án đúng duy nhất
 * - Chỉnh sửa nội dung đáp án inline
 * - Huy hiệu 'ĐÁP ÁN ĐÚNG'
 * - Nút thêm phương án lựa chọn mới
 */
export default function EditAnswerOptions({
  options,
  onSelectCorrect,
  onChangeOptionText,
  onDeleteOption,
  onAddOption,
}) {
  return (
    <div className="qe-card qe-card-options">
      {/* 1. Header with Badge & Instruction */}
      <div className="qe-options-header">
        <div className="qe-options-header-left">
          <div className="qe-step-badge">2</div>
          <div>
            <div className="qe-card-title-row">
              <h2 className="qe-card-heading">Các phương án lựa chọn</h2>
              <span className="qe-badge-correct-count">1 ĐÁP ÁN ĐÚNG</span>
            </div>
            <p className="qe-card-subtext">
              Đánh dấu radio tròn để chọn phương án là đáp án đúng
            </p>
          </div>
        </div>
      </div>

      {/* 2. Options List */}
      <div className="qe-options-list">
        {options.map((opt) => {
          const isCorrect = opt.isCorrect;
          return (
            <div
              key={opt.id}
              className={`qe-option-item ${isCorrect ? 'is-correct-choice' : ''}`}
            >
              {/* Radio check trigger */}
              <label className="qe-radio-label">
                <input
                  type="radio"
                  name="correct-option"
                  className="qe-radio-input"
                  checked={isCorrect}
                  onChange={() => onSelectCorrect(opt.id)}
                />
                <span className="qe-radio-custom" />
              </label>

              {/* Letter indicator (A, B, C, D) */}
              <div
                className={`qe-option-letter ${
                  isCorrect ? 'is-letter-active' : ''
                }`}
              >
                {opt.letter}
              </div>

              {/* Text input */}
              <div className="qe-option-input-wrap">
                <input
                  type="text"
                  className="qe-option-input"
                  value={opt.text}
                  onChange={(e) => onChangeOptionText(opt.id, e.target.value)}
                  placeholder={`Nội dung phương án ${opt.letter}...`}
                />
              </div>

              {/* Badges & Actions */}
              <div className="qe-option-actions">
                {isCorrect && (
                  <div className="qe-correct-badge">
                    <IconCheck width={12} height={12} color="#FFFFFF" />
                    <span>ĐÁP ÁN ĐÚNG</span>
                  </div>
                )}

                <button
                  type="button"
                  className="qe-btn-icon-subtle"
                  title="Thêm hình ảnh cho phương án này"
                  onClick={() => {}}
                >
                  <IconImage width={14} height={14} color="#76777D" />
                </button>

                {options.length > 2 && (
                  <button
                    type="button"
                    className="qe-btn-icon-subtle qe-btn-icon-danger"
                    title={`Xóa phương án ${opt.letter}`}
                    onClick={() => onDeleteOption(opt.id)}
                  >
                    <IconTrash width={13} height={13} color="#93000A" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Add Option Button */}
      <div className="qe-add-option-wrapper">
        <button
          type="button"
          className="qe-add-option-btn"
          onClick={onAddOption}
        >
          <IconPlus width={14} height={14} color="#0051D5" />
          <span>Thêm phương án lựa chọn</span>
        </button>
      </div>
    </div>
  );
}
