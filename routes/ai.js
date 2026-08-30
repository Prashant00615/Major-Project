const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.js");

router.post("/chat", aiController.chat);

module.exports = router;
