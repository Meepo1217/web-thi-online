import React from 'react';
import { FORMAT_OPTIONS } from './questionEditData';

/**
 * EditFormatSelector
 * Card lựa chọn định dạng câu hỏi:
 * - Trắc nghiệm đơn (single-choice)
 * - Đúng / Sai (true-false)
 * - Điền đáp án ngắn (short-answer)
 * - Tự luận ngắn (essay)
 */
export default function EditFormatSelector({ selectedFormat, onSelectFormat }) {
  // Render icon tùy biến cho từng format
  const renderFormatIcon = (iconType, isActive) => {
    const color = isActive ? '#0051D5' : '#45464D';

    switch (iconType) {
      case 'radio':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
            <circle cx="12" cy="12" r="4.5" fill={color} />
          </svg>
        );
      case 'check-cross':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12l5 5L20 7" />
          </svg>
        );
      case 'cursor':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="6" width="16" height="12" rx="2" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        );
      case 'paragraph':
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="14" y2="12" />
            <line x1="4" y1="18" x2="18" y2="18" />
          </svg>
        );
    }
  };

  return (
    <div className="qe-card qe-card-format">
      {/* Top Header of Format Selector */}
      <div className="qe-format-header">
        <span className="qe-section-label">ĐỊNH DẠNG CÂU HỎI</span>
        <span className="qe-format-count">4 loại hỗ trợ</span>
      </div>

      {/* Grid of 4 format pill cards */}
      <div className="qe-format-grid">
        {FORMAT_OPTIONS.map((item) => {
          const isActive = selectedFormat === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`qe-format-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => onSelectFormat(item.id)}
            >
              <div className="qe-format-icon">
                {renderFormatIcon(item.iconType, isActive)}
              </div>
              <span className="qe-format-title">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
