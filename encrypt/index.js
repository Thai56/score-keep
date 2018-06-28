const crypto = require('crypto');

function decrypt(text) {
  const decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq');
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = { decrypt };
