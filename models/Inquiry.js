const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    mobileNo: {
        type: String,
        require: true,
        trim: true,
    },
    visaType: {
        type: String,
        require: true,
        trim: true,
    },
    country: {
        type: String,
        require: true,
        trim: true,
    },

});

const Inquiry = mongoose.model('inquiry', inquirySchema)
module.exports = Inquiry