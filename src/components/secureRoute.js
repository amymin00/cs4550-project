import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { useProfile } from '../contexts/profileContext';

const SecureRoute = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [waiting, setWaiting] = useState(true);
    const { checkLoggedIn } = useProfile();
    
    useEffect(() => {
        const check = async () => {
            try {
                const user = await checkLoggedIn();
                setCurrentUser(user);
                setWaiting(false);
            } catch (e) {
                setWaiting(false);
            }
        }
        check();
    }, []);

    if (currentUser) {
        return children;
    } else if (waiting) {
        return null;
    } else {
        return <Navigate to="/login"/>;
    }
};

export default SecureRoute;