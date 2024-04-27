import { getTotalSpent } from './get-total-spent'
import type { FoodItem } from '../types'
import { H4, Box, Stack, H1, Label } from '@northlight/ui'

export interface MonthCardProps {
  monthData: FoodItem[]
  monthName: string
}

export const MonthCard = ({ monthData, monthName }: MonthCardProps) => {
  const totalSpent = getTotalSpent(monthData)
  console.log({ monthData, totalSpent })

  return (
    <Stack
      w='full'
      h='md'
      borderWidth='xs'
      borderRadius='md'
      borderStyle='solid'
      borderColor='border.default'
      p='4'
      spacing="8"
    >
      <Box w='max-content'>
        <H4>{monthName}</H4>
      </Box>
      <Stack spacing='0'>
        <Box w='max-content'>
          <Label size='md'>Total spend:</Label>
        </Box>
        <Box w='max-content'>
          <H1>{totalSpent} kr</H1>
        </Box>
      </Stack>
    </Stack>
  )
}
