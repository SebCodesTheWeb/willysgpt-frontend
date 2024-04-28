import { has } from 'ramda'
import type { FoodItem } from './types'

export const processData = (data: any): FoodItem[] => {
  if (has('items', data)) {
    const properdata = (data as any).items.filter(has('product'))
    return properdata.map((item: any) => ({
      productName: item.product,
      category: item?.food_type,
      price: item.price,
      quantity: item.quantity,
      date: (data as any).date,
      receiptId: (data as any).uuid,
      id: Math.random(),
    }))
  }
  return []
}
