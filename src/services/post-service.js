import axios from 'axios';

const API_URI = process.env.REACT_APP_LOCAL_API_URI || 'https://infinite-reef-07217.herokuapp.com/api';
const POSTS_API = `${API_URI}/posts`;

export const findAllPosts = async () => {
  const response = await axios.get(POSTS_API);
  const posts = response.data;
  return posts;
}

export const findPost = async (post) => {
  const response = await axios.get(`${POSTS_API}/${post._id}`);
  return response.data;
}

export const createPost = async (post) => {
  console.log(post);
  const response = await axios.post(POSTS_API, post)
  return response.data;
}

export const deletePost = async (post) => {
  const response = await axios
  .delete(`${POSTS_API}/${post._id}`);
  return response.data;
}

export const updatePost = async (post) => {
  const response = await axios
  .put(`${POSTS_API}/${post._id}`, post);
  return response.data;
}
