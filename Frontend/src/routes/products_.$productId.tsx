import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import ProductDetail from '../components/ProductDetail'
import type { ListProduct, DetailProduct } from '../types/product'

export const Route = createFileRoute('/products_/$productId')({
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { productId } = Route.useParams()
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery<DetailProduct>({
    queryKey: ['product', productId],
    queryFn: async () => {
      const res = await fetch(`/api/products/${productId}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch product`)
      const json = await res.json()
      return json.data
    },
    // Optimistic placeholder: show name/description/price from the list cache
    // immediately while the full detail (including modifiers) loads.
    // modifiers: [] means the modifier UI renders nothing until real data arrives.
    placeholderData: () => {
      const list = queryClient.getQueryData<ListProduct[]>(['products'])
      const match = list?.find((p) => String(p.id) === productId)
      if (!match) return undefined
      return { ...match, modifiers: [] }
    },
  })

  return (
    <div className="p-8">
      {isLoading ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-gray-100 aspect-square" />
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-4/5" />
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-px bg-gray-100" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-1/2" />
              ))}
            </div>
            <div className="h-12 bg-gray-200 rounded-xl" />
          </div>
        </div>
      ) : isError ? (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
          {(error as Error).message}
        </div>
      ) : data ? (
        <ProductDetail product={data} />
      ) : null}
    </div>
  )
}
