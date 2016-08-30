var mongoose = require('mongoose'),
    Events = mongoose.model('Event')
    Users = mongoose.model('User');
var fs = require('fs');
//geting Error Message
var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errorName in err.errors) {
            if (err.errors[errorName].message) {
                return err.errors[errorName].message;
            }
        }
    } else {
        return 'Unknown Server Error';
    }
}

exports.searchAllEvent = function (req, res, next){
    var Event = Events.find();
    if (req.query.city) {
        Event = Event.find({ "address.city": req.query.city });
    }
    if (req.query.state) {
        Event = Event.find({ "address.state": req.query.state });
    }
    if (req.query.country) {
        Event = Event.find({ "address.country": req.query.country });
    }
    if (req.query.title) {
        //Event = Event.where("title").regex('title', /^req.query.title/i);
        Event = Event.find({ "title": { "$regex": req.query.title, "$options": "i" } });
    }
    if (req.query.minGuest) {
        Event = Event.find({ "guest_constraint.minimum": { $gte : req.query.minGuest }});
    }
    if (req.query.maxGuest) {
        Event = Event.find({ "guest_constraint.maximum": { $lte : req.query.maxGuest }});
    }
    if (req.query.minPrice) {
        Event = Event.find({ "price_data.price": {$gte : req.query.minPrice} });
    }
    if (req.query.maxPrice) {
        Event = Event.find({ "price_data.price": { $lte : req.query.maxPrice } });
    }
    //Event Type
    if (req.query.evtType) {
        if (Object.prototype.toString.call(req.query.evtType) === '[object Array]') {
            req.query.evtType.forEach(function (et) { 
                Event = Event.find({ 'event_type' : et });
            });
        }
        else {
            Event = Event.find({ 'event_type' : req.query.evtType });
        }
    }
    //FoodType
    if (req.query.fdType) {
        if (Object.prototype.toString.call(req.query.fdType) === '[object Array]') {
            req.query.fdType.forEach(function (ft) {
                Event = Event.find({ 'food_type' : ft });
            });
        }
        else {
            Event = Event.find({ 'food_type' : req.query.fdType });
        }
    }
    //Dietry Prefrence
    if (req.query.dietryP) {
        if (Object.prototype.toString.call(req.query.dietryP) === '[object Array]') {
            req.query.dietryP.forEach(function (dp) {
                Event = Event.find({ 'dietaryRestrictions' : dp });
            });
            //Event = Event.find({ 'dietaryRestrictions' : { $in: req.query.dietryP.toString() } });
        }
        else {
            Event = Event.find({ 'dietaryRestrictions' : req.query.dietryP });
        }
    }
    
    //Alcohal Policy
    if (req.query.alplcy) {
        if (Object.prototype.toString.call(req.query.alplcy) === '[object Array]') {
            req.query.alplcy.forEach(function (ap) {
                Event = Event.find({ 'alcohal_policy' : ap });
            });
        }
        else {
            Event = Event.find({ 'alcohal_policy' : req.query.alplcy });
        }
    }
    
    //Hosting Method
    if (req.query.hsmthd) {
        if (Object.prototype.toString.call(req.query.hsmthd) === '[object Array]') {
            req.query.hsmthd.forEach(function (hm) {
                Event = Event.find({ 'hosting_method' : hm });
            });
        }
        else {
            Event = Event.find({ 'hosting_method' : req.query.hsmthd });
        }
    }
    
    //Location type
    if (req.query.lctyp) {
        if (Object.prototype.toString.call(req.query.lctyp) === '[object Array]') {
            req.query.lctyp.forEach(function (hm) {
                Event = Event.find({ 'location_type' : lt });
            });
        }
        else {
            Event = Event.find({ 'location_type' : req.query.lctyp });
        }
    }
    
    //Smoking Location
    if (req.query.smloc) {
        if (Object.prototype.toString.call(req.query.smloc) === '[object Array]') {
            req.query.smloc.forEach(function (sm) {
                Event = Event.find({ 'properties.smoking' : sm });
            });
        }
        else {
            Event = Event.find({ 'properties.smoking' : req.query.smloc });
        }
    }
    
    //Parking Location
    if (req.query.prkloc) {
        if (Object.prototype.toString.call(req.query.prkloc) === '[object Array]') {
            req.query.prkloc.forEach(function (pl) {
                Event = Event.find({ 'properties.parking' : pl });
            });
        }
        else {
            Event = Event.find({ 'properties.parking' : req.query.prkloc });
        }
    }
    
    //Pets Location
    if (req.query.pets) {
        if (Object.prototype.toString.call(req.query.pets) === '[object Array]') {
            req.query.pets.forEach(function (pt) {
                Event = Event.find({ 'properties.pets' : pt });
            });
        }
        else {
            Event = Event.find({ 'properties.pets' : req.query.pets });
        }
    }
    
    //Pets Location
    if (req.query.othloc) {
        if (Object.prototype.toString.call(req.query.othloc) === '[object Array]') {
            req.query.othloc.forEach(function (ol) {
                Event = Event.find({ 'properties.other' : ol });
            });
        }
        else {
            Event = Event.find({ 'properties.other' : req.query.othloc });
        }
    }




    //
    Event
    .populate('user')
    .exec(function (err, events) {
        if (err) {
            return res.status(500).send(getErrorMessage(err))
        }
        return res.json(events);
    });
}

exports.searchAllHost = function (req, res, next) {
    var User = Users.find();
    if (req.query.city) {
        User = User.find({ "profile.common.address.city": req.query.city });
    }
    if (req.query.state) {
        User = User.find({ "profile.common.address.state": req.query.state });
    }
    if (req.query.country) {
        User = User.find({ "profile.common.address.country": req.query.country });
    }
  
    User
    .exec(function (err, users) {
        if (err) {
            return res.status(500).send(getErrorMessage(err))
        }
        return res.json(users);
    });
}
