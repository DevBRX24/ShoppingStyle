const fs = require('fs');
const crypto = require('crypto');

module.exports = class Repository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository require a new filename');
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async create(attributes) {
    attributes.id = this.randomId();

    const records = await this.getAll();
    records.push(attributes);
    await this.writeAll(records);

    return attributes;
  }

  async getAll() {
    // Open the file called this.filename
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  // Generate random ID for new user
  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }

  // Get the specefic ID of user
  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    // Get all records from getAll() function
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attributes) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }

    // record === {email: 'text@test.com'}
    // attribute === {password: 'password'};
    // After retrieve the attributes it will assign to record
    // record === {email: 'text@test.com', password: 'password'}
    Object.assign(record, attributes);
    // Will wait to a resolved promise from writeAll function
    // Email and password is ready to update waiting the update function to call
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    // Get all records from getAll() function
    const records = await this.getAll();

    // Iterating through array
    for (let record of records) {
      let found = true;

      // Iterating through object
      for (let key in filters) {
        if (record[key] !== filters[key]) found = false;
      }
      if (found) {
        return record;
      }
    }
  }
};
