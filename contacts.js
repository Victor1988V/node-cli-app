const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("./db/contacts.json");

const getAllContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
  console.table(contacts);
};

async function updateContacts(body) {
  return fs.writeFile(contactsPath, JSON.stringify(body, null, 2));
}

async function listContacts() {
  const contacts = await getAllContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((index) => index.id === contactId);
  if (index === -1) return null;
  return contacts[index];
}

async function removeContact(contactId) {
  const contacts = await getAllContacts();
  console.table(contacts);
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const deleteContact = contacts.splice(index, 1);
  await updateContacts(contacts);
  return deleteContact;
}

async function addContact(name, email, phone) {
  const contacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
