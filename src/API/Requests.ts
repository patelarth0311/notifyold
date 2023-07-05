import axios from "axios";
import { Entry } from "../types/types";
import * as AWS from 'aws-sdk/global';
import React from "react";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUserSession,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { CreateToastFnReturn } from "@chakra-ui/react";
import { makeToast } from "../components/Toast";
import error from "../svgs/error.svg"

var deleteNote = async (noteId: string, userId: string ) => {
  try {
    return await axios({
      method: 'delete',
      url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/deletenote?noteId=${noteId}&userId=${userId}`
    })
  } catch (err) {
   
  }
 
}

var deleteEntry = async (noteId: string, entryId: string, userId: string ) => {
  try {
    return await axios({
      method: 'delete',
      url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/deleteentry?noteId=${noteId}&entryId=${entryId}&userId=${userId}`
    })
  } catch (err) {
    
  }
}


var addNote = async (note: string, userId: string) => {
  
  try {
    return await axios({
      method: 'post',
      url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/addnote?name=${note}&userId=${userId}`
    })
  } catch (err) {
    
  }
 
  }
var postEntry = async(entry: Entry, noteId: string, userId: string) => {

  try {
    return await axios({
      method: 'post',
      url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/postentry?noteId=${noteId}&content=${entry.content}&flag=${entry.flag}&priority=${entry.priority}&time=${entry.time}&userId=${userId}`
    })
  } catch (err) {
    
  }
 
  }

  var changeEntry = async(entry: Entry, noteId: string,  userId: string) => {
    try {
      return await axios({
        method: 'post',
        url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/changeentry?noteId=${noteId}&content=${entry.content}&flag=${entry.flag}&priority=${entry.priority}&time=${entry.time}&entryId=${entry.entryId}&userId=${userId}`
      })
    } catch (err) {
      
    }
   
    }



  var readNote = async (userId: string) => {

    try {
      return await axios({
        method: 'get',
        url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/getnote?userId=${userId}`
      })
    } catch (err) {
      
    }

  }
  
  var confirmUser = async(email: string, confirmation: string  ) => {
    try {
      return await axios({
        method: 'get',
        url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/confirmuser?username=${email}&confirmation=${confirmation}`
      })
    } catch (err) {
      
    }

  }
  
  var addUser = async (email: string, password: string, toast: CreateToastFnReturn,  emptyForm: () => void) => {
    var poolData = {
      UserPoolId: 'us-east-1_nWJJZZRBO',
      ClientId: 'h1a6dsl9no7clcntbjsqmh5gt', 
    };
    var userPool = new CognitoUserPool(poolData);
  
    userPool.signUp(email, password, [], [], function(
      err,
      result
    ) {
      if (err) {
        makeToast(    React.createElement('img', {className: "m-4", src: error, width: 20}),err.message || JSON.stringify(err),"border-[#dc2626]",toast)
      }
    
    });
    
  }

var signinUser = (setUserId: (userId: string) => void,email: string, password: string, toast: CreateToastFnReturn , emptyForm: () => void) =>  {

  var authenticationData = {
    Username: email,
    Password: password,
    
  };
  var authenticationDetails = new AuthenticationDetails(
    authenticationData
  );
  var poolData = {
    UserPoolId: 'us-east-1_nWJJZZRBO', 
    ClientId: 'h1a6dsl9no7clcntbjsqmh5gt', 
  };
  var userPool = new CognitoUserPool(poolData);
  var userData = {
    Username: email,
    Pool: userPool,
  };
  var cognitoUser = new  CognitoUser(userData);

   cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      var accessToken = result.getAccessToken().getJwtToken();
  
      
     
      AWS.config.region = 'us-east-1';
   

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:07524eb6-6845-4199-9c1d-a154d501f870', 
        Logins: {
        
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_nWJJZZRBO': result
            .getIdToken()
            .getJwtToken(),
        },
      });
  
      //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
       (AWS.config.credentials as AWS.CognitoIdentityCredentials).refresh( error => {
        if (error) {
         
        } else {
        
         
          localStorage.setItem("IdToken", result.getIdToken().getJwtToken())
          localStorage.setItem("AccessToken", result.getAccessToken().getJwtToken())
          localStorage.setItem("RefreshToken", result.getRefreshToken().getToken())

          
          setUserId(result.getAccessToken().payload.username)
          makeToast(  React.createElement('p', {className: "absolute left-10"}, "👋"),"Welcome to Notify!","border-indigo-500",toast)
          
        }
      });


    },
  
    onFailure: function(err) {
      if (err) {
        makeToast(    React.createElement('img', {className: "", src: error, width: 20}),err.message || JSON.stringify(err),"border-[#dc2626]",toast)
      }
  

    },
  });
  emptyForm()


}

export {addNote, readNote, postEntry, deleteNote, deleteEntry, changeEntry, addUser, confirmUser, signinUser}