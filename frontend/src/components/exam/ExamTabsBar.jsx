import { IconViewList, IconViewGrid } from '../ui/icons';

/**
 * ExamTabsBar - Thanh điều hướng Tab trạng thái và chuyển đổi chế độ xem
 * Tab active có underline 2px #0051D5, badge đếm số lượng, nút List/Grid mode
 */
export default function ExamTabsBar({
  tabs = [],
  activeTab = 'all',
  onTabChange,
  viewMode = 'list',
  onViewModeChange,
}) {
  return (
    <div className="exam-tabs-bar">
      <div className="exam-tabs-list" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`exam-tab-item ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="exam-tab-label">{tab.label}</span>
              <span className={`exam-tab-badge ${isActive ? 'active' : ''}`}>
                {tab.count}
              </span>
              {isActive && <span className="exam-tab-indicator" />}
            </button>
          );
        })}
      </div>

      <div className="exam-view-modes">
        <button
          type="button"
          className={`exam-view-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => onViewModeChange('list')}
          title="Chế độ xem bảng"
          aria-label="Chế độ xem bảng"
        >
          <IconViewList
            width={16.67}
            height={13.33}
            color={viewMode === 'list' ? '#0051D5' : '#45464D'}
          />
        </button>
        <button
          type="button"
          className={`exam-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => onViewModeChange('grid')}
          title="Chế độ xem lưới"
          aria-label="Chế độ xem lưới"
        >
          <IconViewGrid
            width={15}
            height={15}
            color={viewMode === 'grid' ? '#0051D5' : '#45464D'}
          />
        </button>
      </div>
    </div>
  );
}
