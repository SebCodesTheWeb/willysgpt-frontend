import { getTotalSpent } from './get-total-spent'
import type { FoodItem } from '../types'
import {
  H4,
  Box,
  Stack,
  H1,
  Label,
  HStack,
  VStack,
  Carousel,
} from '@northlight/ui'
import { PieChart } from './pie-chart'

export interface MonthCardProps {
  monthData: FoodItem[]
  monthName: string
}

export const MonthCard = ({ monthData, monthName }: MonthCardProps) => {
  const totalSpent = getTotalSpent(monthData)

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
                {Number(totalSpent.toFixed(2))} kr
              </H1>
            </Box>
          </Stack>
        </Stack>
        <HStack h='full' w='90%' p='4'>
          <Carousel
            itemWidth={800}
            itemHeight={400}
            h='400px'
            showRadio={false}
          >
            <HStack h='400px' w='full'>
              <VStack h='90%' w='full' spacing='0' >
                <Box w='max-content'>
                  <Label size='md'>Price</Label>
                </Box>
                <PieChart
                  data={monthData}
                  splitBy='price'
                  aggregationKey={'category'}
                />
              </VStack>
              <VStack h='90%' w='full' spacing='0'>
                <Box w='max-content'>
                  <Label size='md'>Purchased items</Label>
                </Box>
                <PieChart
                  data={monthData}
                  splitBy='quantity'
                  aggregationKey='category'
                />
              </VStack>
            </HStack>
            <HStack h='400px' w='full'>
              <VStack h='90%' w='full' spacing='0'>
                <Box w='max-content'>
                  <Label size='md'>Price</Label>
                </Box>
                <PieChart
                  data={monthData}
                  splitBy='price'
                  aggregationKey='productName'
                />
              </VStack>
              <VStack h='90%' w='full' spacing='0'>
                <Box w='max-content'>
                  <Label size='md'>Purchased items</Label>
                </Box>
                <PieChart
                  data={monthData}
                  splitBy='quantity'
                  aggregationKey='productName'
                />
              </VStack>
            </HStack>
          </Carousel>
        </HStack>
      </HStack>
    </Stack>
  )
}
