import { Tag } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import mountainBike from '../assets/images/Mountain_Bike.png'
import fastBike from '../assets/images/Fast.png'
import cityBike from '../assets/images/City.png'

const bikeImages = [mountainBike, fastBike, cityBike]

interface ProductCardProps {
  id: number
  index: number
  name: string
  description: string | null
  category: string | null
}

export default function ProductCard({ id, index, name, description, category }: ProductCardProps) {
  const image = bikeImages[index % bikeImages.length]

  return (
    <Link
      to="/products/$productId"
      params={{ productId: String(id) }}
      className="block rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow bg-white overflow-hidden cursor-pointer"
    >
      <img src={image} alt={name} className="w-full object-cover aspect-video" />
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
