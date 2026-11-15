import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconArrowLeft,
  IconEye,
  IconHistory,
  IconSave,
} from '../../../../components/ui/icons';

/**
 * EditHeaderActionBar
 * Header trên cùng của Màn hình chỉnh sửa câu hỏi:
 * - Breadcrumbs điều hướng cấp bậc
 * - Nút quay lại, Tiêu đề chính, Badge trạng thái, Thông tin phiên bản
 * - Cụm nút thao tác bên phải: Xem trước, Lịch sử sửa, Lưu thay đổi
 */
export default function EditHeaderActionBar({
  question,
  onPreview,
  onHistory,
  onSave,
}) {
  const navigate = useNavigate();

  return (
    <div className="qe-header-section">
      {/* 1. Breadcrumbs Nav */}
      <nav className="qe-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/teacher/questions" className="qe-breadcrumb-link">
          Ngân hàng câu hỏi
        </Link>
        <span className="qe-breadcrumb-separator">›</span>
        <Link to="/teacher/questions/math" className="qe-breadcrumb-link">
          Toán học 12
        </Link>
        <span className="qe-breadcrumb-separator">›</span>
        <span className="qe-breadcrumb-current">
          Chỉnh sửa: #{question.code}
        </span>
      </nav>

      {/* 2. Top Action Bar */}
      <div className="qe-top-bar">
        {/* Left: Back button & Title container */}
        <div className="qe-top-left">
          <button
            type="button"
            className="qe-back-btn"
            onClick={() => navigate(`/teacher/questions/detail/${question.code}`)}
            title="Quay lại trang chi tiết câu hỏi"
          >
            <IconArrowLeft width={14} height={14} color="#0B1C30" />
          </button>

          <div className="qe-title-col">
            <div className="qe-title-row">
              <h1 className="qe-main-title">Chỉnh sửa câu hỏi</h1>
              <span className="qe-badge-editing">
                {question.statusBadge || 'ĐANG CHỈNH SỬA'}
              </span>
            </div>
            <div className="qe-meta-subtitle">
              Phiên bản {question.version} • Cập nhật lần cuối {question.lastUpdated}
            </div>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="qe-top-right">
          <button
            type="button"
            className="qe-btn-outline"
            onClick={onPreview}
          >
            <IconEye width={16} height={12} color="#0B1C30" />
            <span>Xem trước</span>
          </button>

          <button
            type="button"
            className="qe-btn-outline"
            onClick={onHistory}
          >
            <IconHistory width={13} height={15} color="#0B1C30" />
            <span>Lịch sử sửa</span>
          </button>

          <button
            type="button"
            className="qe-btn-primary-dark"
            onClick={onSave}
          >
            <IconSave width={14} height={14} color="#FFFFFF" />
            <span>Lưu thay đổi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
