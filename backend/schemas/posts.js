import mongoose from 'mongoose';

const { Schema } = mongoose;

const postsSchema = new Schema({
    title: String,
    poster: ObjectId,
    timestamp: Date,
    song: ObjectId,
    text: String,
    liked: [ObjectId],
    comments: [ObjectId],
}, {collection: 'posts'});

export default postsSchema;