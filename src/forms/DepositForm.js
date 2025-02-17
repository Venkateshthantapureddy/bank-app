import axios from 'axios';
import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert'
import './deposit.css'
import logo from '../images/logo.jpeg';
const DepositForm = ({customer, updateBalance}) => {
    const [depositData, setDepositData] = useState ({
        userName: customer?.userName || '',
        accountNumber: customer?.accountNumber || '',
        date: '',
        depositAmount: '',
        depositType: '',
    });
    if(!customer){
        return <Navigate to="/"/>
    }
  const handleDeposit=async(e)=>{
    e.preventDefault()
    try {
        if(depositData.depositType!=="cash"&&depositData.depositType!=="online"){
            return alert("Do you mean cash or online?")
        }
        const response=await axios.post("http://localhost:3001/api/deposit",depositData)
        if (response.data.balance !== undefined) {
          updateBalance(response.data.balance);
        }
        swal("Good job!", `Amount deposited: ${depositData.depositAmount}`, "success");
        setDepositData({
          date: '',
          depositAmount: '',
          depositType: '',
      })
    } catch(error) {
      console.error("Deposit failed:", error);
    }
  }
  const handleClear=()=>{
    setDepositData({
        date: '',
        depositAmount: '',
        depositType: '',
    })
  }
  return (
    <div className='dep-con'>
    <div className='imgdep-con'></div>
      <div className='textdep-con'>
      <form onSubmit={handleDeposit}>
        <img src={logo} alt="Student Reserved Bank" />
        <h2>Deposit Form</h2>
        <span>Username: {customer.userName}</span><br/><br/>
        <span>Account Number: {customer.accountNumber}</span><br/><br/>
        <label>Date:</label>
        <input
          type="date"
          value={depositData.date}
          onChange={e =>
            setDepositData ({...depositData, date: e.target.value})}
          required
        />
        <label>Deposit Amount: </label>
        <input
          type="number"
          value={depositData.depositAmount}
          onChange={e =>
            setDepositData ({...depositData, depositAmount: e.target.value})}
          required placeholder='Deposit Amount'
        />
        <label>Deposit Type: </label>
        <input
          type="text"
          value={depositData.depositType}
          onChange={e =>
            setDepositData ({...depositData, depositType: e.target.value})}
          required placeholder='Deposit Type'
        />
        <button type="submit">Deposit</button>
        <button type="submit" onClick={handleClear}>Clear</button>
      </form>
    </div>
    </div>
  );
};

export default DepositForm;
