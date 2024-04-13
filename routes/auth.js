const express = require("express");
const router = express.Router();

//GET api/auth, get logged in user, private

router.get("/", (req, res) => res.send("Get logged in user"));

//POST api/auth, Auth user & get token, public

router.post("/", (req, res) => res.send("Log in user"));

module.exports = router;
