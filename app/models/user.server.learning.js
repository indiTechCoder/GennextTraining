var Mongoose = require("mongoose")
, Schema = Mongoose.Schema
, path = require('path')
, PassportLocalMongoose = require("passport-local-mongoose")
, Crypto = require("crypto")
, JWT = require("jwt-simple")
, UUID = require("node-uuid");

var DiscussionSchema =  new Schema(
{
	user_id : {type: String, default: function getUUID(){
		return UUID.v1();
	}}
	, topicName: {type: String, required: false}
	, description: {type: String, required: false}
	, videos: {type: Date, required: false}
	, technology: {type: String, required: false}
	, longDescription: {type: String, required: false}
	, shortDescription: {type: String, required: false}
	, discussion_id: {type: String, required: false}
	, logo: {type: String, required: false}
	, videos: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Video' }]
	, author: { type: Mongoose.Schema.Types.ObjectId, ref: 'Author' }
	, date_created: {type: Date, default: Date.now}
	, last_updated : {type: Date, default: Date.now()}
}
);
Mongoose.model('Discussion', DiscussionSchema);

var VideoSchema = new Schema({
	name: {type: String},
	description: {type: String},
	link: {type: String},
	playlist: {type: String},
	technology: {type: String},
	logo: {type: String},
	date_created: {type: Date, default: Date.now},
	discussion: { type: Mongoose.Schema.Types.ObjectId, ref: 'Discussion' }
});

Mongoose.model('Video', VideoSchema);

var AuthorSchema = new Schema({
	name: {type: String},
	profile: {type: String},
	twitter: {type: String},
	facebook : {type: String},
	linkedin : {type: String},
	technology: {type: String},
	date_created: {type: Date, default: Date.now},
	discussion: { type: Mongoose.Schema.Types.ObjectId, ref: 'Discussion' }
});

Mongoose.model('Author', AuthorSchema);


