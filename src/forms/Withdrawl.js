import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import logo from '../images/logo.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import "./withdraw.css"
const Withdrawl = ({customer,updateBalance}) => {
    const[withdrawlData,setWithdrawlData]=useState({
        userName: customer?.userName || '',
        accountNumber: customer?.accountNumber || '',
        withdrawlAmount:'',
        withdrawlType:'',
    })
    if(!customer){
        return <Navigate to="/"/>
    }
    const handleClear=()=>{
        setWithdrawlData({
            withdrawlAmount:'',
            withdrawlType:'',
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault() 
        try {
          if(withdrawlData.withdrawlType!=="cash"&&withdrawlData.withdrawlType!=="online"){
            return window.alert("Do you mean cash or online?")
          }
            const response=await axios.post("http://localhost:3001/api/withdrawl",withdrawlData)
            if (response.data.balance !== undefined) {
              updateBalance(response.data.balance);
            }
            swal({
              title:'Withdraw Successful',
              text:`Amount deposited: ${withdrawlData.withdrawlAmount}`,
              icon:'success',
            })
            setWithdrawlData({
              withdrawlAmount:'',
              withdrawlType:'',
          })
        } catch (error) {
          if (error.response && error.response.status === 401) {
              const errorMessage = error.response.data.message?.trim().toLowerCase();
               if (errorMessage === "insufficient funds") {
                      toast.error("Insufficient funds", { position: "top-right", autoClose: 2000 });
               }
          } else{
            console.log("Withdraw failed",error);
          }
        }
    }
  return (
    <div className='with-con'>
    <div className='withimg-con'></div>
      <div className='withtext-con'>
        <img src={logo} alt="Student Reserved Bank" />
        <form onSubmit={handleSubmit}>
          <h2>Withdrawl Form</h2>
          <span>Username: {customer.userName}</span><br/><br/>
          <span>Account Number: {customer.accountNumber}</span><br/><br/>
          <label>Withdrawl Amount: </label>
          <input type="number" placeholder='Withdrawl Amount' value={withdrawlData.withdrawlAmount} onChange={(e)=>setWithdrawlData({...withdrawlData,withdrawlAmount:e.target.value})} required/>
          <label>Withdrawl Type: </label>
          <input type="text" placeholder='Withdrawl Type' value={withdrawlData.withdrawlType} onChange={(e)=>setWithdrawlData({...withdrawlData,withdrawlType:e.target.value})} required/>
          <button type="submit">Withdraw</button>
          <button type="button" onClick={handleClear}>Clear</button>
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Withdrawl;
