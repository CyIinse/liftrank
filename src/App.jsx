import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useProfile, isLocalStorageAvailable } from './hooks/useProfile'
import { useLiftLog } from './hooks/useLiftLog'
import ProfileForm from './components/ProfileForm'
import LiftLogger from './components/LiftLogger'
import HistoryList from './components/HistoryList'

function AppRoutes() {
  const { profile, saveProfile } = useProfile()
  const { log, addEntry } = useLiftLog()
  const storageAvailable = isLocalStorageAvailable()

  return (
    <>
      {!storageAvailable && (
        <div style={{
          background: '#7c2d12',
          color: '#fed7aa',
          padding: '10px 16px',
          fontSize: '13px',
          textAlign: 'center',
        }}>
          Private browsing detected — data will not be saved between sessions.
        </div>
      )}
      <Routes>
        <Route
          path="/setup"
          element={<ProfileForm existingProfile={profile} onSave={saveProfile} />}
        />
        <Route
          path="/log"
          element={
            profile
              ? <LiftLogger profile={profile} onEntry={addEntry} />
              : <Navigate to="/setup" replace />
          }
        />
        <Route
          path="/history"
          element={
            profile
              ? <HistoryList log={log} profile={profile} />
              : <Navigate to="/setup" replace />
          }
        />
        <Route
          path="*"
          element={<Navigate to={profile ? '/log' : '/setup'} replace />}
        />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
