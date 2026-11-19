import { useState } from 'react'
import Header from '../../components/student/Header'
import Sidebar from '../../components/student/Sidebar'
import Footer from '../../components/student/Footer'
import StudentDashboardPage from './StudentDashboardPage'
import ExamPreparationPage from './ExamPreparationPage'
import TakeExamPage from './TakeExamPage'
import ExamResultPage from './ExamResultPage'
import ExamHistoryPage from './ExamHistoryPage'

export default function StudentPortal() {
  const isHistoryPath = typeof window !== 'undefined' && window.location.pathname.includes('/history')
  const [currentPage, setCurrentPage] = useState(isHistoryPath ? 'history' : 'dashboard') // 'dashboard' | 'history' | 'prep' | 'exam' | 'result'
  const [selectedExam, setSelectedExam] = useState(null)
  const [examResult, setExamResult] = useState(null)
  const [activeNav, setActiveNav] = useState(isHistoryPath ? 'history' : 'home')

  const handleNavChange = (navKey) => {
    setActiveNav(navKey)
    if (navKey === 'home') {
      setCurrentPage('dashboard')
    } else if (navKey === 'history') {
      setCurrentPage('history')
    }
  }

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
    setActiveNav('home')
  }

  const handleViewHistoryResult = (exam) => {
    setExamResult({
      title: exam.title,
      room: exam.roomCode,
      code: exam.examCode,
      score: exam.score,
      correctCount: parseInt(exam.correctCount.split('/')[0], 10) || 18,
      totalCount: parseInt(exam.correctCount.split('/')[1], 10) || 40,
      duration: exam.duration,
      submittedAt: exam.date + ' • 10:15'
    })
    setCurrentPage('result')
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

        {/* 1. Header sinh viên (hiển thị ở dashboard, history, prep, exam) */}
        {currentPage !== 'result' && (
          <Header onLogoClick={handleBackToDashboard} />
        )}

        {/* 2. Nội dung các màn hình sinh viên */}
        {currentPage === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flex: 1 }}>
            <Sidebar activeNav="home" onNavChange={handleNavChange} />
            <StudentDashboardPage onSelectExam={handleSelectExam} />
          </div>
        )}

        {currentPage === 'history' && (
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flex: 1 }}>
            <Sidebar activeNav="history" onNavChange={handleNavChange} />
            <ExamHistoryPage onViewResult={handleViewHistoryResult} />
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
              onBack={() => {
                setCurrentPage('history')
                setActiveNav('history')
              }}
              onRetake={handleRetakeExam}
            />
          </div>
        )}

      </div>
    </div>
  )
}

