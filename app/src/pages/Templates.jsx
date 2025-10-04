export default function Templates() {
  const templates = [
    { id: 'classic', name: 'Classic', desc: 'Clean layout with bold hero' },
    { id: 'minimal', name: 'Minimal', desc: 'Simple and elegant' },
    { id: 'vibrant', name: 'Vibrant', desc: 'Colorful and modern' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <div key={t.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="aspect-video w-full rounded-md bg-gray-50" />
            <div className="mt-3 text-sm font-semibold">{t.name}</div>
            <div className="text-xs text-gray-600">{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
