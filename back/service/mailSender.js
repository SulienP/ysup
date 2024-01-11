require("dotenv").config();
require("../controllers/stuff")
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { Database } = require("sqlite3");
const OAuth2 = google.auth.OAuth2;


const user = Database.GetProfilById(userID);
const ticket = Database.GetOneTicketById(idTicket);

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();
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
const content = "un texte vraiment utile pour spam les mails";

transporter.sendMail({
  from: process.env.USER_EMAIL_SENDER,
  to: user.userMail,
  subject: ticket.Title + "Response to",
  text: content,
});
