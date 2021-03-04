const express = require("express");
const router = express.Router();
const loginRouter = require("../models/login-data");

router.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://impromptu-front-end.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });

router.post('/', async (req, res) => {
    const username = req.body.username
    
    const user = await loginRouter.findOne({ username : username})

    if( !user ){
        res.status(500).json({
            message: "username not valid"
        })
    }
    else{
        // where you would take the salt and password entered
        // then append salt to end of password
        //pass through hash function
        if(user.password === req.body.password){
            res.json({
                data: user,
                message: `welcome back ${user.username}`
            })
        }
        else{
            res.status(500).json({
                message: `password is incorrect`
            })
        }
    }
})

router.post("/create", async (req, res) => {
    const username = req.body.username
    const email = req.body.email

    const user = await loginRouter.findOne({ username : username })
    const mail = await loginRouter.findOne({ email: email})

    if( user ){
        res.status(500).json({
            message: "username not valid"
        })
    }
    else{
        if( mail ){
            res.status(500).json({
                message: "email not valid"
            })
        }
        else{
            loginRouter.create(req.body)
            .then((login) => res.json({
                message: "Account Created"
            }))
        }
    }
})

router.put("/add/:username", (req, res) => {
    const username = req.params.username;
    const project = req.body.projects;

    loginRouter.findOneAndUpdate({ username: username }, {$addToSet: {projects: project}}, {new: true})
    .then(loginRouter.find({}))
    .then((x) => res.json(x.projects));
})

router.put("/:username", (req, res) => {
    const username = req.params.username;
    const project = req.body.project;

    loginRouter.findOneAndUpdate({ username: username }, {$pull: {projects: project}}, {new: true})
    .then(loginRouter.find({}))
    .then((x) => res.json(x.projects));
})

router.delete("/:username", (req, res) => {
    const username = req.params.username;
    loginRouter.findOneAndDelete({ username: username }).then((x) => res.json(x));
});


module.exports = router;