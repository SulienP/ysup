const sqlite3 = require("sqlite3");
const path = require("path");

class Database {
  static #db;
  static #perm;

  static #SetPermission = (perm) => {
    switch (perm) {
      case "r":
        Database.#perm = sqlite3.OPEN_READONLY;
        break;
      case "w":
        Database.#perm = sqlite3.OPEN_READWRITE;
        break;
      default:
        return false;
    }
    return true;
  };

  static #Open = (dbPath, perm) => {
    if (!Database.#SetPermission(perm)) {
      console.error("Recalé à l'entrer de la boîte :/");
      return false;
    }

    Database.#db = new sqlite3.Database(
      path.join(__dirname, dbPath),
      Database.#perm,
      (err) => {
        if (err === null) return;
        console.error("Oh non ça marche pas :/ !\n", err);
        throw false;
      }
    );

    return true;
  };

  static #Close = () => {
    if (Database.#db == null) return;
    Database.#db.close();
    Database.#db = null;
    Database.#perm = null;
  };

  static Read = (dbPath, query, ...args) => {
    if (!Database.#Open(dbPath, "r")) return;

    return new Promise((resolve, reject) => {
      Database.#db.all(query, args, (err, rows) => {
        if (err != null) {
          return reject(err);
        }
        Database.#Close();
        return resolve(rows);
      });
    });
  };

  static Write = (dbPath, query, ...args) => {
    if (!Database.#Open(dbPath, "w")) return;

    return new Promise((resolve) => {
      Database.#db.run(query, args, (err) => {
        Database.#Close();
        if (err === null) return resolve(null);
        return resolve(err);
      });
    });
  };
}

module.exports = Database;
