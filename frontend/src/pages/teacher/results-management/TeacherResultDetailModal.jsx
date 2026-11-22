import React, { useState } from 'react';
import {
  IconClose,
  IconCheck,
  IconClock,
  IconDownload,
  IconFileText,
  IconLightbulb
} from '../../../components/ui/icons';

export default function TeacherResultDetailModal({ isOpen, onClose, submission }) {
  if (!isOpen || !submission) return null;

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'correct' | 'wrong' | 'skip'

  // Dữ liệu câu hỏi chi tiết từ submission hoặc mock chuẩn bài thi
  const questions = submission.questions || [
    {
      id: 1,
      status: 'correct',
      title: 'Cho hàm số y = f(x) có bảng biến thiên như sau. Hàm số đã cho đồng biến trên khoảng nào dưới đây?',
      mathSnippet: '(2; +∞)',
      points: '+0.20 ĐIỂM',
      options: [
        { key: 'A', text: '(2; +∞)', isChosen: true, isCorrect: true },
        { key: 'B', text: '(0; 2)', isChosen: false, isCorrect: false },
        { key: 'C', text: '(-∞; 2)', isChosen: false, isCorrect: false },
        { key: 'D', text: '(0; +∞)', isChosen: false, isCorrect: false }
      ],
      solution: 'Dựa vào bảng biến thiên, ta thấy trên khoảng (2; +∞) đạo hàm f\'(x) > 0 nên hàm số đồng biến trên khoảng (2; +∞). Phương án A là đáp án chính xác.'
    },
    {
      id: 2,
      status: 'wrong',
      title: 'Tìm giá trị của tham số m để biểu thức thỏa mãn điều kiện tích phân I:',
      mathSnippet: '∫(2x + m)dx = 4 (từ 0 đến 1)',
      points: '0.00 / 0.20 ĐIỂM',
      options: [
        { key: 'A', text: 'm = 1', isChosen: true, isCorrect: false },
        { key: 'B', text: 'm = 2', isChosen: false, isCorrect: false },
        { key: 'C', text: 'm = 3', isChosen: false, isCorrect: true },
        { key: 'D', text: 'm = -1', isChosen: false, isCorrect: false }
      ],
      solution: 'Ta có tích phân ∫(2x + m)dx từ 0 đến 1 bằng [x² + mx] = 1 + m = 4 => m = 3. Phương án C là đáp án chính xác.'
    },
    {
      id: 3,
      status: 'skip',
      title: 'Trong không gian Oxyz, tính khoảng cách từ điểm A(1; 2; -1) đến mặt phẳng (P): 2x - 2y + z + 5 = 0:',
      mathSnippet: 'd(A, (P))',
      points: '0.00 / 0.20 ĐIỂM',
      options: [
        { key: 'A', text: 'd(A, (P)) = 1', isChosen: false, isCorrect: false },
        { key: 'B', text: 'd(A, (P)) = 7/3', isChosen: false, isCorrect: true },
        { key: 'C', text: 'd(A, (P)) = 3', isChosen: false, isCorrect: false },
        { key: 'D', text: 'd(A, (P)) = 5/3', isChosen: false, isCorrect: false }
      ],
      solution: 'Áp dụng công thức tính khoảng cách từ điểm A đến mặt phẳng (P): d(A, (P)) = |2(1) - 2(2) + (-1) + 5| / √(2² + (-2)² + 1²) = |2 - 4 - 1 + 5| / √9 = 7/3. Chọn B.'
    },
    {
      id: 4,
      status: 'correct',
      title: 'Gieo một con xúc xắc cân đối và đồng chất hai lần liên tiếp. Xác suất để tổng số chấm xuất hiện trong hai lần gieo bằng 7 là:',
      mathSnippet: 'P(A) = n(A) / n(Ω)',
      points: '+0.20 ĐIỂM',
      options: [
        { key: 'A', text: '1/12', isChosen: false, isCorrect: false },
        { key: 'B', text: '1/6', isChosen: true, isCorrect: true },
        { key: 'C', text: '5/36', isChosen: false, isCorrect: false },
        { key: 'D', text: '7/36', isChosen: false, isCorrect: false }
      ],
      solution: 'Số phần tử không gian mẫu n(Ω) = 6 x 6 = 36. Các biến cố thuận lợi có tổng số chấm bằng 7 là: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) => có 6 phần tử. Xác suất P = 6/36 = 1/6. Chọn B.'
    },
    {
      id: 5,
      status: 'correct',
      title: 'Cho hình chóp S.ABCD có đáy ABCD là hình vuông cạnh a, SA vuông góc với đáy và SA = a√3. Thể tích khối chóp S.ABCD là:',
      mathSnippet: 'V = (1/3) * B * h',
      points: '+0.20 ĐIỂM',
      options: [
        { key: 'A', text: '(a³√3) / 3', isChosen: true, isCorrect: true },
        { key: 'B', text: 'a³√3', isChosen: false, isCorrect: false },
        { key: 'C', text: '(a³√3) / 6', isChosen: false, isCorrect: false },
        { key: 'D', text: '(a³) / 3', isChosen: false, isCorrect: false }
      ],
      solution: 'Diện tích đáy B = S_ABCD = a². Chiều cao h = SA = a√3. Thể tích V = (1/3) * B * h = (1/3) * a² * a√3 = (a³√3)/3. Phương án A chính xác.'
    }
  ];

  const totalQuestions = submission.totalQuestions || 50;
  const correctCount = submission.correctCount || 43;
  const wrongCount = submission.wrongCount || 5;
  const skipCount = submission.skipCount !== undefined ? submission.skipCount : (totalQuestions - correctCount - wrongCount);

  const filteredQuestions = questions.filter(q => {
    if (activeFilter === 'all') return true;
    return q.status === activeFilter;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tr-modal-overlay" onClick={onClose}>
      <div className="tr-modal-box" onClick={e => e.stopPropagation()}>
        
        {/* Header Modal */}
        <div className="tr-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="tr-candidate-avatar" style={{ width: '40px', height: '40px', fontSize: '15px' }}>
              {submission.studentName ? submission.studentName.split(' ').pop().charAt(0) : 'S'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0B1C30' }}>
                  {submission.studentName}
                </h3>
                <span className="tr-class-badge">{submission.className}</span>
              </div>
              <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>
                MSSV: <strong>{submission.studentMssv}</strong> • Ca thi: <strong>{submission.sessionCode || 'CA-01'}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#475569',
              transition: 'all 0.15s ease'
            }}
            title="Đóng modal"
          >
            <IconClose width={12} height={12} color="currentColor" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="tr-modal-body">
          
          {/* Submission Info Banner */}
          <div className="tr-submission-banner">
            <div className="tr-submission-meta">
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#0051D5', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                {submission.examTitle}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12.5px', color: '#475569', marginTop: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <IconClock width={13} height={13} color="#64748B" />
                  Nộp bài: <strong>{submission.submittedAt}</strong>
                </span>
                <span>•</span>
                <span>Thời gian làm bài: <strong>{submission.durationSpent || '41 phút 20 giây'}</strong></span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="tr-submission-score-box">
                <span className="tr-score-big">{submission.score}</span>
                <span className="tr-score-max">/ 10 điểm</span>
              </div>

              <div style={{ height: '36px', width: '1px', background: '#DCE9FF' }}></div>

              <div className="tr-breakdown-row">
                <div className="tr-breakdown-pill correct">
                  <IconCheck width={12} height={12} color="#15803D" />
                  <span>Đúng: <strong>{correctCount}</strong>/{totalQuestions}</span>
                </div>
                <div className="tr-breakdown-pill wrong">
                  <span>Sai: <strong>{wrongCount}</strong></span>
                </div>
                <div className="tr-breakdown-pill skip">
                  <span>Bỏ qua: <strong>{skipCount}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="tr-q-filter-row">
            <button
              className={`tr-q-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Tất cả câu hỏi ({questions.length})
            </button>
            <button
              className={`tr-q-filter-btn ${activeFilter === 'correct' ? 'active' : ''}`}
              onClick={() => setActiveFilter('correct')}
            >
              Đúng ({questions.filter(q => q.status === 'correct').length})
            </button>
            <button
              className={`tr-q-filter-btn ${activeFilter === 'wrong' ? 'active' : ''}`}
              onClick={() => setActiveFilter('wrong')}
            >
              Làm sai ({questions.filter(q => q.status === 'wrong').length})
            </button>
            <button
              className={`tr-q-filter-btn ${activeFilter === 'skip' ? 'active' : ''}`}
              onClick={() => setActiveFilter('skip')}
            >
              Chưa trả lời ({questions.filter(q => q.status === 'skip').length})
            </button>
          </div>

          {/* Question List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredQuestions.map((q, idx) => {
              const statusBadge = q.status === 'correct' ? (
                <span className="tr-q-status-badge correct">
                  <IconCheck width={11} height={11} color="#15803D" /> Đúng (+0.20đ)
                </span>
              ) : q.status === 'wrong' ? (
                <span className="tr-q-status-badge wrong">
                  ✕ Sai (0.00đ)
                </span>
              ) : (
                <span className="tr-q-status-badge skip">
                  - Chưa làm (0.00đ)
                </span>
              );

              return (
                <div key={q.id} className="tr-q-card">
                  <div className="tr-q-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0B1C30' }}>
                        Câu {idx + 1}
                      </span>
                      {statusBadge}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
                      {q.points}
                    </span>
                  </div>

                  <p className="tr-q-text">{q.title}</p>
                  {q.mathSnippet && (
                    <div style={{ padding: '6px 12px', background: '#F8FAFC', borderRadius: '4px', fontStyle: 'italic', fontSize: '13px', color: '#334155' }}>
                      {q.mathSnippet}
                    </div>
                  )}

                  {/* Options */}
                  <div className="tr-options-grid">
                    {q.options.map((opt) => {
                      let optClass = '';
                      let badgeNote = null;

                      if (opt.isCorrect) {
                        optClass = 'correct';
                        badgeNote = opt.isChosen ? '(Thí sinh chọn - Đúng)' : '(Đáp án đúng)';
                      } else if (opt.isChosen && !opt.isCorrect) {
                        optClass = 'chosen-wrong';
                        badgeNote = '(Thí sinh chọn - Sai)';
                      }

                      return (
                        <div key={opt.key} className={`tr-option-box ${optClass}`}>
                          <strong style={{ minWidth: '20px' }}>{opt.key}.</strong>
                          <span style={{ flex: 1 }}>{opt.text}</span>
                          {badgeNote && (
                            <span style={{ fontSize: '11px', opacity: 0.9 }}>
                              {badgeNote}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Solution Box */}
                  {q.solution && (
                    <div className="tr-solution-box">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px' }}>
                        <IconLightbulb width={14} height={14} color="#0051D5" />
                        <span>Lời giải chi tiết:</span>
                      </div>
                      <div>{q.solution}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="tr-modal-footer">
          <button
            onClick={handlePrint}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: '#FFFFFF',
              color: '#334155',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <IconDownload width={13} height={13} color="currentColor" />
            In phiếu bài thi
          </button>

          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              background: '#0051D5',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
