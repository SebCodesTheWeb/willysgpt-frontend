import type { FoodItem } from '../types'
import { Button } from '@northlight/ui'

export interface PDFDownloadProps {
  foodItem: FoodItem
}

export const PDFDownload = ({ foodItem }: PDFDownloadProps) => {
  return (
    <Button onClick={() => console.log('Download PDF')}>
      Download PDF for {foodItem.productName}
    </Button>
  )
}
