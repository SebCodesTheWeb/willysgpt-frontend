import { H3 } from '@northlight/ui'
import type { FoodItem } from '../types'
import { uniqBy, prop } from 'ramda'

export interface OverviewProps {
  data: FoodItem[]
}

const getNbrTimesWentTowillys = (data: FoodItem[]) => {
  const uniqueWillysVisits = uniqBy(prop('date'), data)

  return uniqueWillysVisits.length
}

export const Overview = ({ data }: OverviewProps) => {
  const nbrTimesToWillys = getNbrTimesWentTowillys(data)

  return <H3>You went to Willys {nbrTimesToWillys} times this year</H3>
}
