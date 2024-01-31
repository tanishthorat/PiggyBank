const PiggyBank = require("../model/Piggy-bank");
const User = require("../model/user");
// const Transaction = require("../model/transaction");    // optional if want to use transaction model separatly & not embedded in piggybank model

// Route for creating a piggy-bank
exports.postcreateBank = async (req, res, next) => {
  const newuser = {
    username: req.body.username,
  };
  const bankname = req.body.name;
  const initialAmount = req.body.initialAmount;
  let result;

  try {
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username: newuser.username });
    if (existingUser) {
      result = await PiggyBank.findOne({ user: existingUser._id });
      return res.status(201).json({
        message: "user already exist",
        piggyBank: result,
      });
    } else {
      // Insert the new user if no duplicates are found
      const createduser = await User.create(newuser);
      console.log("User created successfully:", newuser);
      const newpiggyBank = new PiggyBank({
        user: createduser._id,
        name: bankname,
        balance: initialAmount,
        transactions: [],
      });
      result = await newpiggyBank.save();
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
  res.status(201).json({
    message: "Piggy bank created successfully",
    piggyBank: result,
  });
};

// Route for deleting a piggy-bank
exports.deletebreakBank = (req, res, next) => {
  const userPiggyBank = req.body.bankid;
  PiggyBank.findByIdAndDelete(userPiggyBank).then(() => {
    console.log("piggyBank breaked");
    res.status(201).json({
      message: "Piggy bank breaked successfully",
    });
  });
};

// Route for adding money to piggy-bank
exports.postaddMoney = (req, res, next) => {
  const amount = parseFloat(req.body.amount);
  const bankid = req.body.bankid;
  const transaction = {
    amount: amount,
    date: Date.now(),
  };
  PiggyBank.findById(bankid)
    .then((piggybank) => {
      if (!piggybank) {
        return res.status(404).json({ message: "Piggy bank not found" });
      }
      // Update balance
      piggybank.balance += amount;
      // Add transaction to the transactions array
      piggybank.transactions = [transaction, ...piggybank.transactions];
      // Save the updated piggy bank
      return piggybank.save();
    })
    .then((updatedPiggyBank) => {
      res.status(200).json({
        message: "Money added successfully",
        updatedPiggyBank: updatedPiggyBank,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: error.message,
      });
    });
};

// Route for viewing a transactions in a  piggy-bank
exports.getviewTransactions = (req, res, next) => {
  // console.log("started");
  const bankid = req.body.bankid;
  PiggyBank.findById(bankid)
    .then((piggybank) => {
      if (!piggybank) {
        return res.status(404).json({ message: "Piggy bank not found" });
      }
      // console.log("Id Found");

      const transactions = piggybank.transactions;
      res.status(200).json({
        transactions: transactions,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: error.message,
      });
    });
};
