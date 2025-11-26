import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    filterPlaces: ['title', 'keywords', 'summary', 'entities'],
    filterIncluding: [] as string[],
    filterExcluding: [] as string[]
  }),
  getters: {
    isActive: (state) =>
      state.filterIncluding.length > 0 || state.filterExcluding.length > 0
  }
})
