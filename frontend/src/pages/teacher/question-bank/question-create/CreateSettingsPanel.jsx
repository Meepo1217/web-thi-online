import React from 'react';
import { IconSettings } from '../../../../components/ui/icons';

/**
 * CreateSettingsPanel - Cột phải: Card B - Cài đặt câu hỏi (đã bỏ phần điểm số theo yêu cầu)
 */
export default function CreateSettingsPanel({ settings, onChangeSettings }) {
  const handleToggleRandomize = () => {
    onChangeSettings((prev) => ({
      ...prev,
      randomizeOptions: !prev.randomizeOptions,
    }));
  };

  return (
    <div className="qc-card qc-settings-card">
      {/* 1. Card Header */}
      <div className="qc-card-header">
        <div className="qc-card-label">
          <span className="qc-settings-icon">
            <IconSettings width={16} height={16} color="#0051D5" />
          </span>
          <h2 className="qc-card-title">Cài đặt câu hỏi</h2>
        </div>
      </div>

      <div className="qc-settings-fields">
        {/* Xáo trộn phương án */}
        <div className="qc-switch-row">
          <div className="qc-switch-meta">
            <span className="qc-switch-title">Xáo trộn phương án</span>
            <span className="qc-switch-subtitle">
              Tự động đảo vị trí A, B, C, D khi làm bài
            </span>
          </div>

          <button
            type="button"
            className={`qc-switch-btn ${settings.randomizeOptions ? 'qc-switch-btn--checked' : ''}`}
            onClick={handleToggleRandomize}
            role="switch"
            aria-checked={settings.randomizeOptions}
            title={settings.randomizeOptions ? 'Đang bật xáo trộn' : 'Đang tắt xáo trộn'}
          >
            <span className="qc-switch-knob" />
          </button>
        </div>
      </div>
    </div>
  );
}
