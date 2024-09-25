const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const DB = process.env.MONGODB_URL

mongoose
  .connect(DB)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error", err));

// importing contact routes
app.use('/', require('./routes/contactroute'))
app.use('/', require('./routes/passportroute'))

app.post('/otpverify', (req, res) => {
  const { mobileNumber } = req.body


  console.log(mobileNumber)

  res.json({ success: true, message: 'otp sent' })
})


app.listen(3034, () => {
  console.log('Server connected');
});
