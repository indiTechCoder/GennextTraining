var fs = require('fs');
var AWS = require('aws-sdk');
var config = require('../../config/config');
AWS.config.region = 'us-west-2';
var credentials = new AWS.SharedIniFileCredentials({
    profile: 'default'
});
AWS.config.credentials = credentials;
AWS.config.update({ accessKeyId: config.awsConfig.accessKeyId, secretAccessKey: config.awsConfig.secretAccessKey });

function doDelete(req, res, next) {
    
    if (!config.useS3) {
        //delete from Server Folder
        fs.unlink("./public/uploads/" + req.body.filename, function (err) { 
            return next();
        });
    }
    else{
    var s3obj = new AWS.S3();
    var params = {
        Bucket: config.awsConfig.bucket, 
        Delete: {
            Objects: [ 
                {
                    Key: req.body.filename
                }
            ],
        },
    };
    s3obj.deleteObjects(params, function (err, data) {
        if (err)
            console.log(err, err.stack); // an error occurred
        else
            console.log(data);           // successful response
        next();
    });

}
}
exports.doDelete = doDelete;
