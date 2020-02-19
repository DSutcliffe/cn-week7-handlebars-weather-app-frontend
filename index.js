const hbs = require(`express-handlebars`);
const path = require(`path`);
const express = require(`express`);

const app = express();

// Import the getWeather function
const getWeather = require('./lib/getWeather');

// use tells express to use this folder
// static tells express that the path is static
// path is used to join these 2 paths
// this html stuff is in the 'public' folder
app.use(express.static(path.join(__dirname, `public`)));

// set view engine to handlebars
// extname sets extension to .hbs
app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

// tell express to use this engine
app.set('view engine', '.hbs');

// app.get('/', (req, res) => {
//     // render index.hbs page
//     res.render('index');
// });

// Make function asynchronous
app.get('/', async(req, res) => {
    // Wait for getWeather function to run and store in the 'data'
    let data = await getWeather();

    // data is already made up of data.body - return data.body in getWeather
    console.log(data)
    console.log(data.name)

    let temp = (data.main.temp - 273).toFixed(2);
    let city = data.name;

    // render index.hbs page
    // show temp (temp must be stated in index.hbs <p>{{...}}</p>)
    res.render('index', {temp, city});
});

app.listen(3000, () => {
    console.log('server listening on port 3000');

    // __dirname will be the full path
    console.log(`DirName: ${__dirname}`)
});