const Youtube = require('youtube-stream-url');

// Youtube.getInfo({url: 'https://www.youtube.com/watch?v=pJ7WN3yome4'}).then(video => console.log(video));


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
let clinetId = "lxi5lduk5041n6mrxaz2caecq1ahgz";
let clinetSecret = "a7md2bf1g9lskf6refbbn3toprg4u5";


// defining the Express app
const app = express();
// defining an array to work as the database (temporary solution)
const ads = [
  {title: "videourl"}
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});
function getTwitchAuthorization() {
  let url = `https://id.twitch.tv/oauth2/token?client_id=${clinetId}&client_secret=${clinetSecret}&grant_type=client_credentials`;

  return fetch(url, {
  method: "POST",
  })
  .then((res) => res.json())
  .then((data) => {
      return data;
  });
}

app.get('/url', cors(),function(req, res){
    console.log(req.query.Url)
    if (req.query.Url===undefined){
        (async () => {
            res.send({Url: 'No Url traced',
                      response: '404',
                      Status: 'Fail'});
        })();
    }
    else{
        (async () => {
            const videourl = await Youtube.getInfo({url: req.query.Url}).then(video => video.formats[0]['url']);
            res.send({Url: videourl,
                      response: '200',
                      Status: 'Success'});
        })();
    }
});
// Add headers before the routes are defined

// starting the server
app.listen(80, () => {
  console.log('listening on port 80');
});