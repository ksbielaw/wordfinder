var request = require("request"),
	cheerio = require("cheerio"),
	// url = "http://seattle.craigslist.org/see/bik/5022226768.html";
	url = "http://kevinsbielawski.com";
	// url = "https://gist.github.com/elliotbonneville/1bf694b8c83f358e0404";

wordList = {};
totalWords = 0;

request(url, function (error, response, body) {
	if (!error) {
		// load a page into cheerio
		// grab the entire body.
		var $page = cheerio.load(body);

		text = $page("body").text();

		// text = text.replace(/<script(.|[\n\r])*?<\/script>/g," ")

	//	$newpage = cheerio.load(text);
	//	text = $newpage("*").text();

		//grab all of the text that is not a script. 
		//NOTE: This needs some modification!!
		// var text = $page("body").not("script").text();

		// //Here - I need to include some work to eliminate comments
		// //Scripts which start with <! and end with !> are present
		// //This will ruin the results
		// //Quick fix is to get ride of words >20 characters.
		text = text.replace(/<!--(.|[\n\r])*?-->/g," ");
		//text = text.replace(/);
		text = text.replace(/\s+/g, " ")
				.replace(/[^a-zA-Z ]/g, " ")
				.toLowerCase();

		text.split(" ").forEach(function(word){
			if (word.length>20) {
				return;
			}
			if (wordList[word]) {
				wordList[word]++;
				totalWords++;
			} else {
				wordList[	word] = 1;
				totalWords++;
			}
		});


		// It would probably be helpful to create a sorted list
		// This will be the next step
		// Kudos to a webpage that helped me get here. 
		// https://gist.github.com/elliotbonneville/1bf694b8c83f358e0404

		// sorted = {};
		// for (entry in wordList){
			
		// };


		console.log(wordList);
	} else {
		console.log("We’ve encountered an error: " + error);
	}
});

function isComment(index,node) {
	return node.type === 'comment';
}