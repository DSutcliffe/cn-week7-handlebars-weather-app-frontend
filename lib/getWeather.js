const request = require('request');
const {promisify} = require('util');

require('dotenv').config() // https://www.npmjs.com/package.dotenv

const promisifiedRequest = promisify(request);

const getWeather = async (cityName, countryCode) => {

    let data = await promisifiedRequest({
        uri: `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${process.env.APPID}`,
        json: true // Automatically stringifies the body to JSON
    })

    return data.body;

}

// export the function to be run in index.js
module.exports = getWeather;