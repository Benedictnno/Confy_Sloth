// const nodemailer = require("nodemailer");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const sendEmail = async ({ to, subject, html }) => {
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAIL_GUN_API_KEY,
  });
  mg.messages
    .create("sandbox2cf6c0a1568d4e52acaef87faa0d03c0.mailgun.org", {
      from: "Excited User <benedctnnaoma0@gmail.com>",
      to,
      subject,
      // text,
      html,
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err));

  //   res.json(req.body);
};
module.exports = sendEmail;
