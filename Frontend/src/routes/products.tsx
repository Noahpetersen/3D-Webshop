import { createFileRoute } from '@tanstack/react-router'
import Products from '../components/Products'

export const Route = createFileRoute('/products')({
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold">Products</h1>
      <Products />
    </div>
  )
}
