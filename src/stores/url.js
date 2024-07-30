 
import { defineStore } from 'pinia'

export const useUrl = defineStore('urls', {
  //state
  state: () => ({ 
    apisw: 'https://localhost:44363/',  
}),
 })