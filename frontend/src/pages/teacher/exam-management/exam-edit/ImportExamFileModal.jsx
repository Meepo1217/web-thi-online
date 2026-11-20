import React, { useState, useRef, useEffect } from 'react';
import {
  IconUpload,
  IconFileText,
  IconExcel,
  IconCheck,
  IconTrash,
  IconDownload,
} from '../../../../components/ui/icons';
import '../../../../components/ui/import-file-modal.css';

/**
 * ImportExamFileModal
 * Popup "Đẩy file lên" để nhập đề thi & câu hỏi từ tệp Word (.docx, .doc), Excel (.xlsx), PDF hoặc Text.
 * Hỗ trợ kéo thả file, tự động nhận diện cấu trúc câu hỏi, tùy chọn nối tiếp hoặc ghi đè.
 */
export default function ImportExamFileModal({
  isOpen,
  onClose,
  onImportSuccess,
  currentCount = 0,
  title = 'Đẩy file đề thi lên hệ thống',
  subtitle = 'Hỗ trợ file Word (.docx), Excel (.xlsx), PDF hoặc Text',
  badgeText = 'Nhập câu hỏi tự động',
  targetName = 'đề thi',
}) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [importMode, setImportMode] = useState('append'); // 'append' (Nối tiếp) hoặc 'replace' (Ghi đè)
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedCount, setAnalyzedCount] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFile(null);
      setIsDragging(false);
      setImportMode('append');
      setIsAnalyzing(false);
      setAnalyzedCount(0);
      setUploadError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Xử lý khi chọn file
  const handleFileProcess = (selectedFile) => {
    if (!selectedFile) return;

    // Kiểm tra định dạng
    const validExtensions = ['.docx', '.doc', '.xlsx', '.xls', '.pdf', '.txt'];
    const fileName = selectedFile.name.toLowerCase();
    const isValid = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      setUploadError('Định dạng tệp không được hỗ trợ. Vui lòng chọn file Word, Excel, PDF hoặc Text.');
      setFile(null);
      return;
    }

    setUploadError(null);
    setFile(selectedFile);
    setIsAnalyzing(true);

    // Mô phỏng quá trình AI / parser quét cấu trúc đề thi
    setTimeout(() => {
      setIsAnalyzing(false);
      // Giả lập số câu hỏi phát hiện được từ file (từ 8 đến 12 câu)
      const count = Math.floor(Math.random() * 5) + 8;
      setAnalyzedCount(count);
    }, 600);
  };

  const handleInputChange = (e) => {
    const f = e.target.files?.[0];
    if (f) handleFileProcess(f);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFileProcess(f);
  };

  // Xác nhận nạp câu hỏi vào đề / ngân hàng
  const handleConfirmImport = () => {
    if (!file || analyzedCount === 0) return;

    // Sinh danh sách câu hỏi mô phỏng từ file tải lên
    const generatedQuestions = [];
    const sampleStems = [
      'Nghiệm của phương trình log₃(2x - 1) = 2 là:',
      'Cho khối chóp có diện tích đáy B = 6a² và chiều cao h = 2a. Thể tích của khối chóp đã cho bằng:',
      'Họ tất cả các nguyên hàm của hàm số f(x) = 2x + cos x là:',
      'Trong không gian Oxyz, cho hai điểm A(1; 1; -2) và B(2; 2; 1). Vectơ AB có tọa độ là:',
      'Cho hình lăng trụ tam giác đều ABC.A\'B\'C\' có cạnh đáy bằng a và cạnh bên bằng 2a. Góc giữa hai mặt phẳng (A\'BC) và (ABC) bằng:',
      'Giá trị lớn nhất của hàm số f(x) = x³ - 3x + 2 trên đoạn [-1; 2] bằng:',
      'Tập nghiệm của bất phương trình 2^(x² - x) ≤ 4 là:',
      'Cho số phức z thỏa mãn (1 + 2i)z = 5. Môđun của số phức z bằng:',
      'Trong không gian Oxyz, mặt cầu (S): (x - 1)² + (y + 2)² + z² = 9 có bán kính bằng:',
      'Một tổ học sinh có 6 nam và 4 nữ. Chọn ngẫu nhiên 3 học sinh. Xác suất để chọn được 2 nam và 1 nữ là:',
      'Tính diện tích hình phẳng giới hạn bởi đồ thị y = x² - 2x và trục hoành Ox:',
      'Cho cấp số cộng (u_n) có u₁ = 3 và công sai d = 4. Giá trị của u₅ bằng:',
    ];

    const countToGenerate = Math.min(analyzedCount, sampleStems.length);
    for (let i = 0; i < countToGenerate; i++) {
      const bloomName = i % 4 === 0 ? 'Nhận biết' : i % 4 === 1 ? 'Thông hiểu' : i % 4 === 2 ? 'Vận dụng' : 'Vận dụng cao';
      const bloomType = i % 4 === 0 ? 'nhan-biet' : i % 4 === 1 ? 'thong-hieu' : i % 4 === 2 ? 'van-dung' : 'vd-cao';
      const qNum = i + 1;
      const qCode = `MATH-12-0${500 + i}`;
      const correctKey = ['A', 'B', 'C', 'D'][i % 4];

      generatedQuestions.push({
        id: `MATH-12-IMPORT-${Date.now() + i}`,
        code: `#${qCode}`,
        number: qNum,
        type: 'mcq',
        points: '1.00 Điểm',
        bloom: bloomName.toUpperCase(),
        bloomType: bloomType,
        chapter: 'Giải tích 12',
        author: 'ThS. Nguyễn Văn A',
        date: 'Hôm nay',
        stem: sampleStems[i],
        content: sampleStems[i],
        correctOption: correctKey,
        isCompleted: true,
        tags: ['Giải tích 12', 'Nạp từ file'],
        usageCount: 0,
        options: [
          { key: 'A', id: 'A', text: `Phương án A cho câu hỏi ${qNum}`, isCorrect: correctKey === 'A' },
          { key: 'B', id: 'B', text: `Phương án B cho câu hỏi ${qNum}`, isCorrect: correctKey === 'B' },
          { key: 'C', id: 'C', text: `Phương án C cho câu hỏi ${qNum}`, isCorrect: correctKey === 'C' },
          { key: 'D', id: 'D', text: `Phương án D cho câu hỏi ${qNum}`, isCorrect: correctKey === 'D' },
        ],
      });
    }

    onImportSuccess(generatedQuestions, importMode, file.name);
    onClose();
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="ee-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="ee-modal-container ee-import-modal-container"
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="import-file-title"
      >
        {/* 1. MODAL HEADER */}
        <div className="ee-modal-header">
          <div className="ee-modal-header-left">
            <h2 id="import-file-title" className="ee-modal-title">
              {title}
            </h2>
            <div className="ee-modal-subrow">
              <span className="ee-modal-badge">{badgeText}</span>
              <span className="ee-modal-subtext">
                {subtitle}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="ee-modal-close-btn"
            onClick={onClose}
            aria-label="Đóng popup"
            title="Đóng popup"
          >
            ✕
          </button>
        </div>

        {/* 2. MODAL BODY */}
        <div className="ee-import-modal-body">
          {/* Vùng Dropzone tải file */}
          <div
            className={`ee-upload-dropzone ${isDragging ? 'is-dragging' : ''} ${file ? 'has-file' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleInputChange}
              accept=".docx,.doc,.xlsx,.xls,.pdf,.txt"
              style={{ display: 'none' }}
            />

            {!file ? (
              <div className="ee-dropzone-content">
                <div className="ee-dropzone-icon-circle">
                  <IconUpload width={28} height={28} color="#0051D5" />
                </div>
                <h3 className="ee-dropzone-title">
                  Kéo thả file vào đây, hoặc <span className="ee-dropzone-browse">chọn từ máy tính</span>
                </h3>
                <p className="ee-dropzone-desc">
                  Định dạng hỗ trợ: <strong>.DOCX, .DOC, .XLSX, .PDF, .TXT</strong> (Dung lượng tối đa 25MB)
                </p>
                <div className="ee-dropzone-tags">
                  <span className="ee-file-tag">Word (.docx)</span>
                  <span className="ee-file-tag">Excel (.xlsx)</span>
                  <span className="ee-file-tag">PDF</span>
                </div>
              </div>
            ) : (
              <div className="ee-dropzone-file-preview" onClick={(e) => e.stopPropagation()}>
                <div className="ee-preview-left">
                  <div className="ee-preview-file-icon">
                    {file.name.endsWith('.xlsx') || file.name.endsWith('.xls') ? (
                      <IconExcel width={28} height={28} color="#059669" />
                    ) : (
                      <IconFileText width={28} height={28} color="#0051D5" />
                    )}
                  </div>
                  <div className="ee-preview-meta">
                    <span className="ee-preview-filename" title={file.name}>
                      {file.name}
                    </span>
                    <span className="ee-preview-filesize">{formatFileSize(file.size)}</span>
                  </div>
                </div>

                <div className="ee-preview-right">
                  <button
                    type="button"
                    className="ee-preview-btn-change"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Đổi file khác
                  </button>
                  <button
                    type="button"
                    className="ee-preview-btn-remove"
                    onClick={() => {
                      setFile(null);
                      setAnalyzedCount(0);
                    }}
                    title="Xóa file đã chọn"
                  >
                    <IconTrash width={15} height={15} color="#BA1A1A" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lỗi định dạng nếu có */}
          {uploadError && (
            <div className="ee-import-error-banner">
              <span>⚠️</span>
              <span>{uploadError}</span>
            </div>
          )}

          {/* Trạng thái phân tích câu hỏi */}
          {file && (
            <div className="ee-import-analyze-box">
              {isAnalyzing ? (
                <div className="ee-analyzing-state">
                  <div className="ee-spinner" />
                  <span>Hệ thống đang đọc và phân tích cấu trúc câu hỏi từ file...</span>
                </div>
              ) : (
                <div className="ee-analyzed-success">
                  <div className="ee-analyzed-icon">
                    <IconCheck width={16} height={16} color="#059669" />
                  </div>
                  <div className="ee-analyzed-info">
                    <strong>Đã phân tích tệp thành công!</strong>
                    <span>
                      Nhận diện được <strong>{analyzedCount} câu hỏi trắc nghiệm</strong> hợp lệ với đầy đủ nội dung và 4 phương án lựa chọn.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tùy chọn nạp câu hỏi */}
          <div className="ee-import-options-card">
            <h4 className="ee-import-options-title">Tùy chọn phương thức nhập:</h4>
            <div className="ee-import-radios">
              <label className="ee-import-radio-item">
                <input
                  type="radio"
                  name="importMode"
                  value="append"
                  checked={importMode === 'append'}
                  onChange={() => setImportMode('append')}
                />
                <div className="ee-radio-label-group">
                  <strong>Thêm nối tiếp vào {targetName} (Khuyên dùng)</strong>
                  <span>
                    Giữ nguyên {currentCount} câu hỏi hiện tại và bổ sung thêm {analyzedCount || 'các'} câu hỏi mới vào danh sách.
                  </span>
                </div>
              </label>

              <label className="ee-import-radio-item">
                <input
                  type="radio"
                  name="importMode"
                  value="replace"
                  checked={importMode === 'replace'}
                  onChange={() => setImportMode('replace')}
                />
                <div className="ee-radio-label-group">
                  <strong>Thay thế toàn bộ câu hỏi</strong>
                  <span>
                    Xóa các câu hỏi cũ và thay thế toàn bộ bằng danh sách câu hỏi mới từ file này.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Tải file mẫu chuẩn */}
          <div className="ee-import-templates-row">
            <span className="ee-templates-label">Chưa có file mẫu chuẩn?</span>
            <div className="ee-templates-links">
              <button
                type="button"
                className="ee-template-btn"
                onClick={() => alert('Đang tải file Word mẫu (De_Thi_Chuan_Mau.docx)...')}
              >
                <IconDownload width={12} height={12} color="#0051D5" />
                <span>Tải file Word mẫu (.docx)</span>
              </button>
              <button
                type="button"
                className="ee-template-btn"
                onClick={() => alert('Đang tải file Excel mẫu (De_Thi_Chuan_Mau.xlsx)...')}
              >
                <IconDownload width={12} height={12} color="#059669" />
                <span>Tải file Excel mẫu (.xlsx)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. MODAL FOOTER */}
        <div className="ee-modal-footer">
          <div className="ee-modal-footer-hint">
            <span>
              {file
                ? `Sẵn sàng nhập ${analyzedCount} câu hỏi vào ${targetName}`
                : 'Vui lòng chọn hoặc kéo thả file để tiếp tục'}
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
              disabled={!file || isAnalyzing || analyzedCount === 0}
              onClick={handleConfirmImport}
            >
              <IconUpload width={15} height={15} color="#FFFFFF" />
              <span>
                {isAnalyzing
                  ? 'Đang phân tích file...'
                  : `Xác nhận nạp ${analyzedCount > 0 ? `(${analyzedCount} câu)` : ''} vào ${targetName}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
