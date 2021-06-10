const app = require("express");
const { check } = require("express-validator");
const router = app.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("name should be at least 5 chars long"),
    check("email").isEmail().withMessage("email is required"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("password should be at least 3 chars long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("email is required"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("password field is required"),
  ],
  signin
);

router.get("/signout", signout);

router.get("/test",isSignedIn, (req,res) => {
  res.json(req.auth)
})

module.exports = router;
