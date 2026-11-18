import React from 'react';
import { IconPlus } from '../../../../components/ui/icons';

/**
 * AddChapterDottedButton
 * Wireframe Dotted Bottom Button:
 * - Nút viền nét đứt (border: 2px dashed #ADB5BD) nền xám nhạt #F8F9FA
 * - Biểu tượng dấu cộng + Thêm chương mới
 */
export default function AddChapterDottedButton({ onAddChapter }) {
  return (
    <button
      type="button"
      className="sc-btn-dotted-add"
      onClick={onAddChapter}
      title="Thêm một chương học mới vào môn học"
    >
      <IconPlus width={15} height={15} color="#495057" />
      <span className="sc-btn-dotted-text">Thêm chương mới</span>
    </button>
  );
}
