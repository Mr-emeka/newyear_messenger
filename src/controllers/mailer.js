const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'arnaldo22@ethereal.email',
        pass: '5UYsjpYR8ak7mD5RP8'
    }
});