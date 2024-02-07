const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// route to get all users
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  // username must be given
  if (!username) {
    response.status(400).json({ error: "username missing" });
  }

  // must be three charaters long
  if (username.length < 3) {
    response
      .status(400)
      .json({ error: "username must be three characters long " });
  }

  // password must be given
  if (!password) {
    response.status(400).json({ error: "password is missing ! " });
  }

  // must be three charaters long
  if (password.length < 3) {
    response
      .status(400)
      .json({ error: "password must be three characters long " });
  }

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
