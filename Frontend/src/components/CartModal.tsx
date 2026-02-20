import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react'
import { useCartStore, useCartTotal } from '../store/cartStore'

interface CartModalProps {
  onClose: () => void
}

export default function CartModal({ onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity } = useCartStore()
  const total = useCartTotal()

  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-400">
          <ShoppingCart size={40} strokeWidth={1} />
          <p className="text-sm">Your cart is empty</p>
        </div>
      ) : (
        <>
          <ul className="max-h-80 overflow-y-auto divide-y divide-gray-50 px-5">
            {items.map((item) => (
              <li
                key={`${item.productId}-${JSON.stringify(item.modifications)}`}
                className="py-4 flex gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-1.5">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(item.modifications).map(([k, v]) => (
                      <span
                        key={k}
                        className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.modifications, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-400 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm w-5 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.modifications, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-400 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.price !== undefined && (
                        <span className="text-sm font-semibold text-gray-900">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      )}
                      <button
                        onClick={() => removeItem(item.productId, item.modifications)}
                        className="text-gray-300 hover:text-red-400 cursor-pointer transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total</span>
              <span className="font-bold text-gray-900">€{total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}
