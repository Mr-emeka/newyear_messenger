// import messageSchema from '../models/db';
import pool from '../models/database';
import jsonResponse from '../helpers/helper';

const postMessage = async (req, res) => {
    try {
        const { receiversEmail, senderEmail, message } = req.body;
        const userId = req.cookies.userId;
        

        console.log(receiversEmail)

        const save = await pool.query(`INSERT INTO messages (user_id, message, sender_email, receiver_emails, date) 
        VALUES ($1, $2, $3, ARRAY [$4], $5) RETURNING *`, [userId, message.concat(`\n\n\n ${senderEmail}`), senderEmail, receiversEmail.split(' '), new Date().toLocaleString()]);

        jsonResponse.success(res, 'success', 201, {
            message: 'done',
            data: save.rows[0]
        });

    }
    catch (e) {
        console.log(e);
    }
}

// const getMessages = (req, res) => {
//     messageSchema.find()
//     .then(res => {
//         return jsonResponse.success(res, 'success', 200, res)
//     })
//     .catch(ee => console.log(e))
// }

export default postMessage;