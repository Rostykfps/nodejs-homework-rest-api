const contacts = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');
const { addSchema } = require('../schemas/contacts');

const listContacts = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);

  if (!contactById) {
    throw HttpError(404, 'Not found');
  }

  res.json(contactById);
};

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing required name field');
  }
  const newContact = await contacts.addContact(req.body);

  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await contacts.removeContact(contactId);

  if (!removedContact) {
    throw HttpError(404, 'Not found');
  }

  res.json({ message: 'contact deleted' });
};

const updateContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing required name field');
  }

  const body = req.body;
  if (!body) {
    throw HttpError(400, 'missing fields');
  }

  const { contactId } = req.params;
  const updatedContact = await contacts.updateContact(contactId, body);

  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }

  res.json(updatedContact);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
