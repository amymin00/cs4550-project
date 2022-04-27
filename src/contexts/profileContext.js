import React, { useContext, useState } from "react";
import axios from "axios";

const ProfileContext = React.createContext();
const API_URI = process.env.REACT_APP_LOCAL_API_URI || process.env.REACT_APP_REMOTE_API_URI;
const api = axios.create({withCredentials: true});

export const ProfileProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();

    const register = async user => {
        const response = await api.post(`${API_URI}/register`, user);
        setCurrentUser(response.data);
        return response.data;
    }

    const login = async (username, password) => {
        const response = await api.post(`${API_URI}/login`, {username, password});
        setCurrentUser(response.data);
    }

    const checkLoggedIn = async () => {
        try {
            const response = await api.post(`${API_URI}/profile`);
            setCurrentUser(response.data);
            return response.data;
        } catch (e) {
            return false;
        }
    }

    const logout = async () => {
        await api.post(`${API_URI}/logout`);
        setCurrentUser(null);
    }

    const value = {register, login, checkLoggedIn, logout, currentUser};

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => {
    return useContext(ProfileContext);
}