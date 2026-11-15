import { IconFolder, IconMoreVertical, IconArrowRight } from '../../../../components/ui/icons';

/**
 * SubjectFolderCard - Thẻ thư mục môn học trong Ngân hàng câu hỏi
 * Tái hiện 100% chi tiết thiết kế Figma: Viền trên 4px accent, thanh tiến độ thẩm định, tác giả và nút Xem câu hỏi
 */
export default function SubjectFolderCard({ folder, onOpenFolder, onFolderMenu }) {
  const {
    id,
    code,
    grade,
    title,
    description,
    totalQuestions,
    verifiedPercent,
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
            className="qb-folder-options-btn"
            onClick={(e) => {
              e.stopPropagation();
              onFolderMenu(folder);
            }}
            title="Tùy chọn thư mục"
            aria-label="Tùy chọn thư mục"
          >
            <IconMoreVertical width={3} height={12} color="#76777D" />
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

        {/* Academic Metrics: Total questions & verification progress */}
        <div className="qb-folder-metrics-box">
          <div className="qb-metrics-row">
            <span className="qb-metrics-label">Tổng số câu</span>
            <span className="qb-metrics-value">{totalQuestions}</span>
          </div>

          <div className="qb-metrics-row">
            <span className="qb-metrics-label">Đã thẩm định</span>
            <div className="qb-progress-wrapper">
              <div className="qb-progress-track">
                <span
                  className="qb-progress-fill"
                  style={{ width: `${verifiedPercent}%` }}
                />
              </div>
              <span className="qb-progress-percent">{verifiedPercent}%</span>
            </div>
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
            title={`Mở danh sách câu hỏi môn ${title}`}
          >
            <span>Xem câu hỏi</span>
            <IconArrowRight width={10.67} height={10.67} color="#0051D5" />
          </button>
        </div>
      </div>
    </div>
  );
}
