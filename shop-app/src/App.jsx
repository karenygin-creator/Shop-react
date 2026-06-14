import './App.css'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import CartPage from './pages/CartPage/CartPage'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header/Header'


function App() {
 
  return (
    <>
    <Header/>
   <Routes>
      <Route path='/register'
      element={<RegisterPage/>}/>
      <Route path='/login'
      element={<LoginPage/>}/>
      <Route path='/catalog'
      element={
        
      <CatalogPage/>
     
      }/>
      <Route path='/cart'
      element={
        <ProtectedRoute>
      <CartPage/>
      </ProtectedRoute>
      }/>
   </Routes>
   </>
  )
}

export default App
