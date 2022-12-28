import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import MainPage from './pages/User/components/MainPage';
import Profile from './pages/User/components/Profile';
import Order from './pages/User/components/Order';
import Notification from './pages/User/components/Notification';
import Password from './pages/User/components/Password';
import Checkout from './pages/Checkout/CheckOut';
import { createTheme, ThemeProvider } from '@mui/material';
import PageNotFound from './pages/PageNotFound';
import AdminMainPage from './pages/Admin/MainPage';
import CustomerList from './pages/Admin/CustomerList';
import AdminList from './pages/Admin/AdminList';
import AddBook from './pages/Admin/AddBook';
import BookList from './pages/Admin/BookList';
import PaymentSuccess from './pages/Checkout/PaymentSuccess';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f44336',
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/user/account/" element={<MainPage />} >
            <Route path="/user/account/profile" element={<Profile />} />
            <Route path="/user/account/order" element={<Order />} />
            <Route path="/user/account/notification" element={<Notification />} />
            <Route path="/user/account/password" element={<Password />} />
            <Route index element={<Navigate to='/user/account/profile' />} />
          </Route>
          <Route path="/checkout/success" element={<PaymentSuccess />} />
          <Route path="/admin/account/" element={<AdminMainPage />}>
            <Route path="/admin/account/profile" element={<Profile />} />
            <Route path="/admin/account/customer" element={<CustomerList />} />
            <Route path="/admin/account/admin" element={<AdminList />} />
            <Route path="/admin/account/password" element={<Password />} />
            <Route path="/admin/account/book/add" element={<AddBook />} />
            <Route path="/admin/account/book" element={<BookList />} />
            <Route index element={<Navigate to='/admin/account/profile' />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>

  )
}

export default App;
