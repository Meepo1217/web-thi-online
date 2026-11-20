import React from 'react';
import {
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
} from '../../../../components/ui/icons';

/**
 * ExamEditBottomBar
 * BOTTOM ACTION BAR (FOOTER BAR AS IN WIREFRAME BLUEPRINT)
 * Thanh công cụ điều hướng câu hỏi và nút Lưu & Xuất bản đề thi cố định ở đáy trang
 */
export default function ExamEditBottomBar({
  currentIndex,
  totalQuestions,
  onPrev,
  onNext,
  onPublish,
  lastSavedTime = 'Vừa xong',
}) {
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= totalQuestions - 1;

  return (
    <footer className="ee-bottom-bar" aria-label="Thao tác hoàn thiện đề thi">
      <div className="ee-bottom-container">
        {/* Bên trái: Trạng thái tự động lưu */}
        <div className="ee-bottom-status-left">
          <span className="ee-autosave-dot" aria-hidden="true" />
          <span>Tự động lưu nháp: {lastSavedTime}</span>
        </div>

        {/* Bên phải: Nút Câu trước, Câu tiếp theo, Lưu & Xuất bản */}
        <div className="ee-bottom-actions-right">
          <button
            type="button"
            className="ee-bottom-nav-btn"
            onClick={onPrev}
            disabled={isFirst}
            title={isFirst ? 'Đang ở câu đầu tiên' : 'Quay lại câu hỏi trước'}
          >
            <IconChevronLeft width={6} height={10} color="#0B1C30" />
            <span>Câu trước</span>
          </button>

          <button
            type="button"
            className="ee-bottom-nav-btn"
            onClick={onNext}
            disabled={isLast}
            title={isLast ? 'Đang ở câu cuối cùng' : 'Chuyển sang câu tiếp theo'}
          >
            <span>Câu tiếp theo</span>
            <IconChevronRight width={6} height={10} color="#0B1C30" />
          </button>

          <button
            type="button"
            className="ee-bottom-btn-publish"
            onClick={onPublish}
            title="Lưu tất cả thay đổi và xuất bản đề thi cho học sinh"
          >
            <IconCheck width={14} height={14} color="#FFFFFF" />
            <span>Lưu &amp; Xuất bản đề</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
