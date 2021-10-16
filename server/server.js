require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

require('./config/mongoose.config');

app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

require("./routes/user.routes")(app);
require("./routes/project.routes")(app);

app.listen(process.env.PORT, () => {
    console.log("Listening at port", process.env.PORT);
});