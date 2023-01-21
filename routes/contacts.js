const express = require('express');
const router = express.Router();

const contacts = require('../controllers/index');

// GET /feed/posts
router.get('/', contacts.getAll);

// router.get('/:id', contacts.getOne);

router.post('/', contacts.addContact);

router.put('/:id', contacts.updateContact);

router.delete('/:id', contacts.deleteContact);

module.exports = router;
