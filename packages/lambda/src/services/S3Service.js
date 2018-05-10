'use strict';
import AWS from "aws-sdk";

const s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-east-1'});

let storeToS3 = async (bucketName, ipfsHash, ipfsObject) => {

  return new Promise(function(resolve, reject) {

    s3.listBuckets(function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });

    const params = {
      ACL: 'private',
      Bucket: bucketName,
      Key: ipfsHash,
      Body: JSON.stringify(ipfsObject)
    };

    s3.putObject(params, function(error, data) {

      if (error) {
        console.log(error);
        return reject(error);
      }

      return resolve(data);
    });
  });
};

export default storeToS3;