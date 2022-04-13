import mongoose from 'mongoose';
import postsSchema from '../schemas/posts.js';

const postsModel = mongoose.model('PostsModel', postsSchema);

export default postsModel;