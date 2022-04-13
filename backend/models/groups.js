import mongoose from 'mongoose';
import groupsSchema from '../schemas/groups.js';

const groupsModel = mongoose.model('GroupsModel', groupsSchema);

export default groupsModel;