import { createContext, useContext } from 'react'

const CurrencyContext = createContext()

export const useCurrency = () => useContext(CurrencyContext)

export default CurrencyContext
