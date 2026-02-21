import { useState, useMemo } from 'react'
import { ChevronLeft, ShoppingCart } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import mountainBike from '../../assets/images/Mountain_Bike.png'
import { useCartStore } from '../../store/cartStore'
import type { DetailProduct, ModifierOption } from '../../types/product'

interface ProductDetailProps {
  product: DetailProduct
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { id, name, description, base_price, category, modifiers } = product

  // selectedOptions maps modifier name → the currently selected ModifierOption object.
  // Initialised with the first option of each modifier group (index 0).
  // Using the full option object (not just the label) lets us read price_adjustment directly.
  const [selectedOptions, setSelectedOptions] = useState<Record<string, ModifierOption>>(
    () =>
      Object.fromEntries(
        modifiers
          .filter((mod) => mod.options.length > 0)
          .map((mod) => [mod.name, mod.options[0]]),
      ),
  )

  const addItem = useCartStore((state) => state.addItem)

  // Derived price: base_price + sum of all selected price_adjustments.
  // useMemo avoids recalculating on every render — recalculates only when
  // base_price or selectedOptions changes.
  const totalPrice = useMemo(() => {
    const adjustments = Object.values(selectedOptions).reduce(
      (sum, opt) => sum + (opt?.price_adjustment ?? 0),
      0,
    )
    return base_price + adjustments
  }, [base_price, selectedOptions])

  function handleSelect(modifierName: string, option: ModifierOption) {
    setSelectedOptions((prev) => ({ ...prev, [modifierName]: option }))
  }

  function handleAddToCart() {
    // Convert full option objects → human-readable label map for cart display.
    const modifications = Object.fromEntries(
      Object.entries(selectedOptions).map(([name, opt]) => [name, opt.label]),
    )

    addItem({
      productId: Number(id),
      name,
      price: totalPrice,
      modifications,
      image: mountainBike,
    })
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
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <img src={mountainBike} alt="Mountain Bike" className="w-full object-cover" />
          </div>

          <div className="space-y-3">
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
          {/* Price — updates live as options are selected */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Price</p>
            <p className="text-3xl font-bold text-gray-900">€{totalPrice.toFixed(2)}</p>
            {/* Show base price context when any adjustment is active */}
            {totalPrice !== base_price && (
              <p className="text-xs text-gray-400 mt-0.5">Base: €{base_price.toFixed(2)}</p>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* Modifier groups — driven entirely by API data, no hardcoded values */}
          <div className="space-y-5">
            {modifiers.map((mod) => (
              <div key={mod.name} className="space-y-2">
                <p className="text-sm font-medium text-gray-700">{mod.name}</p>
                <div className="flex flex-wrap gap-2">
                  {mod.options.map((option) => {
                    const active = selectedOptions[mod.name]?.id === option.id
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(mod.name, option)}
                        className={`px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                          active
                            ? 'bg-blue-600 text-white border-blue-600 font-medium'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                        }`}
                      >
                        {option.label}
                        {option.price_adjustment > 0 && (
                          <span
                            className={`ml-1 text-xs ${active ? 'text-blue-200' : 'text-gray-400'}`}
                          >
                            +€{option.price_adjustment}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <hr className="border-gray-100" />

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </aside>
      </div>
    </div>
  )
}
