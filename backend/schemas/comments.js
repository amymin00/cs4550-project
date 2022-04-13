import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentsSchema = new Schema({
    poster: mongoose.Types.ObjectId,
    timestamp: Date,
    text: String,
}, {collection: 'comments'});

export default commentsSchema;