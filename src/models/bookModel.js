import mongoose from 'mongoose';
const { Schema } = mongoose;

const model = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    genre: String,
    author: String
});

export default mongoose.model('Books', model, 'books');