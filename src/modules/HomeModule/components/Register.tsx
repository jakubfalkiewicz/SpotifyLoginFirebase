import React, { useEffect, useState } from 'react'
import "./Register.scss"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase';
import { FacebookIcon, GoogleIcon } from '@/assets';
// import Input from './Input';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { WarningIcon } from '@/assets';
import { Arrow } from '@/assets';
import userInterface from '../interfaces/userInterface';
import { useSelector, useDispatch } from "react-redux"
import { setUser } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store';

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
        .max(2010, "Year must be less than or equal to 2010")
        .required("Year is required"),
});

const Register: React.FC = () => {

    const user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")!) : useSelector((state: RootState) => state.userHandler.user);
    console.log(user)

    const [userData, setUserData] = useState<userInterface>({
        email: "",
        confirmEmail: "",
        password: "",
        username: "",
        month: "",
        day: "",
        year: "",
        gender: "",
        share: false,
        loggedIn: false
    })

    const handleSubmit = (values: userInterface) => {
        registerUser({ ...values })
    };

    const dispatch = useDispatch()

    function registerUser(data: userInterface) {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // setUserData({ ...data, loggedIn: true })
                dispatch(setUser({ ...data, loggedIn: true }))
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    const [monthTable, setMonthTable] = useState<boolean>(false)
    function handleMonthSelect(month: string) {
        userData.month = month;
        setMonthTable(!monthTable)
    }

    return (
        <div className='register'>
            <div className='register__content'>
                {user && <div>{user.email}</div>}
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
                    {({ errors, touched, setFieldValue }) => (
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
                                <label htmlFor='birthDate' className="register__input__label">What&#39;s your date of birth</label>
                                <div className='input-fields'>
                                    <div className='input-field'>
                                        <label htmlFor='month' className="register__input__label register__input__label--date">Month</label>
                                        <div id="month" className={`register__input__field  register__input__field--1 ${errors.month && touched.month ? 'invalid' : ''}`} placeholder='Month' onClick={() => setMonthTable(!monthTable)}>
                                            <Field readOnly type="text" name="month" id="month" className={`register__dropdown__default ${errors.month && touched.month ? 'invalid' : ''}`} placeholder='Month' />
                                            <img src={Arrow}></img>
                                        </div>
                                        {monthTable ? <div className='register__dropdown__tab'>
                                            <div className='register__dropdown__field' onClick={() => { setFieldValue('month', "January"); handleMonthSelect('January') }}>January</div>
                                            <div className='register__dropdown__field' onClick={() => { setFieldValue('month', "February"); handleMonthSelect('February') }}>February</div>
                                            <div className='register__dropdown__field' onClick={() => { setFieldValue('month', "March"); handleMonthSelect('March') }}>March</div>
                                            <div className='register__dropdown__field' onClick={() => { setFieldValue('month', "April"); handleMonthSelect('April') }}>April</div>
                                            <div className='register__dropdown__field' onClick={() => { setFieldValue('month', "May"); handleMonthSelect('May') }}>May</div>
                                            <div className='register__dropdown__field' onClick={() => { setFieldValue('month', "June"); handleMonthSelect('June') }}>June</div>
                                            <div className='register__dropdown__field' onClick={() => { setFieldValue('month', "July"); handleMonthSelect('July') }}>July</div>
                                            <div className='register__dropdown__field' onClick={() => { setFieldValue('month', "August"); handleMonthSelect('August') }}>August</div>
                                            <div className='register__dropdown__field' onClick={() => { setFieldValue('month', "September"); handleMonthSelect('September') }}>September</div>
                                            <div className='register__dropdown__field' onClick={() => { setFieldValue('month', "October"); handleMonthSelect('October') }}>October</div>
                                            <div className='register__dropdown__field' onClick={() => { setFieldValue('month', "November"); handleMonthSelect('November') }}>November</div>
                                            <div className='register__dropdown__field' onClick={() => { setFieldValue('month', "December"); handleMonthSelect('December') }}>December</div>
                                        </div> : null}
                                        <ErrorMessage name="month">{msg => <div className='register__input__error' ><img src={WarningIcon} alt="warning-icon"></img>{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className='input-field'>
                                        <label htmlFor='day' className="register__input__label register__input__label--date">Day</label>
                                        <Field type="number" name="day" id="day" className={`register__input__field register__input__field--2 ${errors.day && touched.day ? 'invalid' : ''}`} placeholder='DD' min={1} max={31} />
                                        <ErrorMessage name="day">{msg => <div className='register__input__error' ><img src={WarningIcon} alt="warning-icon"></img>{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className='input-field'>
                                        <label htmlFor='year' className="register__input__label register__input__label--date">Year</label>
                                        <Field type="number" name="year" id="year" className={`register__input__field register__input__field--3 ${errors.year && touched.year ? 'invalid' : ''}`} placeholder='YYYY' min={1900} max={2010} />
                                        <ErrorMessage name="year">{msg => <div className='register__input__error' ><img src={WarningIcon} alt="warning-icon"></img>{msg}</div>}</ErrorMessage>
                                    </div>
                                </div>
                            </div>
                            <label htmlFor='gender' className="register__input__label">Whats your gender?</label>
                            <div className='register__radios'>
                                <div className='register__radios__radio'>
                                    <Field type="radio" name="gender" value="Male" />
                                    <span className="checkmark"></span>
                                    Male</div>
                                <div className='register__radios__radio'>
                                    <Field type="radio" name="gender" value="female" /><span className="checkmark"></span>Female</div>
                                <div className='register__radios__radio'>
                                    <Field type="radio" name="gender" value="non-binary" /><span className="checkmark"></span>Non-binary</div>
                                <div className='register__radios__radio'>
                                    <Field type="radio" name="gender" value="other" /><span className="checkmark"></span>Other</div>
                                <div className='register__radios__radio'>
                                    <Field type="radio" name="gender" value="prefer-not" /><span className="checkmark"></span>Prefer not to say</div>
                            </div>
                            <div className='register__share-date'>
                                <Field type="checkbox" name="share" /><div>Share my registration date with Spotify’s content providers for
                                    marketing purposes.</div>
                            </div>
                            <p className='terms'>By clicking on sing-up. you agree to Spotify’s <a className='link'>Terms and Conditions of Use<span>.</span></a></p>
                            <p className='terms'> To learn more about how. Spotify collects, uses, shares and protects your
                                personal data, please see <a className='link'>Spotify’s Privacy Policy<span>.</span></a></p>
                            <div className='register__submit-button'>
                                <button type="submit" >
                                    Sign up
                                </button>
                            </div>
                            <div className='register__login-link'>
                                <p>Have an account? <a className='link'>Log in</a>.</p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Register