import { AggregableFoodKeys, FoodItem } from '../types'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import { generateHeatMapDataForYear } from './calendar-overview-base-data'
import { aggregateWeekData } from './aggregate-week-data'
import { Tag } from '@northlight/ui'
import { labelMap } from './overview'

export interface CalendarOverviewProps {
  data: FoodItem[]
  splitBy: AggregableFoodKeys
  setActiveFoodItem: (foodItem: FoodItem) => void
  year: number
}

export const CalendarOverview = ({
  data,
  splitBy,
  setActiveFoodItem,
  year = 2024
}: CalendarOverviewProps) => {

  const aggregatedData = aggregateWeekData(data, splitBy, year)
  const calendarData = generateHeatMapDataForYear(year, aggregatedData)

  const legendLength = 1000

  return (
    <ResponsiveHeatMap
      data={calendarData}
      onClick={(v) => {
        console.log(parseInt(v.data.x))
        const weekNbr = parseInt((v.data.x.match(/\d+/) || [])[0] as string, 10)

        setActiveFoodItem(aggregatedData[v.serieId][weekNbr] as FoodItem)
      }}
      margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
      valueFormat='>-.2s'
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendOffset: 46,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        truncateTickAt: 0,
      }}
      colors={{
        type: 'quantize',
        scheme: 'greens',
        steps: legendLength / 40,
      }}
      emptyColor='#555555'
      enableLabels={false}
      forceSquare={true}
      borderRadius={4}
      xInnerPadding={0.1}
      yInnerPadding={0.1}
      legends={[
        {
          anchor: 'bottom',
          translateX: 0,
          translateY: 50,
          length: legendLength,
          thickness: 8,
          direction: 'row',
          tickPosition: 'after',
          tickSize: 3,
          tickSpacing: 4,
          tickOverlap: false,
          tickFormat: '>-.2s',
          title: labelMap[splitBy],
          titleAlign: 'start',
          titleOffset: 4,
        },
      ]}
      tooltip={({ cell }) => (
        <Tag colorScheme='red'>
          {`${cell.serieId} ${cell.data.x}: ${cell.data.y} ${
            splitBy === 'price' ? 'kr' : 'items'
          }`}
        </Tag>
      )}
    />
  )
}
