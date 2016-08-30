var Mongoose = require("mongoose");
require('../models/user.server.training');
require('../models/user.server.learning');
require('../models/user.server.youtube');

var Youtube = Mongoose.model('Youtube');
var Training = Mongoose.model('Training');

var TrainingHandler = function() {
	// get training calls
	this.createTraining = createTraining;
	this.getAllTraining = getAllTraining;
	this.getTrainingByTrainingID = getTrainingByTrainingID;
	this.createYouTubeVideo = createYouTubeVideo;
	this.getYouTubeVideosByID = getYouTubeVideosByID;

	console.log("TrainingHandler  Set Up");
};

function createTraining(req,res,next) {
	console.log("Registering Training");
	console.log(req.body);
	var training = new Training();
	training.training_id = req.body.trainingid;
	training.technologytype= req.body.technologytype;
	training.technologyname = req.body.technologyname;
	training.shortdescription = req.body.shortdescription;
	training.longdescription = req.body.longdescription;
	training.logo = req.body.logo;

	training.save(function(err){
		if (err) {
			return next(err);
		}
		res.send({'success': true});
	});
};

function getAllTraining(req,res,next) {

	Training.find({}).exec(function (err, youtubevideos) {
		if (err) {return next(err);}
		else {
			res.send(youtubevideos);
		}
	});
};

function getTrainingByTrainingID(req,res,next) {
	Training.findById(req.params.trainingid).populate('youtube')
		.exec(function(err, training){
			if (err) {next(err);};
			res.json(training);
		});
};

function createYouTubeVideo(req,res,next) {
	console.log("Registering Video");
	var youtube = new Youtube();
	var query = Training.findById(req.params.trainingid);
	query.exec(function(err, training){
		if (err) {return next(err);};
		if (!training) {return next(new Error('can\'t find post'))};

		req.training = training;
		var youtube = new Youtube();
		youtube.course_name = req.body.coursename;
		youtube.link = req.body.link;
		youtube.description = req.body.description;
		youtube.shortdescription = req.body.shortdescription;
		youtube.longdescription = req.body.longdescription;
		youtube.logo = req.body.logo;
		youtube.training = req.training;

		youtube.save(function(err, youtube){
			if (err) {return next(err);};

			req.training.youtube.push(youtube);
			req.training.save(function(err,training){
				if (err) {return next(err);};
				res.json(training);
			});
		});
	});
};


function getYouTubeVideosByID(req,res,next) {
	console.log(req.params.youtubeid);
	Youtube.findById(req.params.youtubeid)
		.exec(function(err, youtube){
			if (err) {next(err);};
			res.json(youtube);
		});
};



module.exports = TrainingHandler;

