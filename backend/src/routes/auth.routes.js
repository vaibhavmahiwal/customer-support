const router = require("express").Router();
const { register, login, getMe } = require("../controllers/auth.controller");
const { jwtAuth } = require("../middleware/jwtAuth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", jwtAuth, getMe);

module.exports = router;