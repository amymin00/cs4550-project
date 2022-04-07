import mongoose, { ObjectId } from 'mongoose';

const { Schema } = mongoose;

// groups - id, name, purpose(?), list of users, need ideas for additional fields
const postsSchema = new Schema({
    name: String,
    users: [ObjectId], // again, not sure how to represent this
}, {collection: 'groups'});

export default postsSchema;