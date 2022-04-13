import groupsModel from '../models/groups.js';

export const findAllGroups = () => groupsModel.find();
export const creategGroup = (group) => groupsModel.create(group);
export const deleteGroup = (id) => groupsModel.deleteOne({_id: id});
export const updateGroup = (id, group) => groupsModel.updateOne({_id: id}, {$set: group})