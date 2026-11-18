import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionDeleteModal from './QuestionDeleteModal';
import { DEFAULT_DELETE_QUESTION } from './questionDeleteData';
import './question-delete.css';

/**
 * QuestionDeletePage - Màn hình 5: Popup xác nhận xóa câu hỏi
 * Thiết kế chuẩn Figma: Không Header & Sidebar, có lớp nền giao diện Ngân hàng câu hỏi làm mờ (Underlay blurred)
 */
export default function QuestionDeletePage() {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [question] = useState({
    ...DEFAULT_DELETE_QUESTION,
    code: questionId || DEFAULT_DELETE_QUESTION.code,
  });

  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      alert(`Đã xóa vĩnh viễn câu hỏi #${question.code} khỏi hệ thống ngân hàng đề thi!`);
      navigate('/teacher/questions/math/list');
    }, 600);
  };

  return (
    <div className="qdm-page-root">
      {/* 1. Subtle Realistic Underlay: Question Bank Interface (De-emphasized & Blurred) */}
      <div className="qdm-underlay-canvas" aria-hidden="true">
        {/* Underlay Header Bar Mockup */}
        <div className="qdm-underlay-header">
          <div className="qdm-underlay-left">
            <div className="qdm-underlay-icon-box">
              <span className="qdm-underlay-text-math">Toán</span>
            </div>
            <div className="qdm-underlay-title-col">
              <div className="qdm-underlay-bar-long" />
              <div className="qdm-underlay-bar-short" />
            </div>
          </div>
          <div className="qdm-underlay-btn-box" />
        </div>

        {/* Underlay Question Card Mockup */}
        <div className="qdm-underlay-card">
          <div className="qdm-underlay-bar-title" />
          <div className="qdm-underlay-bar-line1" />
          <div className="qdm-underlay-bar-line2" />

          {/* 4 Answer Option Boxes */}
          <div className="qdm-underlay-options-grid">
            <div className="qdm-underlay-opt-box" />
            <div className="qdm-underlay-opt-box" />
            <div className="qdm-underlay-opt-box" />
            <div className="qdm-underlay-opt-box" />
          </div>
        </div>
      </div>

      {/* 2. Fullscreen Modal Overlay Canvas & Modal Card */}
      <QuestionDeleteModal
        isOpen={true}
        question={question}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isDeleting={isDeleting}
      />
    </div>
  );
}
