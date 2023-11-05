import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigate } from 'react-router-dom'





// ************* components imports below ****************
import ProtectedRotues from './utils/protectedRoutes/ProtectedRotues'
import UnAuthProtectedRoutes from './utils/protectedRoutes/UnAuthProtectedRoutes'
import Login from './pages/unauthenticated/auth/Login'
import Signup from './pages/unauthenticated/auth/signup'
import Dashboard from './pages/unauthenticated/dashboard'
import Landing from './pages/unauthenticated/Landing'
import UserDashboard from './pages/authenticated/user/UserDashboard'
import VendorDashboard from './pages/authenticated/vendor/VendorDashboard'
import LandingPage from './pages/authenticated/vendor/components/LandingPage'
import OrderVendor from './pages/authenticated/vendor/OrderVendor'
import OrderUser from './pages/authenticated/user/OrderUser'
import InviteVendor from './pages/authenticated/user/InviteVendor'
import NotificationUser from './pages/authenticated/user/NotificationUser'
import Notification from './pages/authenticated/vendor/Notification'
import ViewOrder from './pages/authenticated/user/ViewOrder'
import ViewVendorOrder from './pages/authenticated/vendor/VIewVendorOrder'

function App() {


  // ***** dummy data *************

  const token = "jaklsdjfi0wjfjaopksdufljasdlkfj" // jwt
  const usertype = localStorage.getItem('usertype')

  // ***** dummy data end *************
  return (
    <Router>
      <Routes>
        <Route>



          {/* Unauthenticated routes */}
          <Route element={<UnAuthProtectedRoutes token={token} />}>
            <Route element={<Dashboard />}>
              <Route path='/' element={<Navigate to={'/home'} />} />
              <Route path='/home' element={<Landing />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />

              <Route />
            </Route>
          </Route>

          {/* Authenticated routes */}
          <Route element={<ProtectedRotues cstmusertype={'vendor'} redirect='/home' />}>

            <Route element={<VendorDashboard />}>
              <Route path='/vendor' element={<Navigate to={'/vendor/dashboard'} />} />
              <Route path='/vendor/dashboard' element={<LandingPage />} />
              <Route path='/vendor/order' element={<OrderVendor />} />
              <Route path='/vendor/order/:id' element={<ViewVendorOrder />} />
              <Route path='/vendor/notification' element={<Notification />} />
            </Route>

          </Route>


          {/* Authenticated routes */}
          <Route element={<ProtectedRotues cstmusertype={'user'} redirect='/home' />}>

            <Route element={<UserDashboard />}>

              <Route path='/user' element={<Navigate to={'/vendor/dashboard'} />} />
              <Route path='/user/dashboard' element={<LandingPage />} />
              <Route path='/user/order' element={<OrderUser />} />
              <Route path='/user/order/:id' element={<ViewOrder />} />
              <Route path='/user/invite' element={<InviteVendor />} />
              <Route path='/user/notification' element={<NotificationUser />} />

            </Route>
          </Route>




          {/* create 404 page [ common ]*/}

        </Route>

      </Routes>
    </Router>
  )
}

export default App
