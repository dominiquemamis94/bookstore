const db = require("../config/database");

class Book {
  constructor(title, description, author, cover_image, price) {
    this.title = title;
    this.description = description;
    this.author = author;
    this.cover_image = cover_image;
    this.price = price;
  }

  async save(params) {
    let sql = `INSERT INTO books(title, description, author, cover_image, price)
    VALUES ('${this.title}', '${this.description}', ${this.author}, '${this.cover_image}', ${this.price})`;

    return db.execute(sql);
  }

  static findAll(params) {
    let whereClause = "";
    if (Object.keys(params).length !== 0) {
      Object.keys(params).forEach((key) => {
        switch (key) {
          case "title":
          case "description":
            whereClause = whereClause + ` AND ${key} LIKE '%${params[key]}%'`;
            break;
          case "price":
            whereClause = whereClause + ` AND ${key} = ${params[key]}`;
            break;
          case "author":
            whereClause =
              whereClause + ` AND author_pseudonym LIKE '%${params[key]}%'`;
            break;
        }
      });
      whereClause = whereClause.replace("AND", "WHERE");
    }
    let sql =
      `SELECT books.id AS id, title, description, users.id AS author_id, users.author_pseudonym AS author, cover_image, price FROM books INNER JOIN users ON books.author = users.id` +
      whereClause;
    return db.execute(sql);
  }

  static getBookById(id) {
    let sql = `SELECT books.id AS id, title, description, users.id AS author_id, users.author_pseudonym AS author, cover_image, price FROM books INNER JOIN users ON books.author = users.id WHERE books.id = ${id}`;
    return db.execute(sql);
  }

  static updateBookById(id, params) {
    let sql = `UPDATE books SET title = '${params.title}', description = '${params.description}', cover_image = '${params.cover_image}', price = ${params.price} WHERE id = '${id}'`;
    return db.execute(sql);
  }

  static deleteBookById(id) {
    let sql = `DELETE FROM books WHERE id = '${id}'`;
    return db.execute(sql);
  }
}

module.exports = Book;
