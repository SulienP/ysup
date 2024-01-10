const Database = require("./Database_bis");
const DBPATH = "./test.db";
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const jwt_key = 'loe4J7Id0Ry2SEDg09lKk';

const hashPassword = (algorithm, base, passwd) => {
  return crypto.createHash(algorithm).update(passwd).digest(base);
};

const concatPerm = (tabPerm) => {
  let res = ['-', '-'];
  Object.keys(tabPerm).forEach(element => {
    const currentPerm = tabPerm[element];
    Object.keys(currentPerm).forEach(perm => {
      const uniquePerm = currentPerm[perm];
      for (let index = 0; index < uniquePerm.length; index++) {
        const singlePerm = uniquePerm[index];
        if (singlePerm != '-' && res[index] == '-') {
          res[index] = singlePerm;
        }
      }
    });
  });
  return res.join('');
}

const encodeJwt = (userDatas) => {
  const payload = {
    sub: new Date(),
    email: userDatas[0].email,
    password: userDatas[0].password,
    iat: Math.floor(Date.now() / 1000),
  }
  const token = jwt.sign(payload, jwt_key, { expiresIn: '1h' });
  return token
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
}

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
