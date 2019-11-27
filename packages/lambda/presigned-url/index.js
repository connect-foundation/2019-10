require("dotenv").config();
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.BUCKET_REGION,
  signatureVersion: "v4"
});

const bucket = process.env.BUCKET_NAME;

exports.handler = async (event, context, callback) => {
  try {
    const { fileName } = event;

    const params = {
      Bucket: bucket,
      Key: fileName,
      Expires: 60 * 30,
      ContentType: "video/*",
      ACL: "public-read"
    };

    const url = await s3.getSignedUrlPromise("putObject", params);

    callback(null, url);
  } catch (err) {
    callback(err);
  }
};
