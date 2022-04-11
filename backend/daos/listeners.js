import listenersModel from './tuits-model.js';

export const findAlllisteners = () => listenersModel.find();
export const createUser = (user) => listenersModel.create(user);
export const deleteUser = (uid) => listenersModel.deleteOne({_id: uid});
export const updateUser = (uid, user) => listenersModel.updateOne({_id: uid}, {$set: user})