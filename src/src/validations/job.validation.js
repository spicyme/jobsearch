const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createJob = {
  body: Joi.object().keys({
    user: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getJobs = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getJob = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId),
  }),
};

const updateJob = {
  params: Joi.object().keys({
    jobId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteJob = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
};
