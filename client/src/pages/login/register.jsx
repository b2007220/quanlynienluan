import React, { useEffect,useState } from 'react'
import * as AiIcons from 'react-icons/ai'
import userService from '../../services/user.service';

export default function Register() {
    const google = ()=>{
        window.open("localhost:3000/callback/google","_self")
    }
    return(
        <>
         <div className="middle-test">
            <hr/>
        </div>
        <div className="social-sign-in">
            <button className="input-google" onClick={google} id="signInDiv">
                <div className="icon">
                    <AiIcons.AiOutlineGooglePlus></AiIcons.AiOutlineGooglePlus>
                </div>
                    <p>Sign In with Google</p>
            </button>
        </div>
        </>
    )
}
