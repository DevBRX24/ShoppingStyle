const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

// Version of Scrypt function that return a promise
// For hashing and salting the password
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
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

  async getAll() {
    // Open the file called this.filename
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
  }

  async create(attributes) {
    //randomId() function will generate an ID
    // and it will pass in to attributes
    // Variable records will await for a resolved promise from getAll() function
    // The generated ID will  push in to user.json file
    attributes.id = this.randomId();

    // Hashing and Salting password
    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(attributes.password, salt, 64);

    const records = await this.getAll();
    const record = {
      // Spread Operator
      ...attributes,
      // Override the password
      password: `${buf.toString('hex')}.${salt}`,
    };

    records.push(record);
    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved, supplied) {
    // Save -> password saved in database. 'hashed.salt';
    // Supplied ->password given to by user trying to sign in

    // Destructure Hashed ans Salt password
    const [hashed, salt] = saved.split('.');
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

    return hashed === hashedSuppliedBuf.toString('hex');
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
}

module.exports = new UsersRepository('users.json');
