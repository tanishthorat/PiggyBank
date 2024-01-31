//imports

const express = require("express");

const piggyBankController = require("../controllers/piggy-bank");

const router = express.Router();

router.delete("/api/break-piggy-bank", piggyBankController.deletebreakBank);

router.post("/api/create-new-piggy-bank", piggyBankController.postcreateBank);

router.post("/api/add-money", piggyBankController.postaddMoney);

router.get("/api/view-transactions", piggyBankController.getviewTransactions);

module.exports = router;
