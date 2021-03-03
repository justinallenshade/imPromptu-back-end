const mongoose = require("../db/connections");

const LoginSchema = new mongoose.Schema({
        username: String,
        projects: {type: Array, unique: true},
        email: String,
        password: String
});

const Login = mongoose.model('Login', LoginSchema);


module.exports = Login;