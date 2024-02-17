const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const PORT = 3000

dotenv.config();
//connect to DB
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})


app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

