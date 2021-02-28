const express = require("express");
const router = express.Router();
const writingRouter = require("../models/writing");


router.get("/:username", (req, res) => {
    writingRouter.find(req.params).then((router) => res.json(router));
});
  
router.post("/", (req, res) => {
    writingRouter
      .create(req.body)
      .then((router) => res.json(router))
});
  
router.put("/", (req, res) => {
    writingRouter
      .findOneAndUpdate({ _id: req.body.id }, req.body)
      .then(writingRouter.find({}))
      .then((router) => res.json(router));
});
  

router.delete("/", (req, res) => {
    const id = req.body.id;
    writingRouter.findOneAndDelete({ _id: id }).then((x) => res.json(x));
});
  
  module.exports = router;
  