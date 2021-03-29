const mongoose = require("mongoose");

const password = "qw0KwVbefuXGLUV8";
const dbname = "multimedia";
const user = "javiadmin";
const host = "cluster0.ikbgf.mongodb.net";

const uri = `mongodb+srv://${user}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;

module.exports = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
