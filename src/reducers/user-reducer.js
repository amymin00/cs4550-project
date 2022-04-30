import {
    FIND_USER_BY_ID,
    FIND_ALL_USERS,
    FIND_USERS_FOLLOWERS,
    FIND_USERS_FOLLOWING,

    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
} from "../actions/user-actions";

// TODO: Finish actions for cases with return;
const usersReducer = (state = [], action) => {
    switch (action.type) {
        case FIND_USER_BY_ID:
            return;
        case FIND_USERS_FOLLOWERS:
            return action.followers;
        case FIND_USERS_FOLLOWING:
            return action.following;
        case FIND_ALL_USERS:
            return action.users;
        case CREATE_USER:
            return [
                ...state,
                action.newUser
            ];
        case UPDATE_USER:
        return state.map(
            user => user._id === action.user._id ?
                action.user : user);
        case DELETE_USER:
        return state.filter(
            user => user._id !== action.user._id);
        default:
        return state;
    }
};

export default usersReducer;