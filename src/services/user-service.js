import axios from 'axios';

//const USERS_API = "??????";
// const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = 'https://cs4550-proj-server.herokuapp.com/api/users';

export const createUser = async (user) => {
  console.log(user);
  const response = await axios.post(USERS_API, user)
  return response.data;
}

export const findAllUsers = async () => {
  const response = await axios.get(USERS_API);
  const users = response.data;
  return users;
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