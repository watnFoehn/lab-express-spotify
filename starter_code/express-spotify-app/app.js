const express = require('express');
const app = express();
const hbs = require('hbs');

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

var SpotifyWebApi = require('spotify-web-api-node');

// Remember to paste your credentials here
var clientId = 'd9098462305b43eea1ea3b0f89693a1a',
    clientSecret = 'e80ec2c330d54f0e8d4dab06d3b7a2b3';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});


app.listen(3000, () => {
    console.log('My first app listening on port 3000!')
  });

app.get('/', (req, res) => {
    // send views/index.hbs for displaying in the browser
    res.render('index');
  });


app.get('/artist', (req, res, next) => {
    console.log(req.query.name) // { name: 'test' }
    spotifyApi.searchArtists(req.query.name)
    .then(data => {
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      console.log(data.body.artists.items[0].images[0].url)
      let entries = data.body.artists.items;
      res.render('artist', {entries});
    })
    .catch(err => {
      // ----> 'HERE WE CAPTURE THE ERROR'
      console.log(err)
    })
    
    
});