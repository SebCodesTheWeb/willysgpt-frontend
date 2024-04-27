import { Stack, H3, Box } from '@northlight/ui'
import type { FoodItem } from '../types'
import { splitDataByMonth } from './split-data-by-month'
import { keys, values } from 'ramda'
import { MonthCard } from './month-card'

export interface TimelineProps {
  data: FoodItem[]
}

export const Timeline = ({ data }: TimelineProps) => {
  const splitData = splitDataByMonth(data)
  const years = keys(splitData)

  return (
    <Stack>
      {years.map((year) => (
        <Stack spacing='4' justifyContent={'start'} key={year}>
          <Box w='max-content'>
            <H3>{year} in Review</H3>
          </Box>
          <Stack spacing='8' px='16' justifyContent={'start'} w='full'>
            {keys(splitData[year]).map((month) => (
              <MonthCard
                key={month}
                monthData={values(splitData[year][month]) as FoodItem[]}
                monthName={month as string}
              />
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
