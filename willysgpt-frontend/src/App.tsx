import { useState } from 'react'
import './App.css'
import { H2, Stack, Box } from '@northlight/ui'
import { Header } from './header'
import { fetchData } from './fetch-data'
import { Timeline } from './month-card/timeline'
import { FoodItem } from './types'

function App() {
  const [count, setCount] = useState(0)
  const data = fetchData() as FoodItem[]

  return (
    <Stack spacing='8' w='full'>
      <Header />
      <Stack px='16' spacing="6">
        <Box w='max-content'>
          <H2>Welcome Alexander!</H2>
        </Box>
        <Timeline data={data} />
      </Stack>
    </Stack>
  )
}

export default App
