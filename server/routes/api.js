const express = require('express');

const {
  createData,
  readSingleData,
  readData,
  updateData,
  deleteData,
} = require('../controllers/patient_controller');
const {
  uploadFile,
  deleteFile,
} = require('../controllers/upload_controller');

const router = express.Router();

router
  .post('/', createData)
  .post('/upload', uploadFile)
  .get('/:id', readSingleData)
  .get('/', readData)
  .put('/:id', updateData)
  .delete('/:id', deleteData)
  .delete('/upload/:id', deleteFile);

module.exports = router;
