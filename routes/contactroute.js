const express = require('express');
const Contact = require('../models/Contact')
const router = express.Router();
require('dotenv').config()
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body

        const exist = await Contact.findOne({ email, message })
        if (exist) {
            return res.send({ success: false, error: 'You Have Already Contacted Us with same query ' })
        }

        const result = await Contact.create({
            name, email, message
        })

        // nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Veer Consultancy',
            html: `<h2>welcome to veer Consultancy</h2><p>Hello ${name},</p> <p>Thank you for contacting with our consultancy. We are excited to have you on board!</p> <p>Best regards,</p>
      <p>Veer Consultancy</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.json({ success: true, message: 'Thanks For Contacting' })
        console.log(result)

    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).send("Internal server error occurred");
    }
})
router.get('/contacts', async (req, res) => {

    try {
        const contacts = await Contact.find()
        if (!contacts) {
            return res.status(404).send("Not found")
        }
        return res.status(200).send(contacts)

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Internal Server Error" })
    }

})

module.exports = router