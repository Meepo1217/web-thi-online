import React from 'react';
import {
  IconCheck,
  IconLightbulb,
} from '../../../../components/ui/icons';

/**
 * QuestionDetailedSolution
 * Thẻ hiển thị lời giải chi tiết 3 bước, giải thích bản chất toán học + Mẹo giải nhanh
 */
export default function QuestionDetailedSolution({ steps, quickTip }) {
  return (
    <div className="qd-solution-card">
      {/* Solution Header */}
      <div className="qd-solution-header">
        <IconLightbulb width={19} height={20} color="#0051D5" />
        <h2 className="qd-solution-heading">Lời giải chi tiết & Phương pháp giải</h2>
      </div>

      {/* Steps List */}
      <div className="qd-steps-list">
        {/* Step 1 */}
        {steps[0] && (
          <div className="qd-step-item">
            <div className="qd-step-number-wrap">
              <span className="qd-step-circle">{steps[0].number}</span>
            </div>
            <div className="qd-step-body">
              <h3 className="qd-step-title">{steps[0].title}</h3>
              <p className="qd-step-text">{steps[0].intro}</p>
              <div className="qd-formula-box">
                <code>{steps[0].formula}</code>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {steps[1] && (
          <div className="qd-step-item">
            <div className="qd-step-number-wrap">
              <span className="qd-step-circle">{steps[1].number}</span>
            </div>
            <div className="qd-step-body">
              <h3 className="qd-step-title">{steps[1].title}</h3>
              <p className="qd-step-text">{steps[1].intro}</p>
              <div className="qd-solution-cases-box">
                {steps[1].cases?.map((c, i) => (
                  <div key={i} className="qd-case-row">
                    {c}
                  </div>
                ))}
                <div className="qd-observation-text">{steps[1].observation}</div>
                {steps[1].equations?.map((eq, i) => (
                  <div key={i} className="qd-equation-row">
                    {eq}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {steps[2] && (
          <div className="qd-step-item">
            <div className="qd-step-number-wrap">
              <span className="qd-step-circle">{steps[2].number}</span>
            </div>
            <div className="qd-step-body">
              <h3 className="qd-step-title">{steps[2].title}</h3>
              <p className="qd-step-text">{steps[2].intro}</p>
              
              {/* Green Overlay Conclusion Box */}
              <div className="qd-conclusion-overlay">
                <p className="qd-conclusion-analysis">{steps[2].analysis}</p>
                <div className="qd-conclusion-row">
                  <IconCheck width={16.5} height={15.75} color="#069669" />
                  <span className="qd-conclusion-text">{steps[2].conclusion}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Tip Callout */}
      {quickTip && (
        <div className="qd-quick-tip-callout">
          <IconLightbulb width={20} height={20} color="#0051D5" />
          <div className="qd-quick-tip-body">
            <span className="qd-quick-tip-title">{quickTip.title}</span>
            <p className="qd-quick-tip-content">{quickTip.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
