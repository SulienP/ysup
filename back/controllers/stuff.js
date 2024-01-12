const Database = require("./Database_bis");
const DBPATH = "./hackathon-v2.db";
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwt_key = "loe4J7Id0Ry2SEDg09lKk";
const { v4: uuidv4 } = require("uuid");
const { SendMail } = require("../service/mailSender");

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

exports.GetGroupsFromUser = async (req, res) => {
  const emp = req.body;
  jwt.verify(emp.jwt, jwt_key, async (err, decoded) => {
    if (err) {
      res.json({ idUser: err.message });
    } else {
      const groups = await Database.Read(
        DBPATH,
        "SELECT groups.name FROM groups JOIN relation_groups_users ON relation_groups_users.groupID = groups.idGroup JOIN users ON users.idUser = relation_groups_users.userID WHERE users.email = ?;",
        decoded.email
      );
      if (groups.length === 0) {
        res.json({ status: false });
      } else {
        res.json(groups);
      }
    }
  });
};

// Get  tag
exports.GetAllTags = async (req, res) => {
  const allTags = await Database.Read(DBPATH, "SELECT * FROM tags");
  res.json(allTags);
};

exports.GetTicketByIdGroup = async (req, res) => {
  const emp = req.body;
  const ticketForGroup = await Database.Read(
    DBPATH,
    "SELECT groups.idGroup,groups.name,groups.permission,relation_groups_users.idRelationGroupUser,relation_groups_users.groupID,relation_groups_users.userID,tickets.idUser AS 'ticket id User',tickets.content,tickets.dates,tickets.file,tickets.idTagTicket,tickets.idTicket,tickets.status,tickets.title FROM groups INNER JOIN relation_groups_users ON groups.idGroup = relation_groups_users.groupID INNER JOIN users AS group_users ON relation_groups_users.userID = group_users.idUser INNER JOIN tickets ON group_users.idUser = tickets.idUser WHERE groups.idGroup = ?;",
    emp.idGroup
  );
  res.json(ticketForGroup);
};

// Get  All tickets with tag
exports.GetAllTicketWithTag = async (req, res) => {
  const emp = req.body;
  jwt.verify(emp.jwt, jwt_key, async (err, decoded) => {
    if (err) {
      res.json({ idUser: err.message });
    } else {
      const group = await Database.Read(
        DBPATH,
        "SELECT DISTINCT groups.name , groups.idGroup FROM groups INNER JOIN relation_tags_groups ON groups.idGroup = relation_tags_groups.idGroup INNER JOIN tags ON relation_tags_groups.idTag = tags.idTag INNER JOIN tickets ON tags.idTag = tickets.idTagTicket INNER JOIN users ON tickets.idUser = users.idUser WHERE users.email = ?",
        decoded.email
      );
      if (group.length === 0) {
        res.json({ status: false });
      } else {
        const TicketByTag = await Database.Read(
          DBPATH,
          "SELECT tickets.idTicket,  users.firstname,users.lastname,tickets.title,  tickets.file, tickets.status , tickets.dates,users.image,  tags.name AS 'tagName',groups.name AS 'groupName' , groups.idGroup FROM tickets INNER JOIN users ON tickets.idUser = users.idUser  INNER JOIN tags ON tickets.idTagTicket = tags.idTag INNER JOIN  relation_groups_users ON users.idUser = relation_groups_users.userID INNER JOIN groups ON relation_groups_users.groupID = groups.idGroup WHERE tickets.idTagTicket = ? AND groups.idGroup = ? ORDER BY tickets.dates AND groups.idGroup DESC ;",
          emp.tag,
          group[0].idGroup
        );
        if (group.length === 0) {
          res.json({ status: false });
        } else {
          res.json(TicketByTag);
        }
      }
    }
  });
};

// Get  All tickets with tag
exports.GetAllTicketFromUser = async (req, res) => {
  const emp = req.body;
  jwt.verify(emp.jwt, jwt_key, async (err, decoded) => {
    if (err) {
      res.json({ idUser: err.message });
    } else {
      const tickets = await Database.Read(
        DBPATH,
        "SELECT DISTINCT tickets.idTicket,  users.firstname,users.lastname,tickets.title,  tickets.file, tickets.status , tickets.dates,users.image,  tags.name AS 'tagName',groups.name AS 'groupName' , groups.idGroup FROM tickets INNER JOIN users ON tickets.idUser = users.idUser  INNER JOIN tags ON tickets.idTagTicket = tags.idTag INNER JOIN  relation_groups_users ON users.idUser = relation_groups_users.userID INNER JOIN groups ON relation_groups_users.groupID = groups.idGroup WHERE users.email = ? GROUP BY tickets.idTicket ORDER BY tickets.dates DESC ;",
        decoded.email
      );
      if (tickets.length === 0) {
        res.json({ status: false });
      } else {
        res.json(tickets);
      }
    }
  });
};

exports.UpdateTag = async (res, req) => {
  const emp = req.body;
  const updatetag = await Database.Write(
    DBPATH,
    "UPDATE tickets SET idTagTicket = ? WHERE tickets.idTicket = ?",
    emp.idTag,
    emp.idTicket
  );
  if (updatetag == null) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
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
    " SELECT tickets.title ,tickets.content, tags.name, tickets.file, tickets.dates, tickets.status,users.firstname,users.lastname FROM tickets JOIN users ON users.idUser = tickets.idUser JOIN tags ON tags.idTag = tickets.idTagTicket WHERE tickets.idTicket = ? ; ",
    emp.idTicket
  );
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
      }
    }
  });
};

exports.InsertMail = async (req, res) => {
  const emp = req.body;
  const newUUID = uuidv4();
  jwt.verify(emp.jwt, jwt_key, async (err, decoded) => {
    if (err) {
      res.json({ idUser: err.message });
    } else {
      let user = await Database.Read(
        DBPATH,
        "SELECT users.idUser FROM users WHERE users.email = ?",
        decoded.email
      );
      const responseInsertResult = await Database.Write(
        DBPATH,
        "INSERT INTO responses (idResponse ,idUser, content, mailingDate) VALUES (?,?, ?, ?);",
        newUUID,
        user[0].idUser,
        emp.content,
        emp.mailingDate
      );
      await Database.Write(
        DBPATH,
        "INSERT INTO relation_reponses_tickets (idTicket, idResponse) VALUES (?, ?);",
        emp.idTicket,
        newUUID
      ).then(() => {
        Database.Read(
          DBPATH,
          "SELECT users.email FROM users JOIN tickets ON tickets.idUser = users.idUser WHERE tickets.idTicket = ?;",
          emp.idTicket
        ).then((response) => {
          // ajouter mail perso pour démo
          SendMail(emp.content, emp.idTicket, response.email, decoded.email);
        });
        res.json({ status: true });
      });
    }
  });
};

exports.GetTicketByTag = async (req, res) => {
  const emp = req.body;
  const ticketForGroup = await Database.Read( DBPATH,
  "SELECT * from tickets WHERE tickets.idUser = ?  AND tickets.idTagTicket = ? ORDER BY tickets.dates AND tickets.status DESC ;",
  emp.idUser,emp.idTag);
  res.json(ticketForGroup);
};