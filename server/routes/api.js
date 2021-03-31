const express = require('express');

const {
  createData,
  readSingleData,
  readData,
  updateData,
  deleteData,
} = require('../controllers/patient_controller');

const router = express.Router();

router
  .post('/', createData)
  .get('/:id', readSingleData)
  .get('/', readData)
  .put('/:id', updateData)
  .delete('/:id', deleteData);

module.exports = router;
