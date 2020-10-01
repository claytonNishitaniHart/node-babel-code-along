import mongoose from 'mongoose';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

export const connect = () => {
    mongoose.connect('mongodb://localhost:27017/bookAPI', options, (err) => {
        if (err) {
            return console.error(err);
        } else {
            return console.log('Connected to MongoDB');
        }
    })
};

export const disconnect = () => {
    mongoose.disconnect();
}