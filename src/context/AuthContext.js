import React, { useState, createContext, useEffect } from 'react'
import AuthServices from 'services/auth-service/AuthService'
import UserServices from 'services/user-service/UserService'
import setAuthToken from 'utils/setAuthToken'
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoading: true,
        isAuthenticated: false,
        user: null
    })
    const loadUser = async () => {
        if (localStorage.getItem('access_token')) {
            setAuthToken(localStorage.getItem('access_token'))
        }
        try {
            const response =await UserServices.getUser();
            if (response.data.status === 200) {
                setAuthState({
                    isLoading: false,
                    isAuthenticated: true,
                    user: response.data.data
                })
            }
        } catch (e) {
            localStorage.removeItem('access_token');
            setAuthToken(null)
            setAuthState({
                isLoading: false,
                isAuthenticated: false,
                user: null
            })
        }
    }
    useEffect(() => {
        loadUser()
    }, [])
    const loginUser = async ({ email, password }) => {
        try {
            const response = await AuthServices.login({
                email: email,
                passWord: password,
            });
            if (response.data.status === 200) {
                localStorage.setItem('access_token', response.data.data.accessToken);
                await loadUser()
                return response.data
            } else {
                return response
            }
        } catch (e) {
            return e
        }

    }
    const logoutUser =async () => {
        localStorage.removeItem('access_token');
        setAuthToken(null)
        setAuthState({
            isLoading: false,
            isAuthenticated: false,
            user: null
        })
        await loadUser()
    }
    return (
        <AuthContext.Provider value={{ authState, loginUser,logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider