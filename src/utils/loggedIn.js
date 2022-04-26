import { checkLoggedIn } from '../actions/user-actions';

const loggedIn = async () => {
    let loggedIn = false;
    const response = await checkLoggedIn();
    loggedIn = response;
    return loggedIn;
};

export default loggedIn;