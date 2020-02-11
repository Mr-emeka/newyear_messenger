import mongoose, { Schema } from 'mongoose';

const message = new Schema({
    // senderID : {
    //     type: String,
    //     default: 'jjjjjj'
    // },
    // message: {
    //     type: String,
    //     required: true
    // },
    receiversEmail: {
        type: [],
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const messageSchema = mongoose.model('message', message);

export default messageSchema;