import React from 'react';
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconFormula,
  IconImage,
  IconPaperclip,
  IconCode,
  IconTrash,
} from '../../../../components/ui/icons';

/**
 * EditStemEditor
 * Card chỉnh sửa đề bài câu hỏi (Phần 1):
 * - Thanh công cụ soạn thảo Rich Text (Bold, Italic, Underline, Formula fx, Super/Subscript, Image, Attachment, Code)
 * - Textarea nhập nội dung câu hỏi
 * - Card đính kèm hình ảnh minh họa (Đổi ảnh, Xóa ảnh)
 */
export default function EditStemEditor({
  stem,
  onChangeStem,
  attachment,
  onReplaceImage,
  onRemoveImage,
}) {
  return (
    <div className="qe-card qe-card-stem">
      {/* 1. Header with Badge & Label */}
      <div className="qe-card-header">
        <div className="qe-card-title-wrap">
          <div className="qe-step-badge">1</div>
          <h2 className="qe-card-heading">Nội dung câu hỏi (Đề bài)</h2>
          <span className="qe-badge-required">BẮT BUỘC</span>
        </div>
      </div>

      {/* 2. Rich Text Toolbar */}
      <div className="qe-toolbar-container">
        <div className="qe-toolbar-left">
          <button
            type="button"
            className="qe-toolbar-btn"
            title="Đậm (Ctrl+B)"
            onClick={() => {}}
          >
            <IconBold width={12} height={12} color="#45464D" />
          </button>
          <button
            type="button"
            className="qe-toolbar-btn"
            title="Nghiêng (Ctrl+I)"
            onClick={() => {}}
          >
            <IconItalic width={12} height={12} color="#45464D" />
          </button>
          <button
            type="button"
            className="qe-toolbar-btn"
            title="Gạch chân (Ctrl+U)"
            onClick={() => {}}
          >
            <IconUnderline width={12} height={12} color="#45464D" />
          </button>

          <span className="qe-toolbar-divider" />

          <button
            type="button"
            className="qe-toolbar-btn qe-toolbar-btn-active"
            title="Công thức toán học (fx)"
            onClick={() => {}}
          >
            <span className="qe-fx-text">fx</span>
          </button>

          <button
            type="button"
            className="qe-toolbar-btn"
            title="Chỉ số trên (x²)"
            onClick={() => {}}
          >
            <span className="qe-subsuper-text">x²</span>
          </button>

          <button
            type="button"
            className="qe-toolbar-btn"
            title="Chỉ số dưới (x₂)"
            onClick={() => {}}
          >
            <span className="qe-subsuper-text">x₂</span>
          </button>

          <span className="qe-toolbar-divider" />

          <button
            type="button"
            className="qe-toolbar-btn"
            title="Chèn ảnh đồ thị"
            onClick={onReplaceImage}
          >
            <IconImage width={14} height={14} color="#45464D" />
          </button>

          <button
            type="button"
            className="qe-toolbar-btn"
            title="Đính kèm tệp"
            onClick={() => {}}
          >
            <IconPaperclip width={14} height={14} color="#45464D" />
          </button>

          <button
            type="button"
            className="qe-toolbar-btn"
            title="Khối code / LaTeX"
            onClick={() => {}}
          >
            <IconCode width={14} height={14} color="#45464D" />
          </button>

          <button
            type="button"
            className="qe-toolbar-btn qe-toolbar-trash"
            title="Xóa định dạng"
            onClick={() => {}}
          >
            <IconTrash width={13} height={13} color="#76777D" />
          </button>
        </div>

        <div className="qe-toolbar-right">
          <span className="qe-char-count">{stem ? stem.length : 0} ký tự</span>
        </div>
      </div>

      {/* 3. Textarea input */}
      <div className="qe-textarea-wrapper">
        <textarea
          className="qe-textarea"
          rows={3}
          value={stem}
          onChange={(e) => onChangeStem(e.target.value)}
          placeholder="Nhập nội dung đề bài câu hỏi tại đây..."
        />
      </div>

      {/* 4. Image Attachment Preview Card */}
      {attachment && (
        <div className="qe-attachment-card">
          <div className="qe-attachment-left">
            {/* SVG Graph Thumbnail Mockup */}
            <div className="qe-thumb-preview">
              <svg width="60" height="42" viewBox="0 0 100 70" fill="none">
                <rect width="100" height="70" fill="#F0F4F8" rx="4" />
                <line x1="10" y1="35" x2="90" y2="35" stroke="#CBD5E1" strokeWidth="1" />
                <line x1="50" y1="5" x2="50" y2="65" stroke="#CBD5E1" strokeWidth="1" />
                <path
                  d="M 15 58 C 30 55, 35 15, 50 15 C 65 15, 70 55, 85 12"
                  stroke="#0051D5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="qe-attachment-info">
              <div className="qe-attachment-name">{attachment.fileName}</div>
              <div className="qe-attachment-meta">
                {attachment.fileSize} • {attachment.dimensions}
              </div>
            </div>
          </div>

          <div className="qe-attachment-actions">
            <button
              type="button"
              className="qe-btn-text"
              onClick={onReplaceImage}
            >
              Đổi ảnh khác
            </button>
            <span className="qe-action-separator">|</span>
            <button
              type="button"
              className="qe-btn-text qe-btn-danger-text"
              onClick={onRemoveImage}
            >
              Xóa ảnh
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
