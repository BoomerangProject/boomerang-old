const AWS = require("aws-sdk");
var fs =  require('fs');

const s3 = new AWS.S3();

const bucketName = "boomerang-webplugin";
const fileName = "boomerangWebPluginWidget.js";

// DELETE
const params = {
  Bucket : bucketName,
  Key : fileName
};

s3.deleteObject(params, function(error, data) {

  if (error) {
    throw error;
  }

  console.log("deleted " + fileName);
});


// UPLOAD
fs.readFile('build/boomerangWebPluginWidget.js', function (err, data) {

  if (err) { throw err; }

  const params = {
    ACL: "public-read-write",
    Bucket : bucketName,
    Key : fileName,
    Body : data
  };

  s3.putObject(params, function(error, data) {

    if (error) {
      throw error;
    }

    console.log("uploaded " + fileName);
  });
});