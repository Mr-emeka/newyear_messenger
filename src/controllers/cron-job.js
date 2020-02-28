import cron from 'node-cron';
import pool from '../models/database';
import transporter from '../helpers/mailer';
import jsonResponse from '../helpers/response';

// get date
let selectedDay = new Date();

/*
** format date 
*/
let year,
    month,
    date,
    hour,
    minute,
    second

year = selectedDay.getFullYear();
month = selectedDay.getMonth();
date = selectedDay.getDate();
hour = selectedDay.getHours();
minute = selectedDay.getMinutes();
second = selectedDay.getSeconds();

// convert date toJson 2020-02-27T01-24PM
let compare = selectedDay.toJSON();

/*
** get the first 16 characters
** export comparing to middleware
*/
export let comparing = compare.substr(0, 16);


cron.schedule('*/1 * * * *', async ()=>{
  try{
    console.log('meee')
    let getData = await pool.query(`SELECT * FROM messages WHERE date=$1 AND sent=$2`, [comparing,false]);
    
    // if current date matchs a record in the db 
     if (getData.rowCount) {
      let mailOptions = {
        from: 'Seamless-mailer',
        to: `${getData.rows[0].receiver_emails[0]}`,
        subject: `${getData.rows[0].subject}`,
        html: `<p>${getData.rows[0].message}</p>
        <div style="margin-top: 3em">
        <p>Regards</p>
        <p>${getData.rows[0].name}</p>
        ${getData.rows[0].sender_email}</div>`
    }
    // send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('an error', error);
        }
        console.log('message sent', info);
    });
  
    // update sent value of a message from false to true
    await pool.query(`UPDATE messages SET sent=$1 WHERE id=$2`, [true, getData.rows[0].id]);
     }
     else {
      // if current date doesn't match a record in the db 
      return console.log('no match');
  }
  }
  catch(err){
    console.log(err);
  }

})