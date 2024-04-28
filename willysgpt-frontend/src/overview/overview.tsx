import { useState } from 'react'
import {
  H3,
  VStack,
  Stack,
  Box,
  FlipButton,
  FlipButtonGroup,
  Label,
} from '@northlight/ui'
import type { AggregableFoodKeys, FoodItem } from '../types'
import { uniqBy, prop } from 'ramda'
import { CalendarOverview } from './calendar-overview'
import { PDFDownload } from './pdf-download'

export interface OverviewProps {
  data: FoodItem[]
}

const getNbrTimesWentTowillys = (data: FoodItem[]) => {
  const uniqueWillysVisits = uniqBy(prop('date'), data)

  return uniqueWillysVisits.length
}

export const labelMap = {
  price: 'Price',
  quantity: 'Purchased items',
}

export const Overview = ({ data }: OverviewProps) => {
  const nbrTimesToWillys = getNbrTimesWentTowillys(data)
  const [splitBy, setSplitBy] = useState<AggregableFoodKeys>('quantity')
  const [activeFoodItem, setActiveFoodItem] = useState<FoodItem | null>(null)

  return (
    <Stack justifyContent={'start'} spacing="4">
      <Box w='max-content'>
        <H3>You went to Willys {nbrTimesToWillys} times this year</H3>
      </Box>
      <Box w='sm'>
        <FlipButtonGroup
          size='sm'
          variant='brand'
          value={splitBy}
          onChange={(v) => setSplitBy(v as AggregableFoodKeys)}
        >
          <FlipButton value='price'>Price</FlipButton>
          <FlipButton value='quantity'>Purchased items</FlipButton>
        </FlipButtonGroup>
      </Box>
      <VStack w='full' spacing='0' h='350px'>
        <Box w='max-content'>
          <Label size='md'>{labelMap[splitBy]}</Label>
        </Box>
        <CalendarOverview
          data={data}
          splitBy={splitBy}
          setActiveFoodItem={setActiveFoodItem}
        />
        <Box pt="8">
        {activeFoodItem && <PDFDownload foodItem={activeFoodItem} />} 
        </Box>
      </VStack>
    </Stack>
  )
}
