const express = require('express');
const app = express();
require('dotenv').config();
require('./models/db.config');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter =  require('./routes/AuthRouter');
const ProductRouter = require('./routes/ProductRouter');
const PORT = process.env.PORT || 8000;

app.get('/ping', (req, res)=> {
    res.send('pong');
})

app.use(bodyParser.json());
app.use(cors());
// auth route
app.use('/auth', AuthRouter)
// create authanticate router using jwt
app.use('/products', ProductRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
