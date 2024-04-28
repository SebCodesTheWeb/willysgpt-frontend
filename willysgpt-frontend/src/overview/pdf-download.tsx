import { useEffect, useState } from 'react'
import type { FoodItem } from '../types'
import {
  Button,
  HStack,
  Stack,
  Image,
  Box,
  Icon,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@northlight/ui'
import { Table } from '@chakra-ui/react'
import receipt from '../assets/receipt.png'
import { DownloadDuo } from '@northlight/icons'
import { handlePdfDownload } from './handle-pdf-download'
import { serverBaseURL } from '../App'

export interface PDFDownloadProps {
  foodItem: FoodItem
}

export const PDFDownload = ({ foodItem }: PDFDownloadProps) => {
  const [pdf, setPdf] = useState<Blob | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${serverBaseURL}/get_receipt?uuid=${foodItem.receiptId}`
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.blob()
        setPdf(data)
      } catch (error) {
        console.error('Error fetching the PDF:', error)
        setPdf(null) // Optionally reset the PDF state on error
      }
    }
    fetchData()
  }, [])

  return (
    <HStack alignItems={'start'} spacing='8' p='4'>
      <Box h='full'>
        <Image src={receipt} alt='receipt-pic' />
      </Box>
      <Stack>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th textAlign='left'>Product info</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Product Name</Td>
              <Td>{foodItem.productName}</Td>
            </Tr>
            <Tr>
              <Td>Price</Td>
              <Td>{foodItem.price}</Td>
            </Tr>
            <Tr>
              <Td>Quantity</Td>
              <Td>{foodItem.quantity}</Td>
            </Tr>
            <Tr>
              <Td>Date</Td>
              <Td>{foodItem.date}</Td>
            </Tr>
            <Tr>
              <Td>Receipt Reference Number</Td>
              <Td>{foodItem.receiptId}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Button
          onClick={() => {
            handlePdfDownload(pdf, foodItem.receiptId)
          }}
          rightIcon={<Icon as={DownloadDuo} />}
          variant='link'
          p='2'
        >
          Download receipt for purchase of {foodItem.productName}
        </Button>
      </Stack>
    </HStack>
  )
}
