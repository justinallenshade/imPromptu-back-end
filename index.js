const express = require("express");
const app = express();
const methodOverride = require('method-override');
const loginController = require("./controller/login-controller")
const writingController = require('./controller/writing-controller')

const cors = require("cors");

app.use(cors({
  origin: "https://impromptu-front-end.herokuapp.com/",
}))


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// routers
app.use("/project", writingController);
app.use("/login", loginController);

// launching
app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log(`PORT: ${app.get("port")} `);
});
