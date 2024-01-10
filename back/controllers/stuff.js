const Database = require("./Database_bis");
const DBPATH = "./hackaton.db";
const crypto = require("crypto");

const hashPassword = (algorithm, base, passwd) => {
  return crypto.createHash(algorithm).update(passwd).digest(base);
};

exports.isUserValid = async (req, res) => {
  const emp = req.body;
  let user = await Database.Read(
    DBPATH,
    "WITH UserAndGroups AS (SELECT idUser FROM users WHERE email = ? AND password = ?) SELECT groups.name, groups.permission FROM groups JOIN relation_groups_users ON groups.idGroup = relation_groups_users.groupID JOIN UserAndGroups ON relation_groups_users.userID = UserAndGroups.idUser;",
    emp.email,
    hashPassword("sha256", "base64", emp.password)
  );
  if (user.length == 0) {
    res.json({ exist: false });
    return;
  }
  res.json({ permission: user });
};

exports.hello = async (req, res) => {
  res.json({ status: "hello" });
};

exports.GetAllProfile = async (req, res) => {
    const allUsers = await Database.Read(DBPATH, "SELECT * FROM user");
    res.json(allUsers);   
};
exports.GetProfilById = async (req, res) => {
  const id = req.body;
  const UserById = await Database.Read(DBPATH, "SELECT * FROM user WHERE id  = ?", id);
  res.json(UserById);
};
exports.UpdateValues = async (req, res) => {
  const { tableName, columnName, value, id } = req.body;
  const Update = await Database.Write(DBPATH, "UPDATE ? SET ? = ? WHERE id = ?", tableName, columnName, value, id);
  res.json(Update);
};
exports.CreateTicket = async (req, res) => {
  const { title, content, file, status, date } = req.body;
  const Create = await Database.Write(DBPATH, "INSERT INTO ticket(title,content,file,status,date) VALUES (?,?,?,?,?,?,?)", title, content, file, status, date);
  res.json(Create);
};
exports.GetAllTicketWithTag = async (req, res) => {
  const { tag } = req.body;
  const TicketByTag = await Database.Read(DBPATH, "        SELECT tickets.title, tickets.content, tickets.status, tickets.dates FROM tickets INNER JOIN relation_users_tags ON tickets.idTicket = relation_users_tags.idRelationUserTag INNER JOIN relation_tags_groups ON relation_users_tags.idTag = relation_tags_groups.idTagWHERE relation_tags_groups.idTag = ?;", tag);
  res.json(TicketByTag);

};
exports.GetIdTag = async (req, res) => {
  const { id } = req.body;
  const IdTag = await Database.Read(DBPATH, " SELECT tags.idTag from tags WHERE name = ?", id);
  res.json(IdTag);
};