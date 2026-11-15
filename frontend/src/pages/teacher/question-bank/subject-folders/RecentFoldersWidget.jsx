import { IconFolder, IconArrowRight } from '../../../../components/ui/icons';

/**
 * RecentFoldersWidget - Widget hiển thị các thư mục truy cập gần đây
 * Chuẩn thông số Figma: 784px, nền trắng bo 8px, 3 mục hoạt động gần nhất
 */
export default function RecentFoldersWidget({ recentFolders = [], onOpenFolder, onViewAllHistory }) {
  return (
    <div className="qb-recent-folders-card">
      {/* Header */}
      <div className="qb-recent-header">
        <div className="qb-recent-title-group">
          <IconFolder width={15} height={15} color="#0051D5" />
          <h3 className="qb-recent-title">Thư mục truy cập gần đây</h3>
        </div>
        <button
          type="button"
          className="qb-recent-history-link"
          onClick={onViewAllHistory}
        >
          Xem lịch sử
        </button>
      </div>

      {/* List items */}
      <div className="qb-recent-list">
        {recentFolders.map((item) => (
          <div
            key={item.id}
            className="qb-recent-item"
            onClick={() => onOpenFolder(item.id)}
          >
            <div className="qb-recent-item-left">
              <div className="qb-recent-icon-box">
                <IconFolder width={18.33} height={14.67} color={item.iconColor} />
              </div>
              <div className="qb-recent-item-text">
                <span className="qb-recent-item-title">{item.title}</span>
                <span className="qb-recent-item-desc">{item.desc}</span>
              </div>
            </div>

            <span className="qb-recent-item-time">{item.time}</span>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <div className="qb-recent-footer">
        <span className="qb-recent-footer-note">Cập nhật theo thời gian thực</span>
        <button
          type="button"
          className="qb-recent-view-all-btn"
          onClick={onViewAllHistory}
        >
          <span>Xem tất cả hoạt động</span>
          <IconArrowRight width={8} height={8} color="#0051D5" />
        </button>
      </div>
    </div>
  );
}
