import React from 'react';
import { IconFolder, IconFileText, IconEdit, IconTrash } from '../../../../components/ui/icons';

/**
 * ChapterCard
 * Wireframe Chapter Card:
 * - Hộp icon 32x32px nền xám nhạt
 * - Tiêu đề chương (click để xem danh sách câu hỏi trong chương)
 * - Số lượng câu hỏi thuộc chương
 * - Hai nút hành động: Chỉnh sửa chương và Xóa chương (28x28px)
 */
export default function ChapterCard({
  chapter,
  onOpenChapter,
  onEditChapter,
  onDeleteChapter,
  unitLabel = 'câu hỏi',
}) {
  return (
    <div className="sc-chapter-card">
      <div className="sc-chapter-left">
        {/* 32x32px Icon Box */}
        <div
          className="sc-chapter-icon-box"
          onClick={() => onOpenChapter(chapter)}
          role="button"
          tabIndex={0}
          title={`Mở danh sách câu hỏi của ${chapter.title}`}
        >
          <IconFolder width={16.5} height={14.62} color="#6C757D" />
        </div>

        {/* Chapter Title & Meta */}
        <div className="sc-chapter-text-group">
          <div
            className="sc-chapter-title"
            onClick={() => onOpenChapter(chapter)}
            role="button"
            tabIndex={0}
            title={`Xem danh sách câu hỏi: ${chapter.title}`}
          >
            {chapter.title}
          </div>

          <div className="sc-chapter-meta">
            <IconFileText width={11.67} height={11.67} color="#6C757D" />
            <span className="sc-chapter-count">{chapter.questionCount} {unitLabel}</span>
          </div>
        </div>
      </div>

      {/* Right 2 action buttons (28x28px) */}
      <div className="sc-chapter-actions">
        <button
          type="button"
          className="sc-btn-icon-square"
          onClick={(e) => {
            e.stopPropagation();
            onEditChapter(chapter);
          }}
          title="Chỉnh sửa tên chương"
        >
          <IconEdit width={12} height={12} color="#6C757D" />
        </button>

        <button
          type="button"
          className="sc-btn-icon-square sc-btn-icon-danger"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteChapter(chapter);
          }}
          title="Xóa chương này"
        >
          <IconTrash width={11} height={12} color="#6C757D" />
        </button>
      </div>
    </div>
  );
}
