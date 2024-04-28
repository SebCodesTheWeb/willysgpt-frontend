import './App.css'
import { useEffect, useState } from 'react'
import {
  HStack,
  H2,
  Button,
  Stack,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spinner,
} from '@northlight/ui'
import { Header } from './header'
import data from './fake-data.json'
import { Timeline } from './month-card/timeline'
import { FoodItem } from './types'
import { Overview } from './overview/overview'
import { processData } from './process-data'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { isJsonParsable } from './is-json-parsable'

const RUNNING_IN_DEV = true
export const serverBaseURL = 'https://f018-212-181-59-82.ngrok-free.app'

function App() {
  const [eventData, setEventData] = useState<FoodItem[]>([])
  const [runninInDev, setRunningInDev] = useState<boolean>(RUNNING_IN_DEV)

  const handleNewEvent = (data: any) => {
    const parsedData = data
    const processedData = processData(parsedData)
    setEventData((prevData) => [...prevData, ...processedData])
  }

  useEffect(() => {
    if (runninInDev) return
    const fetchData = async () => {
      await fetchEventSource(`${serverBaseURL}/process_stream`, {
        method: 'GET',
        headers: {
          Accept: 'text/event-stream',
        },
        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log('Connection made ', res)
          } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
          ) {
            console.log('Client side error ', res)
          }
        },
        onmessage(event) {
          if (isJsonParsable(event.data)) {
            const parsedData = JSON.parse(event.data)
            handleNewEvent(parsedData)
          }
        },
        onclose() {
          console.log('Connection closed by the server')
        },
        onerror(err) {
          console.log('There was an error from server', err)
        },
      })
    }
    fetchData()
  }, [runninInDev])

  const dataInUse = runninInDev
    ? (data as FoodItem[])
    : (eventData as FoodItem[])

  return (
    <Stack spacing='8' w='full'>
      <Header />
      <Stack px='16' spacing='0'>
        <Box w='max-content' onClick={() => setRunningInDev((prev) => !prev)}>
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
              {dataInUse.length === 0 && <Spinner />}
              {dataInUse.length > 0 && <Timeline data={dataInUse} />}
            </TabPanel>
            <TabPanel p='4'>
              {dataInUse.length === 0 && <Spinner />}
              {dataInUse.length > 0 && <Overview data={dataInUse} />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  )
}

export default App
