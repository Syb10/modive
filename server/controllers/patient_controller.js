'use strict';

const Patient = require('../models/patient_schema');

const createData = (req, res) => {
    Patient.create(req.body)
      .then((data) => {
        console.log('Neuer Patient erstellt!', data);
        res.status(201).json(data);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          console.error('Error Validating!', err);
          res.status(422).json(err);
        } else {
          console.error(err);
          res.status(500).json(err);
        }
      });
};

const readSingleData = (req, res) => {
  Patient.findById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readData = (req, res) => {
    Patient.find()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
};
  
  const updateData = (req, res) => {
    Patient.findByIdAndUpdate(req.params.id, req.body, {
      useFindAndModify: false,
      new: true,
    })
      .then((data) => {
        console.log('Patient aktualisiert!');
        res.status(201).json(data);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          console.error('Error Validating!', err);
          res.status(422).json(err);
        } else {
          console.error(err);
          res.status(500).json(err);
        }
      });
  };
  
  const deleteData = (req, res) => {
    Patient.findById(req.params.id)
      .then((data) => {
        if (!data) {
          throw new Error('Patient nicht verfügbar');
        }
        return data.remove();
      })
      .then((data) => {
        console.log('Patient entfernt!');
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  };
  
  module.exports = {
    createData,
    readSingleData,
    readData,
    updateData,
    deleteData,
  };
  