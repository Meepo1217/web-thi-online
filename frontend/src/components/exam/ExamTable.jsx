import {
  IconFileText,
  IconClock,
  IconEdit,
  IconTrash,
  IconUpload,
  IconExams,
} from '../ui/icons';

/**
 * ExamTable - Bảng danh sách đề thi chính xác theo thông số thiết kế Figma
 */
export default function ExamTable({
  exams = [],
  selectedIds = [],
  onToggleSelectAll,
  onToggleSelectRow,
  onEditExam,
  onDeleteExam,
  onUploadExam,
}) {
  const isAllSelected = exams.length > 0 && selectedIds.length === exams.length;
  const isPartiallySelected = selectedIds.length > 0 && selectedIds.length < exams.length;

  return (
    <div className="exam-table-container">
      <table className="exam-table" role="table">
        <thead>
          <tr className="exam-thead-row">
            <th className="exam-th exam-th-checkbox" scope="col">
              <input
                type="checkbox"
                className="exam-checkbox"
                checked={isAllSelected}
                ref={(el) => {
                  if (el) el.indeterminate = isPartiallySelected;
                }}
                onChange={onToggleSelectAll}
                aria-label="Chọn tất cả đề thi"
              />
            </th>
            <th className="exam-th exam-th-name" scope="col">
              TÊN ĐỀ THI & HỌC PHẦN
            </th>
            <th className="exam-th exam-th-date" scope="col">
              NGÀY TẠO / HẠN NỘP
            </th>
            <th className="exam-th exam-th-actions" scope="col">
              THAO TÁC
            </th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => {
            const isSelected = selectedIds.includes(exam.id);
            return (
              <tr
                key={exam.id}
                className={`exam-tbody-row ${isSelected ? 'row-selected' : ''}`}
              >
                {/* Checkbox column */}
                <td className="exam-td exam-td-checkbox">
                  <input
                    type="checkbox"
                    className="exam-checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelectRow(exam.id)}
                    aria-label={`Chọn đề thi ${exam.title}`}
                  />
                </td>

                {/* Exam Info column */}
                <td className="exam-td exam-td-name">
                  <div className="exam-info-cell">
                    <div
                      className="exam-icon-wrapper"
                      style={{ backgroundColor: exam.iconBg }}
                    >
                      <IconExams
                        width={16.5}
                        height={16.5}
                        color={exam.iconColor}
                      />
                    </div>

                    <div className="exam-details-block">
                      <a
                        href={`#exam-${exam.id}`}
                        className="exam-title-link"
                        onClick={(e) => {
                          e.preventDefault();
                          onEditExam(exam);
                        }}
                      >
                        {exam.title}
                      </a>

                      <div className="exam-meta-row">
                        {/* Status badge with indicator dot */}
                        <span
                          className="exam-status-badge"
                          style={{
                            backgroundColor: exam.statusBg,
                            color: exam.statusColor,
                          }}
                        >
                          <span
                            className="exam-status-dot"
                            style={{ backgroundColor: exam.dotColor }}
                          />
                          {exam.statusLabel}
                        </span>

                        {/* Questions count */}
                        <div className="exam-meta-item">
                          <IconFileText width={13.33} height={13.33} color="#76777D" />
                          <span className="exam-meta-text">
                            {exam.questionsCount} Câu trắc nghiệm
                          </span>
                        </div>

                        <span className="exam-meta-separator">•</span>

                        {/* Duration */}
                        <div className="exam-meta-item">
                          <IconClock width={13.33} height={13.33} color="#76777D" />
                          <span
                            className={`exam-duration-text ${
                              exam.status === 'draft' ? 'draft-duration' : ''
                            }`}
                          >
                            {exam.durationText}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Date & Deadline column */}
                <td className="exam-td exam-td-date">
                  <div className="exam-date-cell">
                    <div className="exam-created-date">{exam.createdDate}</div>
                    <div
                      className={`exam-deadline-text ${
                        exam.isDeadlineWarning ? 'deadline-warning' : ''
                      }`}
                    >
                      {exam.deadlineText}
                    </div>
                  </div>
                </td>

                {/* Actions column */}
                <td className="exam-td exam-td-actions">
                  <div className="exam-actions-cell">
                    {exam.canUpload ? (
                      <button
                        type="button"
                        className="exam-row-action-btn btn-upload"
                        onClick={() => onUploadExam(exam)}
                        title="Tải lên / Xuất bản đề thi"
                        aria-label="Tải lên đề thi"
                      >
                        <IconUpload width={13.5} height={13.5} color="#0B1C30" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="exam-row-action-btn btn-edit"
                        onClick={() => onEditExam(exam)}
                        title="Chỉnh sửa đề thi"
                        aria-label="Chỉnh sửa đề thi"
                      >
                        <IconEdit width={13.5} height={13.5} color="#0B1C30" />
                      </button>
                    )}

                    <button
                      type="button"
                      className="exam-row-action-btn btn-delete"
                      onClick={() => onDeleteExam(exam)}
                      title="Xóa đề thi"
                      aria-label="Xóa đề thi"
                    >
                      <IconTrash width={14} height={14} color="#852221" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
