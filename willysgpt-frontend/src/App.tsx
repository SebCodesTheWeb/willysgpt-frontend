import { useState } from 'react'
import './App.css'
import { H2, Stack, Box } from '@northlight/ui'
import { Header } from './header'
import { fetchData } from './fetch-data'
import { MonthCard } from './month-card/month-card'
import { FoodItem } from './types'

function App() {
  const [count, setCount] = useState(0)
  const data = fetchData() as FoodItem[]

  return (
    <Stack spacing='8' w='full'>
      <Header />
      <Stack px='16'>
        <Box w='max-content'>
          <H2>Welcome Alexander!</H2>
        </Box>
        <MonthCard data={data} />
      </Stack>
    </Stack>
  )
}

export default App
