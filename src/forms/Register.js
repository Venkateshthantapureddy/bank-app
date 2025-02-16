import React, {useState} from 'react';
import axios from 'axios';
import "./Register.css"
import logo from "../images/logo.jpeg"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
function Register () {
  const navigate=useNavigate()
  const [signUpData, setSignUpData] = useState ({
    userName: '',
    password: '',
    accountNumber: '',
    branch: '',
    phnNum: '',
  });
  const handleSignUp = async (e) => {
    e.preventDefault ();
    try {
      const dataToSend = {
        userName: signUpData.userName,
        password: signUpData.password,
        accountNumber: signUpData.accountNumber ? Number(signUpData.accountNumber) : 0,
        branch: signUpData.branch,
        phnNum: signUpData.phnNum ? Number(signUpData.phnNum) : 0,
      };
      const response=await axios.post ('http://localhost:3001/api/signup', dataToSend);
      if (response.status === 201) {
        toast.success("SignUp Successful!", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } 
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message?.trim().toLowerCase();
        if (errorMessage === "username exists") {
            toast.error("Username Exists", { position: "top-right", autoClose: 2000 });
        } else if (errorMessage === "phone number exists") {
            toast.error("Phone Number Exists", { position: "top-right", autoClose: 2000 });
        } else if (errorMessage === "account number exists") { 
            toast.error("Account Number Exists", { position: "top-right", autoClose: 2000 });
        }
    } else {
        toast.error("Signup failed", { position: "top-right", autoClose: 2000 });
    }
    setSignUpData ({
      userName: '',
      password: '',
      accountNumber: '',
      branch: '',
      phnNum: '',
    });
    }
  };
  const handleClear = () => {
    setSignUpData ({
      userName: '',
      password: '',
      accountNumber: '',
      branch: '',
      phnNum: '',
    });
  };
  return (
    <div className='signUp-con'>
    <div className='formImg-con'></div>
    <div className='form-con'>
    <img src={logo} alt="Student Reserved Bank"/>
      <form onSubmit={handleSignUp}>
        <div>
          <label>UserName: </label>
          <input
            type="text"
            name="title"
            value={signUpData.userName}
            onChange={e => {
              setSignUpData ({...signUpData, userName: e.target.value});
            }}
            placeholder="enter username"
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="pwd"
            value={signUpData.password}
            onChange={e => {
              setSignUpData ({...signUpData, password: e.target.value});
            }}
            placeholder="enter password"
            required
            maxLength={8}
          />
        </div>
        <div>
          <label>AccoutNumber: </label>
          <input
            type="number"
            name="acc"
            value={signUpData.accountNumber}
            onChange={e => {
              if (e.target.value.length <= 14) {
                setSignUpData ({...signUpData, accountNumber: e.target.value});
              }
            }}
            placeholder="enter account number"
            required
          />
        </div>
        <div>
          <label>Branch: </label>
          <input
            type="text"
            name="branch"
            value={signUpData.branch}
            onChange={e => {
              setSignUpData ({...signUpData, branch: e.target.value});
            }}
            placeholder="enter branch name"
            required
          />
        </div>
        <div>
          <label>Registered Phone Number: </label>
          <input
            type="number"
            name="phn"
            value={signUpData.phnNum}
            onChange={e => {
              if (e.target.value.length <= 10) {
                setSignUpData ({...signUpData, phnNum: e.target.value});
              }
            }}
            placeholder="enter account number"
            required
          />
        </div>
        <div>
          <button>sign up</button>
          <button onClick={handleClear}>clear</button>
        </div>
      </form>
      <ToastContainer />  
    </div>
    </div>
  );
}

export default Register;
