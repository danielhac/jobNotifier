const nodemailer = require('nodemailer');
const config = require("./config");

module.exports = (emailContent) => {
    return new Promise((resolve, reject) => {

        var transporter = nodemailer.createTransport({
            host: config.host,
            port: 465,
            secure: true,
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                user: config.user,
                pass: config.password
            }
        });

        var mail = {
            from: config.user,
            to: config.to,
            subject: "New Jobs at PGE!",
            generateTextFromHTML: true,
            html: emailContent
        };

        transporter.sendMail(mail, function(err, info) {
            if (err) {
                const errorMessage = JSON.stringify(err);
                console.error("Error sending email.", errorMessage);
                reject(new Error(errorMessage));
            } else {
                // see https://nodemailer.com/usage
                console.log("info.messageId: " + info.messageId);
                console.log("info.envelope: " + info.envelope);
                console.log("info.accepted: " + info.accepted);
                console.log("info.rejected: " + info.rejected);
                console.log("info.pending: " + info.pending);
                console.log("info.response: " + info.response);
            }
            transporter.close();

            const now = new Date();
            const message = `Time is ${now}`;

            resolve(message);
        });
    });
};