const db = require("../config/database");

class Book {
  constructor(username, password, author_pseudonym) {
    this.username = username;
    this.password = password;
    this.author_pseudonym = author_pseudonym;
  }

  async save(params) {
    let sql = `INSERT INTO users(username, password, author_pseudonym)
    VALUES ('${this.username}', SHA1('${this.password}'), ${this.author_pseudonym})`;

    return db.execute(sql, params);
  }

  static getUser(username, password) {
    let sql = `SELECT * FROM users WHERE username = '${username}' AND password = SHA1('${password}')`;
    return db.execute(sql);
  }
}

module.exports = Book;
