import './layout.css'

export default function Footer({ copyrightText }) {
  const defaultText = copyrightText || '© 2025 HUBT EXAM - Đại học Kinh doanh và Công nghệ Hà Nội'

  return (
    <footer className="layout-footer">
      <div className="footer-copyright">
        {defaultText}
      </div>

      <div className="footer-nav-links">
        <a href="#terms" className="footer-link-item">Điều khoản sử dụng</a>
        <a href="#privacy" className="footer-link-item">Chính sách bảo mật</a>
        <a href="#help" className="footer-link-item">Trợ giúp & Hỗ trợ</a>
      </div>
    </footer>
  )
}

