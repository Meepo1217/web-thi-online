import React from 'react';
import { IconFolder } from '../../../../components/ui/icons';

/**
 * QuestionStemCard
 * Thẻ hiển thị đề bài câu hỏi + Bản vẽ đồ thị toán học SVG khoa học
 */
export default function QuestionStemCard({ question }) {
  return (
    <div className="qd-stem-card">
      {/* 6px Left Accent Bar */}
      <span className="qd-stem-left-accent" aria-hidden="true" />

      {/* Top Tag Row */}
      <div className="qd-stem-tags-row">
        <div className="qd-stem-subject-badge">
          <IconFolder width={14.67} height={10.67} color="#0051D5" />
          <span>{question.subjectGroup}</span>
        </div>

        <div className="qd-stem-bloom-badge">
          <span>MỨC ĐỘ: {question.bloom}</span>
        </div>
      </div>

      {/* Question Heading & Text */}
      <div className="qd-stem-content-block">
        <h2 className="qd-stem-heading">Nội dung câu hỏi:</h2>
        <p className="qd-stem-text">{question.stemText}</p>
      </div>

      {/* Scientific SVG Graph Canvas */}
      <div className="qd-graph-canvas-wrapper">
        <div className="qd-graph-card">
          {/* Graph Header */}
          <div className="qd-graph-header">
            <div className="qd-graph-title-left">
              <svg width="12.5" height="8.12" viewBox="0 0 16 11" fill="none">
                <path d="M1 9.5L5.5 3.5L9.5 7L15 1.5" stroke="#45464D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Đồ thị y = f(x)</span>
            </div>
            <span className="qd-graph-scale">Tỉ lệ 1:1</span>
          </div>

          {/* SVG Vector Coordinate System & Cubic Curve */}
          <div className="qd-svg-container">
            <svg
              viewBox="0 0 416 254"
              className="qd-math-svg"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Grid / Dashed lines for local extrema */}
              {/* Point (-1, 2): x = 125, y = 55 */}
              <line x1="125" y1="150" x2="125" y2="55" stroke="#0B1C30" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />
              <line x1="125" y1="55" x2="185" y2="55" stroke="#0B1C30" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />

              {/* Point (2, -2): x = 300, y = 205 */}
              <line x1="300" y1="150" x2="300" y2="205" stroke="#0B1C30" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />
              <line x1="185" y1="205" x2="300" y2="205" stroke="#0B1C30" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />

              {/* Ox axis (horizontal) */}
              <line x1="24" y1="150" x2="390" y2="150" stroke="#0B1C30" strokeWidth="1.8" />
              <polygon points="394,150 384,146 384,154" fill="#0B1C30" />
              <text x="398" y="154" fill="#0B1C30" fontSize="13" fontWeight="600" fontFamily="Inter">x</text>

              {/* Oy axis (vertical) */}
              <line x1="185" y1="235" x2="185" y2="18" stroke="#0B1C30" strokeWidth="1.8" />
              <polygon points="185,14 181,24 189,24" fill="#0B1C30" />
              <text x="170" y="20" fill="#0B1C30" fontSize="13" fontWeight="600" fontFamily="Inter">y</text>

              {/* Origin O */}
              <text x="172" y="166" fill="#0B1C30" fontSize="12" fontFamily="Inter">O</text>

              {/* Tick marks & labels */}
              {/* x = -1 */}
              <line x1="125" y1="147" x2="125" y2="153" stroke="#0B1C30" strokeWidth="1.5" />
              <text x="117" y="166" fill="#0B1C30" fontSize="11.5" fontFamily="Inter">-1</text>

              {/* x = 2 */}
              <line x1="300" y1="147" x2="300" y2="153" stroke="#0B1C30" strokeWidth="1.5" />
              <text x="296" y="166" fill="#0B1C30" fontSize="11.5" fontFamily="Inter">2</text>

              {/* y = 2 */}
              <line x1="182" y1="55" x2="188" y2="55" stroke="#0B1C30" strokeWidth="1.5" />
              <text x="170" y="58" fill="#0B1C30" fontSize="11.5" fontFamily="Inter">2</text>

              {/* y = -2 */}
              <line x1="182" y1="205" x2="188" y2="205" stroke="#0B1C30" strokeWidth="1.5" />
              <text x="164" y="209" fill="#0B1C30" fontSize="11.5" fontFamily="Inter">-2</text>

              {/* Cubic Function Curve: y = f(x) */}
              {/* Enters from bottom-left (50, 240), peaks at (-1, 2) -> (125, 55), inflects around (212, 130), troughs at (2, -2) -> (300, 205), exits at top-right (375, 30) */}
              <path
                d="M 55,235 C 90,140 95,55 125,55 C 160,55 170,185 212,145 C 255,105 270,205 300,205 C 330,205 345,120 375,35"
                fill="none"
                stroke="#0051D5"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Extrema dots */}
              <circle cx="125" cy="55" r="4" fill="#0051D5" />
              <circle cx="300" cy="205" r="4" fill="#0051D5" />

              {/* Function curve label */}
              <text x="320" y="48" fill="#0051D5" fontSize="13" fontWeight="700" fontFamily="Inter">
                y = f(x)
              </text>
            </svg>
          </div>

          {/* Graph Caption */}
          <div className="qd-graph-caption">
            <span>Hình 1: Đồ thị hàm số f(x) với 2 điểm cực trị tại x = -1 và x = 2.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
