import { FoodItem } from '../types'

export interface MonthlyData {
  [key: string]: FoodItem[]
}

export interface YearlyData {
  [year: string]: MonthlyData
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function splitDataByMonth(data: FoodItem[]): YearlyData {
  const splitData: YearlyData = {}

  data.forEach((item) => {
    const date = new Date(item.date)
    const year = date.getFullYear().toString()
    const month = MONTH_NAMES[date.getMonth()]

    if (!splitData[year]) {
      splitData[year] = {}
    }

    if (!splitData[year][month]) {
      splitData[year][month] = []
    }

    splitData[year][month].push(item)
  })

  return splitData
}
