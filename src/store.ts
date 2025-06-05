import { defineStore } from 'pinia'
import type { Price } from '@/types'

interface State {
  prices: Price[]
  removedPriceCount: number
}

export const usePricesStore = defineStore('store', {
  state: (): State => {
    const storedPrice = localStorage.getItem('store')

    return {
      prices: storedPrice
        ? JSON.parse(storedPrice).prices
        : [{ key: 0, name: undefined, cost: undefined, quantity: undefined, unit: undefined }],
      removedPriceCount: 0,
    }
  },
  getters: {
    priceList: (state: State) => state.prices,
    priceCount: (state: State) => state.prices.length,
  },

  actions: {
    addPrice() {
      const newKey = this.prices.length + this.removedPriceCount

      this.prices.push({
        key: newKey,
        name: undefined,
        cost: undefined,
        quantity: undefined,
        unit: undefined,
      })
    },
    removePrice(key: number) {
      const index = this.prices.findIndex((x: Price) => x.key === key)
      this.prices.splice(index, 1)
      this.removedPriceCount++
    },
    updatePrice(key: number, field: string, newValue: string | number) {
      const index = this.prices.findIndex((x: Price) => x.key === key)

      const relevantPrice = this.prices[index]

      relevantPrice[field] = newValue
    },
    clear() {
      localStorage.removeItem('store')
      this.$reset()
    },
  },
})
