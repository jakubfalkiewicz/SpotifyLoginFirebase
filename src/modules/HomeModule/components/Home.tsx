import React from 'react'
import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from "react-redux"
import { logoutUser, setUser } from '@/redux/slices/userSlice';
import { Link } from "react-router-dom"

const Home: React.FC = () => {
    const user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")!) : useSelector((state: RootState) => state.userHandler.user);
    console.log(user)

    const dispatch = useDispatch()

    return (
        <div>
            {user.loggedIn ?
                <div>
                    <h1>Dzień dobry, {user.username}</h1>
                    <button onClick={() => dispatch(logoutUser())}>Logout</button>
                </div> :
                <div>
                    <button><Link to="/login">Login</Link></button>
                    <button> <Link to="/register">Register</Link> </button>
                    <button onClick={() => dispatch(setUser({ email: `witam${Math.random() * 1000}@example.com`, username: "Habibi", password: "hiasdwasd", loggedIn: true }))}>Login (fake)</button>
                </div>
            }
        </div>
    )
}

export default Home