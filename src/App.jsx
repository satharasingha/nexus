import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'
import TestPage from './pages/test'
import LoginPage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/registerPage'

function App() {  

  return (   
      <div className='w-full h-screen flex justify-center items-center bg-primary text-secondary'>
        <Toaster position='top-right'/>
        <Routes>
          <Route path='/*' element={<HomePage />} />
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </div> 
  )

}

export default App
