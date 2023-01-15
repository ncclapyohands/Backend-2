const { ObjectId } = require('mongodb');
const mongodb = require('../db');

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};

const getOne = async (request, response, next) => {
    const userId = new ObjectId(request.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({_id: userId });
    result.toArray().then((lists) => {
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(lists[0]);
    });
}

module.exports = { getAll, getOne };