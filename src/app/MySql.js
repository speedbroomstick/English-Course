const mysql = require("mysql2");

class MySql {
  constructor() {
    this.connection = mysql.createConnection({
      host: "mysql",
      user: "leonid",
      password: "Mastaskas4321",
      database: "english",
    });

    this.connection.connect();
  }

   get(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, results, fields) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  async insert() {
    // Ваш код для вставки данных в базу данных
  }

  async delete() {
    // Ваш код для удаления данных из базы данных
  }
}

module.exports = MySql;
