import clsx from 'clsx'

const base = 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'

const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-600',
  secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus:ring-indigo-600',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-indigo-600',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export default function Button({ className, variant = 'primary', size = 'md', ...props }) {
  return <button className={clsx(base, variants[variant], sizes[size], className)} {...props} />
}
