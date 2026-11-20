import React, { useState, useMemo } from 'react';
import {
  IconSearch,
  IconCheck,
  IconPlus,
} from '../../../../components/ui/icons';
import {
  INITIAL_QUESTIONS,
  FILTER_OPTIONS,
} from '../../question-bank/question-list/questionListData';

/**
 * SelectQuestionsModal
 * Popup "Chọn câu hỏi từ Ngân hàng câu hỏi" để thêm vào đề thi hiện tại.
 * Hỗ trợ tìm kiếm, lọc theo chương & mức độ Bloom, chọn nhiều câu cùng lúc hoặc tạo câu trắng.
 */
export default function SelectQuestionsModal({
  isOpen,
  onClose,
  onAddSelected,
  existingCount = 0,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [selectedBloom, setSelectedBloom] = useState('all');
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Lọc danh sách câu hỏi trong ngân hàng
  const filteredQuestions = useMemo(() => {
    return INITIAL_QUESTIONS.filter((q) => {
      // Tìm kiếm từ khóa theo nội dung hoặc mã câu hỏi
      const matchSearch =
        !searchTerm.trim() ||
        q.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.code?.toLowerCase().includes(searchTerm.toLowerCase());

      // Lọc theo chương
      let matchChapter = true;
      if (selectedChapter !== 'all') {
        const chapObj = FILTER_OPTIONS.chapters.find((c) => c.value === selectedChapter);
        if (chapObj && q.chapter) {
          matchChapter = q.chapter.toLowerCase().includes(chapObj.label.toLowerCase()) ||
            chapObj.label.toLowerCase().includes(q.chapter.toLowerCase());
        }
      }

      // Lọc theo Bloom
      let matchBloom = true;
      if (selectedBloom !== 'all') {
        const bloomObj = FILTER_OPTIONS.bloomLevels.find((b) => b.value === selectedBloom);
        if (bloomObj && q.bloom) {
          matchBloom = q.bloom.toLowerCase().includes(bloomObj.label.toLowerCase());
        }
      }

      return matchSearch && matchChapter && matchBloom;
    });
  }, [searchTerm, selectedChapter, selectedBloom]);

  if (!isOpen) return null;

  // Toggle chọn / bỏ chọn 1 câu hỏi
  const handleToggleSelect = (qId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) {
        next.delete(qId);
      } else {
        next.add(qId);
      }
      return next;
    });
  };

  // Chọn tất cả các câu đang hiển thị
  const handleToggleSelectAll = () => {
    if (selectedIds.size === filteredQuestions.length && filteredQuestions.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredQuestions.map((q) => q.id)));
    }
  };

  // Xác nhận thêm các câu đã chọn
  const handleConfirmAdd = () => {
    const selectedList = INITIAL_QUESTIONS.filter((q) => selectedIds.has(q.id));
    if (selectedList.length > 0) {
      onAddSelected(selectedList);
      setSelectedIds(new Set());
      onClose();
    }
  };

  const isAllSelected =
    filteredQuestions.length > 0 && selectedIds.size === filteredQuestions.length;

  return (
    <div className="ee-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="ee-modal-container"
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="select-questions-title"
      >
        {/* 1. MODAL HEADER */}
        <div className="ee-modal-header">
          <div className="ee-modal-header-left">
            <h2 id="select-questions-title" className="ee-modal-title">
              Chọn câu hỏi từ Ngân hàng câu hỏi
            </h2>
            <div className="ee-modal-subrow">
              <span className="ee-modal-badge">Môn: Toán học THPT</span>
              <span className="ee-modal-subtext">
                Kho câu hỏi có sẵn • Hiện có trong đề: {existingCount} câu
              </span>
            </div>
          </div>

          <button
            type="button"
            className="ee-modal-close-btn"
            onClick={onClose}
            aria-label="Đóng popup"
            title="Đóng popup (Esc)"
          >
            ✕
          </button>
        </div>

        {/* 2. FILTER & SEARCH TOOLBAR */}
        <div className="ee-modal-toolbar">
          {/* Search box */}
          <div className="ee-modal-search-box">
            <IconSearch width={16} height={16} color="#76777D" />
            <input
              type="text"
              placeholder="Tìm kiếm nội dung câu hỏi hoặc mã câu (#MATH-12-...)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ee-modal-search-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="ee-modal-clear-search"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="ee-modal-filters">
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="ee-modal-select"
            >
              {FILTER_OPTIONS.chapters.map((chap) => (
                <option key={chap.value} value={chap.value}>
                  {chap.label}
                </option>
              ))}
            </select>

            <select
              value={selectedBloom}
              onChange={(e) => setSelectedBloom(e.target.value)}
              className="ee-modal-select"
            >
              {FILTER_OPTIONS.bloomLevels.map((lvl) => (
                <option key={lvl.value} value={lvl.value}>
                  {lvl.label === 'Mức độ' ? 'Tất cả mức độ Bloom' : lvl.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. SELECTION CONTROL STRIP */}
        <div className="ee-modal-selection-strip">
          <label className="ee-modal-checkbox-label">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleToggleSelectAll}
              disabled={filteredQuestions.length === 0}
            />
            <span className="ee-modal-select-all-text">
              {isAllSelected ? 'Bỏ chọn tất cả' : `Chọn tất cả (${filteredQuestions.length} câu)`}
            </span>
          </label>

          <div className="ee-modal-selected-badge">
            <span>Đã chọn:</span>
            <strong>{selectedIds.size} câu hỏi</strong>
          </div>
        </div>

        {/* 4. SCROLLABLE QUESTION LIST */}
        <div className="ee-modal-question-list">
          {filteredQuestions.length === 0 ? (
            <div className="ee-modal-empty-state">
              <span className="ee-modal-empty-icon">🔍</span>
              <p className="ee-modal-empty-text">
                Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại.
              </p>
              <button
                type="button"
                className="ee-modal-btn-reset"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedChapter('all');
                  setSelectedBloom('all');
                }}
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const isSelected = selectedIds.has(q.id);
              return (
                <div
                  key={q.id}
                  className={`ee-modal-q-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleToggleSelect(q.id)}
                >
                  <div className="ee-modal-q-header">
                    <div className="ee-modal-q-header-left">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // Đã được xử lý bởi onClick của thẻ cha
                        className="ee-modal-q-checkbox"
                      />
                      <span className="ee-modal-q-code">{q.code}</span>
                      <span className={`ee-modal-q-bloom bloom-${q.bloomType || 'default'}`}>
                        {q.bloom}
                      </span>
                      <span className="ee-modal-q-chapter">{q.chapter}</span>
                    </div>

                    <span className="ee-modal-q-author">Tác giả: {q.author || 'Tổ Toán'}</span>
                  </div>

                  {/* Question Content */}
                  <p className="ee-modal-q-content">{q.content}</p>

                  {/* Options Preview */}
                  {q.options && q.options.length > 0 && (
                    <div className="ee-modal-options-grid">
                      {q.options.map((opt) => (
                        <div
                          key={opt.key}
                          className={`ee-modal-option-item ${opt.isCorrect ? 'is-correct' : ''}`}
                        >
                          <span className="ee-modal-opt-letter">{opt.key}</span>
                          <span className="ee-modal-opt-text">{opt.text}</span>
                          {opt.isCorrect && (
                            <span className="ee-modal-opt-correct-icon" title="Đáp án đúng">
                              <IconCheck width={12} height={12} color="#059669" />
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 5. MODAL FOOTER */}
        <div className="ee-modal-footer">
          <div className="ee-modal-footer-hint">
            <span>
              {selectedIds.size > 0
                ? `Đã chọn ${selectedIds.size} câu hỏi để bổ sung vào đề`
                : 'Chọn các câu hỏi từ ngân hàng để thêm vào đề thi'}
            </span>
          </div>

          <div className="ee-modal-footer-actions">
            <button
              type="button"
              className="ee-modal-btn-cancel"
              onClick={onClose}
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              className="ee-modal-btn-submit"
              disabled={selectedIds.size === 0}
              onClick={handleConfirmAdd}
            >
              <IconPlus width={15} height={15} color="#FFFFFF" />
              <span>
                Thêm {selectedIds.size > 0 ? `${selectedIds.size} câu hỏi` : ''} vào đề thi
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
