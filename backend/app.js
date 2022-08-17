const express = require("express");
const db = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const User = require("./routes/users");
const Weather = require("./routes/weathers");
require("dotenv/config");
const app = express();

app.use(cors());

app.use(bodyParser());

app.use("/users", User);
app.use("/weathers", Weather);

db.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => {
    console.log("Connected to DB");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

