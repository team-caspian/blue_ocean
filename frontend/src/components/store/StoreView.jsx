import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import axios from 'axios'
import { Link, withRouter, Redirect, useNavigate } from 'react-router-dom';
import ReviewList from './Stores/Reviews/ReviewList.jsx'
import Menu from './Menu.jsx'
import LoadingScreen from '../LoadingScreen.jsx'
import Shops from './Stores/Stores.jsx'

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {GiCoffeeBeans} from 'react-icons/gi';

const StoreView = () => {
  const [stores, setStores] = useState([])
  const [menuModal, setMenuModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const { page, setPage, userInfo, setUserInfo, storeData, setStoreData, loggedIn, setLoggedIn, currStore, setCurrStore } = useContext(GlobalContext);
  let navigate = useNavigate();
  //We need to confirm the user is logged in before returning the following html.
  //We don't want the user to be able to navigate to /home without being logged in.

  function handleMenu() {
    setMenuModal(!menuModal)
  }

  function fetchStores() {
    axios
      .get('/stores')
      .then(res => setStores(res.data))
  }

  useEffect(() => {
    fetchStores()
  }, [])

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (!user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     //const uid = user.uid;
  //     // ...
  //     return(
  //       <div>not logged in</div>
  //     )
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });

  if (loggedIn === false) {
    navigate('/');
  }

  const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
    ? <Link to={to}>{children}</Link>
    : <>{children}</>;

  return (
    <>
      {loading === false ? (
        <div className="wrapper" style={{ height: '100%', width: '100%' }}>
          <img src="LOGO.png" className="logo" />
          <div style={{ height: '30px', color: 'white', top: '14px', right: '100px', position: 'absolute' }}>{userInfo.username}</div>
          <GiCoffeeBeans style={{ height: '30px', color: 'white', top: '8px', right: '50px', position: 'absolute' }} ></GiCoffeeBeans>
          <div style={{ height: '30px', color: 'white', top: '14px', right: '10px', position: 'absolute' }}>{userInfo.reward_points}</div>
          <ConditionalLink to="/userUpdate" condition={loggedIn}><button style={{ height: '25px', top: '32px', right: '50px', position: 'absolute' }}
          >Update</button></ConditionalLink>
          <div className="nav-bar"></div>
          <div className="portal-container" style={{ height: '100%', width: '100%', fontFamily: 'neue-haas-grotesk-display' }}>
            <div className="shops-module">
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '25px', fontFamily: 'poppins, sans-serif', marginTop: '15px' }}>RESULTS FROM <span className="location-style" style={{ fontWeight: 'normal', color: '#D2B48C' }}>NEW YORK, NEW YORK</span></div>
                <Shops />
            </div>
            <div className="shop-info">
              <div className="details">
                <div className="column-a">
                  <div className="shop-website">
                    <div style={{ color: 'white', fontSize: '30px', marginRight: '14px' }}>COFFEE SHOP</div>
                    <div style={{ fontSize: '12px', color: 'white' }}>Visit Website</div>
                  </div>
                  <div style={{ color: '#D2B48C' }}>MON-FRI 09:00 AM - 07:00 PM</div>

                  <button onClick={handleMenu}>Order Online</button>
                  <div className={`Modal ${menuModal ? 'Show' : ''}`}>
                    {menuModal ? <Menu toggle={handleMenu} /> : null}
                  </div>
                  <div className={`Overlay ${menuModal ? 'Show' : ''}`} />

                  <div className="featured" style={{ marginTop: '10px' }}>
                    <div style={{ color: 'white', fontSize: '30px' }}>Featured Items</div>
                    <hr className="hr" style={{ color: '#BEA69F', margin: '1px', size: '3px', width: '97%' }} />
                    <div className="featured-items" style={{ display: 'flex', flexDirection: 'row', flexjustifyContent: 'flex-start' }}>
                      <div className="featured-item">Item</div>
                      <div className="featured-item">Item</div>
                      <div className="featured-item">Item</div>
                    </div>
                  </div>
                </div>
                <div className="column-b">
                  Google Map
                </div>
                <hr className="hr" />
              </div>
              <ReviewList store={stores[0]} />
            </div>
          </div>
        </div>)
        : (<LoadingScreen />
        )}
    </>
  );
}

export default StoreView;