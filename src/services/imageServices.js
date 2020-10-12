import AWS from "aws-sdk";

const spacesEndpoint = new AWS.Endpoint("sfo2.digitaloceanspaces.com");
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_SECRET_KEY
});

export default s3;

// import multer from 'multer';
// import multerS3 from 'multer-s3'
