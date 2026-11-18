import React from 'react';
import { IconFolder } from '../../../../components/ui/icons';
import {
  SUBJECT_OPTIONS,
  GRADE_OPTIONS,
  CHAPTER_OPTIONS,
  LESSON_OPTIONS,
  BLOOM_LEVELS,
} from './questionCreateData';

/**
 * CreateTaxonomyPanel - Cột phải: Card A - Phân loại học thuật (Taxonomy & Knowledge Matrix)
 */
export default function CreateTaxonomyPanel({ taxonomy, onChangeTaxonomy }) {
  const currentChapters = CHAPTER_OPTIONS[taxonomy.subject] || CHAPTER_OPTIONS.math || [];
  const currentLessons = LESSON_OPTIONS[taxonomy.chapter] || LESSON_OPTIONS.chapter1 || [];

  const handleFieldChange = (field, value) => {
    onChangeTaxonomy((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="qc-card qc-taxonomy-card">
      {/* 1. Card Header */}
      <div className="qc-card-header">
        <div className="qc-card-label">
          <span className="qc-taxonomy-icon">
            <IconFolder width={17} height={15} color="#0051D5" />
          </span>
          <h2 className="qc-card-title">Phân loại học thuật</h2>
        </div>
        <span className="qc-required-badge">Bắt buộc</span>
      </div>

      {/* 2. Form Fields */}
      <div className="qc-taxonomy-fields">
        {/* Field 1: Môn học */}
        <div className="qc-form-field">
          <label className="qc-field-label" htmlFor="qc-subject-select">
            Môn học
          </label>
          <div className="qc-select-box">
            <select
              id="qc-subject-select"
              className="qc-select"
              value={taxonomy.subject}
              onChange={(e) => handleFieldChange('subject', e.target.value)}
            >
              <option value="">-- Chọn môn học --</option>
              {SUBJECT_OPTIONS.map((sub) => (
                <option key={sub.value} value={sub.value}>
                  {sub.label}
                </option>
              ))}
            </select>
            <span className="qc-select-arrow" aria-hidden="true" />
          </div>
        </div>

        {/* Field 2: Khối lớp & Chương trình */}
        <div className="qc-form-field">
          <label className="qc-field-label" htmlFor="qc-grade-select">
            Khối lớp & Chương trình
          </label>
          <div className="qc-select-box">
            <select
              id="qc-grade-select"
              className="qc-select"
              value={taxonomy.grade}
              onChange={(e) => handleFieldChange('grade', e.target.value)}
            >
              <option value="">-- Chọn khối lớp --</option>
              {GRADE_OPTIONS.map((gr) => (
                <option key={gr.value} value={gr.value}>
                  {gr.label}
                </option>
              ))}
            </select>
            <span className="qc-select-arrow" aria-hidden="true" />
          </div>
        </div>

        {/* Field 3: Chuyên đề / Chương */}
        <div className="qc-form-field">
          <label className="qc-field-label" htmlFor="qc-chapter-select">
            Chuyên đề / Chương
          </label>
          <div className="qc-select-box">
            <select
              id="qc-chapter-select"
              className="qc-select"
              value={taxonomy.chapter}
              onChange={(e) => handleFieldChange('chapter', e.target.value)}
            >
              <option value="">-- Chọn chuyên đề / chương --</option>
              {currentChapters.map((ch) => (
                <option key={ch.value} value={ch.value}>
                  {ch.label}
                </option>
              ))}
            </select>
            <span className="qc-select-arrow" aria-hidden="true" />
          </div>
        </div>

        {/* Field 4: Bài học cụ thể */}
        <div className="qc-form-field">
          <label className="qc-field-label" htmlFor="qc-lesson-select">
            Bài học cụ thể
          </label>
          <div className="qc-select-box">
            <select
              id="qc-lesson-select"
              className="qc-select"
              value={taxonomy.lesson}
              onChange={(e) => handleFieldChange('lesson', e.target.value)}
            >
              <option value="">-- Chọn bài học cụ thể --</option>
              {currentLessons.map((les) => (
                <option key={les.value} value={les.value}>
                  {les.label}
                </option>
              ))}
            </select>
            <span className="qc-select-arrow" aria-hidden="true" />
          </div>
        </div>

        {/* Field 5: Mức độ nhận thức (Bloom Cognitive Level) */}
        <div className="qc-bloom-section">
          <div className="qc-bloom-header">
            <label className="qc-field-label">Mức độ nhận thức</label>
            <span className="qc-bloom-tag">Thang Bloom</span>
          </div>

          <div className="qc-bloom-grid">
            {BLOOM_LEVELS.map((bloom) => {
              const isSelected = taxonomy.bloomLevel === bloom.id;
              return (
                <button
                  key={bloom.id}
                  type="button"
                  className={`qc-bloom-btn ${isSelected ? 'qc-bloom-btn--active' : ''}`}
                  onClick={() => handleFieldChange('bloomLevel', bloom.id)}
                >
                  {bloom.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
