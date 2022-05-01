import * as service from '../services/user-service';

export const FIND_USER_BY_ID = 'FIND_USER_BY_ID';
export const FIND_USER_BY_USERNAME = 'FIND_USER_BY_USERNAME';
export const FIND_ALL_USERS = 'FIND_ALL_USERS';
export const FIND_USERS_FOLLOWERS = 'FIND_USERS_FOLLOWERS';
export const FIND_USERS_FOLLOWING = 'FIND_USERS_FOLLOWING';

export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';

export const findUserById = async (dispatch, id) => {
    const user = await service.findUserById(id);
    dispatch({
        type: FIND_USER_BY_ID,
        user
    });
};

export const findUserByUsername = async (dispatch) => {
    const user = await service.findUserByUsername();
    dispatch({
        type: FIND_USER_BY_USERNAME,
        user
    });
};

export const findAllUsers = async (dispatch) => {
    const users = await service.findAllUsers();
    dispatch({
        type: FIND_ALL_USERS,
        users
    });
};

export const findUsersFollowers = async (dispatch, user) => {
    const followers = await service.findUsersFollowers(user);
    dispatch({
        type: FIND_USERS_FOLLOWERS,
        followers
    })
};

export const findUsersFollowing = async (dispatch, user) => {
    const following = await service.findUsersFollowing(user);
    dispatch({
        type: FIND_USERS_FOLLOWERS,
        following
    })
};

export const createUser = async (dispatch, user) => {
    const newUser = await service.createUser(user);
    dispatch({
        type: CREATE_USER,
        newUser
    });
};

export const deleteUser = async (dispatch, user) => {
    await service.deleteUser(user);
    dispatch({
        type: DELETE_USER,
        user
    });
};
