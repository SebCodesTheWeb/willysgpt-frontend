import type { FoodItem } from '../types'

export function getUniqueValuesByKey<T extends FoodItem, K extends keyof T>(
  key: K,
  items: T[]
): T[K][] {
  const uniqueValues = new Set<T[K]>()
  items.forEach((item) => uniqueValues.add(item[key]))
  return Array.from(uniqueValues)
}
