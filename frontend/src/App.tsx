import { LoginForm } from "./components/login-form"
import Navbar from "./components/Navbar"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Order from "./components/Order";

function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<><Hero /><Menu /></>} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/login" element={<LoginForm className="min-h-[100svh] items-center justify-center" action="Login"/>} />
        <Route path="/signup" element={<LoginForm className="min-h-[100svh] items-center justify-center" action="Sign up"/>} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
