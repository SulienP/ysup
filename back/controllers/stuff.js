const Database = require("./Database_bis");
const DBPATH = "./hackathon-v2.db";
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwt_key = "loe4J7Id0Ry2SEDg09lKk";
const { v4: uuidv4 } = require("uuid");

const hashPassword = (algorithm, base, passwd) => {
  return crypto.createHash(algorithm).update(passwd).digest(base);
};

const concatPerm = (tabPerm) => {
  let res = ["-", "-"];
  Object.keys(tabPerm).forEach((element) => {
    const currentPerm = tabPerm[element];
    Object.keys(currentPerm).forEach((perm) => {
      const uniquePerm = currentPerm[perm];
      for (let index = 0; index < uniquePerm.length; index++) {
        const singlePerm = uniquePerm[index];
        if (singlePerm != "-" && res[index] == "-") {
          res[index] = singlePerm;
        }
      }
    });
  });
  return res.join("");
};

const encodeJwt = (userDatas) => {
  const payload = {
    sub: new Date(),
    email: userDatas[0].email,
    password: userDatas[0].password,
    iat: Math.floor(Date.now() / 1000),
  };
  const token = jwt.sign(payload, jwt_key, { expiresIn: "1h" });
  return token;
};

exports.isJwtValid = async (req, res) => {
  const emp = req.body;
  jwt.verify(emp.jwt, jwt_key, async (err, decoded) => {
    if (err) {
      res.json({ permission: "denied" });
    } else {
      let permission = await Database.Read(
        DBPATH,
        "WITH UserAndGroups AS (SELECT idUser FROM users WHERE email = ? AND password = ?) SELECT groups.permission FROM groups JOIN relation_groups_users ON groups.idGroup = relation_groups_users.groupID JOIN UserAndGroups ON relation_groups_users.userID = UserAndGroups.idUser;",
        decoded.email,
        decoded.password
      );
      if (permission.length == 0) {
        res.json({ exist: false });
        return;
      }
      const concatPerms = concatPerm(permission);
      res.json({ permission: concatPerms });
    }
  });
};

exports.isUserValid = async (req, res) => {
  const emp = req.body;
  let user = await Database.Read(
    DBPATH,
    "SELECT users.email, users.password FROM users WHERE users.email = ? AND users.password = ?",
    emp.email,
    hashPassword("sha256", "base64", emp.password)
  );
  if (user.length == 0) {
    res.json({ exist: false });
    return;
  }
  const encodedJwt = encodeJwt(user);
  res.json({ jwt: encodedJwt });
};

exports.hello = async (req, res) => {
  res.json({ status: "hello" });
};

// Get profil
exports.GetAllProfile = async (req, res) => {
  const allUsers = await Database.Read(DBPATH, "SELECT * FROM user");
  res.json(allUsers);
};

exports.GetProfilByMail = async (req, res) => {
  const mail = req.body;
  const UserByMAil = await Database.Read(
    DBPATH,
    "SELECT * FROM user WHERE mail  = ?",
    mail.mail
  );
  res.json(UserByMAil);
};

exports.GetProfilById = async (req, res) => {
  const id = req.body;
  const UserById = await Database.Read(
    DBPATH,
    "SELECT * FROM user WHERE idUser  = ?",
    id.idUser
  );
  res.json(UserById);
};

// Get value
exports.UpdateValues = async (req, res) => {
  const emp = req.body;
  const Update = await Database.Write(
    DBPATH,
    "UPDATE ? SET ? = ? WHERE id = ?",
    emp.tableName,
    emp.columnName,
    emp.value,
    emp.id
  );
  res.json(Update);
};

// Update status
exports.UpdateStatus = async (req, res) => {
  const emp = req.body;
  const updateValue = await Database.Write(
    DBPATH,
    "UPDATE tickets SET status = ? WHERE idTicket = ?",
    emp.status,
    emp.idTicket
  );
  res.json(updateValue);
};

// Get  tag
exports.GetAllTags = async (req, res) => {
  const allTags = await Database.Read(DBPATH, "SELECT * FROM tags");
  res.json(allTags);
};
exports.GetAllTicketWithTag = async (req, res) => {
  const emp = req.body;
  const TicketByTag = await Database.Read(
    DBPATH,
    " SELECT tickets.idTicket, tickets.title, tickets.content, tickets.status, tickets.dates, groups.name AS 'group Name',groups.idGroup AS 'group ID',tags.idTag AS 'tag id',tags.name AS 'tag Name' FROM groups INNER JOIN relation_tags_groups ON groups.idGroup = relation_tags_groups.idGroupINNER JOIN  tags ON relation_tags_groups.idTag = tags.idTag INNER JOIN relation_users_tags ON tags.idTag = relation_users_tags.idTag INNER JOIN tickets ON relation_users_tags.idTicket = tickets.idTicket WHERE groups.idGroup = ?;",
    emp.tag
  );
  res.json(TicketByTag);
};
exports.GetIdTag = async (req, res) => {
  const emp = req.body;
  const IdTag = await Database.Read(
    DBPATH,
    " SELECT tags.idTag from tags WHERE name = ?",
    emp.name
  );
  res.json(IdTag);
};

// Get ticket

exports.GetOneTicketById = async (req, res) => {
  const emp = req.body;
  const ticketWithId = await Database.Read(
    DBPATH,
    " SELECT tickets.content, tickets.file, tickets.dates, tickets.status, tickets.idUser FROM tickets WHERE tickets.idTickets = ? ",
    emp.idTicket
  );
  this.UserById(ticketWithId.idUser);
  res.json(ticketWithId);
};

// Create ticket
exports.CreateTicket = async (req, res) => {
  const emp = req.body;
  const newUUID = uuidv4();
  jwt.verify(emp.jwt, jwt_key, async (err, decoded) => {
    if (err) {
      res.json({ idUser: "not found" });
    } else {
      let user = await Database.Read(
        DBPATH,
        "SELECT users.idUser FROM users WHERE users.email = ?",
        decoded.email
      );
      if (user.length == 0) {
        console.error("length");
        res.json({ idUser: "not found" });
        return;
      } else {
        const insertTicket = await Database.Write(
          DBPATH,
          "INSERT INTO tickets(idTicket,title,content,idTagTicket,file,status,dates, idUser) VALUES (?,?,?,?,?,?,?,?)",
          newUUID,
          emp.title,
          emp.content,
          emp.idTag,
          emp.file,
          1,
          emp.date,
          user[0].idUser
        );
        console.log(insertTicket);
      }
    }
  });
};
