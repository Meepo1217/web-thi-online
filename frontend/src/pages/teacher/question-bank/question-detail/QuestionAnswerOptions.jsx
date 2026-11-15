import React from 'react';
import { IconCheck } from '../../../../components/ui/icons';

/**
 * QuestionAnswerOptions
 * Thẻ hiển thị các phương án lựa chọn A, B, C, D
 * Đánh dấu nổi bật đáp án chính xác (B) kèm tỷ lệ lựa chọn của học sinh
 */
export default function QuestionAnswerOptions({ options }) {
  return (
    <div className="qd-options-card">
      {/* Header */}
      <div className="qd-options-header">
        <h2 className="qd-options-heading">Các phương án lựa chọn</h2>
        <span className="qd-options-subtext">Chọn 1 đáp án đúng</span>
      </div>

      {/* Options List */}
      <div className="qd-options-list">
        {options.map((opt) => (
          <div
            key={opt.key}
            className={`qd-option-row ${opt.isCorrect ? 'qd-option-row-correct' : ''}`}
          >
            {/* Left accent bar for correct option */}
            {opt.isCorrect && <span className="qd-option-correct-accent" />}

            {/* Left circle + text */}
            <div className="qd-option-left-content">
              <div
                className={`qd-option-circle ${
                  opt.isCorrect ? 'qd-circle-correct' : 'qd-circle-normal'
                }`}
              >
                {opt.key}
              </div>
              <span className={`qd-option-text ${opt.isCorrect ? 'qd-text-bold' : ''}`}>
                {opt.text}
              </span>
            </div>

            {/* Right badge / selection rate */}
            <div className="qd-option-right-content">
              {opt.isCorrect ? (
                <div className="qd-correct-badge">
                  <IconCheck width={13.33} height={13.33} color="#069669" />
                  <span>{opt.badgeText || 'ĐÁP ÁN CHÍNH XÁC'}</span>
                </div>
              ) : (
                <span className="qd-option-rate">{opt.percent} chọn</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
