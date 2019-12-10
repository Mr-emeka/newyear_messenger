import messageSchema from '../models/db';
import jsonResponse from '../helpers/helper';

const postMessage = (req, res) => {
    const { message, senderEmail, receiversEmail } = req.body;
    
    const createMessage = new messageSchema({
        message,
        senderEmail,
        receiversEmail,
        date: new Date().toLocaleString()
    })
    createMessage.save()
    .then(() => {
        jsonResponse.success(res, 'success', 201, 'message created successfully')
    })
    .catch(e => console.log(e))
}

// const getMessages = (req, res) => {
//     messageSchema.find()
//     .then(res => {
//         return jsonResponse.success(res, 'success', 200, res)
//     })
//     .catch(ee => console.log(e))
// }

export default postMessage;