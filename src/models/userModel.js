import { Schema } from "mongoose"
import mongoose, { Schema } from 'mongoose';

const model = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    groups: []
});

export default mongoose.Model('Users', model, 'users');