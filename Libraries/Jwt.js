const jwt = require('jsonwebtoken');
require('dotenv').config();

class JwtService {
  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.refreshSecret = process.env.REFRESH_JWT_SECRET;
    this.expiresIn = process.env.JWT_EXPIRES_IN; // default to 1 hour ( Hossan This variable was not define in .env file)
    this.refreshExpiresIn = process.env.REFRESH_JWT_EXPIRES_IN;
  }

async  generateToken(payload) {
    console.log(payload); // Hossam
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secret, { expiresIn: this.expiresIn }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

async  generateRefreshToken(payload) {
    console.log(payload); // Hossam
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.refreshSecret, { expiresIn: this.refreshExpiresIn }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

 
async  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }


  async  verifyrefToken(reftoken) {
    return new Promise((resolve, reject) => {
      jwt.verify(reftoken, this.refreshSecret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          console.log('======= verifyrefToken resolver and return the JWT decoded' + JSON.stringify(decoded))
          resolve(decoded);
        }
      });
    });
  }
}

module.exports = new JwtService;
