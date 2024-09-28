const express = require('express');
const Inquiry = require('../models/Inquiry')
const app = express();

app.post('/inquiry', async (req, res) => {
    try {

        const { name, mobileNo, visaType, country } = req.body

        const inquiryData = await Inquiry.create({ name, mobileNo, visaType, country })

        console.log(inquiryData)

        return res.status(200).send({ success: true, message: "Thanks for inquiry" })

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error");

    }
})

app.get('/inquiries', async (req, res) => {

    try {
        const inquiries = await Inquiry.find()
        if (!inquiries) {
            return res.status(404).send("Not found")
        }
        return res.status(200).send(inquiries)

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Internal Server Error" })
    }

})

module.exports = app