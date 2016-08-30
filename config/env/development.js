module.exports = {
    db : 'mongodb://localhost/myproject',
    //db : 'mongodb://52.37.250.112:27017/allakarte',
    port : 3013,
    sessionSecret : 'developmentTourNFoodSecret',
     google: {
        clientID : '861910073724-okmcluii3k6guhmmc8159410p28ertk5.apps.googleusercontent.com',
        clientSecret : 'ct036wtXUN3DXx9tU4fraBgx',
        callbackURL : '/oauth/google/callback'
    },
    facebook: {
        clientID : '1729697463940650',
        clientSecret : 'e21324a91d7ef98c8c2fc51532d7afad',
        callbackURL :'/oauth/facebook/callback'
    },
    TOKEN_SECRET : "awesometournfood",
    RESET_TOKEN_IN_HOURS : '6',
    googleMail : {
        user : 'alacarte4313@gmail.com',
        pass : 'alacarte2015'
    },
    mailconfirmationurl : "http://localhost:5000/user/mail/confirmation/token/",
    mailpassreseturl : "http://localhost:5000/#!/passwordreset/",
    url : "http://localhost:5000/",
    site : "TourNFood",
    useS3 : false,
    awsConfig : {
        region : '',
        accessKeyId : '',
        secretAccessKey : '',
        bucket : '',
        ACL : ''
    }


}