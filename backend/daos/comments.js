import commentsModel from '../models/comments.js';

export const findAllComments = () => commentsModel.find();
export const createComment = (comment) => commentsModel.create(comment);
export const deleteComment = (id) => commentsModel.deleteOne({_id: id});
export const updateComment = (id, comment) => commentsModel.updateOne({_id: id}, {$set: comment})