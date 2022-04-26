import axios from 'axios';

<<<<<<< Updated upstream
const API_URI = process.env.REACT_APP_API_URI || 'https://infinite-reef-07217.herokuapp.com/api';
const USERS_API = `${API_URI}/users`;
=======
const USERS_API = 'https://infinite-reef-07217.herokuapp.com/api/users';
>>>>>>> Stashed changes

export const findAllUsers = async () => {
  const response = await axios.get(USERS_API);
  const users = response.data;
  return users;
}

<<<<<<< Updated upstream
export const findUser = async (user) => {
  const response = await axios.get(`${USERS_API}/${user._id}`);
  return response.data;
=======
export const findUserById = async userId => {
    const response = await axios.get(`${USERS_API}/${userId}`);
    const user = response.data;
    return user;
>>>>>>> Stashed changes
}

export const createUser = async (user) => {
  console.log(user);
  const response = await axios.post(USERS_API, user)
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