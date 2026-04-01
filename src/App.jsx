import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import PublishedPage from './pages/Published'

// Protects routes that require login
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-[#e8a045] font-['Syne'] uppercase tracking-widest text-sm animate-pulse">
          Loading...
        </p>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return children
}

// Redirects logged in users away from login/signup
function GuestRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to="/app" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={
        <GuestRoute><Login /></GuestRoute>
      } />

      <Route path="/signup" element={
        <GuestRoute><Signup /></GuestRoute>
      } />

      <Route path="/app" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />

      <Route path="/app/editor/:id" element={
        <ProtectedRoute><Editor /></ProtectedRoute>
      } />

      <Route path="/p/:slug" element={<PublishedPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes>
        </AppRoutes>
      </BrowserRouter>
    </AuthProvider>
  )
}