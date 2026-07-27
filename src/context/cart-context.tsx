import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { CartItem, Product, ProductVariant } from '@/types'
import { productById } from '@/data/products'

const STORAGE_KEY = 'skinjago.cart.v1'

/** A cart line joined with its resolved product/variant for rendering. */
export interface ResolvedCartLine extends CartItem {
  product: Product
  variant?: ProductVariant
  unitPrice: number
  lineTotal: number
}

export interface CartContextValue {
  items: CartItem[]
  lines: ResolvedCartLine[]
  itemCount: number
  subtotal: number
  addItem: (item: CartItem) => void
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void
  updateFieldValues: (
    productId: string,
    variantId: string | undefined,
    values: Record<string, string>,
  ) => void
  removeItem: (productId: string, variantId?: string) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

const sameLine = (item: CartItem, productId: string, variantId?: string) =>
  item.productId === productId && item.variantId === variantId

function readStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Drop lines whose product no longer exists in the catalogue.
    return (parsed as CartItem[]).filter((item) => productById.has(item.productId))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((incoming: CartItem) => {
    setItems((current) => {
      const existing = current.find((item) =>
        sameLine(item, incoming.productId, incoming.variantId),
      )
      if (!existing) return [...current, incoming]
      return current.map((item) =>
        sameLine(item, incoming.productId, incoming.variantId)
          ? {
              ...item,
              quantity: item.quantity + incoming.quantity,
              fieldValues: { ...item.fieldValues, ...incoming.fieldValues },
            }
          : item,
      )
    })
  }, [])

  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, quantity: number) => {
      setItems((current) =>
        quantity <= 0
          ? current.filter((item) => !sameLine(item, productId, variantId))
          : current.map((item) =>
              sameLine(item, productId, variantId) ? { ...item, quantity } : item,
            ),
      )
    },
    [],
  )

  const updateFieldValues = useCallback(
    (productId: string, variantId: string | undefined, values: Record<string, string>) => {
      setItems((current) =>
        current.map((item) =>
          sameLine(item, productId, variantId)
            ? { ...item, fieldValues: { ...item.fieldValues, ...values } }
            : item,
        ),
      )
    },
    [],
  )

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setItems((current) => current.filter((item) => !sameLine(item, productId, variantId)))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const lines = useMemo<ResolvedCartLine[]>(() => {
    return items.flatMap((item) => {
      const product = productById.get(item.productId)
      if (!product) return []
      const variant = item.variantId
        ? product.variants?.find((v) => v.id === item.variantId)
        : undefined
      const unitPrice = variant?.price ?? product.price
      return [{ ...item, product, variant, unitPrice, lineTotal: unitPrice * item.quantity }]
    })
  }, [items])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      lines,
      itemCount: lines.reduce((total, line) => total + line.quantity, 0),
      subtotal: lines.reduce((total, line) => total + line.lineTotal, 0),
      addItem,
      updateQuantity,
      updateFieldValues,
      removeItem,
      clearCart,
    }),
    [items, lines, addItem, updateQuantity, updateFieldValues, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
