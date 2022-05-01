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
            const user = response.data;
            setCurrentUser(user);
            return user;
        } catch (e) {
            // console.log(`Failed to retrieve current user: ${e}`);
        }
    }

    const logout = async () => {
        await api.post(`${API_URI}/logout`);
        setCurrentUser(null);
    }

    const updateCurrentUser = async updatedUser => {
        try {
            await api.put(`${API_URI}/profile`, updatedUser);
            const user = await checkLoggedIn();
            return user;
        } catch (e) {
            console.log(`Update user operation invalid: ${e}`);
        }
    }

    const value = {register, login, checkLoggedIn, logout, updateCurrentUser, currentUser};

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => {
    return useContext(ProfileContext);
}