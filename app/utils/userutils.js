const crypto = require('crypto');

function hash(password, salt) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512');
  
  return hash.toString('hex');
}

function createSalt() {
  return crypto.randomBytes(16).toString('hex');
}

function createToken() {
  return crypto.randomBytes(256).toString('hex');
}

module.exports = { hash, createSalt, createToken };