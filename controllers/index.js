const { ObjectId } = require('mongodb');
const mongodb = require('../db');

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};

const getOne = async (request, response) => {
  const userId = new ObjectId(request.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(lists[0]);
  });
};

const addContact = async (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db().collection('contacts').insertOne(newUser);

  if (result.acknowledged) {
    res.status(201).json({
      message: 'Post was successful',
      // eslint-disable-next-line no-undef
      body: result
    });
  } else {
    res.status(400).json({
      message: 'Result Failed',
      body: result
    });
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, newUser);
  console.log(result);
  if (result.modifiedCount > 0) {
    res.status(201).json({
      message: 'Post was successful',
      // eslint-disable-next-line no-undef
      body: result
    });
  } else {
    res.status(500).json({
      message: 'Result Failed',
      body: result
    });
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(201).json({
      message: 'Post was successful',
      // eslint-disable-next-line no-undef
      body: result
    });
  } else {
    res.status(500).json({
      message: 'Result Failed',
      body: result
    });
  }
};

module.exports = { getAll, getOne, addContact, updateContact, deleteContact };
