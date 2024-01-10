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
  const emp  = req.body;
  const Update = await Database.Write(DBPATH, "UPDATE ? SET ? = ? WHERE id = ?", emp.tableName, emp.columnName, emp.value, emp.id);
  res.json(Update);
};
exports.CreateTicket = async (req, res) => {
  const emp  = req.body;
  const Create = await Database.Write(
    DBPATH,
    "INSERT INTO ticket(title,content,file,status,date) VALUES (?,?,?,?,?,?,?)",
    emp.title,
    emp.content,
    emp.file,
    emp.status,
    emp.date
  );
  res.json(Create);
};
exports.GetAllTicketWithTag = async (req, res) => {
  const emp = req.body;
  const TicketByTag = await Database.Read(
    DBPATH,
    " SELECT tickets.idTicket, tickets.title, tickets.content, tickets.status, tickets.dates, groups.name AS 'group Name',groups.idGroup AS 'group ID',tags.idTag AS 'tag id',tags.name AS 'tag Name' FROM groups INNER JOIN relation_tags_groups ON groups.idGroup = relation_tags_groups.idGroupINNER JOIN  tags ON relation_tags_groups.idTag = tags.idTag INNER JOIN relation_users_tags ON tags.idTag = relation_users_tags.idTag INNER JOIN tickets ON relation_users_tags.idTicket = tickets.idTicket WHERE groups.idGroup = ? AND tags.idTag = ?;",
    emp.idGroup,
    emp.idTag
  );
    res.json(TicketByTag);

};
exports.GetIdTag = async (req, res) => {
  const emp = req.body;
  const IdTag = await Database.Read(DBPATH, " SELECT tags.idTag , tags.name from tags WHERE name = ?",emp.id);
  res.json(IdTag);
};

exports.CreateResponse = async (req, res) => {
  const emp = req.body;
  const ResponsRequest = await Database.Write(
    DBPATH,
    "INSERT INTO response(idResponse, idUser,content,file,mailingDate)VALUES(?,?,?,?,?)",
    emp.idResponse,
    emp.idUser,
    emp.content,
    emp.file,
    emp.mailingDate
  );
  res.json(ResponsRequest);
};