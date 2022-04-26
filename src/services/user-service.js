import axios from 'axios';

const API_URI = process.env.REACT_APP_LOCAL_API_URI || 'https://infinite-reef-07217.herokuapp.com/api';
const USERS_API = `${API_URI}/users`;

export const findAllUsers = async () => {
  const response = await axios.get(USERS_API);
  const users = response.data;
  return users;
}

export const findUserById = async userId => {
    const response = await axios.get(`${USERS_API}/${userId}`);
    const user = response.data;
    return user;
}

export const createUser = async (user) => {
  console.log(user);
  const response = await axios.post(`${API_URI}/register`, user)
  return response.data;
}

export const deleteUser = async (user) => {
  const response = await axios
  .delete(`${USERS_API}/${user._id}`);
  return response.data;
}

export const updateUser = async (user) => {
  const response = await axios
  .put(`${USERS_API}/${user._id}`, user);
  return response.data;
}

export const findAllFollowers = async (user) => {
  // TODO type filtering?
  const response = await axios.get(USERS_API);
  const followers = response.data;
  return followers;
}

export const findAllFollowing = async (user) => {
  // TODO type filtering?
  const response = await axios.get(USERS_API);
  const following = response.data;
  return following;
}