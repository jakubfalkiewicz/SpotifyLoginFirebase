import React from 'react'
import { useDispatch } from "react-redux"
import { logoutUser } from '@/redux/slices/userSlice';
import { useNavigate } from 'react-router-dom'

interface loginInterface {
    email: string,
    password: string,
    loggedIn: boolean
}
interface IHomeProps {
    user: loginInterface
}

const Home: React.FC<IHomeProps> = ({ user }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    navigate(0)

    function handleLogout() {
        dispatch(logoutUser())
        navigate("/login")
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 100 + 'vh' }}>
            <h1>Dzień dobry, {user.email}</h1>
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    )
}

export default Home