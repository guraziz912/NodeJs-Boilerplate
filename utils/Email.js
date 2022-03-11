const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      apiKey: "Add you api key here",
    },
  })
);

// file system
const fs = require("fs");

module.exports = class SendMail {
  // Sending HTML mail
  static async sendHTMLMail(email, name) {
    const sentMail = await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: process.env.EMAIL_SUBJECT,
      html: `<h1>Successfull sign up. Welcome ${name} </h1>`,
    });
    return sentMail;
  }

  // sending text mail
  async sendTextMail() {
    return transporter.sendMail({
      to: this.email,
      from: process.env.EMAIL_FROM,
      subject: process.env.EMAIL_SUBJECT,
      text: `Successfull sign up. Welcome ${this.name}`,
    });
  }

  // Sending email with attachment
  async sendMailWithAttachment() {
    fs.readFile("../assets/attachmentFiles/welcome.jpg", (err, data) => {
      transporter.sendMail({
        to: this.email,
        from: process.env.EMAIL_FROM,
        subject: process.env.EMAIL_SUBJECT,
        attachments: [
          {
            filename: "hello.jpeg",
            content: data,
            type: "application/jpeg",
            disposition: "attachment",
          },
        ],
        html: `<h1>Successfull sign up. Welcome ${this.name} </h1>`,
      });
    });
  }
};
