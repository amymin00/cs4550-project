import mongoose from 'mongoose';
import tuitsSchema from './tuits-schema.js'

const usersModel = mongoose.model('UsersModel', tuitsSchema);

export default usersModel;