require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

exports.SendMail = async (content, title, receiver,sender) => {
  try {
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.USER_EMAIL_SENDER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL_SENDER,
      to: "ISeeNock.Draw@gmail.com",
      cc : sender,
      subject: "Réponse au ticket : " + title,
      text: content,
    };
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error; // You might want to handle the error appropriately based on your application's needs
  }
};
