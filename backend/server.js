import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load variables from your .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Lets your frontend portfolio communicate with this server

// 1. Configure the Gmail transport engine
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/api/contact", (req, res) => {
  // Destructure the new phone and subject properties
  const { from_name, from_email, phone_number, subject, message } = req.body;

  const mailOptions = {
    from: `"Portfolio Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: from_email,
    // Dynamically uses the sender's subject or a default fallback
    subject: `💼 Portfolio: ${subject || 'New Message'} from ${from_name}`,
    text: `You received a message from your portfolio website:\n\n` +
          `Sender Name: ${from_name}\n` +
          `Sender Email: ${from_email}\n` +
          `Phone Number: ${phone_number || 'Not provided'}\n\n` +
          `Message:\n${message}`
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Nodemailer Error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
    return res.status(200).json({ success: true, message: "Message sent!" });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
