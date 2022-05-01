import axios from 'axios';

const API_URI = process.env.REACT_APP_LOCAL_API_URI || process.env.REACT_APP_REMOTE_API_URI;
const USERS_API = `${API_URI}/users`;

export const findAllUsers = async () => {
  const response = await axios.get(USERS_API);
  const users = response.data;
  return users;
}

export const findUserById = async (userId) => {
    const response = await axios.get(`${USERS_API}/${userId}`);
    const user = response.data;
    return user;
}

export const findUserByUsername = async username => {
    const response = await axios.get(`${USERS_API}/username/${username}`);
    const user = response.data;
    return user;
}

export const createUser = async (user) => {
  const response = await axios.post(`${API_URI}/register`, user)
  return response.data;
}

export const deleteUser = async (user) => {
  const response = await axios.delete(`${USERS_API}/${user._id}`);
  return response.data;
}

export const updateUser = async (user) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
}

export const findUsersFollowers = async (user) => {
  const response = await axios.get(`${USERS_API}/followers/${user._id}`);
  const followers = response.data;
  return followers;
}

export const findUsersFollowing = async (user) => {
  const response = await axios.get(`${USERS_API}/following/${user._id}`);
  const following = response.data;
  return following;
}