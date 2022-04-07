import mongoose, { ObjectId } from 'mongoose';

const { Schema } = mongoose;

const usersSchema = new Schema({
    name: String,
    username: String,
    biography: String,
    image: String,
}, {collection: 'users'});

export default usersSchema;