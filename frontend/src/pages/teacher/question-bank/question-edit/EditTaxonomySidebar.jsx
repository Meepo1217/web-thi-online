import React from 'react';
import { IconBookmark, IconChevronDown } from '../../../../components/ui/icons';
import { BLOOM_LEVELS } from './questionEditData';

/**
 * EditTaxonomySidebar
 * Card phân loại học thuật (Cột phải):
 * - Môn học (Subject selector)
 * - Khối lớp (Grade tabs: 10, 11, 12)
 * - Chương / Chuyên đề (Chapter selector)
 * - Mức độ tư duy Bloom (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao)
 * - Điểm số mặc định (Score weighting)
 */
export default function EditTaxonomySidebar({
  taxonomy,
  onChangeTaxonomy,
}) {
  const handleGradeSelect = (grade) => {
    onChangeTaxonomy({ ...taxonomy, grade });
  };

  const handleBloomSelect = (bloom) => {
    onChangeTaxonomy({ ...taxonomy, bloom });
  };

  return (
    <div className="qe-card qe-card-sidebar">
      {/* Header */}
      <div className="qe-sidebar-card-header">
        <div className="qe-sidebar-header-left">
          <div className="qe-icon-box-primary">
            <IconBookmark width={16} height={16} color="#0051D5" />
          </div>
          <h2 className="qe-sidebar-heading">Phân loại học thuật</h2>
        </div>
      </div>

      <div className="qe-sidebar-body">
        {/* 1. Môn học */}
        <div className="qe-form-group">
          <label className="qe-field-label">MÔN HỌC</label>
          <div className="qe-select-wrapper">
            <select
              className="qe-select-input"
              value={taxonomy.subject}
              onChange={(e) =>
                onChangeTaxonomy({ ...taxonomy, subject: e.target.value })
              }
            >
              <option value="math">Toán học THPT</option>
              <option value="physics">Vật lý THPT</option>
              <option value="chemistry">Hóa học THPT</option>
              <option value="biology">Sinh học THPT</option>
            </select>
            <div className="qe-select-arrow">
              <IconChevronDown width={12} height={12} color="#76777D" />
            </div>
          </div>
        </div>

        {/* 2. Khối lớp (Tabs 10, 11, 12) */}
        <div className="qe-form-group">
          <label className="qe-field-label">KHỐI LỚP</label>
          <div className="qe-grade-tabs">
            {['10', '11', '12'].map((g) => {
              const isActive = taxonomy.grade === g;
              return (
                <button
                  key={g}
                  type="button"
                  className={`qe-grade-btn ${isActive ? 'is-grade-active' : ''}`}
                  onClick={() => handleGradeSelect(g)}
                >
                  Lớp {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Chương / Chuyên đề */}
        <div className="qe-form-group">
          <label className="qe-field-label">CHƯƠNG / CHUYÊN ĐỀ</label>
          <div className="qe-select-wrapper">
            <select
              className="qe-select-input"
              value={taxonomy.chapter}
              onChange={(e) =>
                onChangeTaxonomy({ ...taxonomy, chapter: e.target.value })
              }
            >
              <option value="Chương I: Đạo hàm & Khảo sát hàm số">
                Chương I: Đạo hàm & Khảo sát hàm số
              </option>
              <option value="Chương II: Hàm số lũy thừa, mũ và logarit">
                Chương II: Hàm số lũy thừa, mũ và logarit
              </option>
              <option value="Chương III: Nguyên hàm - Tích phân">
                Chương III: Nguyên hàm - Tích phân
              </option>
              <option value="Chương IV: Số phức">Chương IV: Số phức</option>
            </select>
            <div className="qe-select-arrow">
              <IconChevronDown width={12} height={12} color="#76777D" />
            </div>
          </div>
        </div>

        {/* 4. Mức độ Bloom */}
        <div className="qe-form-group">
          <label className="qe-field-label">MỨC ĐỘ BLOOM</label>
          <div className="qe-bloom-grid">
            {BLOOM_LEVELS.map((b) => {
              const isActive = taxonomy.bloom === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  className={`qe-bloom-btn ${isActive ? 'is-bloom-active' : ''}`}
                  onClick={() => handleBloomSelect(b.id)}
                >
                  {isActive && <span className="qe-bloom-dot" />}
                  <span>{b.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Điểm số mặc định */}
        <div className="qe-form-group qe-score-group">
          <div className="qe-score-label-row">
            <label className="qe-field-label">ĐIỂM SỐ MẶC ĐỊNH</label>
            <span className="qe-score-hint">Cho bài thi 50 câu</span>
          </div>
          <div className="qe-score-input-wrap">
            <input
              type="text"
              className="qe-score-input"
              value={taxonomy.scoreWeight}
              onChange={(e) =>
                onChangeTaxonomy({ ...taxonomy, scoreWeight: e.target.value })
              }
            />
            <span className="qe-score-unit">điểm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
