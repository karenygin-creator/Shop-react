import './App.css'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import CatalogPage from './pages/CatalogPage/CatalogPage'


function App() {
 
  return (
   <Routes>
      <Route path='/register'
      element={<RegisterPage/>}/>
      <Route path='/login'
      element={<LoginPage/>}/>
      <Route path='/catalog'
      element={<CatalogPage/>}/>

   </Routes>
  )
}

export default App
