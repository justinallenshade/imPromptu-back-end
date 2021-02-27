const express = require("express");
const router = express.Router();
const loginRouter = require("../models/login-data");

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
            message: "email not valid"
        })
    }
    else{
        if( mail ){
            res,status(500).json({
                message: "email not valid"
            })
        }
        else{
            loginRouter.create(req.body)
            .then((login) => res.json(login))
        }
    }
})

router.delete("/:username", (req, res) => {
    const username = req.params.username;
    loginRouter.findOneAndDelete({ username: username }).then((x) => res.json(x));
});

router.put("/:username", (req, res) => {

    loginRouter.findOneAndUpdate(
        { username: req.params.username }, 
        req.body
    )
    .then(loginRouter.find({})
    .then(router => res.json(router)))
});

module.exports = router;