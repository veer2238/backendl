const mongoose = require('mongoose')

const passportSchema = new mongoose.Schema({
    birthPlace: {
        type: String,
        require: true,
        trim: true,
    },
    employeementType: {
        type: String,
        require: true,
        trim: true,
    },
    proffession: {
        type: String,
        require: true,
        trim: true,
    },
    education: {
        type: String,
        require: true,
        trim: true,
    },
    policeStation: {
        type: String,
        require: true,
        trim: true,
    }

});

const PassportVerify = mongoose.model('passportVerify', passportSchema)
module.exports = PassportVerify