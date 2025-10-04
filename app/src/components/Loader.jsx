export default function Loader({ className = '' }) {
  return (
    <div className={`grid place-items-center ${className}`}>
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}
