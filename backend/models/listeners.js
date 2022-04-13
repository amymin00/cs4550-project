import mongoose from 'mongoose';
import listenersSchema from '../schemas/listeners.js';

const listenersModel = mongoose.model('ListenersModel', listenersSchema);

export default listenersModel;