import { Req, Res, Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const AWS_S3_BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

@Injectable()
export class ImageUploadService {
  public async fileupload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, error => {
        if (error) {
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        return res.status(201).json(req.files[0].location);
      });
    } catch (error) {
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  private upload = multer({
    storage: multerS3({
      s3,
      bucket: AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: (request, file, cb) => {
        cb(null, `${Date.now().toString()} - ${file.originalname}`);
      },
    }),
  }).array('upload', 1);
}
