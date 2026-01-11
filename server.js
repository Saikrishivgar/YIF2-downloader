const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "saidevi16920@gmail.com",
        pass: "rhfzmadcahqlkupl"

    }
});

app.post("/send-mail", async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        await transporter.sendMail({
            from: `"Asthra Tech Contact" <saidevi16920@gmail.com>`,
replyTo: email,
            to: "saidevi16920@gmail.com",
            subject: subject,
            html: `
                <h3>New Contact Message</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b><br>${message}</p>
            `
        });

        res.json({ message: "Message sent successfully ✅" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to send message ❌" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});