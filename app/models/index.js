const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.videoGames = require("./videoGames.model.js")(mongoose);
db.SteamGamesList = require("./steamGames.model.js")(mongoose);

module.exports = db;