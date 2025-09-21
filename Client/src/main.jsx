import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route,BrowserRouter,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import Signup from './pages/signup.jsx'
import Signin from './pages/signin.jsx'
import Home from './pages/Home.jsx'
import Layout from './layout.jsx'
import Events from './pages/Events.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Profile from './pages/profile.jsx'
import About from './pages/About.jsx'
import Contacts from './pages/Contacts.jsx'
import React from 'react'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='Signup' element={<Signup />} />
      <Route path='Signin' element={<Signin />} />
      <Route path='events' element={<Events />} />
      <Route path='profile' element={<Profile />} />
      <Route path='About' element={<About />} />
      <Route path='Contacts' element={<Contacts />} />
      </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
)
