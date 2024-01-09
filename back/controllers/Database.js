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
  static GetAllProfile() {
    return new Promise((resolve, reject) => {

      let db = new sqlite3.Database(Database.path, (err) => {
        if (err) {
          resolve(err.message);
        } else {

          db.all(`SELECT * FROM test`, (err, rows) => {
            if (err) {
              console.error(err.message);
            } else {
              resolve(rows);
            }
          });
        }
      });
      Database.Close(db);

    });
  }




  static GetProfil(id) {
    return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(Database.path, (err) => {
        if (err) {
          reject(err.message);
        } else {
          let sql = `SELECT * FROM test WHERE id  = ?`;
          db.get(sql, [id], (err, row) => {
            if (err) {
              reject(err.message);
            } else {
              resolve(row);
            }
            Database.Close(db);
          });
        }
      });
    });
  }
  static Update(value, id) {
    return new Promise((resolve, reject) => {

      let db = new sqlite3.Database(Database.path, (err) => {
        if (err) {
          console.error(err.message);
        } 
        const sql = `UPDATE test SET Name = ? WHERE id = ?`;
        db.run(sql, [value, id], function (err) {
          if (err) {
            return console.log(err.message);
          } else {
            resolve("value update successfuly")
          }
        });
      });
      Database.Close(db);

    });
    
  }
}
const test = async (req, res) => {
  try {
    let testf = await Database.GetAllProfile();
    console.log(testf)
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
 
  }
};

test();
