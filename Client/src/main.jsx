import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route,BrowserRouter,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import Home from './pages/Home.jsx'
import Layout from './Layout.jsx'
import Events from './pages/Events.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Profile from './pages/Profile.jsx'
import About from './pages/About.jsx'
import Bookmarks from './pages/Bookmarks.jsx'
import Alerts from './pages/Alerts.jsx'
import EventDetailPage from './pages/EventDetailPage.jsx'
import UnderConstruction from './pages/UnderConstruction.jsx'
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
      
      <Route path='Bookmarks' element={<Bookmarks />} />
      <Route path='Alerts' element={<Alerts />} />
      <Route path='events/:id' element={<EventDetailPage  />} />
      <Route path='underConstruction' element={<UnderConstruction  />} />

      
      </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
)
