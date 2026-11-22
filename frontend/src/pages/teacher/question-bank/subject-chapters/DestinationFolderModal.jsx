import React, { useState, useMemo } from 'react';
import {
  IconFolder,
  IconClose,
  IconCheck,
  IconChevronRight,
  IconChevronLeft,
  IconPlus,
  IconSearch,
  IconFileText,
} from '../../../../components/ui/icons';

// Dữ liệu mẫu chuẩn cho các Thư mục và Chương trong Quản lý đề thi
const DEFAULT_FOLDERS_STRUCTURE = [
  {
    id: 'math',
    title: 'Toán học THPT',
    grade: 'Khối 12',
    chapters: [
      { id: 'm-c1', title: 'Chương I: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số' },
      { id: 'm-c2', title: 'Chương II: Hàm số lũy thừa, hàm số mũ và hàm số logarit' },
      { id: 'm-c3', title: 'Chương III: Nguyên hàm, tích phân và ứng dụng trong hình học' },
      { id: 'm-c4', title: 'Chương IV: Hình học không gian & Tọa độ Oxyz' },
      { id: 'm-c5', title: 'Chuyên đề Tổng hợp: Đề thi thử THPT Quốc gia' },
    ],
  },
  {
    id: 'physics',
    title: 'Vật lý đại cương & 12',
    grade: 'Khối 12',
    chapters: [
      { id: 'p-c1', title: 'Chương I: Dao động cơ học' },
      { id: 'p-c2', title: 'Chương II: Sóng cơ và Sóng âm' },
      { id: 'p-c3', title: 'Chương III: Dòng điện xoay chiều' },
      { id: 'p-c4', title: 'Chương IV: Dao động và sóng điện từ' },
    ],
  },
  {
    id: 'chemistry',
    title: 'Hóa học hữu cơ & vô cơ',
    grade: 'Khối 12',
    chapters: [
      { id: 'c-c1', title: 'Chương I: Este - Lipit' },
      { id: 'c-c2', title: 'Chương II: Cacbohiđrat' },
      { id: 'c-c3', title: 'Chương III: Amin, Amino Axit và Protein' },
      { id: 'c-c4', title: 'Chương IV: Polime và Vật liệu polime' },
    ],
  },
  {
    id: 'exam-period',
    title: 'Đề kiểm tra định kỳ',
    grade: 'Chung',
    chapters: [
      { id: 'ep-c1', title: 'Đề kiểm tra 15 phút đầu giờ' },
      { id: 'ep-c2', title: 'Đề kiểm tra 1 tiết giữa kỳ I' },
      { id: 'ep-c3', title: 'Đề kiểm tra cuối kỳ I' },
    ],
  },
  {
    id: 'exam-trial',
    title: 'Đề thi thử THPT Quốc gia',
    grade: 'Toàn quốc',
    chapters: [
      { id: 'et-c1', title: 'Đề thi thử đợt 1 (Tháng 10)' },
      { id: 'et-c2', title: 'Đề thi thử đợt 2 (Tháng 12)' },
      { id: 'et-c3', title: 'Đề phân hóa học sinh giỏi' },
    ],
  },
];

/**
 * DestinationFolderModal
 * Popup điều hướng duyệt Thư mục -> xem các Chương và chọn vị trí lưu đề thi
 * Hỗ trợ tạo Thư mục mới và TẠO CHƯƠNG MỚI ngay trong phần chương!
 */
