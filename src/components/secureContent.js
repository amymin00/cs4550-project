import {useEffect, useState} from 'react';
import { useProfile } from '../contexts/profileContext';

const SecureContent = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const { checkLoggedIn } = useProfile();

    useEffect(() => {
        const check = async () => {
            try {
                await checkLoggedIn();
                setLoggedIn(true);
            } catch (e) {
                setLoggedIn(false);
            }
        }
        check();
    }, []);

    if (loggedIn) {
        return children;
    } else {
        return null;
    }
};

export default SecureContent;