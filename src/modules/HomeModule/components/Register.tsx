import React, { useState } from 'react'
import "./Register.scss"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase';
import { FacebookIcon, GoogleIcon } from '@/assets';

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function authenticate() {
        console.log("siema")
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    return (
        <div className='register_component'>
            <div className='register_component_content'>
                <div className='register_component_welcome'>
                    <div className='register_component_logo'>Spotify</div>
                    <div className='welcome_text'>Sign up for free to start listening.</div>
                    <div className='register_component_welcome_buttons'>
                        <button className='register_component_facebook_button'>
                            <div className='img'>
                                <img className='facebook' src={FacebookIcon}></img>
                            </div>
                            <div >Sign up with Facebook</div>
                        </button>
                        <button className='register_component_google_button'>
                            <img className='google' src={GoogleIcon}></img>
                            <div>Sign up with Google</div>
                        </button>
                    </div>
                </div>
                <div className='register_component_divider'>
                    <div className='register_component_divider_bar'></div>
                    <div className='register_component_divider_text'>or</div>
                    <div className='register_component_divider_bar'></div>
                </div>
                <div className='register_component_email_sign'>Sign up with your email address</div>
                <div>Email</div>
                <input onChange={(e) => setEmail(e.target.value)} />
                <div>Password</div>
                <input onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => authenticate()}>Register</button>
            </div>
        </div>
    )
}

export default Register