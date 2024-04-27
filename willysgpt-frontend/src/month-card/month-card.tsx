import { getTotalSpent } from './get-total-spent'
import type { FoodItem } from '../types'
import { H4, Box, Stack, H1, Label, HStack, VStack } from '@northlight/ui'
import { PieChart } from './pie-chart'

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
      spacing='8'
    >
      <HStack w='full' h='full' alignItems={'start'}>
        <Stack>
          <Box w='max-content'>
            <H4>{monthName}</H4>
          </Box>
          <Stack spacing='0'>
            <Box w='max-content'>
              <Label size='md'>Total spend:</Label>
            </Box>
            <Box w='max-content' bgColor='red.500' p='1'>
              <H1 sx={{ color: 'white', fontFamily: 'gotham' }}>
                {totalSpent} kr
              </H1>
            </Box>
          </Stack>
        </Stack>
        <HStack h='full' w='full'>
          <VStack h='full' w='50%' spacing='0'>
            <Box w='max-content'>
              <Label size='md'>Price</Label>
            </Box>
            <PieChart data={monthData} splitBy='price' />
          </VStack>
            <VStack h='full' w='50%' spacing='0'>
              <Box w='max-content'>
                <Label size='md'>Purchased items</Label>
              </Box>
              <PieChart data={monthData} splitBy='quantity' />
            </VStack>
        </HStack>
      </HStack>
    </Stack>
  )
}
