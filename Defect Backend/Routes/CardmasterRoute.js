const express = require("express");
const router = express.Router();
const {
  createCardMaster,
  getAllCardMasters,
  updateCardMaster,
  deleteCardMaster,
  getCardMasterById,
} = require("../Controller/Cardmaster");
const defectAnalytics=require('../Controller/GetAnalytics')


// Define Routes
router.post("/cardmaster", createCardMaster);
router.get("/cardmasters", getAllCardMasters);
router.get("/cardmasters/:id", getCardMasterById);
router.put("/cardmasters/:id", updateCardMaster);
router.delete("/cardmasters/:id", deleteCardMaster);
router.get('/getCardsCount',defectAnalytics.getTotalCards);

module.exports = router;
