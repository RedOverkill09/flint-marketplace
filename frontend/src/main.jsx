import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Product from './pages/Product.jsx'
import Checkout from './pages/Checkout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Product />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
