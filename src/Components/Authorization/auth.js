import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext(null)

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        axios.defaults.withCredentials = true
        axios.post("http://localhost:3000/logout")
            .then(response => {
                console.log(response)
                navigate('/')
                navigate(0)     // Refresh the page to complete the logout operation
            })
    }

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:3000/getUser")
            .then(response => {
                setUser(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },[])

    return <AuthContext.Provider value={{ user, login, logout }} >{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
