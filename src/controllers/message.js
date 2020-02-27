// import messageSchema from '../models/db';
import pool from '../models/database';
import jsonResponse from '../helpers/response';

export const postMessage = async (req, res) => {
    try {
        // body values
        const { name, message, senderEmail, receiversEmail, subject, date } = req.body;
        const userId = req.cookies.userId;

        // save message to the database
        const save = await pool.query(`INSERT INTO messages (user_id, name, sender_email, receiver_emails, subject, message, date) 
        VALUES ($1, $2, $3, ARRAY [$4], $5, $6, $7) RETURNING *`, [userId, name, senderEmail, receiversEmail.split(' '), subject, message, date]);

        // return formatted response
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
        // selecet message for a user by id(cookie)
        const myMessages = await pool.query(`SELECT * FROM messages WHERE user_id=$1`, [userId]);

        // return formatted response
        return jsonResponse.success(res, 'success', 200, {
            data: myMessages.rows
        });

    }
    catch (e) {
        console.log(e);
    }
};