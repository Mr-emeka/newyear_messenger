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
    const getEntries = await pool.query(`SELECT date FROM messages`);

    theDate = getEntries.rows
    // console.log(theDate)

    for (let i = 0; i < theDate.length; i++) {
        if (theDate[i].date === comparing) {
            // if(comparing === date.date) {
            // console.log('here oooooooo')
            var j = schedule.scheduleJob(dates, async function () {
                const getEntries = await pool.query(`SELECT * FROM messages WHERE date=$1`, [comparing]);

                let mailOptions = {
                    from: 'damilolaibrahim77@gmail.com',
                    to: `${getEntries.rows[0].receiver_emails[0]}`,
                    subject: "mail",
                    text: "still testing",
                    html: `<p>${getEntries.rows[0].message}</p>
            <div style="margin-top: 3em">
            <p>Regards</p>
            <p>${getEntries.rows[0].name}</p>
            ${getEntries.rows[0].sender_email}</div>`
                }
                // send mail
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log('an error', error);
                    }
                    console.log('message sent', info);
                });
                return console.log('here oooooooo')
            });

        }

    }
});