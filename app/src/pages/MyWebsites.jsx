import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import * as api from '../services/api'
import { useEffect, useState } from 'react'

export default function MyWebsites() {
  const { user } = useAuth()
  const [websites, setWebsites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      const list = await api.getWebsites(user.email)
      if (mounted) setWebsites(list)
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [user.email])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Websites</h1>
        <Link to="/app/create"><Button>Create New Website</Button></Link>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="text-sm text-gray-600">Loading websites...</div>
        ) : websites.length === 0 ? (
          <div className="rounded-lg border bg-white p-6 text-sm text-gray-600">
            You have no websites yet. Click "Create New Website" to get started.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {websites.map((w) => (
              <div key={w.id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <div className="aspect-video w-full bg-gray-50" />
                <div className="p-4">
                  <div className="text-sm font-semibold">{w.businessName}</div>
                  <div className="mt-1 text-xs text-gray-600 truncate">{w.description}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <Link to={`/app/preview/${w.id}`}><Button size="sm">Preview</Button></Link>
                    <Link to={`/app/preview/${w.id}`}><Button size="sm" variant="secondary">Edit</Button></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
