import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import axios from 'axios';
import { GiCoffeeBeans } from 'react-icons/gi'
import { Link, withRouter, Redirect, useNavigate } from 'react-router-dom';
import DataSimulator from './DataSimulator.jsx';

const Register = () => {
  const { page, setPage, userInfo, setUserInfo, storeData, setStoreData, loggedIn, setLoggedIn, currStore, setCurrStore } = useContext(GlobalContext);
  const [userRegister, setUserRegister] = useState({
    username: '',
    password: '',
    email: '',
    street_address: '',
    city: '',
    state: '',
    zip: '',
    reward_points: 0,
  });
  let navigate = useNavigate();

  const handleChange = (event) => {
    setUserRegister({
      ...userRegister,
      [event.target.name]: event.target.value
    })
  };

  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userRegister.email)) {
      return (true)
    } else {
      return (false)
    }
  };

  const hasNumber = (myString) => {
    return /\d/.test(myString);
  };

  const hasLetter = (myString) => {
    return /[a-zA-Z]/.test(myString)
  };

  return (
    <div className="container" style={{ height: '100%', width: '100%' }}>
      <img src="LOGO.png" className="logo" />
      <div className="register-field">
        <input type="text" className="login-input" placeholder="Username" name="username" style={{ marginTop: '44px' }} onChange={handleChange} />
        <input type="text" className="login-input" placeholder="Password" name="password" onChange={handleChange} />
        <input type="email" className="login-input" placeholder="Email" name="email" onChange={handleChange} />
        <input type="text" className="login-input" placeholder="Address" name="street_address" onChange={handleChange} />
        <div className="address">
          <input type="text" className="login-input" placeholder="City" name="city" style={{
            width: '50%',
            marginRight: '15px'
          }} onChange={handleChange} />
          <input type="text" className="login-input" placeholder="State" name="state" style={{
            width: '15%',
            marginRight: '15px'
          }} onChange={handleChange} />
          <input type="text" className="login-input" placeholder="Zipcode" name="zip" style={{
            width: '25%',
            marginRight: '15px'
          }} onChange={handleChange} />
        </div>
        <div className="buttons">
          <button className="login-button" onClick={(event) => {
            event.preventDefault();
            if (userRegister.username.length === 0) {
              alert('Please enter a Username')
            } else if (userRegister.password.length === 0) {
              alert('Please enter a Password')
            } else if (userRegister.email.length === 0 || !ValidateEmail(userRegister.email)) {
              alert('Please enter a valid Email')
            } else if (userRegister.street_address.length === 0 || !hasNumber(userRegister.street_address) || !hasLetter(userRegister.street_address)) {
              alert('Please enter a valid adress')
            } else if (userRegister.username.includes('<')) {
              let text = userRegister.username;
              let result = text.replace("<", "&lt;")
              setUserRegister({
                ...userRegister,
                username: text
              })
            } else if (userRegister.city.length === 0) {
              alert('Please enter a valid city')
            } else if (userRegister.state.length !== 2) {
              alert('Please enter a valid state')
            } else if (userRegister.zip.length !== 5 || hasLetter(userRegister.zip)) {
              alert('Please enter a valid Zipcode')
            } else {
              axios.post('/user', userRegister).then(() => {
                axios.get(`user/${userRegister.username}/${userRegister.password}`).then(async (result) => {
                  setUserInfo(result.data[0]);
                  setLoggedIn(true);
                  localStorage.setItem('logged', 'true')
                  localStorage.setItem('username', userRegister.username)
                  localStorage.setItem('password', userRegister.password)
                  let value = await DataSimulator(result.data[0]);
                  setStoreData(value);
                  navigate('/Home');
                })
              })
            }
          }}>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register;