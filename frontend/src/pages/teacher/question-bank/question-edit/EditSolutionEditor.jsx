import React from 'react';
import { IconFormula, IconLightbulb } from '../../../../components/ui/icons';

/**
 * EditSolutionEditor
 * Card chỉnh sửa lập luận & lời giải chi tiết (Phần 3):
 * - Textarea nhập các bước giải toán học
 * - Nút chèn công thức MathJax
 * - Nút thêm mẹo giải nhanh
 * - Bộ đếm ký tự
 */
export default function EditSolutionEditor({
  explanation,
  onChangeExplanation,
  onInsertMathJax,
  onInsertQuickTip,
}) {
  return (
    <div className="qe-card qe-card-solution">
      {/* 1. Header with Badge & Instruction */}
      <div className="qe-card-header">
        <div className="qe-card-title-wrap">
          <div className="qe-step-badge">3</div>
          <div>
            <h2 className="qe-card-heading">Lập luận & Lời giải chi tiết</h2>
            <p className="qe-card-subtext">
              Hiển thị cho học sinh sau khi hoàn thành bài thi
            </p>
          </div>
        </div>
      </div>

      {/* 2. Solution Textarea */}
      <div className="qe-textarea-wrapper">
        <textarea
          className="qe-textarea qe-textarea-solution"
          rows={7}
          value={explanation}
          onChange={(e) => onChangeExplanation(e.target.value)}
          placeholder="Nhập lập luận từng bước và lời giải chi tiết tại đây..."
        />
      </div>

      {/* 3. Helper Toolbar under Textarea */}
      <div className="qe-solution-toolbar">
        <div className="qe-solution-toolbar-left">
          <button
            type="button"
            className="qe-btn-chip-action"
            onClick={onInsertMathJax}
          >
            <IconFormula width={13} height={13} color="#0051D5" />
            <span>Chèn công thức MathJax</span>
          </button>

          <button
            type="button"
            className="qe-btn-chip-action"
            onClick={onInsertQuickTip}
          >
            <IconLightbulb width={13} height={13} color="#0051D5" />
            <span>Thêm mẹo giải nhanh</span>
          </button>
        </div>

        <div className="qe-solution-toolbar-right">
          <span className="qe-char-count">
            {explanation ? explanation.length : 0} ký tự
          </span>
        </div>
      </div>
    </div>
  );
}
