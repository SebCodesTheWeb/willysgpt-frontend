import { FoodItem, AggregableFoodKeys } from '../types'
import { getISOWeekDateInfo } from './get-week-date'
import { WEEK_DAYS, WEEK_NBRS } from './constants'

type WeekNumberObject = {
  [K in number]: Record<string, any>
}

export type CalendarData = {
  [K in string]: WeekNumberObject
}

export const aggregateWeekData = (
  data: FoodItem[],
  splitBy: AggregableFoodKeys
): CalendarData => {
  const calendar = WEEK_DAYS.reduce((acc, day) => {
    acc[day] = WEEK_NBRS.reduce((weekAcc, weekNbr) => {
      weekAcc[weekNbr] = { value: 0 }
      return weekAcc
    }, {} as Record<number, any>)
    return acc
  }, {} as Record<string, any>)

  data.forEach((item) => {
    const { weekNbr, weekDay } = getISOWeekDateInfo(item.date)
    calendar[weekDay][weekNbr] = {
      ...calendar[weekDay][weekNbr],
      ...item,
      value: item[splitBy] + (calendar[weekDay][weekNbr].value || 0),
    }
  })

  return calendar as unknown as CalendarData
}
