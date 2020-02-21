import schedule from 'node-schedule';
import pool from '../models/database';
import transporter from '../helpers/mailer';
import jsonResponse from '../helpers/response';

let selectedDay = new Date();

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

let secondUse = second + 2;

// console.log(secondUse)

var dates = new Date(year, month, date, hour, minute, secondUse);


let theDate;

let compare = selectedDay.toJSON();
export let comparing = compare.substr(0, 16);
console.log(comparing)
var j = schedule.scheduleJob('* * * * * *', async function () {
    try{
        const getEntries = await pool.query(`SELECT date FROM messages`);

        theDate = getEntries.rows
        // console.log(theDate)
    
    
        for (let i = 0; i < theDate.length; i++) {
            let getData = await pool.query(`SELECT * FROM messages WHERE date=$1`, [comparing]);
    // console.log(getData)
    if(!getData.rows[0]){
        return console.log('no match') 
    }
            else if(getData.rows[0].sent === true) {
                return console.log('message already sent')
            };
    
            if (theDate[i].date === comparing) {
                // if(comparing === date.date) {
                // console.log('here oooooooo')
                var j = schedule.scheduleJob(dates, async function () {
                    
    
                    let mailOptions = {
                        from: 'damilolaibrahim77@gmail.com',
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

                    await pool.query(`UPDATE messages SET sent=$1 WHERE id=$2`, [true, getData.rows[0].id], );
                    
                    console.log('here oooooooo')
                });
    
            }
    
        }
    }
    catch (e) {
        console.log(e);
    }
 
});