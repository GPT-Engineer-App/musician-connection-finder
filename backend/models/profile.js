const db = require("../db");

function getAllProfiles(callback) {
  const sql = "SELECT * FROM profiles";
  db.query(sql, (err, results) => {
    callback(err, results);
  });
}

function createProfile(profileData, callback) {
  const sql = "INSERT INTO profiles SET ?";
  db.query(sql, profileData, (err, result) => {
    callback(err, result);
  });
}

module.exports = {
  getAllProfiles,
  createProfile,
};
