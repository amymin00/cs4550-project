import mongoose from 'mongoose';

const { Schema } = mongoose;

const postsSchema = new Schema({
    title: String,
    poster: mongoose.Types.ObjectId,
    timestamp: Date,
    song: String,
    text: String,
    liked: [mongoose.Types.ObjectId],
    comments: [mongoose.Types.ObjectId],
}, {collection: 'posts'});

export default postsSchema;