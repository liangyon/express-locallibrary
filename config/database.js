

try {
    var secret = require('./secrets.js');
    var dev_db_url = secret.secrets;
  } catch (error) {
    var dev_db_url = "";
}

var mongoDB = process.env.MONGODB_URI || dev_db_url;

module.exports= {
    database: mongoDB,
    secret: "popokododoco"
}