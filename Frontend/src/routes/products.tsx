import { createFileRoute } from '@tanstack/react-router'
import Products from '../components/Products'

export const Route = createFileRoute('/products')({
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Products</h1>
      <Products />
    </div>
  )
}
