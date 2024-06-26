import type { FoodItem, AggregableFoodKeys } from '../types'
import { ResponsivePie } from '@nivo/pie'
import { Tag } from '@northlight/ui'

export type AggregationKeys = 'category' | 'productName'
export interface PieChartProps {
  data: FoodItem[]
  splitBy: AggregableFoodKeys
  aggregationKey: AggregationKeys
}

const aggregateCategories = (data: FoodItem[], splitBy: AggregableFoodKeys) => {
  const categories = data.reduce((acc, item) => {
    if (acc[item.category]) {
      acc[item.category] += item[splitBy]
    } else {
      acc[item.category] = item[splitBy]
    }
    return acc
  }, {} as Record<string, number>)

  return Object.entries(categories).map(([category, value]) => ({
    id: category,
    label: category,
    value,
  }))
}

const aggregateProducts = (data: FoodItem[], splitBy: AggregableFoodKeys) => {
  const products = data.reduce((acc, item) => {
    if (acc[item.productName]) {
      acc[item.productName] += item[splitBy]
    } else {
      acc[item.productName] = item[splitBy]
    }
    return acc
  }, {} as Record<string, number>)

  return Object.entries(products).map(([productName, value]) => ({
    id: productName,
    label: productName,
    value,
  }))
}

const getAggregatedData = ({
  data,
  splitBy,
  aggregationKey,
}: {
  data: FoodItem[]
  splitBy: AggregableFoodKeys
  aggregationKey: AggregationKeys
}) => {
  switch (aggregationKey) {
    case 'category':
      return aggregateCategories(data, splitBy)
    case 'productName':
      return aggregateProducts(data, splitBy)
    default:
      return null
  }
}

export const PieChart = ({
  data,
  splitBy = 'price',
  aggregationKey,
}: PieChartProps) => {
  const pieData = getAggregatedData({ data, splitBy, aggregationKey })
  if (!pieData) return null

  const roundedPieData = pieData.map((item) => ({
    ...item,
    value:
      typeof item.value === 'number'
        ? Number(item.value.toFixed(2))
        : item.value,
  }))

  return (
    <ResponsivePie
      data={roundedPieData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      enableArcLabels={pieData.length < 15}
      enableArcLinkLabels={pieData.length < 10}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor='#333333'
      arcLabel={(d) => `${d.value} ${splitBy === 'price' ? 'kr' : 'items'}`}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'ruby',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'c',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'go',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'python',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'scala',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'lisp',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'elixir',
          },
          id: 'lines',
        },
        {
          match: {
            id: 'javascript',
          },
          id: 'lines',
        },
      ]}
      legends={
        pieData.length < 4
          ? [
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 10,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]
          : []
      }
      tooltip={({ datum }) => (
        <Tag colorScheme='red'>
          {`${datum.id}: ${datum.value} ${
            splitBy === 'price' ? 'kr' : 'items'
          }`}
        </Tag>
      )}
    />
  )
}
