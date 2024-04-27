import { expect } from 'chai'
import { splitDataByMonth } from './split-data-by-month'
import { FoodItem } from '../types'

describe('spltiDataByMonth', () => {
  it('works', () => {
    const inputData = [
      {
        productName: 'Tomater',
        category: 'Grönsaker',
        price: 25,
        quantity: 3,
        date: '2024-04-01',
        receiptId: 'REC123456',
        id: 'UID0001',
      },
      {
        productName: 'Kycklingbröst',
        category: 'Kött',
        price: 45,
        quantity: 2,
        date: '2024-04-02',
        receiptId: 'REC123457',
        id: 'UID0002',
      },
      {
        productName: 'Kalkonbröst',
        category: 'Kött',
        price: 63,
        quantity: 1,
        date: '2024-11-05',
        receiptId: 'REC123505',
        id: 'UID0050',
      },
      {
        productName: 'Camembert',
        category: 'Mejeri',
        price: 50,
        quantity: 1,
        date: '2024-11-12',
        receiptId: 'REC123506',
        id: 'UID0051',
      },
    ]

    const output = splitDataByMonth(inputData as FoodItem[])

    expect(output).to.deep.equal({
      '2024': {
        April: [
          {
            productName: 'Tomater',
            category: 'Grönsaker',
            price: 25,
            quantity: 3,
            date: '2024-04-01',
            receiptId: 'REC123456',
            id: 'UID0001',
          },
          {
            productName: 'Kycklingbröst',
            category: 'Kött',
            price: 45,
            quantity: 2,
            date: '2024-04-02',
            receiptId: 'REC123457',
            id: 'UID0002',
          },
        ],
        November: [
          {
            productName: 'Kalkonbröst',
            category: 'Kött',
            price: 63,
            quantity: 1,
            date: '2024-11-05',
            receiptId: 'REC123505',
            id: 'UID0050',
          },
          {
            productName: 'Camembert',
            category: 'Mejeri',
            price: 50,
            quantity: 1,
            date: '2024-11-12',
            receiptId: 'REC123506',
            id: 'UID0051',
          },
        ],
      },
    })
  })
})
