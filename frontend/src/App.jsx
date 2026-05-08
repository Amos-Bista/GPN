import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Customers from '../pages/customers'
import Orders from '../pages/orders'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Customers />
      <Orders />
    </>
  )
}

export default App
