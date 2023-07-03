import React, { useState } from 'react';

import './App.css';
import { Landing } from './components/Landing';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { MyContext } from './components/Context';
import { AppStatus } from './types/types';

function App() {

  var defaultValue : AppStatus = {status: "", response: "", userId: localStorage.getItem("userId")}
  const [appStatus, setAppStatus] = useState({...defaultValue})
  const value = {
    appStatus: appStatus,
    setAppStatus: (e: AppStatus ) => {setAppStatus(e)}
  }
  return (

   
 
         
      <MyContext.Provider value={value}>

   <Home></Home> 
  




      <Footer></Footer>

      </MyContext.Provider>

 
   

  );
}

export default App;
