const express = require("express");
const router = express.Router();

const { getRecommendation } = require("../controllers/aicontroller");

router.post("/recommendation", getRecommendation);

module.exports = router;