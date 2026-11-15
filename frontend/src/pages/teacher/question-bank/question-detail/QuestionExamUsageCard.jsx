import React from 'react';
import { IconExams, IconChevronRight } from '../../../../components/ui/icons';

/**
 * QuestionExamUsageCard
 * Thẻ hiển thị các đề thi đang sử dụng câu hỏi này
 */
export default function QuestionExamUsageCard({ examUsages = [], onViewAllExams }) {
  return (
    <div className="qd-side-card">
      {/* Header */}
      <div className="qd-side-header qd-exam-usage-header">
        <div className="qd-exam-header-left">
          <IconExams width={15} height={16.67} color="#0051D5" />
          <h2 className="qd-side-title">Đề thi đang sử dụng</h2>
        </div>
        <span className="qd-exam-count-badge">{examUsages.length}</span>
      </div>

      {/* Exam Items List */}
      <div className="qd-exam-items-list">
        {examUsages.map((exam) => (
          <div key={exam.id} className="qd-exam-item-card">
            <div className="qd-exam-item-info">
              <span className="qd-exam-item-title">{exam.title}</span>
              <span className="qd-exam-item-sub">{exam.subtitle}</span>
            </div>
            <span className="qd-exam-item-arrow">
              <IconChevronRight width={6} height={9} color="#45464D" />
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <button
        type="button"
        className="qd-view-all-exams-btn"
        onClick={onViewAllExams}
      >
        Xem tất cả lịch sử đề thi liên quan
      </button>
    </div>
  );
}
