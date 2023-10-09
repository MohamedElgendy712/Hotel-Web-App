import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext(null)

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const updateUserData = (user) => {
        setUser(user)
    }

    const login = (user) => {
        setUser(user.user)
        localStorage.setItem("token", user.token)
    }

    const logout = () => {

        axios.defaults.withCredentials = true
        axios.post("http://localhost:3000/user/logout", {}, { headers: { "auth-token": localStorage.getItem("token") } })
            .then(response => {
                console.log(response)

                setUser(null)
                localStorage.clear()

                navigate('/')
                navigate(0)     // Refresh the page to complete the logout operation
            })
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            axios.defaults.withCredentials = true;
            axios.get("http://localhost:3000/getUser", { headers: { "auth-token": localStorage.getItem("token") } })
                .then(response => {
                    setUser(response.data)
                })
                .catch(error => {
                    console.log(error)
                    localStorage.clear()
                })
        }
    }, [])

    return <AuthContext.Provider value={{ user, login, logout }} >{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
