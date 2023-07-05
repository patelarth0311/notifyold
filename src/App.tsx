import React, { useState } from 'react';

import './App.css';
import { Landing } from './components/Landing';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { MyContext } from './components/Context';
import { AppStatus } from './types/types';
import {
  CognitoUser,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

import { useEffect } from 'react';
function App() {

  var defaultValue : AppStatus = {status: "", response: "", userId: localStorage.getItem("userId")}
  const [appStatus, setAppStatus] = useState({...defaultValue})
  const value = {
    appStatus: appStatus,
    setAppStatus: (e: AppStatus ) => {setAppStatus(e)}
  }

  var checkSession = () => {
    const idToken = localStorage.getItem("IdToken");
    const accessToken = localStorage.getItem("AccessToken");
    const refreshToken = localStorage.getItem("RefreshToken");
    if (idToken && accessToken && refreshToken) {
      const AccessToken = new CognitoAccessToken({
        AccessToken: accessToken,
      });
      const IdToken = new CognitoIdToken({
        IdToken: idToken,
      });
  
      const RefreshToken = new CognitoRefreshToken({
        RefreshToken: refreshToken,
      });
  
      const sessionData = {
        IdToken: IdToken,
        AccessToken: AccessToken,
        RefreshToken: RefreshToken,
      };
  
      const cachedSession = new CognitoUserSession(sessionData);
      
      if (cachedSession.isValid()) {
        setAppStatus((prev) => {
          return {...prev, userId: cachedSession.getAccessToken().payload.username}
        })
        return true;
      }
  
      if (!RefreshToken.getToken()) {
        localStorage.clear()
        return false;
      }
    }

    return false;
  };

  useEffect(() => {
    if (!checkSession()) {
      localStorage.clear()
      setAppStatus({userId: "", response: "", status: ""})
    }
  },[])



  return (

   
 
         
      <MyContext.Provider value={value}>

   {appStatus.userId ?    <Home></Home> 
   : <Landing></Landing>

   }




      <Footer></Footer>

      </MyContext.Provider>

 
   

  );
}

export default App;
