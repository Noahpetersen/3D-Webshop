import { Link } from '@tanstack/react-router'
import { Home, ShoppingCart } from 'lucide-react'

export default function Navbar() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-6 flex-1">
            <Link
              to="/"
              className="flex items-center gap-6 cursor-pointer"
              activeProps={{ className: 'text-blue-700' }}
              inactiveProps={{ className: 'text-gray-700 hover:text-gray-900' }}
            >
              <Home size={20} />
            </Link>
             <Link
              to="/products"
              className="cursor-pointer"
              activeProps={{ className: 'text-blue-700 font-semibold' }}
              inactiveProps={{ className: 'text-gray-700 hover:text-gray-900' }}
            >
              Products
            </Link>
            <Link
              to="/demo"
              className="cursor-pointer"
              activeProps={{ className: 'text-blue-700 font-semibold' }}
              inactiveProps={{ className: 'text-gray-700 hover:text-gray-900' }}
            >
              Demo
            </Link>
          </div>
          <Link to="/cart" className="text-gray-700 hover:text-gray-900 cursor-pointer">
            <ShoppingCart size={24} />
          </Link>
        </nav>
      </div>
    </div>
  )
}
