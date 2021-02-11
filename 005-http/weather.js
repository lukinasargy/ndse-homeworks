#!/usr/bin/env node
const http = require("http");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const myAPIKey = process.env.WEATHER_API_KEY;

const getWeather = (city) => {
    const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${city}`;

    http.get(url, (res) => {
        const statusCode = res.statusCode;
        if (statusCode !== 200) {
            console.error(`Status Code: ${statusCode}`);
            return;
        }
        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", (chunk) => (rawData += chunk));
        res.on("end", () => {
            let parsedData = JSON.parse(rawData);
            if (!!parsedData?.current) {
                console.log(parsedData.current);
            } else {
                console.log("Город не найден");
            }
        });
    }).on("error", (e) => {
        console.error(`Got error: ${e.message}`);
    });
};

const showWeather = () => {
    console.log(
        "Введите название города (пример: New York, Saint-Petersburg )"
    );
    rl.on("line", (data) => {
        cityName = data.toString();
        if (!!cityName) {
            getWeather(cityName);
            rl.close();
        } else {
            console.log("Введите названия города");
        }
    });
};
showWeather();
