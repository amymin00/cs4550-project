import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { useProfile } from '../contexts/profileContext';

const SecureRoute = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const { checkLoggedIn } = useProfile();
    
    useEffect(() => {
        const check = async () => {
            try {
                const user = await checkLoggedIn();
                setCurrentUser(user);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }
        check();
    }, [checkLoggedIn]);

    if (currentUser) {
        return children;
    } else if (loading) {
        return null;
    } else {
        return <Navigate to="/login"/>;
    }
};

export default SecureRoute;