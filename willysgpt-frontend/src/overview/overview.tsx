import { useState } from 'react'
import {
  H3,
  HStack,
  VStack,
  Stack,
  Box,
  FlipButton,
  FlipButtonGroup,
  Label,
  Select,
} from '@northlight/ui'
import type { AggregableFoodKeys, FoodItem } from '../types'
import { uniqBy, prop, map, uniq } from 'ramda'
import { CalendarOverview } from './calendar-overview'
import { PDFDownload } from './pdf-download'
import capitalize from 'capitalize'

export interface OverviewProps {
  data: FoodItem[]
}

export interface Filter {
  category: string | null
  productName: string | null
}

const getNbrTimesWentTowillys = (data: FoodItem[]) => {
  const uniqueWillysVisits = uniqBy(prop('date'), data)

  return uniqueWillysVisits.length
}

export const labelMap = {
  price: 'Price',
  quantity: 'Purchased items',
}

const filterData = (data: FoodItem[], filter: Filter) => {
  return data.filter(
    (item) =>
      (!filter.category || item.category === filter.category) &&
      (!filter.productName || item.productName === filter.productName)
  )
}

export const Overview = ({ data }: OverviewProps) => {
  const nbrTimesToWillys = getNbrTimesWentTowillys(data)
  const [splitBy, setSplitBy] = useState<AggregableFoodKeys>('price')
  const [activeFoodItem, setActiveFoodItem] = useState<FoodItem | null>(null)
  const [filter, setFilter] = useState<Filter>({
    category: null,
    productName: null,
  })

  const uniqueCategories = uniq(map(prop('category'), data))
  const uniqueProductnames = uniq(map(prop('productName'), data))

  return (
    <Stack justifyContent={'start'} spacing='4'>
      <Box w='max-content'>
        <H3>You went to Willys {nbrTimesToWillys} times this year</H3>
      </Box>
      <HStack justifyContent={'space-between'}>
        <Box w='md'>
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
        <Stack w='md'>
          <HStack textAlign={'left'} alignItems={'start'}>
            <Stack w='50%'>
              <Label size='sm'>Filter by category</Label>
              <Select
                options={uniqueCategories.map((cat) => ({
                  value: cat,
                  label: capitalize(cat),
                }))}
                isClearable={true}
                onChange={(v) =>
                  setFilter({ ...filter, category: v ? v.value : null })
                }
                value={filter.category as unknown as any}
              />
            </Stack>
            <Stack w='50%'>
              <Label size='sm'>Filter by product name</Label>
              <Select
                options={uniqueProductnames.map((cat) => ({
                  value: cat,
                  label: capitalize(cat),
                }))}
                isClearable={true}
                onChange={(v) =>
                  setFilter({ ...filter, productName: v ? v.value : null })
                }
                value={filter.productName as unknown as any}
              />
            </Stack>
          </HStack>
        </Stack>
      </HStack>
      <VStack w='full' spacing='0' h='380px'>
        <Box w='max-content'>
          <Label size='md'>{labelMap[splitBy]}</Label>
        </Box>
        <CalendarOverview
          data={filterData(data, filter)}
          splitBy={splitBy}
          setActiveFoodItem={setActiveFoodItem}
        />
        <Box pt='8'>
          {activeFoodItem && <PDFDownload foodItem={activeFoodItem} />}
        </Box>
      </VStack>
    </Stack>
  )
}
