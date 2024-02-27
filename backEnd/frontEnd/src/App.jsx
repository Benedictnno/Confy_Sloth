import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
  Order,
  Login,
  DashBoard,
} from "./pages";
import { ProtectDashBoard, ProtectLogin } from "./pages/ProtectDashBoard";
function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          <Route
            path="login"
            element={
              <ProtectLogin>
                <Login />
              </ProtectLogin>
            }
          />
          <Route
            path="order"
            element={
              <PrivateRoute>
                <Order />
              </PrivateRoute>
            }
          />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route
            path="checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectDashBoard>
                <DashBoard />
              </ProtectDashBoard>
            }
          />
          <Route path="error" element={<Error />} />
        </Routes>

        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;