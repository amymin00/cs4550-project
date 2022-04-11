import mongoose from 'mongoose';
import tuitsSchema from './tuits-schema.js'

const postsModel = mongoose.model('listenersModel', tuitsSchema);

export default postsModel;