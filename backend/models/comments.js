import mongoose from 'mongoose';
import commentsSchema from '../schemas/comments.js';

const commentsModel = mongoose.model('CommentsModel', commentsSchema);

export default commentsModel;