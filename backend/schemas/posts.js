import mongoose, { ObjectId } from 'mongoose';

const { Schema } = mongoose;

// posts - id, group id, poster, timestamp, song/playlist focus, text, likes,
const postsSchema = new Schema({
    name: String,
    'group_id': ObjectId, // a post belongs to a group
    timestamp: Date,
    'focus_item': ObjectId, // not sure how to represent this
    text: String,
    liked: [ObjectId], // so that multiple people can like at same time?
    likes: Number,
}, {collection: 'posts'});

export default postsSchema;