import mongoose from 'mongoose';

let messageSchema = new mongoose.Schema({
  sendersName: {
    type: String,
    required: true,
    unique: false
  },
  receiverName: {
    type: String,
    required: true,
    unique: false
  },
  receiverEmail: {
    type: String,
    required: true,
    unique: true
  },
  message: {
    type: String,
    required: true,
    unique: false

  }
})


export default mongoose.model('Message', messageSchema)


