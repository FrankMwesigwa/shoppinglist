import mongoose from 'mongoose';

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Item', Schema)