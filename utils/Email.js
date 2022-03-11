const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      apiKey:
        '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',
    },
  })
);

// file system
const fs = require('fs');

module.exports = class SendMail {
  // Sending HTML mail
  static async sendHTMLMail(email, name) {
    const sentMail = await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: process.env.EMAIL_SUBJECT,
      html: `<h1>Successfull sign up. Welcome ${name} </h1>`,
    });
    console.log(sentMail);
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
    fs.readFile('../assets/attachmentFiles/welcome.jpg', (err, data) => {
      transporter.sendMail({
        to: this.email,
        from: process.env.EMAIL_FROM,
        subject: process.env.EMAIL_SUBJECT,
        attachments: [
          {
            filename: 'hello.jpeg',
            content: data,
            type: 'application/jpeg',
            disposition: 'attachment',
          },
        ],
        html: `<h1>Successfull sign up. Welcome ${this.name} </h1>`,
      });
    });
  }
};
