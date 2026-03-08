const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'text/csv',
      '',
    ];

    const fileExtension = `.${file.originalname.split('.').pop().toLowerCase()}`;
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt'];

    if (allowedMimes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
      cb(null, true);
      return;
    }

    cb(new Error(`Invalid file type. Allowed types: PDF, DOCX, DOC, TXT. Received: ${file.mimetype}`), false);
  },
});

module.exports = upload;
