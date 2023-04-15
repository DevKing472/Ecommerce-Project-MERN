import { Request } from 'express';
import { FileFilterCallback, default as multer } from 'multer';

const storage = multer.diskStorage({
  destination: 'statics/images/products/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/webp' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

export const upload = multer({ storage, fileFilter });
