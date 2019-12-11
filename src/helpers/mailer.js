import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD
  }
})

const mailFormat = {
  mail(from, to, subject, html) {
    const mailOption = {
      from,
      to,
      subject,
      html
    }
    return mailOption;
  }
}




export default { transporter, mailFormat };