import React,{useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import './accdet.css'
import logo from '../images/logo.jpeg';
import { ToastContainer, toast } from 'react-toastify';
const AccDetails = ({customer,updatedBalance}) => {
  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");
    if (customer && loginSuccess === "true") {
      setTimeout(() => {
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 2000,
        });
      }, 50); 
      localStorage.removeItem("loginSuccess"); 
    }
  }, [customer]);
  if(!customer){
    return <Navigate to="/"/>
  }
  return (
    <div className='acc-con'>
    <div className='imgacc-con'></div>
      <div className='textacc-con'>
      <img src={logo} alt="Student Reserved Bank" />
      <h2>Account Details</h2>
      <p>Username: </p><span>{customer.userName}</span>
      <p>Account Number: </p><span>{customer.accountNumber}</span>
      <p>Branch: </p><span>{customer.branch}</span>
      <p>Phone Number: </p><span>{customer.phnNum}</span>
      <p>Available Balance: </p><span style={{color:"green", fontSize:"24px",fontWeight:"600"}}>{updatedBalance > 0 ? updatedBalance : customer.balance}</span>/-
    </div>
    <ToastContainer/>
    </div>
  )
}

export default AccDetails
