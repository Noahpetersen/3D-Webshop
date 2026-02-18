import { useEffect, useState } from 'react'
import { Box, ChevronLeft, ShoppingCart } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import mountainBike from '../assets/images/Mountain_Bike.png'

interface Modification {
  label: string
  options: string[]
}

const MODIFICATIONS: Modification[] = [
  { label: 'Material', options: ['PLA', 'PETG', 'ABS', 'Resin'] },
  { label: 'Color', options: ['White', 'Black', 'Grey', 'Blue'] },
  { label: 'Infill', options: ['15%', '30%', '50%', '100%'] },
  { label: 'Layer Height', options: ['0.1 mm', '0.2 mm', '0.3 mm'] },
]

interface ProductDetailProps {
  id: string | number
  name: string
  description: string | null
  price: number | undefined
  category: string | null
}

export default function ProductDetail({ name, description, price, category }: ProductDetailProps) {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(MODIFICATIONS.map((m) => [m.label, m.options[0]])),
  )

  function handleSelect(label: string, option: string) {
    setSelected((prev) => ({ ...prev, [label]: option }))
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Back link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
      >
        <ChevronLeft size={16} />
        Back to Products
      </Link>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: image + description */}
        <div className="lg:col-span-2 space-y-2">
          {/* Placeholder image */}
          
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <img src={mountainBike} alt="Mountain Bike" className="w-full object-cover" />
            {/*
            <Box size={64} strokeWidth={1} />
            <span className="text-sm font-medium tracking-wide uppercase">3D Preview</span>
            */}
          </div>

          {/* Name + description */}
          <div className="space-y-3">
            {/* Category chip */}
            {category && (
              <span className="self-center inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {category}
              </span>
            )}
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
            
          
            <p className="text-gray-600 leading-relaxed">
              {description ?? 'No description available for this product.'}
            </p>
          </div>
        </div>

        {/* Right: sidebar */}
        <aside className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sticky top-6">
          {/* Price */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Price</p>
            {price !== undefined
              ? <p className="text-3xl font-bold text-gray-900">€{price.toFixed(2)}</p>
              : <div className="h-9 w-28 bg-gray-200 rounded animate-pulse" />
            }
          </div>

          <hr className="border-gray-100" />

          {/* Modifications */}
          <div className="space-y-5">
            {MODIFICATIONS.map((mod) => (
              <div key={mod.label} className="space-y-2">
                <p className="text-sm font-medium text-gray-700">{mod.label}</p>
                <div className="flex flex-wrap gap-2">
                  {mod.options.map((option) => {
                    const active = selected[mod.label] === option
                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(mod.label, option)}
                        className={`px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                          active
                            ? 'bg-blue-600 text-white border-blue-600 font-medium'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                        }`}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <hr className="border-gray-100" />

          {/* Add to cart */}
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer">
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </aside>
      </div>
    </div>
  )
}
