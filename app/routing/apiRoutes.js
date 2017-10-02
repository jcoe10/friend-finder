//require the js array
var celebData = require('../data/celebrity.js');

//export the function
module.exports = function (app) {
//get and post the url path
	app.get('/api/celebrity', function(req, res){
		res.json(celebData);
	})
	app.post('/api/celebrity', function(req, res){
		var newComp = req.body;


        //make for loops to compare user to the items in the array
        
		for(var i = 0; i < newComp.scores.length; i++) {
			if(newComp.scores[i] == "1 (Strongly Disagree)") {
				newComp.scores[i] = 1;
			} else if(newComp.scores[i] == "5 (Strongly Agree)") {
				newComp.scores[i] = 5;
			} else {
				newComp.scores[i] = parseInt(newComp.scores[i]);
			}
		}

		var diffArray = [];

		for(var i = 0; i < celebData.length; i++) {

			var compCelebrity = celebData[i];
			var totalDiff = 0;
			
			for(var k = 0; k < compCelebrity.scores.length; k++) {
				var diffScore = Math.abs(compCelebrity.scores[k] - newComp.scores[k]);
				totalDiff += diffScore;
			}

			diffArray[i] = totalDiff;
		}

		var celebNum = diffArray[0];
		var bestMatchIndex = 0;

		for(let i = 1; i < diffArray.length; i++) {
			if(diffArray[i] < celebNum) {
				celebNum = diffArray[i];
				bestMatchIndex = i;
			}
		}

		celebData.push(newComp);

		res.json(celebData[bestMatchIndex]);
	})
}