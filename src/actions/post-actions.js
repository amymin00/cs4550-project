import * as service from '../services/post-service';

export const CREATE_POST = 'CREATE_POST';
export const FIND_ALL_POSTS = 'FIND_ALL_POSTS';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const FIND_POST_BY_ID = 'FIND_POST_BY_ID';
export const FIND_POSTS_BY_SONG = 'FIND_POSTS_BY_SONG';
export const FIND_POSTS_BY_AUTHOR = 'FIND_POSTS_BY_AUTHOR';

export const findAllPosts = async (dispatch) => {
  const posts = await service.findAllPosts();
  dispatch({
    type: FIND_ALL_POSTS,
    posts
  });
}

export const findPostsBySong = async (dispatch, songId) => {
    const posts = await service.findPostsBySong(songId);
    dispatch({
      type: FIND_POSTS_BY_SONG,
      posts
    });
}

export const findPostsByAuthor = async (dispatch, userId) => {
  const posts = await service.findPostsByAuthor(userId);
  dispatch({
    type: FIND_POSTS_BY_AUTHOR,
    posts
  });
}

export const findPost = async (dispatch) => {
  const post = await service.findPost();
  dispatch({
    type: FIND_POST_BY_ID,
    post
  });
}

export const deletePost = async (dispatch, post) => {
  await service.deletePost(post);
  dispatch({
    type: DELETE_POST,
    post
  })
}

export const createPost = async (dispatch, post) => {
  const newPost = await service.createPost(post);
  dispatch({
    type: CREATE_POST,
    newPost
  });
}

export const updatePost = async (dispatch, post) => {
  await service.updatePost(post);
  dispatch({
    type: UPDATE_POST,
    post
  });
}

