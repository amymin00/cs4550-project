import React, { useContext, useState } from "react";
import axios from "axios";

const ProfileContext = React.createContext();
const API_URI = process.env.REACT_APP_API_URI || 'https://infinite-reef-07217.herokuapp.com/api';
const api = axios.create({withCredentials: true});

export const ProfileProvider = ({children}) => {
    const [profile, setProfile] = useState();

    const register = async user => {
        const response = await api.post(`${API_URI}/register`, user);
        setProfile(response.data);
        return response.data;
    }

    const login = async (username, password) => {
        const response = await api.post(`${API_URI}/login`, {username, password});
        setProfile(response.data);
    }

    const checkLoggedIn = async () => {
        try {
            const response = await api.post(`${API_URI}/profile`);
            setProfile(response.data);
            return response.data;
        } catch (e) {
            return false;
        }
    }

    const logout = async () => {
        await api.post(`${API_URI}/signout`);
        setProfile(null);
    }

    const value = {register, login, checkLoggedIn, logout, profile};

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => {
    return useContext(ProfileContext);
}