import postsModel from '../models/posts.js';

export const findAllPosts = () => postsModel.find();
export const createPost = (post) => postsModel.create(post);
export const deletePost = (id) => postsModel.deleteOne({_id: id});
export const updatePost = (id, post) => postsModel.updateOne({_id: id}, {$set: post})