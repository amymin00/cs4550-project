import mongoose from 'mongoose';
import tuitsSchema from './tuits-schema.js'

const listenersModel = mongoose.model('listenersModel', tuitsSchema);

export default listenersModel;