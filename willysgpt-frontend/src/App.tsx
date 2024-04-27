import './App.css'
import {
  HStack,
  H2,
  Stack,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@northlight/ui'
import { Header } from './header'
import { fetchData } from './fetch-data'
import { Timeline } from './month-card/timeline'
import { FoodItem } from './types'
import { Overview } from './overview/overview'

function App() {
  const data = fetchData() as FoodItem[]

  return (
    <Stack spacing='8' w='full'>
      <Header />
      <Stack px='16' spacing='0'>
        <Box w='max-content'>
          <H2>Welcome Alexander!</H2>
        </Box>
        <Tabs
          colorScheme='red'
          variant='enclosed'
          size='md'
          align='end'
          w='full'
        >
          <TabList>
            <HStack spacing='2'>
              <Tab>Timeline</Tab>
              <Tab>Receipts</Tab>
            </HStack>
          </TabList>
          <TabPanels>
            <TabPanel p='4'>
              <Timeline data={data} />
            </TabPanel>
            <TabPanel p='4'>
              <Overview data={data} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  )
}

export default App