export default function DestinationFolderModal({
  isOpen,
  onClose,
  currentLocation = {},
  onConfirmLocation,
}) {
  // Navigation stack: activeFolder === null -> xem danh sách thư mục; khác null -> xem các chương của folder đó
  const [activeFolder, setActiveFolder] = useState(null);

  // Vị trí đang được tạm chọn trong modal: { folderTitle, chapterTitle }
  // Để trống mặc định theo yêu cầu, không tự động điền mục trước đó
  const [selectedLoc, setSelectedLoc] = useState({
    folderTitle: currentLocation?.folderTitle || '',
    chapterTitle: currentLocation?.chapterTitle || '',
  });

  // Đồng bộ lại khi mở modal
  React.useEffect(() => {
    setSelectedLoc({
      folderTitle: currentLocation?.folderTitle || '',
      chapterTitle: currentLocation?.chapterTitle || '',
    });
    setActiveFolder(null);
  }, [isOpen, currentLocation]);

  const [searchTerm, setSearchTerm] = useState('');

  // State tạo thư mục mới
  const [isAddingNewFolder, setIsAddingNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // State tạo chương mới ngay trong phần chương
  const [isAddingNewChapter, setIsAddingNewChapter] = useState(false);
  const [newChapterName, setNewChapterName] = useState('');

  // Map lưu custom chapters theo folderId từ localStorage
  const [customChaptersMap, setCustomChaptersMap] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('created_exam_chapters_map') || '{}');
    } catch (e) {
      return {};
    }
  });

  // Lấy các thư mục tuỳ chỉnh từ localStorage
  const allFolders = useMemo(() => {
    let custom = [];
    try {
      const stored = JSON.parse(localStorage.getItem('created_exam_folders') || '[]');
      if (Array.isArray(stored)) {
        custom = stored.map((name, i) => ({
          id: `custom-folder-${i}`,
          title: name,
          grade: 'Tự tạo',
          chapters: [
            { id: `custom-c1-${i}`, title: 'Chương I: Nội dung kiến thức trọng tâm' },
            { id: `custom-c2-${i}`, title: 'Chương II: Luyện tập & Đề thi' },
          ],
        }));
      }
    } catch (e) {}

    // Ghép và lọc trùng theo tên thư mục
    const titles = new Set(DEFAULT_FOLDERS_STRUCTURE.map((f) => f.title.toLowerCase()));
    const validCustom = custom.filter((f) => !titles.has(f.title.toLowerCase()));
    const combined = [...DEFAULT_FOLDERS_STRUCTURE, ...validCustom];

    // Gắn thêm custom chapters đã tạo vào từng folder tương ứng
    return combined.map((f) => {
      const extraChaps = customChaptersMap[f.id] || [];
      return {
        ...f,
        chapters: [...(f.chapters || []), ...extraChaps],
      };
    });
  }, [isOpen, customChaptersMap]);

  // Lọc thư mục theo từ khóa tìm kiếm
  const filteredFolders = useMemo(() => {
    if (!searchTerm.trim()) return allFolders;
    return allFolders.filter((f) =>
      f.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }, [allFolders, searchTerm]);

  // Đồng bộ activeFolder với allFolders khi có chương mới được thêm
  const currentActiveFolderData = useMemo(() => {
    if (!activeFolder) return null;
    return allFolders.find((f) => f.id === activeFolder.id) || activeFolder;
  }, [activeFolder, allFolders]);

  if (!isOpen) return null;

  // 1. Xử lý tạo thư mục mới
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    const name = newFolderName.trim();

    try {
      const stored = JSON.parse(localStorage.getItem('created_exam_folders') || '[]');
      if (!stored.includes(name)) {
        stored.push(name);
        localStorage.setItem('created_exam_folders', JSON.stringify(stored));
      }
    } catch (e) {}

    setSelectedLoc({
      folderTitle: name,
      chapterTitle: '',
    });
    setNewFolderName('');
    setIsAddingNewFolder(false);
  };

  // 2. Xử lý TẠO CHƯƠNG MỚI ngay trong phần chương của thư mục đang mở
  const handleCreateChapter = () => {
    if (!newChapterName.trim() || !activeFolder) return;
    const rawName = newChapterName.trim();
    const folderChaps = currentActiveFolderData?.chapters || [];
    const nextOrder = folderChaps.length + 1;
    const romanNums = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    const roman = romanNums[nextOrder - 1] || `${nextOrder}`;

    const formattedTitle =
      rawName.startsWith('Chương') || rawName.startsWith('Chuyên đề')
        ? rawName
        : `Chương ${roman}: ${rawName}`;

    const newChapObj = {
      id: `custom-chap-${Date.now()}`,
      title: formattedTitle,
    };

    const updatedFolderCustom = [...(customChaptersMap[activeFolder.id] || []), newChapObj];
    const newMap = {
      ...customChaptersMap,
      [activeFolder.id]: updatedFolderCustom,
    };

    setCustomChaptersMap(newMap);
    try {
      localStorage.setItem('created_exam_chapters_map', JSON.stringify(newMap));
    } catch (e) {}

    // Tự động chọn luôn chương vừa tạo
    setSelectedLoc({
      folderTitle: activeFolder.title,
      chapterTitle: formattedTitle,
    });

    setNewChapterName('');
    setIsAddingNewChapter(false);
  };

  // Xác nhận lưu vị trí đã chọn
  const handleConfirm = () => {
    if (!selectedLoc.folderTitle) {
      alert('Vui lòng chọn một thư mục hoặc chương trong Quản lý đề thi!');
      return;
    }
    onConfirmLocation(selectedLoc);
    onClose();
  };

  return (
    <div className="dfm-overlay" onClick={onClose}>
      <div className="dfm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="dfm-header">
          <div className="dfm-header-left">
            <div className="dfm-header-icon">
              <IconFolder width={18} height={18} color="#0051D5" />
            </div>
            <div>
              <h3 className="dfm-title">Chọn vị trí lưu trong Quản lý đề thi</h3>
              <p className="dfm-subtitle">
                Truy cập từng thư mục và chọn chương học cụ thể để lưu đề thi
              </p>
            </div>
          </div>
          <button className="dfm-close-btn" onClick={onClose} title="Đóng">
            <IconClose width={14} height={14} color="#64748B" />
          </button>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="dfm-nav-bar">
          <button
            type="button"
            className={`dfm-nav-item ${!activeFolder ? 'active' : ''}`}
            onClick={() => setActiveFolder(null)}
          >
            <IconFolder width={14} height={14} color={!activeFolder ? '#0051D5' : '#64748B'} />
            <span>Tất cả thư mục</span>
          </button>

          {activeFolder && (
            <>
              <IconChevronRight width={12} height={12} color="#94A3B8" />
              <span className="dfm-nav-item active">
                {activeFolder.title}
              </span>
            </>
          )}
        </div>

        {/* Modal Body */}
        <div className="dfm-body">
          {/* LEVEL 1: Danh sách các thư mục */}
          {!activeFolder ? (
            <div className="dfm-folders-view">
              {/* Search & Add New Folder Bar */}
              <div className="dfm-top-actions">
                <div className="dfm-search-wrap">
                  <IconSearch width={14} height={14} color="#94A3B8" />
                  <input
                    type="text"
                    className="dfm-search-input"
                    placeholder="Tìm kiếm thư mục đề thi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {!isAddingNewFolder && (
                  <button
                    type="button"
                    className="dfm-btn-add-folder"
                    onClick={() => setIsAddingNewFolder(true)}
                  >
                    <IconPlus width={13} height={13} color="#0051D5" />
                    <span>Tạo thư mục mới</span>
                  </button>
                )}
              </div>

              {/* Add folder inline form */}
              {isAddingNewFolder && (
                <div className="dfm-inline-add-row">
                  <input
                    type="text"
                    className="dfm-inline-input"
                    placeholder="Nhập tên thư mục mới..."
                    value={newFolderName}
                    autoFocus
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                  />
                  <button
                    type="button"
                    className="dfm-btn-save-folder"
                    onClick={handleCreateFolder}
                  >
                    Lưu thư mục
                  </button>
                  <button
                    type="button"
                    className="dfm-btn-cancel-folder"
                    onClick={() => {
                      setIsAddingNewFolder(false);
                      setNewFolderName('');
                    }}
                  >
                    Hủy
                  </button>
                </div>
              )}

              {/* List of Folders */}
              <div className="dfm-items-list">
                {filteredFolders.map((folder) => {
                  const isFolderSelected =
                    selectedLoc.folderTitle === folder.title && !selectedLoc.chapterTitle;

                  return (
                    <div
                      key={folder.id}
                      className={`dfm-folder-card ${isFolderSelected ? 'selected' : ''}`}
                    >
                      <div
                        className="dfm-folder-main"
                        onClick={() => setActiveFolder(folder)}
                        title="Bấm để xem các chương bên trong"
                      >
                        <div className="dfm-folder-icon-box">
                          <IconFolder width={18} height={18} color="#0051D5" />
                        </div>
                        <div className="dfm-folder-text">
                          <span className="dfm-folder-name">{folder.title}</span>
                          <span className="dfm-folder-meta">
                            {folder.chapters?.length || 0} chương • {folder.grade}
                          </span>
                        </div>
                      </div>

                      <div className="dfm-folder-actions">
                        <button
                          type="button"
                          className={`dfm-btn-select ${isFolderSelected ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedLoc({
                              folderTitle: folder.title,
                              chapterTitle: '',
                            });
                          }}
                        >
                          {isFolderSelected ? (
                            <>
                              <IconCheck width={12} height={12} color="#16A34A" />
                              <span>Đang chọn</span>
                            </>
                          ) : (
                            'Chọn thư mục này'
                          )}
                        </button>

                        <button
                          type="button"
                          className="dfm-btn-view-chapters"
                          onClick={() => setActiveFolder(folder)}
                        >
                          <span>Xem chương</span>
                          <IconChevronRight width={12} height={12} color="#475569" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* LEVEL 2: Danh sách các chương trong thư mục được chọn */
            <div className="dfm-chapters-view">
              <div className="dfm-chapters-header">
                <button
                  type="button"
                  className="dfm-btn-back"
                  onClick={() => setActiveFolder(null)}
                >
                  <IconChevronLeft width={14} height={14} color="#0051D5" />
                  <span>Quay lại danh sách thư mục</span>
                </button>

                <button
                  type="button"
                  className={`dfm-btn-select-root ${
                    selectedLoc.folderTitle === currentActiveFolderData.title && !selectedLoc.chapterTitle
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => {
                    setSelectedLoc({
                      folderTitle: currentActiveFolderData.title,
                      chapterTitle: '',
                    });
                  }}
                >
                  <IconCheck width={12} height={12} color="currentColor" />
                  <span>Lưu ở thư mục gốc: {currentActiveFolderData.title}</span>
                </button>
              </div>

              {/* Sub-header with 'Tạo chương mới' Button */}
              <div className="dfm-chapters-top-bar">
                <span className="dfm-divider-note">
                  HOẶC CHỌN LƯU VÀO CHƯƠNG / CHUYÊN ĐỀ CỤ THỂ:
                </span>

                {!isAddingNewChapter && (
                  <button
                    type="button"
                    className="dfm-btn-add-chapter"
                    onClick={() => setIsAddingNewChapter(true)}
                  >
                    <IconPlus width={12} height={12} color="#0051D5" />
                    <span>Tạo chương mới</span>
                  </button>
                )}
              </div>

              {/* Inline Form: Tạo chương mới ngay trong phần chương */}
              {isAddingNewChapter && (
                <div className="dfm-inline-add-row" style={{ borderColor: '#0051D5', background: '#F0F7FF' }}>
                  <input
                    type="text"
                    className="dfm-inline-input"
                    placeholder="Nhập tên chương học mới (ví dụ: Số phức và Oxyz)..."
                    value={newChapterName}
                    autoFocus
                    onChange={(e) => setNewChapterName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateChapter()}
                  />
                  <button
                    type="button"
                    className="dfm-btn-save-folder"
                    onClick={handleCreateChapter}
                  >
                    Lưu chương
                  </button>
                  <button
                    type="button"
                    className="dfm-btn-cancel-folder"
                    onClick={() => {
                      setIsAddingNewChapter(false);
                      setNewChapterName('');
                    }}
                  >
                    Hủy
                  </button>
                </div>
              )}

              {/* List of Chapters */}
              <div className="dfm-items-list">
                {currentActiveFolderData?.chapters?.map((chap) => {
                  const isChapSelected =
                    selectedLoc.folderTitle === currentActiveFolderData.title &&
                    selectedLoc.chapterTitle === chap.title;

                  return (
                    <div
                      key={chap.id}
                      className={`dfm-chapter-card ${isChapSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedLoc({
                          folderTitle: currentActiveFolderData.title,
                          chapterTitle: chap.title,
                        });
                      }}
                    >
                      <div className="dfm-chapter-left">
                        <IconFileText width={16} height={16} color={isChapSelected ? '#0051D5' : '#64748B'} />
                        <span className="dfm-chapter-title">{chap.title}</span>
                      </div>

                      <button
                        type="button"
                        className={`dfm-btn-select ${isChapSelected ? 'active' : ''}`}
                      >
                        {isChapSelected ? (
                          <>
                            <IconCheck width={12} height={12} color="#16A34A" />
                            <span>Đã chọn</span>
                          </>
                        ) : (
                          'Chọn chương này'
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="dfm-footer">
          <div className="dfm-current-pick">
            <span className="dfm-current-label">Vị trí lưu đã chọn:</span>
            {selectedLoc.folderTitle ? (
              <strong className="dfm-current-path">
                📁 {selectedLoc.folderTitle}
                {selectedLoc.chapterTitle ? ` > 📄 ${selectedLoc.chapterTitle}` : ' (Thư mục gốc)'}
              </strong>
            ) : (
              <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: 600 }}>
                ⚠️ Chưa chọn vị trí lưu đề - Vui lòng bấm chọn một thư mục hoặc chương
              </span>
            )}
          </div>

          <div className="dfm-footer-actions">
            <button type="button" className="dfm-btn-cancel" onClick={onClose}>
              Hủy bỏ
            </button>
            <button
              type="button"
              className="dfm-btn-confirm"
              disabled={!selectedLoc.folderTitle}
              style={{ opacity: selectedLoc.folderTitle ? 1 : 0.6, cursor: selectedLoc.folderTitle ? 'pointer' : 'not-allowed' }}
              onClick={handleConfirm}
            >
              <IconCheck width={14} height={14} color="#FFFFFF" />
              <span>Xác nhận vị trí này</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
