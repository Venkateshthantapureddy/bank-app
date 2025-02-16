import React, { useState } from 'react';
import './App.css';
import Home from "./home";
import Register from './forms/Register';
import Login from './forms/Login';
import AccDetails from './forms/AccDetails';
import DepositForm from './forms/DepositForm';
import Withdrawl from './forms/Withdrawl';
import {Routes,Route,Link,useNavigate,useLocation} from 'react-router-dom';
function App () {
  const navigate=useNavigate()
  const location=useLocation()
  const[customer,setCustomer]=useState(null)
  const[updatedBalance,setUpdatedBalance]=useState(0)
  const updateBalance=(newBalance)=>{
      setUpdatedBalance(newBalance)
  }
  const updateCustomer=(userData)=>{
    setCustomer(userData)
  }
  const handleLogout=()=>{
    setCustomer(null)
    setUpdatedBalance(0);
    setTimeout(() => {
      navigate("/login"); 
    }, 100);
  }
  return (
    <div>
      <nav>
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/" className='nav-link'>Home</Link>
          </li>
          {!customer ? (
            <>
              <li className={location.pathname === "/login" ? "active" : ""}>
                <Link to="/login" className='nav-link'>Login</Link>
              </li>
              <li className={location.pathname === "/register" ? "active" : ""}>
                <Link to="/register" className='nav-link'>Register</Link>
              </li>
            </>
          ) : (
            <>
              <li className={location.pathname === "/account-details" ? "active" : ""}>
                <Link to="/account-details" className='nav-link'>Account Details</Link>
              </li>
              <li className={location.pathname === "/deposit" ? "active" : ""}>
                <Link to="/deposit" className='nav-link'>Deposit</Link>
              </li>
              <li className={location.pathname === "/withdrawl" ? "active" : ""}>
                <Link to="/withdrawl" className='nav-link'>Withdraw</Link>
              </li>
              <li>
                <button className='out' onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login updateCustomer={updateCustomer} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account-details' element={<AccDetails customer={customer} updatedBalance={updatedBalance} />} />
        <Route path='/deposit' element={<DepositForm customer={customer} updateBalance={updateBalance} />} />
        <Route path='/withdrawl' element={<Withdrawl customer={customer} updateBalance={updateBalance} />} />
      </Routes>
    </div>
  );
}

export default App;
