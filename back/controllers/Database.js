const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // Add this line to import the 'path' module

// Database class with connection method
class Database {
  static path = path.join(__dirname, "database.db");

  // Close the database connection
  static Close(db) {
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Closed the database connection.");
    });
  }
  
  // Get all profile from database
  static GetAllProfile() {
    return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(Database.path, (err) => {
        if (err) {
          resolve(err.message);
        } else {
          db.all(`SELECT * FROM user`, (err, rows) => {
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
  /*
  !TODO: Vérifier les requêtes 
  */
  // Get profile by id
  static GetProfilId(id) {
    return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(Database.path, (err) => {
        if (err) {
          reject(err.message);
        } else {
          let sql = `SELECT * FROM user WHERE id  = ?`;
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

  /*
  !TODO: Vérifié et adapter la requête.
  */
  // Update values into specific database
  static Update(id, value, tableName, columnName) {
    return new Promise((resolve, reject) => {
      let db = new sqlite3.Database(Database.path, (err) => {
        if (err) {
          console.error(err.message);
        }
        const sql = `UPDATE ? SET ? = ? WHERE id = ?`;
        db.run(sql, [tableName, columnName, value, id], function (err) {
          if (err) {
            return console.log(err.message);
          } else {
            resolve("value update successfuly");
          }
        });
      });
      Database.Close(db);
    });
  }

  /*
  !TOD: Gestion des tags
  */
  // Creation of ticket.
  static CreateTicket(title, content, file, status, date) {
    return new Promise((resolve, zurückweisen) => {
      let db = new sqlite3.Database(Database.path, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          const sql =
            " INSERT INTO ticket(title,content,file,status,date) VALUES (?,?,?,?,?,?,?)";
          db.run(
            sql,
            [title,content,file,status,date],
            (err, result) => {
              if (err) {
                console.error(err);
              } else {
                resolve("Ticket create succefull");
              }
            }
          );
        }
      });
    });
  }
  /*
  !TODO: Vérifié les requêtes sql
  */
  static RecuperationTicket(tag) {
    return new Promise((resolve, reject) => {
      if (err) {
        console.error(err);
      } else {
        const sql = "SELECT * FROM ticket  INNER JOIN relation_user_tag ON ticket.id = relation_user_tag.id_ticket INNER JOIN relations_user_tag ON tag.id = relations_user_tag.idTag"
        db.run(sql, [tag], (err, result) => {
          if (err) {
            console.error(err);
          } else {
            resolve(result);
          }
        })
      }
    });
  }
}
    
    // const test = async (req, res) => {
    //   try {
    //     let testf = await Database.GetAllProfile();
    //     console.log(testf)
    //   } catch (error) {
    //     console.error("Une erreur s'est produite :", error);
    
    //   }
    // };
    
    // test()
