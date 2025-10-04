import { useEffect, useMemo, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'
import * as api from '../services/api'

const templates = [
  { id: 'classic', name: 'Classic', desc: 'Clean layout with bold hero' },
  { id: 'minimal', name: 'Minimal', desc: 'Simple and elegant' },
  { id: 'vibrant', name: 'Vibrant', desc: 'Colorful and modern' },
]

export default function CreateWebsite() {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState({
    businessName: '',
    description: '',
    logoDataUrl: '',
    contactEmail: '',
    contactPhone: '',
    templateId: 'classic',
    sections: { about: '', services: [] },
  })

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setData((d) => ({ ...d, logoDataUrl: ev.target?.result }))
    reader.readAsDataURL(file)
  }

  async function generateContent() {
    setLoading(true)
    setError('')
    try {
      const res = await api.generateAIContent({ businessName: data.businessName, description: data.description })
      setData((d) => ({ ...d, sections: { about: res.about, services: res.services } }))
    } catch (err) {
      setError(err.message || 'Failed to generate content')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate() {
    setLoading(true)
    setError('')
    try {
      await api.createWebsite(user.email, data)
      window.location.href = '/app'
    } catch (err) {
      setError(err.message || 'Failed to create website')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900">Create Website</h1>
      <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <div className={`rounded-full px-2 py-1 ${step === 1 ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100'}`}>1. Business</div>
          <div className={`rounded-full px-2 py-1 ${step === 2 ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100'}`}>2. Template</div>
          <div className={`rounded-full px-2 py-1 ${step === 3 ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100'}`}>3. AI Content</div>
          <div className={`rounded-full px-2 py-1 ${step === 4 ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100'}`}>4. Confirm</div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <Input label="Business Name" value={data.businessName} onChange={(e) => setData({ ...data, businessName: e.target.value })} />
            <Input label="Description" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Logo Upload</label>
              <input type="file" accept="image/*" onChange={handleFile} />
              {data.logoDataUrl && <img src={data.logoDataUrl} alt="logo" className="mt-2 h-16 w-16 rounded-md object-cover" />}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Contact Email" type="email" value={data.contactEmail} onChange={(e) => setData({ ...data, contactEmail: e.target.value })} />
              <Input label="Contact Phone" value={data.contactPhone} onChange={(e) => setData({ ...data, contactPhone: e.target.value })} />
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!data.businessName}>Next</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  className={`rounded-lg border bg-white p-3 text-left shadow-sm hover:border-indigo-300 ${
                    data.templateId === t.id ? 'ring-2 ring-indigo-600' : ''
                  }`}
                  onClick={() => setData({ ...data, templateId: t.id })}
                >
                  <div className="aspect-video w-full rounded-md bg-gray-50" />
                  <div className="mt-2 text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-gray-600">{t.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}>Next</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Generate AI content based on your business details.</div>
              <Button onClick={generateContent} disabled={!data.businessName || loading}>
                {loading ? 'Generating...' : 'Generate Content'}
              </Button>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">About Us</div>
              <div className="mt-2 min-h-[6rem] rounded-md border bg-gray-50 p-3 text-sm text-gray-700">{data.sections.about || 'No content yet.'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">Services</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {data.sections.services?.map((s, idx) => (<li key={idx}>{s}</li>))}
              </ul>
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            {loading && <Loader />}
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={() => setStep(4)} disabled={!data.sections.about}>Next</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm text-gray-500">Business Name</div>
                <div className="text-sm font-semibold">{data.businessName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Template</div>
                <div className="text-sm font-semibold capitalize">{data.templateId}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-sm text-gray-500">Description</div>
                <div className="text-sm">{data.description}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-sm text-gray-500">Contact</div>
                <div className="text-sm">{data.contactEmail} {data.contactPhone && `• ${data.contactPhone}`}</div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
              <Button onClick={handleCreate} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Website'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
