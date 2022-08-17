const db = require("mongoose");

const weather = db.Schema({
    email: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    weather:{
        iconUrl: {
            type: String,
            required: true,
        },
        temp: {
            type: Number,
            required: true,
        },
        high_temp: {
            type: Number,
            required: true, 
        },
        windSpeed: {
            type: Number,
            required: true
        },
        humidity: {
            type: Number,
            required: true
        }
    },
});

module.exports = db.model("Weather", weather, "Weathers");