import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Home, ShoppingCart } from 'lucide-react'
import { useCartCount } from '../store/cartStore'
import CartModal from './CartModal'

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false)
  const cartCount = useCartCount()
  const cartAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cartOpen) return
    function handleOutsideClick(e: MouseEvent) {
      if (cartAreaRef.current && !cartAreaRef.current.contains(e.target as Node)) {
        setCartOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [cartOpen])

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
          </div>

          <div ref={cartAreaRef} className="relative">
            <button
              onClick={() => setCartOpen((v) => !v)}
              className="relative text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
            {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}
          </div>
        </nav>
      </div>
    </div>
  )
}
