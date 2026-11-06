import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi đến API test của Laravel đang chạy ở port 8000
    axios.get('http://localhost:8000/api/test-connection')
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error('Lỗi kết nối:', err);
        setError('Không thể kết nối đến Laravel. Hãy kiểm tra xem server Laravel đã bật chưa hoặc có lỗi CORS không.');
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Kiểm tra kết nối Frontend (React) và Backend (Laravel)</h1>
      
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      
      {data ? (
        <div style={{ padding: '20px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '5px', color: '#155724' }}>
          <h3>Trạng thái: {data.status}</h3>
          <p>{data.message}</p>
        </div>
      ) : (
        !error && <p>Đang tải dữ liệu từ Backend Laravel...</p>
      )}
    </div>
  );
}

export default App;