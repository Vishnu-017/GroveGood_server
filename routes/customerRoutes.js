const express = require("express");

// controllers
const {
  customerSignup,
  customerLogin,
  customerSms,
} = require("../controllers/customerController");

const router = express.Router();

// SIGNUP
router.post("/signup", customerSignup);

// LOGIN
router.post("/login", customerLogin);

router.get("/sms",customerSms);
module.exports = router;
