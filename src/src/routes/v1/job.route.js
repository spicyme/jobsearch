const express = require('express');
const path = require('path');
const multer = require('multer'); // Middleware for handling file uploads
const validate = require('../../middlewares/validate');
const jobValidation = require('../../validations/job.validation');
const jobController = require('../../controllers/job.controller');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder where uploaded files will be stored
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: (req, file, cb) => {
    // Customize the filename to include the original extension
    const ext = file.originalname.split('.').pop(); // Get the file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}.${ext}`);
  },
});
const upload = multer({ storage }); // Upload directory

const router = express.Router();

router
  .route('/')
  .post(validate(jobValidation.createJob), jobController.createJob)
  .get(validate(jobValidation.getJobs), jobController.getJobs);

router.route('/test').get(validate(jobValidation.getJobs), jobController.insertCSVData);

router
  .route('/:jobId')
  .get(validate(jobValidation.getJob), jobController.getJob)
  .put(validate(jobValidation.updateJob), jobController.updateJob)
  .delete(validate(jobValidation.deleteJob), jobController.deleteJob);

router.route('/upload').post(upload.single('file'), jobController.uploadCSV);

module.exports = router;
