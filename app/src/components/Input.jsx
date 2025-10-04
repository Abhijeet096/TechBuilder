import clsx from 'clsx'

export default function Input({ label, error, className, type = 'text', ...props }) {
  return (
    <div className={clsx('w-full', className)}>
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        className={clsx(
          'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
          error && 'border-red-300 focus:border-red-400 focus:ring-red-400'
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
