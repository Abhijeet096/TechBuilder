import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const { user } = useAuth()
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <div className="text-sm text-gray-700">Email: {user.email}</div>
        <div className="text-sm text-gray-700">Name: {user.name}</div>
      </div>
    </div>
  )
}
