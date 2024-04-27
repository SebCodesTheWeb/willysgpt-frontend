import { FoodItem } from '../types'

export const getTotalSpent = (foodItems: FoodItem[]) => {
  return foodItems.reduce((acc, curr) => acc + curr.price, 0)
}
