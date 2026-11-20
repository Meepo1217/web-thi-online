import { IconFolder, IconTrash, IconArrowRight } from '../../../../components/ui/icons';

/**
 * SubjectFolderCard - Thẻ thư mục môn học trong Ngân hàng câu hỏi
 * Gồm viền trên 4px accent, nút xóa thư mục, tổng số câu hỏi, tác giả và nút Xem câu hỏi
 */
export default function SubjectFolderCard({
  folder,
  onOpenFolder,
  onDeleteFolder,
  metricsLabel = 'Tổng số câu hỏi',
  unitLabel = '',
  openLinkLabel = 'Xem câu hỏi',
}) {
  const {
    id,
    code,
    grade,
    title,
    description,
    totalQuestions,
    authorInitial,
    authorBg,
    authorName,
    accentColor,
    badgeBg,
    badgeColor,
    iconBg,
    iconColor,
  } = folder;

  return (
    <div className="qb-folder-card">
      {/* Top 4px color accent line */}
      <span
        className="qb-folder-top-accent"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      <div className="qb-folder-card-body">
        {/* Top Icon & Options button */}
        <div className="qb-folder-top-row">
          <div
            className="qb-folder-icon-box"
            style={{ backgroundColor: iconBg }}
          >
            <IconFolder width={23.33} height={18.67} color={iconColor} />
          </div>

          <button
            type="button"
            className="qb-folder-delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteFolder(folder);
            }}
            title="Xóa thư mục"
            aria-label="Xóa thư mục"
          >
            <IconTrash width={14} height={15} color="#76777D" />
          </button>
        </div>

        {/* Title, Badges & Description */}
        <div className="qb-folder-info-block">
          <div className="qb-folder-tags-row">
            <span
              className="qb-folder-badge"
              style={{ backgroundColor: badgeBg, color: badgeColor }}
            >
              {code}
            </span>
            <span className="qb-folder-grade-tag">{grade}</span>
          </div>

          <h2 className="qb-folder-title" onClick={() => onOpenFolder(id)}>
            {title}
          </h2>

          <p className="qb-folder-description">{description}</p>
        </div>

        {/* Academic Metrics: Total questions / exams */}
        <div className="qb-folder-metrics-box">
          <div className="qb-metrics-row">
            <span className="qb-metrics-label">{metricsLabel}</span>
            <span className="qb-metrics-value">
              {unitLabel ? `${totalQuestions} ${unitLabel}` : totalQuestions}
            </span>
          </div>
        </div>

        {/* Footer: Author/Team + Action Link */}
        <div className="qb-folder-footer">
          <div className="qb-folder-author">
            <div
              className="qb-author-avatar"
              style={{ backgroundColor: authorBg }}
            >
              {authorInitial}
            </div>
            <span className="qb-author-name">{authorName}</span>
          </div>

          <button
            type="button"
            className="qb-folder-open-link"
            onClick={() => onOpenFolder(id)}
            title={`Mở ${title}`}
          >
            <span>{openLinkLabel}</span>
            <IconArrowRight width={10.67} height={10.67} color="#0051D5" />
          </button>
        </div>
      </div>
    </div>
  );
}
