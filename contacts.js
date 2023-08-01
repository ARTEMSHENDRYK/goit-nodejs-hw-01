const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function read() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data));
}

async function listContacts() {
  const contacts = await read();
  return contacts;
}

async function getContactById(id) {
  const contacts = await read();
  return contacts.find((contact) => contact.id === id) || null;
}

async function removeContact(id) {
  const contacts = await read();

  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];

  await write(newContacts);

  return contacts[index];
}

async function addContact(contact) {
  const contacts = await read();

  const newContact = { id: crypto.randomUUID(), ...contact };

  contacts.push(newContact);

  await write(contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};