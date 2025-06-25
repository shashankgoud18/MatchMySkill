const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

dotenv.config();

const app = express();
app.use(cors()); // allow frontend to call backend

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes',
    resource_type: 'raw', // IMPORTANT for PDFs
    allowed_formats: ['pdf']
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('resume'), (req, res) => {

  console.log("Received file:", req.file);
console.log("Extracted text:", req.body.extractedText);

  res.json({
    message: 'Upload successful',
    url: req.file.path, // this is the Cloudinary URL
    public_id: req.file.filename
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('MatchMySkill backend is live!');
});