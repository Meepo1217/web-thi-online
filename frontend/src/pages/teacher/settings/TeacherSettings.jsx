import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  IconUser,
  IconLock,
  IconCheck,
  IconAlertTriangle,
} from '../../../components/ui/icons';
import TabProfile from './TabProfile';
import TabSecurity from './TabSecurity';
import './teacher-settings.css';

const SETTINGS_STORAGE_KEY = 'eduquiz_teacher_settings';

// Dữ liệu cài đặt mặc định
const DEFAULT_SETTINGS = {
  profile: {
    name: 'ThS. Nguyễn Văn A',
    email: 'teacher@hubt.edu.vn',
    teacherId: 'GV2024-MATH01',
    degree: 'Thạc sĩ (ThS.)',
    department: 'Tổ Toán học THPT',
    phone: '0987 654 321',
    gender: 'Nam',
    birthDate: '1985-08-15',
    bio: 'Giảng viên chuyên trách bộ môn Toán học THPT, luyện thi tốt nghiệp THPT Quốc gia và Giải tích đại cương. Kinh nghiệm 12 năm giảng dạy.',
    avatarColor: '#0051D5',
    avatarImg: '',
  },
};

/**
 * TeacherSettings - Trang Cài đặt tài khoản dành cho Giảng viên
 * URL: /teacher/settings
 */
export default function TeacherSettings() {
  const { user, updateUser } = useAuth();

  // Tab đang kích hoạt: 'profile' | 'security'
  const [activeTab, setActiveTab] = useState('profile');

  // Trạng thái thông báo alert toast
  const [alert, setAlert] = useState(null);

  // Đọc dữ liệu cài đặt từ localStorage hoặc dùng mặc định
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          profile: {
            ...DEFAULT_SETTINGS.profile,
            ...parsed.profile,
            // Đồng bộ tên và email từ AuthContext nếu có
            name: user?.name || parsed.profile?.name || DEFAULT_SETTINGS.profile.name,
            email: user?.email || parsed.profile?.email || DEFAULT_SETTINGS.profile.email,
            department: user?.department || parsed.profile?.department || DEFAULT_SETTINGS.profile.department,
          },
        };
      }
    } catch (e) {
      console.error('Lỗi khi đọc cài đặt từ localStorage:', e);
    }

    return {
      ...DEFAULT_SETTINGS,
      profile: {
        ...DEFAULT_SETTINGS.profile,
        name: user?.name || DEFAULT_SETTINGS.profile.name,
        email: user?.email || DEFAULT_SETTINGS.profile.email,
        department: user?.department || DEFAULT_SETTINGS.profile.department,
      },
    };
  });

  // Tự động ẩn thông báo sau 4 giây
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  // Lưu toàn bộ cấu hình vào localStorage
  const persistSettings = (newSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error('Lỗi khi lưu cài đặt vào localStorage:', e);
    }
  };

  // Lưu hồ sơ cá nhân
  const handleSaveProfile = (newProfile) => {
    const updated = {
      ...settings,
      profile: { ...newProfile },
    };
    persistSettings(updated);

    // Đồng bộ trực tiếp sang AuthContext để toàn bộ Header và RoleSwitcher cập nhật ngay lập tức
    if (updateUser) {
      updateUser({
        name: newProfile.name,
        email: newProfile.email,
        department: newProfile.department,
        avatarColor: newProfile.avatarColor,
        avatarImg: newProfile.avatarImg,
      });
    }

    showAlert('success', 'Đã lưu thông tin hồ sơ cá nhân giảng viên thành công!');
  };

  return (
    <div className="ts-page-container">
      {/* 1. Breadcrumbs Navigation */}
      <nav className="ts-breadcrumb-nav" aria-label="Breadcrumb">
        <Link to="/teacher/dashboard" className="ts-breadcrumb-link">
          Trang chủ
        </Link>
        <span className="ts-breadcrumb-sep">/</span>
        <span style={{ color: '#64748B' }}>Hệ thống</span>
        <span className="ts-breadcrumb-sep">/</span>
        <span className="ts-breadcrumb-current">Cài đặt tài khoản</span>
      </nav>

      {/* 2. Page Header Banner */}
      <div className="ts-header-banner">
        <div className="ts-header-left">
          <span className="ts-header-badge">
            <IconUser width={11} height={11} color="#0051D5" />
            CÀI ĐẶT TÀI KHOẢN GIẢNG VIÊN
          </span>
          <h1 className="ts-header-title">Thiết lập tài khoản</h1>
          <p className="ts-header-desc">
            Quản lý hồ sơ giảng viên, cập nhật thông tin nhận diện và đổi mật khẩu đăng nhập hệ thống.
          </p>
        </div>
      </div>

      {/* 3. Toast Alert Banner */}
      {alert && (
        <div
          className="ts-alert-banner"
          style={{
            background: alert.type === 'error' ? '#FEF2F2' : '#ECFDF5',
            borderColor: alert.type === 'error' ? '#FECACA' : '#A7F3D0',
            color: alert.type === 'error' ? '#991B1B' : '#065F46',
          }}
        >
          <div className="ts-alert-content">
            {alert.type === 'error' ? (
              <IconAlertTriangle width={18} height={18} color="#DC2626" />
            ) : (
              <IconCheck width={18} height={18} color="#059669" />
            )}
            <span>{alert.message}</span>
          </div>
          <button
            type="button"
            className="ts-alert-close"
            onClick={() => setAlert(null)}
            aria-label="Đóng thông báo"
          >
            ✕
          </button>
        </div>
      )}

      {/* 4. Tabs Navigation Bar (Chỉ gồm 2 tab cơ bản: Thông tin cá nhân & Đổi mật khẩu) */}
      <div className="ts-tabs-nav" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'profile'}
          className={`ts-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <span className="ts-tab-icon">
            <IconUser width={16} height={16} color="currentColor" />
          </span>
          <span>Thông tin cá nhân</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'security'}
          className={`ts-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <span className="ts-tab-icon">
            <IconLock width={16} height={16} color="currentColor" />
          </span>
          <span>Đổi mật khẩu</span>
        </button>
      </div>

      {/* 5. Tab Content Panes */}
      <div className="ts-tab-content">
        {activeTab === 'profile' && (
          <TabProfile
            profileData={settings.profile}
            onSave={handleSaveProfile}
          />
        )}

        {activeTab === 'security' && (
          <TabSecurity
            onShowAlert={showAlert}
          />
        )}
      </div>
    </div>
  );
}
