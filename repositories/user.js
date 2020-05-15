const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

// Version of Scrypt function that return a promise
// For hashing and salting the password
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
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
}

module.exports = new UsersRepository('users.json');
