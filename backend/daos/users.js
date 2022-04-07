import usersModel from './tuits-model.js';

export const findAllUsers = () => usersModel.find();
export const createUser = (user) => usersModel.create(user);
export const deleteUser = (uid) => usersModel.deleteOne({_id: uid});
export const updateUser = (uid, user) => usersModel.updateOne({_id: uid}, {$set: user})