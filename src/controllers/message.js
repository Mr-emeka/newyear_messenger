// import messageSchema from '../models/db';
import pool from '../models/database';
import jsonResponse from '../helpers/response';

const postMessage = async (req, res) => {
    try {
        const { name, message, senderEmail, receiversEmail, date } = req.body;
        const userId = req.cookies.userId;
        

        console.log(receiversEmail)

        const save = await pool.query(`INSERT INTO messages (user_id, name, sender_email, receiver_emails, message, date) 
        VALUES ($1, $2, $3, ARRAY [$4], $5, $6) RETURNING *`, [userId, name, senderEmail, receiversEmail.split(' '),  message, date]);

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