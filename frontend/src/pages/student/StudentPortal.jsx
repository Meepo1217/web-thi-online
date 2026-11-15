import { useState } from 'react'
import Header from '../../components/student/Header'
import Sidebar from '../../components/student/Sidebar'
import Footer from '../../components/student/Footer'
import StudentDashboardPage from './StudentDashboardPage'
import ExamPreparationPage from './ExamPreparationPage'
import TakeExamPage from './TakeExamPage'
import ExamResultPage from './ExamResultPage'

export default function StudentPortal() {
  const [currentPage, setCurrentPage] = useState('dashboard') // 'dashboard' | 'prep' | 'exam' | 'result'
  const [selectedExam, setSelectedExam] = useState(null)
  const [examResult, setExamResult] = useState(null)
  const [activeNav, setActiveNav] = useState('home')

  const handleSelectExam = (exam) => {
    setSelectedExam({
      room: exam.room,
      roomCode: exam.id,
      shift: exam.statusTime,
      title: `${exam.title} - ${exam.department}`,
      status: 'Đang mở',
      date: exam.date,
      duration: exam.duration,
      questions: exam.questions,
      timeWindow: `${exam.statusTime} - Hôm nay`,
      school: exam.school
    })
    setCurrentPage('prep')
  }

  const handleStartExam = (exam) => {
    if (exam) {
      setSelectedExam(exam)
    }
    setCurrentPage('exam')
  }

  const handleCompleteExam = (resultData) => {
    setExamResult(resultData)
    setCurrentPage('result')
  }

  const handleRetakeExam = () => {
    setCurrentPage('exam')
  }

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard')
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(0deg, #F8F9FF, #F8F9FF), #FFFFFF'
    }}>
      {/* Khung Desktop 1280px chuẩn Figma */}
      <div style={{
        position: 'relative',
        width: '1280px',
        minHeight: '100vh',
        background: 'linear-gradient(0deg, #F8F9FF, #F8F9FF), #FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.04)'
      }}>

        {/* 1. Header sinh viên (hiển thị ở dashboard, prep, exam) */}
        {currentPage !== 'result' && (
          <Header onLogoClick={handleBackToDashboard} />
        )}

        {/* 2. Nội dung các màn hình sinh viên */}
        {currentPage === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flex: 1 }}>
            <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
            <StudentDashboardPage onSelectExam={handleSelectExam} />
          </div>
        )}

        {currentPage === 'prep' && (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>
            <ExamPreparationPage
              exam={selectedExam}
              onBack={handleBackToDashboard}
              onStartExam={handleStartExam}
            />
            <Footer />
          </div>
        )}

        {currentPage === 'exam' && (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>
            <TakeExamPage
              exam={selectedExam}
              onBack={handleBackToDashboard}
              onComplete={handleCompleteExam}
            />
            <Footer />
          </div>
        )}

        {currentPage === 'result' && (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}>
            <ExamResultPage
              exam={examResult || selectedExam}
              onBack={handleBackToDashboard}
              onRetake={handleRetakeExam}
            />
          </div>
        )}

      </div>

      {/* Thanh chuyển trang nhanh nội bộ giao diện sinh viên */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9998,
        background: '#131B2E',
        color: '#FFFFFF',
        padding: '8px 14px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        fontSize: '12px',
        fontFamily: "'Inter', sans-serif"
      }}>
        <span style={{ color: '#94A3B8', fontWeight: 500 }}>Học sinh:</span>
        <button
          onClick={() => setCurrentPage('dashboard')}
          style={{
            background: currentPage === 'dashboard' ? '#0051D5' : 'transparent',
            color: '#FFFFFF',
            border: 'none',
            padding: '5px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: currentPage === 'dashboard' ? 600 : 400,
            transition: 'all 0.15s'
          }}
        >
          Trang chủ
        </button>
        <button
          onClick={() => setCurrentPage('prep')}
          style={{
            background: currentPage === 'prep' ? '#0051D5' : 'transparent',
            color: '#FFFFFF',
            border: 'none',
            padding: '5px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: currentPage === 'prep' ? 600 : 400,
            transition: 'all 0.15s'
          }}
        >
          Chuẩn bị
        </button>
        <button
          onClick={() => setCurrentPage('exam')}
          style={{
            background: currentPage === 'exam' ? '#0051D5' : 'transparent',
            color: '#FFFFFF',
            border: 'none',
            padding: '5px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: currentPage === 'exam' ? 600 : 400,
            transition: 'all 0.15s'
          }}
        >
          Làm bài
        </button>
        <button
          onClick={() => setCurrentPage('result')}
          style={{
            background: currentPage === 'result' ? '#0051D5' : 'transparent',
            color: '#FFFFFF',
            border: 'none',
            padding: '5px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: currentPage === 'result' ? 600 : 400,
            transition: 'all 0.15s'
          }}
        >
          Kết quả
        </button>
      </div>
    </div>
  )
}
