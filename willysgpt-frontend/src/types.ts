export type FoodCategory =
  | 'Grönsaker'
  | 'Kött'
  | 'Mejeri'
  | 'Godis'
  | 'Dryck'
  | 'Annat'

export type FoodItem = {
  productName: string
  category: FoodCategory
  price: number // SEK
  quantity: number
  date: string // YYYY-MM-DD
  receiptId: string
  id: string // UID for the item of this specific purchase
}


