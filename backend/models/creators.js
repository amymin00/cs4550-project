import mongoose from 'mongoose';
import creatorsSchema from '../schemas/creators.js';

const creatorsModel = mongoose.model('CreatorsModel', creatorsSchema);

export default creatorsModel;