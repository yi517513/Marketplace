const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { fromEnv } = require("@aws-sdk/credential-provider-env");

// 設置 AWS SDK
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
});

// 處理文件名
const sanitizeFileName = (filename) => {
  // 移除特殊字符和空格
  return filename.replace(/[^a-zA-Z0-9.-]/g, "_");
};

// 配置 multer-s3
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE, // 自動設置正確的 Content-Type
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB
});

// 刪除 s3 物件的中間件
// const deleteFromS3 = async (req, res, next) => {
//   const { key } = req.params;

//   if (!key) {
//     return res.status(400).send("缺少刪除文件的key");
//   }

//   const deleteParams = {
//     Bucket: process.env.S3_BUCKET_NAME,
//     Key: key,
//   };

//   try {
//     await s3.send(new DeleteObjectCommand(deleteParams));
//     next();
//   } catch (error) {
//     return res.status(500).send("發生錯誤");
//   }
// };

module.exports = { s3, upload, DeleteObjectCommand };
