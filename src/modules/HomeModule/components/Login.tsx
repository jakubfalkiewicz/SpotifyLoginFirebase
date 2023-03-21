import React from 'react'
import "./Login.scss"
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { auth } from '@/firebase';
import { setUser } from '@/redux/slices/userSlice';
import { FacebookIcon, GoogleIcon, Apple } from '@/assets';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom'

function Login() {

    interface loginInterface {
        email: string,
        password: string
    }

    const userData = {
        email: "",
        password: ""
    }

    const handleSubmit = (values: loginInterface) => {
        registerUser({ ...values })
    };

    const navigate = useNavigate();
    const dispatch = useDispatch()

    function registerUser(data: loginInterface) {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user
                dispatch(setUser({ email: user.email, loggedIn: true }))
                navigate("/")
                navigate(0)
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }

    return (
        <div className='register'>
            <div className='register__content'>
                <div className='register__welcome register__welcome--login'>
                    <div className='register__logo'>Spotify</div>
                    <div className='register__welcome-text register__welcome-text--login'>Sign up for free to start listening.</div>
                    <div className='register__welcome-buttons'>
                        <button className='register__welcome-button register__welcome-button--facebook'>
                            <div className='img'>
                                <img className='facebook' src={FacebookIcon}></img>
                            </div>
                            <div >Sign up with Facebook</div>
                        </button>
                        <button className='register__welcome-button register__welcome-button--apple'>
                            <img className='apple' src={Apple}></img>
                            <div>Sign up with Apple</div>
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
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className='register__inputs-container'>
                            <div className='register__input'>
                                <label htmlFor='email' className="register__input__label">Email address or username</label>
                                <Field type="email" style:focus={{ border: 'none' }} name="email" id="email" className={`register__input__field ${errors.email && touched.email ? 'invalid' : ''}`} placeholder='Enter your email.' />
                                {/* <ErrorMessage name="email">{msg => <div className='register__input__error' ><img src={WarningIcon} alt="warning-icon"></img>{msg}</div>}</ErrorMessage> */}
                            </div>

                            <div className='register__input'>
                                <label htmlFor='password' className="register__input__label">Password</label>
                                <Field type="password" name="password" id="password" className={`register__input__field ${errors.password && touched.password ? 'invalid' : ''}`} placeholder='Create a password' />
                                <div className='register__input__forgot'>Forgot your password?</div>

                                {/* <ErrorMessage name="password">{msg => <div className='register__input__error' ><img src={WarningIcon} alt="warning-icon"></img>{msg}</div>}</ErrorMessage> */}
                            </div>
                            <div className='register__submit-button login'>
                                <div className='register__share-date login'>
                                    <Field type="checkbox" name="share" /><div>Remember me</div>
                                </div>
                                <button type="submit" >
                                    Sign up
                                </button>
                            </div>
                            <div className='register__divider'>
                                <div className='register__divider__bar'></div>
                            </div>
                            <div className='register__login-link login'>
                                <p>You dont have an account yet?</p>
                                <Link className='register__login-button' to="/register">Sign up for spotify</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login