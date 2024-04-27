import { CalendarData } from './aggregate-week-data'
import { WEEK_DAYS } from './constants'

export interface HeatMapData {
  id: string
  data: {
    x: string
    y: number
  }[]
}

// Function to generate a list of HeatMapData for the year.
export function generateHeatMapDataForYear(
  year: number,
  calendarData: CalendarData
): HeatMapData[] {
  const heatMapDataList: HeatMapData[] = WEEK_DAYS.map((weekday) => {
    return {
      id: weekday,
      data: getWeekNumbersForYear(year).map((weekNumber) => ({
        x: `w.${weekNumber}`,
        y: calendarData[weekday][weekNumber]?.value || 0,
      })),
    }
  })

  return heatMapDataList
}

// Helper function to get all week numbers for the given year.
function getWeekNumbersForYear(year: number): number[] {
  const firstDayOfYear = new Date(year, 0, 1)
  const lastDayOfYear = new Date(year, 11, 31)
  const weekNumbers: number[] = []
  let currentWeek = getWeekNumber(firstDayOfYear)

  while (firstDayOfYear <= lastDayOfYear) {
    // If it's Monday, push the current week to the list
    if (firstDayOfYear.getDay() === 1) {
      weekNumbers.push(currentWeek)
      currentWeek++
    }
    // Move to the next day
    firstDayOfYear.setDate(firstDayOfYear.getDate() + 1)
  }

  return weekNumbers
}

// Helper function to get the ISO week number for a specific date.
function getWeekNumber(date: Date): number {
  const dateCopy = new Date(date.getTime())
  dateCopy.setHours(0, 0, 0, 0)
  // Thursday in current week decides the year
  dateCopy.setDate(dateCopy.getDate() + 3 - ((dateCopy.getDay() + 6) % 7))
  // January 4 is always in the first week
  const week1 = new Date(dateCopy.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week1
  return (
    1 +
    Math.round(
      ((dateCopy.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  )
}
