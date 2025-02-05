// * Imported Libraries
import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// * Imported Components

// * Imported Components (Files)
import Footer from './components/Footer.component'
import Header from './components/Header.component'

// * Imported Screens
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ShippingPage from './pages/ShippingPage'
import PaymentMethodPage from './pages/PaymentMethodPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
import UserListPage from './pages/UserListPage'
import UserEditPage from './pages/UserEditPage'
import ProductListPage from './pages/ProductListPage'
import ProductEditPage from './pages/ProductEditPage'
import OrderListPage from './pages/OrderListPage'
import DoctorConsultationPage from './pages/DoctorConsultationPage'
import LabTestBookingPage from './pages/LabTestBookingPage'
import CompoundingMedicinePage from './pages/CompoundingMedicinePage'
import CheckUpdateProfilePage from './pages/CheckUpdateProfilePage'

const App = () => {
  return (
    <>
      <Router>
        {/* Header */}
        <Header />
        {/* Remaining Body of the App */}
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/shipping' element={<ShippingPage />} />
              <Route path='/login/shipping' element={<ShippingPage />} />
              <Route path='/order/:id' element={<OrderPage />} />
              <Route path='/payment' element={<PaymentMethodPage />} />
              <Route path='/placeorder' element={<PlaceOrderPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/cart/:id' element={<CartPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/admin/userlist' element={<UserListPage />} />
              <Route path='/admin/user/:id/edit' element={<UserEditPage />} />
              <Route
                path='/admin/productlist'
                element={<ProductListPage />}
                exact
              />
              <Route
                path='/admin/productlist/:pageNumber'
                element={<ProductListPage />}
                exact
              />
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditPage />}
              />
              <Route path='/admin/orderlist' element={<OrderListPage />} />
              <Route path='/search/:keyword' element={<HomePage />} exact />
              <Route path='/page/:pageNumber' element={<HomePage />} exact />
              <Route
                path='/search/:keyword/page/:pageNumber'
                element={<HomePage />}
                exact
              />
              <Route path='/' element={<HomePage />} exact />
              <Route
                path='/consultation'
                element={<DoctorConsultationPage />}
                exact
              />
              <Route path='/booktest' element={<LabTestBookingPage />} exact />
              <Route
                path='/compounding-medicine'
                element={<CompoundingMedicinePage />}
                exact
              />

              <Route
                path='/completeProfile'
                element={<CheckUpdateProfilePage />}
                exact
              />
            </Routes>
          </Container>
        </main>
        {/* Footer */}
        <Footer />
      </Router>
    </>
  )
}

export default App
