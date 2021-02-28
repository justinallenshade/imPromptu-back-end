const mongoose = require("../db/connections");

const LoginSchema = new mongoose.Schema({
        username: String,
        projects: Array,
        email: String,
        password: String
});

const Login = mongoose.model('Login', LoginSchema);


module.exports = Login;