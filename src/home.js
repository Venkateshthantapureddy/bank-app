import React from 'react';
import './home.css';
import logo from "./images/logo.jpeg"
const home = () => {
  return (
    <div className="home-con ">
      <div className="img-con" />
      <div className="text-con">
      <img src={logo} alt="Student Reserved Bank"/>
        <h2>Welcome!</h2>
        <h4>
          Students Reserved Bank (SRB) is a financial institution dedicated to empowering students by providing secure, innovative, and convenient banking solutions. Our mission is to help students manage their finances efficiently and build a strong financial foundation for the future. With a focus on accessibility, security.
        </h4>
        <h4>
          We provide special accounts with zero balance requirements, student-friendly interest rates, and seamless digital banking experiences. Our AI-powered banking system allows instant transactions, budgeting tools, and smart investment options. We prioritize transparency with no hidden charges and offer exclusive cashback, rewards, and scholarship-linked savings plans.
        </h4>
        <h4>Our AI-powered fraud protection system detects suspicious activities and prevents unauthorized transactions. Multi-factor authentication, including biometric login and OTP verification, ensures account safety. Virtual debit cards eliminate the risk of physical loss, and all transactions are encrypted for maximum security. Our dedicated 24/7 customer support team is always available to assist with any issues.</h4>
      </div>
    </div>
  );
};

export default home;
