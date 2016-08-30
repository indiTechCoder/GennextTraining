
var Training = require('../../app/controllers/training.server.controller');
var Learning = require('../../app/controllers/learning.server.controller');

module.exports = function (app) {
	//creating DishItem
     var learning = new Learning();
     var training = new Training();
     
	app.post('/api/createTraining', training.createTraining);
	app.get('/api/getAllTraining',training.getAllTraining);
	app.get('/api/getTrainingByTrainingID/:trainingid', training.getTrainingByTrainingID);
	app.post('/api/createYouTubeVideo/:trainingid', training.createYouTubeVideo);
	app.get('/api/getYouTubeVideosByID/:youtubeid', training.getYouTubeVideosByID);

	// create learning discussions
	app.get('/api/getAllDiscussions', learning.getAllDiscussion);
	app.get('/api/getDiscussion/:Discussion', learning.getDiscussion);
	app.post('/api/createDiscussion', learning.createDiscussion);
	app.post('/api/createvideoDiscussion/:Discussion', learning.createvideoDiscussion);
	app.post('/api/createAuthorofDiscussion/:Discussion', learning.createAuthorofDiscussion);


}


