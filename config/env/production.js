module.exports = {
    //db : 'mongodb://alla1:alla1@0.0.0.0:27017/myproject',
    db : 'mongodb://ubmas:ubmas@0.0.0.0:27017/ubmas',
    port : 3013,
    url : "http://ec2-52-36-27-59.us-west-2.compute.amazonaws.com:5000/" ,
    site : "TourNFood",
    sessionSecret : 'developmentTourNFoodSecret',

    google: {
        clientID : '807391542807-maims1d2hdv773bqql0q12j82ssuv44b.apps.googleusercontent.com',
        clientSecret : 'oMYa_hLKmSCFeytym3OciVdL',
        callbackURL : '/oauth/google/callback'
    },
    facebook: {
        clientID : '1729697463940650',
        clientSecret : 'e21324a91d7ef98c8c2fc51532d7afad',
        callbackURL : '/oauth/facebook/callback'
    },
    TOKEN_SECRET : "awesometournfood",
    RESET_TOKEN_IN_HOURS : '6',
    googleMail : {
        user : 'alacarte4313@gmail.com',
        pass : 'alacarte2015'
    },
    mailconfirmationurl : "http://ec2-52-36-27-59.us-west-2.compute.amazonaws.com:5000/mail/confirmation/token/",
    mailpassreseturl : "http://ec2-52-36-27-59.us-west-2.compute.amazonaws.com:5000/#!/passwordreset/",
    useS3 : false,
    awsConfig : {
        region : 'us-west-2',
        accessKeyId : 'AKIAJ7YCJG2RFA7724AQ',
        secretAccessKey : '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',
        bucket : 'elasticbeanstalk-us-west-2-451112350788',
        ACL : 'public-read'
    }
}