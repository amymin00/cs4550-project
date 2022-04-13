import listenersModel from '../models/listeners.js';

export const findAlLListeners = () => listenersModel.find();
export const createListener = (listener) => listenersModel.create(listener);
export const deleteListener = (id) => listenersModel.deleteOne({_id: id});
export const updateListener = (id, listener) => listenersModel.updateOne({_id: id}, {$set: listener})