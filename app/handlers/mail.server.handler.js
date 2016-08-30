var nodemailer = require('nodemailer'),
    config = require('../../config/config');

var Transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.googleMail.user,
        pass: config.googleMail.pass
    }
});

function RegistrationEmailTemplateWithConfirmation(confirmationtoken) {
    return '<div><h1 style="font-size:16px;color:#92b944"> Hello!</h1>' 
            + '<p>Welcome and thanks for joining our global community of food lovers! Just click on the link below to confirm your email address and activate your account: </p>' 
            + '<a href="' + config.mailconfirmationurl + confirmationtoken+ '" target="_blank">' + config.url + '</a>' 
            + '<p> We are passionate about connecting people through food and look forward to having you as a host, a guest, or both.' 
            + 'you can always <a href="mailto:' + config.googleMail.user + '">contact us</a> ' 
            + 'with questions, comments or feedback. We love hearing from you and will get back to you as soon as we can.</p>' 
            + '<br> TourNFood Team <br>' 
            + '<a href="' + config.url + '" target="_blank">' + config.url + '</a>' 
            + '</div>';
       
}
function RegistrationEmailTemplateWithoutConfirmation() {
    return '<div><h1 style="font-size:16px;color:#92b944"> Hello!</h1>' 
            + '<p>Welcome and thanks for joining our global community of food lovers!</p>' 
            + '<p> We are passionate about connecting people through food and look forward to having you as a host, a guest, or both.' 
            + 'you can always <a href="mailto:' + config.googleMail.user + '">contact us</a> ' 
            + 'with questions, comments or feedback. We love hearing from you and will get back to you as soon as we can.</p>' 
            + '<br> TourNFood Team <br>' 
            + '<a href="'+config.url+'" target="_blank">'+config.url+'</a>'
            + '</div>';
}


//--------Register Mail-------
var RegisterMailOptions = {
    from : config.site +' Registration Confirmation<allakarte@gmail.com>',
    subject : 'Registration Confirmation'
}
exports.sendRegisterMail = function (to, confirmationtoken) {
    RegisterMailOptions["to"] = to;
    if (confirmationtoken != null)
        RegisterMailOptions["html"] = RegistrationEmailTemplateWithConfirmation(confirmationtoken);
    else
        RegisterMailOptions["html"] = RegistrationEmailTemplateWithoutConfirmation();
    Transporter.sendMail(RegisterMailOptions, function (err, info) {
        if (err) {
            console.log(err);
        }
        console.log("Successfully sent mail + " + info);
    });
}

//--------Password Reset Mail-------
function PasswordResetEmailTemplate(confirmationtoken, email) {
    
    return '<div><h1 style="font-size:16px;color:#92b944"> Hello!</h1>' 
            + '<p>Please Follow the below link to RESET you password! </p>' 
            + '<a href="' + config.mailpassreseturl + confirmationtoken + '/' + email + '" target="_blank">' + config.url + '</a>' 
            + '<p>' 
            + 'you can always <a href="mailto:' + config.googleMail.user + '">contact us</a> ' 
            + 'with questions, comments or feedback. We love hearing from you and will get back to you as soon as we can.</p>' 
            + '<br> TourNFood Team <br>' 
            + '<a href="' + config.url + '" target="_blank">' + config.url + '</a>' 
            + '</div>';

}


var PasswordResetMailOptions = {
    from : config.site +' Password Reset<allakarte@gmail.com>',
    subject : 'Password Reset'
}


exports.sendPasswordResetMail = function (to, confirmationtoken) {
    PasswordResetMailOptions["to"] = to;
    PasswordResetMailOptions["html"] = PasswordResetEmailTemplate(confirmationtoken,to);
   
    Transporter.sendMail(PasswordResetMailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return 'error'
        }
        return 'success'
    });
}


//---------------Confirmation mail to guest-------------------------
function BookingConfirmationEventGuestEmailTemplate(event,numguest,date) {
    
    return '<div><h1 style="font-size:16px;color:#92b944"> Hello!</h1>' 
            + '<p>Your reservation is confirmed for ' + event.title + '. Thanks for using ' + config.site + '.</p>' 
            + '<p>' + numguest + ' spot booked for hosts event on ' + date + '</p>' 
            + '<p><b>Address :</b><br />' + event.address.street + ', ' + event.address.city + ', ' + event.address.state + ' -' + event.address.postCode + '</p>' 
            + '<p><b>Host Information :</b><br /> Name : '+ event.user.firstname + event.user.lastname +'<br /> Email : '+ event.user.email +'<br />Phone No : '+ event.user.personal_mobile+'</p>' 
            + '<p>Enjoy your food Experience at Host!</p>' 
            + '</div>';

}
function BookingConfirmationAllakarteGuestEmailTemplate(host, numguest, date) {
    return '<div><h1 style="font-size:16px;color:#92b944"> Hello! Guest</h1>' 
            + '<p>Your reservation is confirmed for Dish at ' + host.firstname + '. Thanks for using ' + config.site + '.</p>' 
            + '<p>' + numguest + ' spot booked for hosts Allakarte on ' + date + '</p>' 
            + '<p><b>Address :</b><br />' + host.profile.common.address.street + ', ' + host.profile.common.address.city + ', ' + host.profile.common.address.state + ' -' + host.profile.common.address.postCode + '</p>' 
            + '<p><b>Host Information :</b><br /> Name : ' + host.firstname + host.lastname + '<br /> Email : ' + host.email + '<br />Phone No : ' + host.personal_mobile + '</p>' 
            + '<p>Enjoy your food Experience at Host!</p>' 
            + '</div>';

}
var GuestBookingConfirmationMailOptions = {
    from : config.site + ' Booking Confirmation<allakarte@gmail.com>',
    subject : 'Booking Confirmation'
}

exports.sendGuestConfirmationBookingMail = function (to, order) {
    GuestBookingConfirmationMailOptions["to"] = to;
    if(order.event){
        GuestBookingConfirmationMailOptions["html"] = BookingConfirmationEventGuestEmailTemplate(order.event, order.numGuests,order.eventDate);
    }
    else {
        GuestBookingConfirmationMailOptions["html"] = BookingConfirmationAllakarteGuestEmailTemplate(order.host, order.numGuests, order.eventDate);
    
    }
    Transporter.sendMail(GuestBookingConfirmationMailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return res.send.status(400).send("Error Occured while sending Email");
        }
        console.log("Successfully sent mail + " + info);
    });
}

//---------------Confirmation mail to Host-------------------------

function BookingConfirmationHostEventEmailTemplate(order) {
    
    return '<div><h1 style="font-size:16px;color:#92b944"> Hello Host!</h1>' 
           
            + '</div>';

}
function BookingConfirmationHostAllakarteEmailTemplate(order) {
    
    return '<div><h1 style="font-size:16px;color:#92b944"> Hello Host!</h1>' 
           
            + '</div>';

}

var HostBookingConfirmationMailOptions = {
    from : config.site + ' Booking Confirmation<allakarte@gmail.com>',
    subject : 'Booking Confirmation'
}

exports.sendHostConfirmationBookingMail = function (to, order) {
    HostBookingConfirmationMailOptions["to"] = to;
    if(order.event){
        HostBookingConfirmationMailOptions["html"] = BookingConfirmationHostEventEmailTemplate(order);
    }
    else {
        HostBookingConfirmationMailOptions["html"] = BookingConfirmationHostAllakarteEmailTemplate(order);
    }
    Transporter.sendMail(HostBookingConfirmationMailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return res.send.status(400).send("Error Occured while sending Email");
        }
        console.log("Successfully sent mail + " + info);
    });
}