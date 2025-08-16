import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route,BrowserRouter,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import Signup from './pages/signup.jsx'
import Signin from './pages/signin.jsx'
import Home from './pages/Home.jsx'
import Layout from './layout.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import React from 'react'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='Signup' element={<Signup />} />
      <Route path='Signin' element={<Signin />} />
      <Route path='*' element={<h1>404 Not Found</h1>} />
      </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
)
