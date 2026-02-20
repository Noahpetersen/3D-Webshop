import { useQuery } from '@tanstack/react-query'
import ProductCard from './ProductCard'

interface Product {
  id: number
  name: string
  description: string | null
  category: string | null
}

export default function Products() {
  const { data, isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch products`)
      const json = await res.json()
      return json.data
    },
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white overflow-hidden animate-pulse">
            <div className="h-1 bg-gray-200 rounded-t-xl" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-5 bg-gray-200 rounded w-2/3" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded w-4/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
        {(error as Error).message}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((product, i) => (
        <ProductCard
          key={product.id ?? i}
          id={product.id}
          index={i}
          name={product.name}
          description={product.description}
          category={product.category}
        />
      ))}
    </div>
  )
}
