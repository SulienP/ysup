const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // Add this line to import the 'path' module

class Database {
  static path = path.join(__dirname, "database.db");
  static Close(db) {
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Closed the database connection.");
    });
  }
  static Open() {
    let db = new sqlite3.Database(Database.path, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Connected to the database.");

        db.all(`SELECT * FROM test`, (err, rows) => {
          if (err) {
            console.error(err.message);
          } else {
            rows.forEach((row) => {
              console.log("Row:", row);
            });
            return rows;
          }

        });
      }
    });
    Database.Close(db);
  }
  static Update(value, id) {
    let db = new sqlite3.Database(Database.path, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Connected to the database for an update");
      }

      const sql = `UPDATE test SET Name = ? WHERE id = ?`;

      db.run(sql, [value, id], function (err) {
        if (err) {
          return console.log(err.message);
        }
        Database.Close(db);
      });
    });
  }
}

