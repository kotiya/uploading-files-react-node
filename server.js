import express from 'express';
import next from 'next';
import multer from 'multer';
import cloudinary from 'cloudinary';
import bodyParser from 'body-parser';
import fileUploadMiddleware from './file-upload-middleware';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    cloudinary.config({
      cloud_name: 'xxxxxx',
      api_key: 'xxxxxxx',
      api_secret: 'xxxxxxx',
    });

    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    server.post('/files', upload.single('file'), fileUploadMiddleware);

    server.post('/api/changeProfilePicture', (req, res) => {
      console.log('/api/changeProfilePicture');
      console.log(req.body);
      // you can do whatever you want with this data
      // change profile pic, save to DB, or send it to another API 
      res.end();
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
