const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config(); // Use dotenv for environment variables

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Middleware to parse JSON bodies and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// // Serve static files from the React app in production
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(path.resolve(), './client/build')));
//     app.get('*', function (req, res) {
//         res.sendFile(path.join(path.resolve(), "./client/build/index.html"), function (err) {
//             res.status(500).send(err);
//         })
//     });
// }

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Create a transport for sending emails
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'rukmaiwaddattatri@gmail.com', // Your email address from environment variables
        pass: 'thrilok1906', // Your password from environment variables
    },
});

// Endpoint to send an email
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    // Set email options
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: to, // List of recipients
        subject: subject, // Subject line
        text: text, // Plain text body
        html: `<p>${text}</p>`, // HTML body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email sending failed:', error);
            return res.status(500).send('Email sending failed');
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).send('Email sent successfully');
        }
    });
});
