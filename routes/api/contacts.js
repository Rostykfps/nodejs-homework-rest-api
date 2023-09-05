const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const { HttpError } = require('../../helpers');
const { addSchema } = require('../../schemas/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);

    if (!contactById) {
      throw HttpError(404, 'Not found');
    }

    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, 'missing required name field');
    }
    const newContact = await addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await removeContact(contactId);

    if (!removedContact) {
      throw HttpError(404, 'Not found');
    }

    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const body = req.body;
    if (!body) {
      throw HttpError(400, 'missing fields');
    }

    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, body);

    if (!updatedContact) {
      throw HttpError(404, 'Not found');
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
