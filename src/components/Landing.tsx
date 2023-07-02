import React from "react";
import { UserFormFields, User} from "../types/types";
import { useState } from "react";
import { addUser, signinUser } from "../API/Requests";
import { ConfirmationPin, UserForm } from "./UserForm";
import { useContext } from "react";
import { MyContext } from "./Context";
import { useToast } from "@chakra-ui/react";
import error from "../svgs/error.svg"
import check from "../svgs/check.svg"
import {
    CognitoUser,
    CognitoAccessToken,
    CognitoIdToken,
    CognitoRefreshToken,
    CognitoUserSession,
} from "amazon-cognito-identity-js";
import { makeToast } from "./Toast";


export function Landing() {
    
    const toast = useToast()
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    
   
    const [showLogin, setShowLogin] = useState(true);
    const [formData, setFormData] = useState({email: "", password: "", confirmPassword: ""})
    const [showPin, setShowPin] = useState(false)
    const [user, setUser] = useState({userId: "", username: "", status: false} )
    const cognitoReg = /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/
    const {setAppStatus, appStatus} = useContext(MyContext)
    var updateForm = (e : any) => {

        if (e.currentTarget) {
            const {name, value}  = e.currentTarget
            setFormData((prev) => {
                return {
                    ...prev, [name] : value
                }
            })
        }
       

    }

    return  <div 
    className="flex justify-center pb-10 pt-10 min-h-screen flex-col bg-neutral-50 items-center gap-y-20">
        <h1 className="text-6xl font-ver">Notify</h1>

        {showLogin ?
        <UserForm showErrorMessage={showErrorMessage}
         setForm={updateForm}  
         
         buttonAction={() => {

            signinUser(formData.email, formData.password).then((res) => {

                if (res  && res.status === 200) { 
                   
                   
                    var idToken = res.data.AuthenticationResult.IdToken
                    var accessToken = res.data.AuthenticationResult.AccessToken
                    var refreshToken = res.data.AuthenticationResult.RefreshToken
                    
                    if (idToken && accessToken && refreshToken) {
                        const sessionData = {
                            IdToken: new CognitoIdToken({IdToken: idToken}),
                            AccessToken: new CognitoAccessToken({AccessToken:  accessToken}),
                            RefreshToken: new CognitoRefreshToken({RefreshToken: refreshToken}),
                            ClockDrift: 0
                        };
                        
                       
                        const cachedSession = new CognitoUserSession(sessionData)
                        
                        if (cachedSession.isValid()) {
                            setFormData({email: "", password: "", confirmPassword: ""})
                            localStorage.setItem("IdToken", idToken)
                            localStorage.setItem("AccessToken", idToken)
                            localStorage.setItem("RefreshToken", idToken)

                            {makeToast(   <p className="absolute left-10" >👋</p>,"Welcome to Notify!","border-indigo-500",toast)}
                           
                            var username = cachedSession.getAccessToken().payload.username
                            setAppStatus({...appStatus, userId: username})
                            localStorage.setItem("userId", username)
                        } 
                    } else {
                        
                    



                        {makeToast(   <img className="absolute left-10" width={20} src={error}></img>,"Service error","border-[#dc2626]",toast)}
                    }
                  
            
                
                    
                } else {
                    {makeToast(   <img className="absolute left-10" width={20} src={error}></img>,"Invalid user credentials","border-[#dc2626]",toast)}
                
                }
                
            })

         }} setShow={
            () => {
                setFormData({email: "", password: "", confirmPassword: ""})
                setShowLogin(prev => !prev)
            }}
            email={formData.email} password={formData.password} hasConfirmPassword={false} buttonText={"Log in"} messageText={"Don't have an account?"} optionText={"Sign up"}></UserForm>
            : <>
            {showPin ? <ConfirmationPin register={() => {
                
                setShowLogin(true)
                {makeToast(   <img className="absolute left-10" width={20} src={check}></img>,"Registration complete!","border-[#6FCF97]",toast)}

            }} user={user}></ConfirmationPin> :
                        <UserForm setForm={updateForm}  
                        showErrorMessage={showErrorMessage}
                        buttonAction={() => {
                            if (formData.password.match(cognitoReg)
                            && formData.confirmPassword === formData.password) {
                                setShowErrorMessage(false)
                                addUser(formData.email, formData.password).then((res) => {
                                    if (res  && res.status === 200) {
                                        setFormData({email: "", password: "", confirmPassword: ""})
                                        setShowPin(true)
                                    
                                        setUser((prev) => {

                                            return {...prev,userId: res.data.UserSub, username: formData.email}
                                        })
                                        
                                    } else {
                                       
                                    }



                                })
                            } else if (formData.confirmPassword !== formData.password) {
                                

                                {makeToast(   <img className="absolute left-10" width={20} src={error}></img>,"Passwords do not match","border-[#dc2626]",toast)}
                                setShowErrorMessage(true)
                            } else {
                           
                                {makeToast(   <img className="absolute left-10" width={20} src={error}></img>,"Password criteria not met","border-[#dc2626]",toast)}
                                setShowErrorMessage(true)
                            }
                        }} setShow={
                            () => {
                                setFormData({email: "", password: "", confirmPassword: ""})
                                setShowLogin(prev => !prev)
                                setShowErrorMessage(false)
                                
                            }}
                            email={formData.email} confirmPassword={formData.confirmPassword} password={formData.password} hasConfirmPassword={!showLogin} buttonText={"Sign up"} messageText={"Have an account?"} optionText={"Log in"}></UserForm>

            }
            
            </>
            
        
        }


        </div>
 
}


