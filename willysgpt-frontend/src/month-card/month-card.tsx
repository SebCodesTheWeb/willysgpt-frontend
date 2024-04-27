import { H4 } from '@northlight/ui'
import type { FoodItem } from '../types'

export interface MonthCardProps {
  data: FoodItem[]
}

export const MonthCard = ({ data }: MonthCardProps) => {
  console.log({data})
  return <H4>January</H4>
}
