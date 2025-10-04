import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import MyWebsites from './pages/MyWebsites'
import Templates from './pages/Templates'
import Settings from './pages/Settings'
import CreateWebsite from './pages/CreateWebsite'
import WebsitePreview from './pages/WebsitePreview'
import NotFound from './pages/NotFound'
import DashboardLayout from './layouts/DashboardLayout'
import { AuthProvider, RequireAuth } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/app"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="websites" element={<MyWebsites />} />
          <Route path="templates" element={<Templates />} />
          <Route path="settings" element={<Settings />} />
          <Route path="create" element={<CreateWebsite />} />
          <Route path="preview/:id" element={<WebsitePreview />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
