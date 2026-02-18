import { Tag } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import mountainBike from '../assets/images/Mountain_Bike.png'

interface ProductCardProps {
  id: number
  name: string
  description: string | null
  category: string | null
}

export default function ProductCard({ id, name, description, category }: ProductCardProps) {
  return (
    <Link
      to="/products/$productId"
      params={{ productId: String(id) }}
      className="block rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow bg-white overflow-hidden"
    >
      <img src={mountainBike} alt={name} className="w-full object-cover aspect-video" />
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1 rounded-t-xl" />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-1.5">
          <Tag size={12} className="text-blue-700" />
          <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
            {category ?? 'Uncategorised'}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      </div>
    </Link>
  )
}
