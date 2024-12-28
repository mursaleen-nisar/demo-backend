const mongoose = require('mongoose');
require('dotenv').config();
const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url)
    .then(() => {
        console.log('Connected Successfully');
    })
    .catch((err) => {
        console.error('DB not connected:', err.message);
    });


