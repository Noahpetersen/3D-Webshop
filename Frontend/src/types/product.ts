// One selectable option within a modifier group (e.g. "ABS" within "Material").
export interface ModifierOption {
  id: number
  label: string
  price_adjustment: number // 0 means no surcharge; add this to base_price
}

// A modifier group and all its available options for a specific product.
export interface Modifier {
  name: string      // "Material", "Color", "Frame Size", "Wheel Size"
  options: ModifierOption[]
}

// Shape returned by GET /api/products (list — no modifiers, keeps payload lean).
export interface ListProduct {
  id: number
  name: string
  description: string | null
  base_price: number
  category: string | null
}

// Shape returned by GET /api/products/{id} (detail — includes modifiers).
// Extends ListProduct so all list fields are available on the detail page too.
export interface DetailProduct extends ListProduct {
  modifiers: Modifier[]
}
