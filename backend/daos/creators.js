import creatorsModel from '../models/creators.js';

export const findAllCreators = () => creatorsModel.find();
export const createCreator = (creator) => creatorsModel.create(creator);
export const deleteCreator = (id) => creatorsModel.deleteOne({_id: id});
export const updateCreator = (id, creator) => creatorsModel.updateOne({_id: id}, {$set: creator})