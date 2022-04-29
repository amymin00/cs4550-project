import axios from 'axios';

const API_URI = process.env.REACT_APP_LOCAL_API_URI || process.env.REACT_APP_REMOTE_API_URI;
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

export const findPostsByAuthor = async authorId => {
    const response = await axios.get(`${POSTS_API}/author/${authorId}`);
    return response.data;
}

export const findPostBySong = async songId => {
    const response = await axios.get(`${POSTS_API}/song/${songId}`);
    return response.data;
}

export const createPost = async (post) => {
  console.log(post);
  const response = await axios.post(POSTS_API, post)
  return response.data;
}

export const deletePost = async (post) => {
  const response = await axios.delete(`${POSTS_API}/${post._id}`);
  return response.data;
}

export const updatePost = async (post) => {
  const response = await axios
  .put(`${POSTS_API}/${post._id}`, post);
  return response.data;
}
