const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { jobService } = require('../services');

const createJob = catchAsync(async (req, res) => {
  const job = await jobService.createJob(req.body);
  res.status(httpStatus.CREATED).send(job);
});

const getJobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'description']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await jobService.queryJobs(filter, options);
  res.send(result);
});

const getJob = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  res.send(job);
});

const updateJob = catchAsync(async (req, res) => {
  const job = await jobService.updateJobById(req.params.jobId, req.body);
  res.send(job);
});

const deleteJob = catchAsync(async (req, res) => {
  await jobService.deleteJobById(req.params.jobId);
  res.status(httpStatus.NO_CONTENT).send();
});

const insertCSVData = catchAsync((req, res) => {
  fs.createReadStream(path.join(__dirname, '../uploads/test.csv'))
    .pipe(csv())
    .on('data', async (row) => {
      // Insert each row of data into MongoDB
      await jobService.createJob(row);
    })
    .on('end', () => {
      console.log('CSV data inserted into MongoDB.');
      res.status(httpStatus.CREATED).send();
    });
});

const uploadCSV = catchAsync((req, res) => {
  // 'file' should match the field name in your HTML form for file upload
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  fs.createReadStream(path.join(__dirname, `../uploads/${req.file.filename}`))
    .pipe(csv())
    .on('data', async (row) => {
      // Insert each row of data into MongoDB
      row['user'] = '6516c7b8848bbd00ecec1af9';
      await jobService.createJob(row);
    })
    .on('end', () => {
      console.log('CSV data inserted into MongoDB.');
      res.status(httpStatus.CREATED).send();
    });

  // Access the uploaded file's information
  const fileName = req.file.filename;

  res.status(httpStatus.CREATED).json({ message: 'File uploaded successfully', filename: fileName });
});

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  insertCSVData,
  uploadCSV,
};
