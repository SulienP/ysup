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
