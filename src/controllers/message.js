// import messageSchema from '../models/db';
import pool from '../models/database';
import jsonResponse from '../helpers/response';

export const postMessage = async (req, res) => {
    try {
        const { name, message, senderEmail, receiversEmail, date } = req.body;
        const userId = req.cookies.userId;

        const save = await pool.query(`INSERT INTO messages (user_id, name, sender_email, receiver_emails, message, date) 
        VALUES ($1, $2, $3, ARRAY [$4], $5, $6) RETURNING *`, [userId, name, senderEmail, receiversEmail.split(' '),  message, date]);

        jsonResponse.success(res, 'success', 201, {
            data: save.rows[0]
        });

    }
    catch (e) {
        console.log(e);
    }
};

export const getMessages = async (req, res) => {
    try {
        const userId = req.cookies.userId;
        const myMessages = await pool.query(`SELECT * FROM messages WHERE user_id=$1`, [userId]);

        return jsonResponse.success(res, 'success', 200, {
            data: myMessages.rows
        });

    }
    catch (e) {
        console.log(e);
    }
};