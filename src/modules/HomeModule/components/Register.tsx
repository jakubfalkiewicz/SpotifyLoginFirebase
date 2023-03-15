import React, { useState } from 'react'
import "./Register.scss"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase';
import { FacebookIcon, GoogleIcon } from '@/assets';
import Input from './Input';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { WarningIcon } from '@/assets';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Incorrect e-mail")
        .required("Email is required"),
    confirmEmail: Yup.string()
        .oneOf([Yup.ref("email")], "Emails must match")
        .required("Confirm Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    username: Yup.string()
        .min(4, "Username must be at least 4 characters")
        .max(20, "Username must be less than 20 characters")
        .required("Username is required"),
    month: Yup.string().required("Month is required"),
    day: Yup.number()
        .integer("Day must be an integer")
        .min(1, "Day must be greater than or equal to 1")
        .max(31, "Day must be less than or equal to 31")
        .required("Day is required"),
    year: Yup.number()
        .integer("Year must be an integer")
        .min(1900, "Year must be greater than or equal to 1900")
        .max(2100, "Year must be less than or equal to 2100")
        .required("Year is required"),
});

interface userInterface {
    email: string,
    confirmEmail: string,
    password: string,
    username: string,
    month: string,
    day: number | string,
    year: number | string,
}

const Register: React.FC = () => {
    const [userData, setUserData] = useState<userInterface>({
        email: "",
        confirmEmail: "",
        password: "",
        username: "",
        month: "",
        day: "",
        year: ""
    })

    const handleSubmit = (values: userInterface) => {
        console.log(values);
    };

    function registerUser() {
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
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
        <div className='register'>
            <div className='register__content'>
                <div className='register__welcome'>
                    <div className='register__logo'>Spotify</div>
                    <div className='register__welcome-text'>Sign up for free to start listening.</div>
                    <div className='register__welcome-buttons'>
                        <button className='register__welcome-button register__welcome-button--facebook'>
                            <div className='img'>
                                <img className='facebook' src={FacebookIcon}></img>
                            </div>
                            <div >Sign up with Facebook</div>
                        </button>
                        <button className='register__welcome-button register__welcome-button--google'>
                            <img className='google' src={GoogleIcon}></img>
                            <div>Sign up with Google</div>
                        </button>
                    </div>
                </div>
                <div className='register__divider'>
                    <div className='register__divider__bar'></div>
                    <div className='register__divider__text'>or</div>
                    <div className='register__divider__bar'></div>
                </div>
                <div className='register__email-sign'>Sign up with your email address</div>
                <Formik
                    initialValues={userData}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className='register__inputs-container'>
                            <div className='register__input'>
                                <label htmlFor='email' className="register__input__label">What&#39;s your email?</label>
                                <Field type="email" style:focus={{ border: 'none' }} name="email" id="email" className={`register__input__field ${errors.email && touched.email ? 'invalid' : ''}`} placeholder='Enter your email.' />
                                <ErrorMessage name="email">{msg => <div className='register__input__error' ><img src={WarningIcon} alt="warning-icon"></img>{msg}</div>}</ErrorMessage>
                            </div>
                            <div className='register__input'>
                                <label htmlFor='confirmEmail' className="register__input__label">Confirm your email</label>
                                <Field type="email" name="confirmEmail" id="confirmEmail" className={`register__input__field ${errors.confirmEmail && touched.confirmEmail ? 'invalid' : ''}`} placeholder='Enter your email again.' />
                                <ErrorMessage name="confirmEmail">{msg => <div className='register__input__error' ><img src={WarningIcon} alt="warning-icon"></img>{msg}</div>}</ErrorMessage>
                            </div>
                            <div className='register__input'>
                                <label htmlFor='password' className="register__input__label">Create a password</label>
                                <Field type="password" name="password" id="password" className={`register__input__field ${errors.password && touched.password ? 'invalid' : ''}`} placeholder='Create a password' />
                                <ErrorMessage name="password">{msg => <div className='register__input__error' ><img src={WarningIcon} alt="warning-icon"></img>{msg}</div>}</ErrorMessage>
                            </div>
                            <div className='register__input'>
                                <label htmlFor='username' className="register__input__label">What should we call you?</label>
                                <Field type="text" name="username" id="username" className={`register__input__field ${errors.username && touched.username ? 'invalid' : ''}`} placeholder='Enter a profile name.' />
                                <ErrorMessage name="username">{msg => <div className='register__input__error' ><img src={WarningIcon} alt="warning-icon"></img>{msg}</div>}</ErrorMessage>
                            </div>
                            <div className='register__appear-info'>This appears on your profile.</div>
                            <div className='register__input register__input--date'>
                                <label htmlFor='username' className="register__input__label">What&#39;s your date of birth</label>
                                <div className='input-fields'>
                                    <Field type="dropdown" name="month" id="month" className={`register__input__field ${errors.month && touched.month ? 'invalid' : ''}`} placeholder='Month' />
                                    <Field type="number" name="day" id="day" className={`register__input__field ${errors.day && touched.day ? 'invalid' : ''}`} placeholder='DD' min={1} max={31} />
                                    <Field type="number" name="year" id="year" className={`register__input__field ${errors.year && touched.year ? 'invalid' : ''}`} placeholder='YYYY' min={1900} max={2010} />
                                </div>

                                <ErrorMessage name="username">{msg => <div className='register__input__error' ><img src={WarningIcon} alt="warning-icon"></img>{msg}</div>}</ErrorMessage>
                            </div>
                            <button type="submit" >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
                <div>Email</div>
                <button onClick={() => registerUser()}>Register</button>
            </div>
        </div>
    )
}

export default Register