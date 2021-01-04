const request = require("request");
const url =
  "http://api.weatherstack.com/current?access_key=7374f85685d64115b9dd131ace23ad96&query=";

const forecast = (latitude, longitude, callback) => {
  request(
    { url: url + latitude + "," + longitude, json: true },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else if (body.error) {
        callback("Unable to find location!", undefined);
      } else {
        const temp = body.current.temperature,
          desc = body.current.weather_descriptions[0],
          humidity = body.current.humidity,
          weather_icon = body.current.weather_icons[0];
        callback(
          undefined,
          `It is currently ${temp} degrees outside. The weather is ${desc} and humidity is ${humidity}.`,
          weather_icon
        );
      }
    }
  );
};

module.exports = forecast;
