const { model, Schema, default: mongoose } = require("mongoose");

const mailSchema = new Schema({
  ip: String,
  name: String,
  email: String,
  subject: String,
  message: String,
  "g-recaptcha-response": String,
  createdAt: Number
});

mailSchema.set("toJSON", {
  transform: (document, mailToJSON) => {
    mailToJSON.id = mailToJSON._id.toString();
    delete mailToJSON._id;
    delete mailToJSON.__v;
  }
});

module.exports = model("Mail", mailSchema);