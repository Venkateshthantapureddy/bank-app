import axios from 'axios';
import React, {useState} from 'react';
import './login.css';
import logo from '../images/logo.jpeg';
import {useNavigate} from 'react-router-dom';
const Login = ({updateCustomer}) => {
  const navigate = useNavigate ();
  const [loginError, setLoginError] = useState ('');
  const [signInData, setSignInData] = useState ({
    userName: '',
    password: '',
  });
  const handleLogin = async e => {
    e.preventDefault ();
    try {
      const response=await axios.post ('http://localhost:3001/api/login', signInData);
      localStorage.setItem("loginSuccess", "true");
      updateCustomer(response.data.customer)
      navigate("/account-details");
    } catch (error) {
      setLoginError ('username or password not matched please try again!');
      setSignInData ({
        userName: '',
        password: '',
      })
    }
  };
  const handleClear = () => {
    setSignInData ({
      userName: '',
      password: '',
    })
  };
  return (
    <div className="login-con">
      <div className="logimg-con" />
      <div className="logtext-con">
        <img src={logo} alt="Student Reserved Bank" />
        <form onSubmit={handleLogin}>
          <label><b>UserName: </b></label>
          <input
            type="text"
            placeholder="enter your name"
            value={signInData.userName}
            onChange={e =>
              setSignInData ({...signInData, userName: e.target.value})}
            required
          />
          <label><b>Password: </b></label>
          <input
            type="password"
            placeholder="enter password"
            value={signInData.password}
            onChange={e =>
              setSignInData ({...signInData, password: e.target.value})}
            maxLength={8}
            required
          />
          <h5 className="error-msg">{loginError}</h5>
          <button type="submit">Login</button>
          <button type="submit" onClick={handleClear}>Clear</button>
        </form>
        <h4>Welcome back! Log in to manage your finances securely. </h4>
        <h4> If you're new here, sign up for an account to get started. </h4>
        <h4>We prioritize your security.</h4>
        <h4>Rest assured, your data is safe with us.</h4>
        <h4>24/7 customer support is available. Contact us for assistance.</h4>
      </div>
    </div>
  );
};

export default Login;
