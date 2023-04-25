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

   query(sql) {
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
}

module.exports = MySql;
