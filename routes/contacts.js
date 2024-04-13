const express = require("express");
const router = express.Router();

//api/contacts

router.get("/", (req, res) => res.send("Get all contacs"));

router.post("/", (req, res) => res.send("Add contact"));

router.put("/:id", (req, res) => res.send("Update contact"));

router.delete("/:id", (req, res) => res.send("Delete contact"));

module.exports = router;
