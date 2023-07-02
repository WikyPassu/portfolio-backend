const { connect } = require("mongoose");
const { DB_URI } = require("../utils/config");

connect(DB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));