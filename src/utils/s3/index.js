const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

s3.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadFile = async (file, folderName) => {
  const fileContent = fs.readFileSync(file.path);
  const fileName = uuidv4() + path.extname(file.name);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folderName}/${fileName}`,
    Body: fileContent,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (err) {
    console.log('Error uploading file:', err);
    throw err;
  }
};

const deleteFile = async (fileUrl) => {
  const key = fileUrl.split(`${process.env.AWS_BUCKET_NAME}/`)[1];
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (err) {
    console.log('Error deleting file:', err);
    throw err;
  }
};

module.exports = {
  uploadFile,
  deleteFile,
};


