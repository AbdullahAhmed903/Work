import nodemailer from "nodemailer";
const sendEmail = async (dest, subject, message, attachments = []) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.nodeMailerEmail,
      pass: process.env.nodeMailerPassword,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `E-commerce ${process.env.nodeMailerEmail}`, // sender address
    to: dest, // list of receivers
    subject: subject, // Subject line
    html: message, // html body
    attachments,
  });
  return info;
};

export default sendEmail;
