const express = require("express");
const router = new express.Router();
//loading in the user model
const User = require("../models/user");
const ageCalc = require("age-calculator");
let { AgeFromDateString } = require("age-calculator");
const cors = require("cors");

//CREATE
router.post("/users", cors(), async (req, res) => {
  // const user = new User(req.body);
  let age = new AgeFromDateString(req.body.dob).age;
  // const user = new User({ ...req.body, age: age });

  const user = new User({
    firstName: req.body.firstName,
    surname: req.body.surname,
    dob: req.body.dob,
    age: age,
    height: `${req.body.height}ft`,
    hairColour: req.body.hairColour,
    weight: `${req.body.weight}kg`

    // age: this.dob.getFullYear()
  });
  try {
    //awaiting our user.save() async operation
    await user.save();

    //201 : created
    res.status(201).send({ user });
  } catch (e) {
    //400: bad request
    res.status(400).send(e.message);
  }
});

//READ
router.get("/users", cors(), async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//READ BY ID
router.get("/users/:id", cors(), async (req, res) => {
  //we use req.params.id to check the id we pass in the url and take the value to check for matching _id in the database
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    //if there are no user by the url params which was also created by the logged in user, we return 404 error
    if (!user) {
      return res.status(404).send("No User Found!");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//UPDATE
router.patch("/users/:id", cors(), async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "_id",
    "firstName",
    "surname",
    "height",
    "hairColour",
    "weight"
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    //we find the user under the url params id which has their owner field value equals to "req.user._id"
    const user = await User.findOne({
      _id: req.params.id
    });
    if (!user) {
      return res.status(404).send();
    }
    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//DELETE
router.delete("/users/:id", cors(), async (req, res) => {
  try {
    const userToDelete = await User.findOneAndDelete({
      _id: req.params.id
    });
    if (!userToDelete) {
      return res.status(404).send("No user found");
    }
    res.send(userToDelete);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//EXPORTING THE ROUTER
module.exports = router;
