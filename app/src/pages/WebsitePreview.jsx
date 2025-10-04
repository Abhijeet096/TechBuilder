import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import * as api from '../services/api'

function Editable({ value, onChange, className }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  useEffect(() => setDraft(value), [value])
  return (
    <div className={className}>
      {editing ? (
        <div className="space-y-2">
          <textarea className="w-full rounded-md border p-2 text-sm" rows={6} value={draft} onChange={(e) => setDraft(e.target.value)} />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => { onChange(draft); setEditing(false) }}>Save</Button>
            <Button size="sm" variant="secondary" onClick={() => { setDraft(value); setEditing(false) }}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-sm text-gray-700 whitespace-pre-line">{value}</div>
          <div className="mt-2">
            <Button size="sm" variant="secondary" onClick={() => setEditing(true)}>Edit</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function WebsitePreview() {
  const { id } = useParams()
  const { user } = useAuth()
  const [website, setWebsite] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      const data = await api.getWebsiteById(user.email, id)
      if (mounted) setWebsite(data)
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [user.email, id])

  async function update(next) {
    const updated = await api.updateWebsite(user.email, website.id, next)
    setWebsite(updated)
  }

  if (loading) return <div className="text-sm text-gray-600">Loading...</div>
  if (!website) return <div className="text-sm text-gray-600">Website not found.</div>

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">{website.businessName}</div>
            <div className="text-xs text-gray-600">Template: <span className="capitalize">{website.templateId}</span></div>
          </div>
          {website.logoDataUrl ? (
            <img src={website.logoDataUrl} alt="logo" className="h-10 w-10 rounded-md object-cover" />
          ) : (
            <div className="h-10 w-10 rounded-md bg-gray-100 grid place-items-center text-xs">Logo</div>
          )}
        </div>
        <div className="mt-4 rounded-md border bg-gray-50 p-3 text-sm text-gray-700">
          {website.description}
        </div>
        <div className="mt-6">
          <div className="text-sm font-medium text-gray-700">About Us</div>
          <Editable value={website.sections.about} onChange={(v) => update({ sections: { ...website.sections, about: v } })} className="mt-2" />
        </div>
        <div className="mt-6">
          <div className="text-sm font-medium text-gray-700">Services</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {website.sections.services?.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="bg-indigo-600 px-6 py-10 text-white">
          <div className="mx-auto max-w-3xl">
            <div className="text-3xl font-bold">{website.businessName}</div>
            <div className="mt-2 text-white/90">{website.description}</div>
          </div>
        </div>
        <div className="px-6 py-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold">About Us</h2>
            <p className="mt-2 text-gray-700 whitespace-pre-line">{website.sections.about}</p>
            <h3 className="mt-6 text-lg font-semibold">Our Services</h3>
            <ul className="mt-2 grid gap-3 sm:grid-cols-2">
              {website.sections.services?.map((s, idx) => (
                <li key={idx} className="rounded-lg border bg-white p-4 shadow-sm">
                  <div className="text-sm font-medium">{s}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
