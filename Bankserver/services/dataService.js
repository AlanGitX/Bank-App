const db = require("./db");

///import json webtoken

const jwt = require("jsonwebtoken");

const register = (uname, acno, pswd) => {
  //use mongo db data.

  return db.User.findOne({
    acno,
  }).then((result) => {
    console.log(result);
    if (result) {
      //acno already exists.

      return {
        statusCode: 403,
        message: "Account Already exists",
      };
    } else {
      //to add new user.
      const newUser = new db.User({
        username: uname,
        acno,
        password: pswd,
        balance: 0,
        transaction: [],
      });
      //to save new user inside Mongodb use save()

      newUser.save();
      return {
        statusCode: 200,
        message: "Regestration successful",
      };
    }
  });
};

//Login

const login = (acno, pswd) => {
  console.log("inside login body");

  return db.User.findOne({
    acno,
    password: pswd,
  }).then((result) => {
    if (result) {
      const token = jwt.sign(
        {
          currentAcno: acno,
        },
        "nissangtrr35"
      );
      return {
        statusCode: 200,
        message: "login successful",
        username: result.username,
        currentAcno: acno,
        token,
      };
    } else {
      return {
        statusCode: 403,
        message: "Invalid Account/Password ",
      };
    }
  });
};

//getBalance

const getBalance = (acno) => {
  return db.User.findOne({
    acno,
  }).then((result) => {
    if (result) {
      return {
        statusCode: 200,
        message: "login successful",
        balance: result.balance,
      };
    } else {
      return {
        statusCode: 403,
        message: "Invalid Account number ",
      };
    }
  });
};

//deposit function.

const depositdata = (acno, amt) => {
  let amount = Number(amt);
  return db.User.findOne({
    acno,
  }).then((result) => {
    if (result) {
      //acno present in db.
      result.balance += amount;
      result.transaction.push({
        type: "Credit",
        fromAcno: acno,
        toAcno: acno,
        amount,
      });
      //update in mongoDb.
      result.save();
      return {
        statusCode: 200,
        message: `${amount} deposited`,
      };
    } else {
      return {
        statusCode: 403,
        message: "Invalid Account ",
      };
    }
  });
};

//fund transfer

const fundtransfer = (req, toAcno, pswd, amt) => {
  let amount = Number(amt);
  let fromAcno = req.fromAcno;

  return db.User.findOne({
    acno: fromAcno,
    password: pswd,
  }).then((result) => {
    if (fromAcno == toAcno) {
      return {
        statusCode: 401,
        message: "Permission denied to transfer to the same account ",
      };
    }
    console.log(result);
    if (result) {
      let fromAcnoBalance = result.balance;
      if (fromAcnoBalance >= amount) {
        result.balance = fromAcnoBalance - amount;
        return db.User.findOne({
          acno: toAcno,
        }).then((creditdata) => {
          if (creditdata) {
            creditdata.balance += amount;
            creditdata.transaction.push({
              type: "Credit",
              fromAcno,
              toAcno,
              amount,
            });
            creditdata.save();
            result.transaction.push({
              type: "Debit",
              fromAcno,
              toAcno,
              amount,
            });

            result.save();
            return {
              statusCode: 200,
              message: "Amount credited",
            };
          } else {
            return {
              statusCode: 403,
              message: "Invalid Account ",
            };
          }
        });
      } else {
        return {
          statusCode: 403,
          message: "Invalid Account ",
        };
      }
    } else {
      return {
        statusCode: 401,
        message: "Invalid Account number/password ",
      };
    }
  });
};

//get all transactions.

const getAllTransactions = (req) => {
  let acno = req.fromAcno;
  return db.User.findOne({
    acno,
  }).then((result) => {
    if (result) {
      return {
        statusCode: 200,
        transaction: result.transaction,
      };
    } else {
      return {
        statusCode: 401,
        message: "Invalid Account number/password ",
      };
    }
  });
};

//delete my account

const deleteMyAccount = (acno) => {
  return db.User.deleteOne({
    acno,
  }).then((result) => {
    if (result) {
      return {
        statusCode: 200,
        message: "Amount credited",
      };
    } else {
      return {
        statusCode: 401,
        message: "Invalid Account ",
      };
    }
  });
};

module.exports = {
  register,
  login,
  getBalance,
  depositdata,
  fundtransfer,
  getAllTransactions,
  deleteMyAccount,
};
