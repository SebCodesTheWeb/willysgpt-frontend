import { WEEK_DAYS } from "./constants"

export function getISOWeekDateInfo(dateInput: string): {
  weekNbr: number
  weekDay: string
} {
  // Parse the date string
  const date = new Date(dateInput)

  // Check for an invalid date
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format provided')
  }

  // Get day of the week
  const weekDay = WEEK_DAYS[date.getDay()]

  // Calculate ISO week number
  const dayNum = date.getDay() || 7
  date.setDate(date.getDate() + 4 - dayNum)
  const yearStart = new Date(date.getFullYear(), 0, 1)
  const weekNbr = Math.ceil(
    (((date as any) - (yearStart as any)) / 86400000 + 1) / 7
  )

  // Return the result object
  return { weekNbr, weekDay }
}

// Example usage:
const isoDateInfo = getISOWeekDateInfo('2024-04-27')
console.log(isoDateInfo) // Should output: { weekNbr: 17, weekDay: 'saturday' 
