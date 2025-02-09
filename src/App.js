import React from 'react';
import './App.css';
import Home from "./home"
function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>Home</li>
          <li>Login</li>
          <li>Register</li>
        </ul>
      </nav>
      <Home/>
    </div>
  );
}

export default App;
