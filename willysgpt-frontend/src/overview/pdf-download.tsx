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

export interface PDFDownloadProps {
  foodItem: FoodItem
}

export const PDFDownload = ({ foodItem }: PDFDownloadProps) => {
  return (
    <HStack alignItems={'start'} spacing='8'>
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
          onClick={handlePdfDownload}
          rightIcon={<Icon as={DownloadDuo} />}
          variant='link'
          p='2'
        >
          Download receipt {foodItem.receiptId} for purchase of{' '}
          {foodItem.productName}
        </Button>
      </Stack>
    </HStack>
  )
}
