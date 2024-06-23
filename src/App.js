import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ForgotPassword from './components/forgotPassword.js';
import { UserProvider } from './context/userContext';
import BuyPage from "./pages/BuyPage";
import Home from './pages/Home';
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Product from './pages/Products.js';
import Register from "./pages/Register";
import Selling from "./pages/Selling.js";
import UserProfile from './pages/UserProfile.js';
import Chat from './pages/chat.js';
function App() {
  return (
    
    <BrowserRouter>
    <UserProvider>
   <Routes>
   <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage/buy" element={<BuyPage />} />
          <Route path="/homepage/sell" element={<Selling />}/>
          <Route path="/homepage/user" element={<UserProfile/>} />
          <Route path="/homepage/chat" element={<Chat />}  />
          <Route path="/homepage/buy/:_id" element={<Product />}  />
          <Route path = "/forgotPassword" element = {<ForgotPassword/>}/>
   </Routes>
   </UserProvider>
   </BrowserRouter>
   
  );
}

export default App;
