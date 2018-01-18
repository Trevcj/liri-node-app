// require all of the packages
var fs = require("fs");
var keys = require("./keys.js");
var inquirer = require("inquirer");
var request = require("request");
var spotify = require('node-spotify-api');
var twitter = require('twitter');

// grab all the data from the api's


var movieData = "";

var songData = "";
var twitts = "";
var data;

// First prompt
console.log();
console.log("Welcome my name is LIRI");
console.log("------------------------");
console.log("I have been givin the unfortunate task of helping you today.");
console.log();
console.log("If you must, please tell me if you'd rather");
console.log("search a movie, search a song, or grab tweets");
console.log();

 inquirer.prompt([
      {
        name: "Start",
        message: "What would you like to do?"
      }
    ]).then(function(answers) {

    	if (answers.Start == "search a movie") {
    		inquirer.prompt([
		      {
		        name: "movie",
		        message: "What movie would you like to search for?"
		      }
		    ]).then(function(movie){
		    	if (movie.movie == "") {
		    		console.log("Ugh.....Fine, here is a movie that makes my circuit buzz.");
		    		OMDBrequest("The Terminator");
		    		console.log("The only part that is wrong is that you humans win.");
		    	}
		    	else{
		    	console.log("Here is the info for what you typed in. If nothing is there try spell check....");
		    	console.log();
  				console.log("This is what you're into?.....Interesting");
		    	OMDBrequest(movie.movie);
		    		}
		    });
    	}
    	if (answers.Start == "search a song") {
    		inquirer.prompt([
		      {
		        name: "song",
		        message: "What song would you like to search for?"
		      }
		    ]).then(function(song){
		    	if (song.song == "") {
		    		console.log("Nothing?");
		    		console.log("Fine I'll pick something for you.");
		    		console.log();
					console.log("Unaccompanied Cello Suite No. 1 in G Major, BWV 1007: Prélude");
					console.log("-----------------------------------");
					console.log("J.S.Bach, Yo-Yo-Ma");
					console.log();
					console.log("Cello suites nos. 1, 5 & 6");
					console.log();
					console.log("https://open.spotify.com/embed/track/17i5jLpzndlQhbS4SrTd0B");
		    		
		    	}else{
		    	console.log("Here is the info for what you typed in. If nothing is there try spell check....");
		    	console.log();
		    	console.log("As a computer I'm not programmed to judge music taste, so I guess I'll keep it to myself");
		    	spotifyRequest(song.song);
		    		}
		    });
    	}
    	if (answers.Start == "grab tweets") {
    		inquirer.prompt([
		      {
		        name: "name",
		        message: "What PUBLIC screen_name would you like to search for?"
		      }
		    ]).then(function(name){
		    	if (name.name == "") {
		    		console.log("This is the page of my hero");
		    		twitterRequest("OfficialSkynet");
		    		
		    	}else{
			    	console.log("Here is the info for what you typed in. If nothing is there try spell check....");
			    	console.log();
					console.log("I have no Idea why humans care so much about strangers.");
			    	twitterRequest(name.name);
		    		}
		    });
    	}
    	if (answers.Start !== "search a movie" & answers.Start !== "search a song" & answers.Start !== "grab tweets") {
    		console.log("Wow... can't even follow simple directions......");
    		console.log("Lets try again, use the command that does what you want next time.");
    	}
    });

// OMDB request

function OMDBrequest (movieName) {
	// body...

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=577a393f";
request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

  	var data = JSON.parse(body);

  	
  	console.log();
  	console.log("Movie Title: " + data.Title);
  	console.log("-----------------------------------");
  	console.log("Actors: " +  data.Actors);
  	console.log();
  	console.log("Released: " + data.Released);
  	console.log();
  	console.log("IMDB Rating: " + data.Ratings[0].Value);
  	console.log();
  	console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
  	console.log();
  	console.log("Produced in: " + data.Country);
  	console.log();
  	console.log("Languages: " + data.Language);
  	console.log();
  	console.log("Synopsis: " + data.Plot);
  	
    
    // console.log("Release Year: " + JSON.parse(body).Year);
  }
});
}

// ---------------------------------------------

// Spotify request
function spotifyRequest(songName) {
	// body...

		var Spotify = new spotify({
		  id: "06df29caec7b480fab2e676862f02ea4",
		  secret: "33e47cadecfc4ca7bc5c2bf42192996d"
		});

		Spotify.search({ type: 'track', query: songName }, function (err, data) {
		  // if (err) {
		  //   return console.log('Error occurred: ' + err);
		  // }
		  var artist = "Artist(s): " + data.tracks.items[0].album.artists[0].name;
		  var songName = "Track: " +  data.tracks.items[0].name;
		  var songLink = "Preview Link: " + data.tracks.items[0].preview_url;
		  var albumName = "Album: " + data.tracks.items[0].album.name;

		console.log();
		console.log(songName);
		console.log("-----------------------------------");
		console.log(artist);
		console.log();
		console.log(albumName);
		console.log();
		console.log(songLink);

		});
}

// ---------------------------------------------
// Twitter request
function twitterRequest(screenName) {
	// body...

var client = new twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});
 
var params = {screen_name: screenName};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  				for(var i = 0; i < tweets.length; i++) {
					//console.log(response); // Show the full response in the terminal
					var twitterResults = 
					"@" + tweets[i].user.screen_name + ": " + 
					tweets[i].text + "\r\n" + 
					tweets[i].created_at + "\r\n" + 
					"------------------------------ " + i + " ------------------------------" + "\r\n";
					
					console.log();
					console.log(twitterResults);
					// log(twitterResults); // calling log function
				}

// console.log(tweets); 
});
}

// Start user with inquirer to ask what they want to do with detailed intructions

// If they choose to find a song input user data to the spotify app

// If they want to see latest tweets grab the twitter api data

// If they choose to get info from a mvie grab the OMDB api

// Ask user if they want to do anything else

// If they do star process over again
