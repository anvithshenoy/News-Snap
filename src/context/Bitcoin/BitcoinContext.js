import { createContext, useContext } from 'react'

const BitcoinContext = createContext()

export const useBitcoin = () => useContext(BitcoinContext)

export default BitcoinContext
