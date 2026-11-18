import React from 'react';
import {
  IconEdit,
  IconTrash,
  IconCheck,
} from '../../../../components/ui/icons';

/**
 * ExamQuestionItem
 * Thẻ hiển thị từng câu hỏi chi tiết trong đề thi (có đồ thị vector minh họa & đáp án đúng nổi bật)
 */
export default function ExamQuestionItem({
  question,
  isFocused = false,
  onEditQuestion,
  onRemoveQuestion,
}) {
  return (
    <article
      id={`exam-question-${question.id}`}
      className={`ed-question-card ${isFocused ? 'is-focused' : ''}`}
    >
      {/* Card Header */}
      <div className="ed-q-header">
        <div className="ed-q-meta-left">
          <span className="ed-q-number-badge">{question.numberLabel}</span>
          <span className="ed-q-bloom-badge">{question.bloomLabel}</span>
          <span className="ed-q-meta-text">{question.points}</span>
          <span className="ed-q-meta-sep" aria-hidden="true">•</span>
          <span className="ed-q-meta-text">{question.chapterName}</span>
        </div>

        <div className="ed-q-actions">
          <button
            type="button"
            className="ed-q-icon-btn"
            title={`Chỉnh sửa ${question.numberLabel}`}
            aria-label={`Chỉnh sửa ${question.numberLabel}`}
            onClick={() => onEditQuestion?.(question)}
          >
            <IconEdit width={13} height={14} color="currentColor" />
          </button>

          <button
            type="button"
            className="ed-q-icon-btn ed-q-icon-btn--danger"
            title={`Gỡ ${question.numberLabel} khỏi đề`}
            aria-label={`Gỡ ${question.numberLabel} khỏi đề`}
            onClick={() => onRemoveQuestion?.(question)}
          >
            <IconTrash width={12} height={13.5} color="currentColor" />
          </button>
        </div>
      </div>

      {/* Question Stem */}
      <div className="ed-q-body">
        <p className="ed-q-stem">
          {question.stemParts.map((part, idx) =>
            part.isMath ? (
              <span key={idx} className="ed-math-expr">
                {part.text}
              </span>
            ) : (
              <React.Fragment key={idx}>{part.text}</React.Fragment>
            )
          )}
        </p>

        {/* Illustrated Clean Vector Graph (Hiển thị khi câu hỏi có đồ thị) */}
        {question.hasGraph && (
          <div className="ed-graph-box" role="img" aria-label="Đồ thị hàm số bậc ba y = f(x) có cực đại tại (-1; 2) và cực tiểu tại (1; -2)">
            <svg
              viewBox="0 0 360 176"
              className="ed-graph-svg"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Coordinate Axes */}
              {/* Ox axis */}
              <line
                x1="74"
                y1="88"
                x2="286"
                y2="88"
                stroke="rgba(11, 28, 48, 0.25)"
                strokeWidth="1.32"
              />
              <polygon points="288,88 280,84.5 280,91.5" fill="rgba(11, 28, 48, 0.4)" />
              <text x="279" y="103" fill="#0B1C30" fillOpacity="0.7" fontSize="10.5" fontFamily="Inter, sans-serif">
                x
              </text>

              {/* Oy axis */}
              <line
                x1="180"
                y1="168"
                x2="180"
                y2="10"
                stroke="rgba(11, 28, 48, 0.25)"
                strokeWidth="1.32"
              />
              <polygon points="180,8 176.5,16 183.5,16" fill="rgba(11, 28, 48, 0.4)" />
              <text x="187" y="18" fill="#0B1C30" fillOpacity="0.7" fontSize="10.5" fontFamily="Inter, sans-serif">
                y
              </text>

              {/* Origin O */}
              <text x="184" y="101" fill="#0B1C30" fillOpacity="0.6" fontSize="9.7" fontFamily="Inter, sans-serif">
                O
              </text>

              {/* Dashed projection lines for Local Max (-1, 2) -> (136, 35) */}
              <line
                x1="136"
                y1="88"
                x2="136"
                y2="35"
                stroke="rgba(11, 28, 48, 0.4)"
                strokeWidth="0.9"
                strokeDasharray="3 3"
              />
              <line
                x1="136"
                y1="35"
                x2="180"
                y2="35"
                stroke="rgba(11, 28, 48, 0.4)"
                strokeWidth="0.9"
                strokeDasharray="3 3"
              />
              <text x="129" y="102" fill="#0B1C30" fillOpacity="0.8" fontSize="9" fontFamily="Inter, sans-serif">
                -1
              </text>
              <text x="185" y="38" fill="#0B1C30" fillOpacity="0.8" fontSize="9" fontFamily="Inter, sans-serif">
                2
              </text>

              {/* Dashed projection lines for Local Min (1, -2) -> (224, 141) */}
              <line
                x1="224"
                y1="88"
                x2="224"
                y2="141"
                stroke="rgba(11, 28, 48, 0.4)"
                strokeWidth="0.9"
                strokeDasharray="3 3"
              />
              <line
                x1="180"
                y1="141"
                x2="224"
                y2="141"
                stroke="rgba(11, 28, 48, 0.4)"
                strokeWidth="0.9"
                strokeDasharray="3 3"
              />
              <text x="221" y="83" fill="#0B1C30" fillOpacity="0.8" fontSize="9" fontFamily="Inter, sans-serif">
                1
              </text>
              <text x="185" y="144" fill="#0B1C30" fillOpacity="0.8" fontSize="9" fontFamily="Inter, sans-serif">
                -2
              </text>

              {/* Cubic Curve y = x³ - 3x */}
              <path
                d="M 96 165 C 110 85, 120 35, 136 35 C 156 35, 165 88, 180 88 C 195 88, 204 141, 224 141 C 240 141, 250 91, 264 13"
                fill="none"
                stroke="#0051D5"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* Local Max dot (#0051D5) & Local Min dot (#069669) */}
              <circle cx="136" cy="35" r="3.5" fill="#0051D5" />
              <circle cx="224" cy="141" r="3.5" fill="#069669" />
            </svg>
          </div>
        )}

        {/* Option Stack (2x2 Grid) */}
        <div className="ed-options-grid">
          {question.options.map((opt) => (
            <div
              key={opt.key}
              className={`ed-option-card ${opt.isCorrect ? 'is-correct' : ''}`}
            >
              <div className="ed-option-left">
                <span className="ed-option-letter">{opt.key}</span>
                <span className="ed-option-text">{opt.text}</span>
              </div>

              {opt.isCorrect && (
                <div className="ed-correct-pill">
                  <IconCheck width={12} height={12} color="#069669" />
                  <span>ĐÁP ÁN ĐÚNG</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
