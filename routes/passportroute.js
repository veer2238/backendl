const express = require('express');
const PassportVerify = require('../models/Passportverify')
const router = express.Router();
const { body, validationResult } = require('express-validator');

// require('dotenv').config()

router.post('/passportverify', [
    body('birthPlace', 'birthPlace is required').notEmpty(),
    body('employeementType', 'employeementType is required').notEmpty(),
    body('proffession', 'proffession is required').notEmpty(),
    body('education', 'education is required').notEmpty(),
    body('policeStation', 'policeStation name is required').notEmpty(),
], async (req, res) => {
    try {

        // const { birthPlace, employeementType, proffession, education, policeStation } = req.body
        const { passportVerifyData } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        let success = false
        const passportData = new PassportVerify(req.body)
        await passportData.save();
        success = true
        return res.status(200).send({ success, message: "Passport data save successfully", passportData })

    } catch (error) {
        console.error("Error when passportverify :", error);
        res.status(500).send("Internal server error");
    }
})

module.exports = router