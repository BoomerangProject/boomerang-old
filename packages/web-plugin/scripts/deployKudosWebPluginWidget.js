const AWS = require("aws-sdk");
var fs =  require('fs');

const s3 = new AWS.S3();

fs.readFile('build/kudosWebPluginWidget.js', function (err, data) {

  if (err) { throw err; }

  const params = {
    ACL: "public-read-write",
    Bucket : "kudos-webplugin",
    Key : "kudosWebPluginWidget.js",
    Body : data
  };


  s3.putObject(params, function(error, data) {

    if (error) {
      throw error;
    }

    console.log(data);
  });
});