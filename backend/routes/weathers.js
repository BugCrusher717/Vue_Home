const { json } = require("body-parser");
const express = require("express");
const Weather = require("../models/Weather");
const router = express.Router();

//Get all active tasks
router.get("/getInfo", async (req, res) => {

    try {
        let weathers = await Weather.find({ email: req.query.email });
        return res.json(weathers);

    } catch (err) {
        return res.json({ message: "Failed to retrieve weather Information", error: err });
    }
});

router.post("/addInfo", async (req, res) => {
    let save_weather = new Weather({
        email: req.body.email,
        date: req.body.date,
        time: req.body.time,
        weather: req.body.weather
    });
    // console.log(save_weather)
    try {
        let newWeatherInfo = await save_weather.save();
        return res.json({message: "WeatherInfo Saved!"});
    } catch (err) {
        return res.json({ message: "Failed to create weather Information", error: err });
    }
})

module.exports = router;