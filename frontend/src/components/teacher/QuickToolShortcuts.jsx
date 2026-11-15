import {
  IconSparkles,
  IconShuffle,
  IconUpload,
  IconArrowRight,
} from '../ui/icons';

// Danh sách công cụ trợ giảng
export const QUICK_TOOLS_DATA = [
  {
    id: 'tool-ai',
    title: 'Trợ lý AI tạo câu hỏi',
    subtitle: 'Sinh đề tự động từ tài liệu PDF',
    icon: IconSparkles,
    path: '/teacher/questions/ai-generate',
  },
  {
    id: 'tool-shuffle',
    title: 'Bộ xáo trộn mã đề thi',
    subtitle: 'Hoán vị đáp án và ma trận câu',
    icon: IconShuffle,
    path: '/teacher/exams/shuffle',
  },
  {
    id: 'tool-import',
    title: 'Nhập đề từ file Word / Excel',
    subtitle: 'Phân tích cú pháp thông minh',
    icon: IconUpload,
    path: '/teacher/questions/import',
  },
];

/**
 * QuickToolShortcuts - Module phím tắt các công cụ trợ giảng đắc lực
 */
export default function QuickToolShortcuts({
  tools = QUICK_TOOLS_DATA,
  onSelectTool,
}) {
  return (
    <div className="quick-tools-card">
      {/* Tiêu đề Module */}
      <div className="quick-tools-card__header">
        <h2 className="quick-tools-card__heading">Công cụ trợ giảng</h2>
      </div>

      {/* Danh sách các công cụ */}
      <div className="quick-tools-card__list">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              type="button"
              className="quick-tool-item"
              onClick={() => onSelectTool && onSelectTool(tool)}
            >
              <div className="quick-tool-item__left">
                <span className="quick-tool-item__icon-wrap">
                  <Icon width={16} height={16} color="#0051D5" />
                </span>
                <div className="quick-tool-item__info">
                  <span className="quick-tool-item__title">{tool.title}</span>
                  <span className="quick-tool-item__subtitle">{tool.subtitle}</span>
                </div>
              </div>

              <span className="quick-tool-item__arrow">
                <IconArrowRight width={6} height={10} color="#45464D" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
