const express = require("express");
const router = express.Router();
const userModel = require("../Database/userModel");
const bcrypt = require("bcrypt");
const secretKey = require("../token/userToken").apply();
const userAuth = require("../middleware/UserAuth.js");
const jwt = require("jsonwebtoken");
// user registration function
const registration = async (req, res) => {
  console.log("checking user credentials for registration");

  const findUsername = await userModel.findOne({ username: req.body.username });
  if (!findUsername) {
    console.log("username is unique");
    const salt = await bcrypt.genSalt(20);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new userModel({
      username: req.body.username,
      password: hashedPassword,
    });

    user.save((err) => {
      if (err) {
        console.log("error while saving user", err);
        res.send({ status: "failed", user: null, msg: "failed to save user" });
      } else {
        console.log("user saved successfully");
        res.send({
          status: "success",
          user: user,
          msg: "user saved successfully",
        });
      }
    });
  } else {
    console.log("username already exists");
    res.send({ status: "failed", user: null, msg: "username already exists" });
  }
};

// login the user

const login = async (req, res) => {
  console.log("checking user credentials for login in");

  const user = await userModel.findOne({ username: req.body.username });
  if (user) {
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (checkPassword) {
      console.log("user login is successful");
      const token = jwt.sign({ userId: user._id }, secretKey, {
        expiresIn: "5d",
      });
      // sending the encrypted data
      res.send({
        status: "success",
        msg: "user login successful",
        user: user,
        token: token,
      });
    } else {
      console.log("password is wrong");
      res.send({
        status: "failed",
        msg: "username or password is incorrect",
        user: null,
      });
    }
  } else {
    console.log("username doesn't exists");
    res.send({
      status: "failed",
      msg: "username or password is incorrect",
      user: null,
    });
  }
};

const changeUsername = async (req, res) => {
  if (req.body.username) {
    const findUsername = await userModel.findOne({
      username: req.body.username,
    });
    if (!findUsername) {
      const user = await userModel.findOneAndUpdate(
        { _id: req.user._doc._id },
        {
          $set: {
            username: req.body.username,
          },
        },
        { new: true }
      );
      if (user) {
        res.send({ status: "success", msg: "username updated", user });
      } else {
        res.send({ status: "failed", msg: "failed to update username" });
      }
    } else {
      res.send({ status: "failed", msg: "username already exists" });
    }
  } else {
    res.send({ status: "failed", msg: "provide username" });
  }
};
const changePassword = async (req, res) => {
  if (req.body.password) {   
    const user = await userModel.findOneAndUpdate(
      { _id: req.user._doc._id },
      {
        $set: {
          password: req.body.password,
        },
      },
      { new: true }
    );
    if (user) {
      res.send({ status: "success", msg: "password updated", user });
    } else {
      res.send({ status: "failed", msg: "failed to update password" });
    }
  } else {
    res.send({ status: "failed", msg: "provide password" });
  }
};


const addTask = async (req, res) => {
    if(req.body.task) {
        let preTasks = [...req.user._doc.todoList]
        preTasks.push(req.body.task)
        const user = await userModel.findOneAndUpdate({_id: req.user._doc._id}, {
            $set : {
                todoList: preTasks
            }
        }, {new: true})
        if(user) {
            res.send({status:"success", "msg":"tasks added", user})
        } else {
            res.send({status:"failed", "msg":"error while adding task"})
        }
    } else {
        res.send({"status":"failed", "msg":"provide valid task"})
    }
}


const deleteTask = async (req, res) => {
    if(req.body.task) {
        const result = await findOneAndUpdate({_id:req.user._doc._id}, {
            $pull : {
                todoList : req.body.task
            }
        }, {new : true})

        if(result) {
            res.send({status:"success", "msg":"task deleted", user:result})
        } else {
            res.send({status:"failed", "msg":"failed to delete task"})
        }
    } else {
        res.send({status:"failed", "msg":"provide valid task"})
    }
}
// 1. registration route
router.post("/registration", registration);

// 2. login route
router.post("/login", login);

// 3. change username
router.post("/change-username", userAuth, changeUsername);

// 4. change password
router.post("/change-password", changePassword);

// 5. add Task
router.post('/add-task', addTask)

// 6. delete Task
router.post('/delete-task', deleteTask)


module.exports = router;
