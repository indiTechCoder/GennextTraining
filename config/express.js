var config = require('./config.js'),
express = require('express'),
morgan = require('morgan'),
compress = require('compression'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
session = require('express-session'),
passport = require('passport')
multer = require('multer'),
mime = require('mime')
crypto = require('crypto')
;

module.exports = function (){
	var app = express();

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended : true
	}));

	app.use(bodyParser.json());

	app.use(methodOverride());

	app.use(session({
		saveUninitialized : true,
		resave : true,
		secret : config.sessionSecret
	}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(passport.initialize());
	app.use(passport.session());


	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './public/uploads/')
		},
		filename: function (req, file, cb) {
			crypto.pseudoRandomBytes(16, function (err, raw) {
				cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
			});
		}
	});
	var upload = multer({ storage: storage });

	if(!config.useS3)
		app.use(upload.single('file'));

	require('../app/routes/user.server.routes')(app);
	require('../app/routes/index.server.routes')(app);
	require('../app/routes/training.server.routes')(app);

	app.use(express.static('./public'));
	return app;

}