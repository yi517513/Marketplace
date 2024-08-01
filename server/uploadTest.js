const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async () => {
  const fileStream = fs.createReadStream("1.png");
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: "1.png",
    Body: fileStream,
    // ACL: "public-read",
  };

  try {
    const data = await s3.send(new PutObjectCommand(uploadParams));
    console.log("文件上傳成功", data);
  } catch (err) {
    console.error("文件上傳失败", err);
  }
};

uploadFile();
