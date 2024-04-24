import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { backend_api } from './url';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const isLoggedIn = !!token;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem('token', serverToken);
    };

    const LogoutUser = () => {
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('USER');
    };

    const userAuthentication = async () => {
        try {
            const response = await fetch(`${backend_api}/user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();

                if (data.msg) {
                    localStorage.setItem('USER', JSON.stringify(data.msg));
                } else {
                    console.error("Unexpected API response format:", data);
                }
            } else {
                console.error("Server returned an error:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error during user authentication:", error);
        }
    };
    

    useEffect(() => {
        userAuthentication();
    }, [])


    return (
        <AuthContext.Provider
            value={{ isLoggedIn, storeTokenInLS, LogoutUser, token, backend_api }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error('useAuth used outside of the Provider');
    }
    return authContextValue;
};