import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 px-4">
      <div className="text-center">
        <div className="text-5xl font-bold text-indigo-600">404</div>
        <div className="mt-2 text-gray-600">Page not found</div>
        <div className="mt-6"><Link to="/"><Button>Go Home</Button></Link></div>
      </div>
    </div>
  )
}
