const express = require('express');
const User = require("../../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const { use } = require('../../routes/v1');

const userController = {};

userController.updateUserProfile = async (req, res, next) => {
  try {
    const { firstname, lastname, email, phoneNumber } = req.body;
    let imagePath = '';
    let image = JSON.parse(JSON.stringify(req.files)).image.path;
    if (image != undefined) {
      imagePath = image.substr(image.lastIndexOf('\\') + 1);
    }

    User.findOneAndUpdate({ email: email }, { firstname: firstname, lastname: lastname, phoneNumber: phoneNumber, imagePath: imagePath })
      .then(doc => {
        res.status(200).json({
          status: true
        });
      }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      })

  } catch (err) {
    next(err);
  }
};
userController.updatePassword = async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;


    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    User.updateOne({ email: email }, { password: hash }).then(doc => {
      return res.status(200).json({
        result: doc,
      });
    })


  } catch (err) {
    next(err);
  }
};

userController.passwordValidity = async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    const userInfo = await User.findOne({ email });

    if (userInfo && (await bcrypt.compare(password, userInfo.password))) {
      return res.status(200).json({
        result: true,
      });
    }
    return res.status(400).json({
      result: false,
    });
  } catch (err) {
    next(err);
  }
};
// Register
userController.register = async (req, res, next) => {

  // Our register logic starts here
  try {
    console.log(req.files.uploads[0].path);
    let filePath = req.files.uploads[0].path.substr(req.files.uploads[0].path.lastIndexOf('\\') + 1);
    const { firstname, lastname, email, password, role, phoneNumber } = req.body;
    // Validate user input
    if (!(email && password && firstname && lastname)) {
      res.status(400).send("All input is required");
    }
    // Create user in our database
    const newUser = new User({
      firstname: firstname,
      lastname: lastname,
      phoneNumber: phoneNumber,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password,
      role,
      imagePath: filePath
    });

    newUser.save().then(doc => {
      res.status(201).json(doc);
    }).catch(err => {
      console.log(err);
      if (err.code === 11000) {
        const error = new Error(`Email address ${req.body.email} or user name ${req.body.username} is already taken`);
        error.status = 400
        next(error);
      } else {
        next(err);
      }
    })

  } catch (err) {
    if (err.code === 11000 && err.name === 'MongoError') {
      const error = new Error(`Email address ${req.body.email} or user name ${req.body.username} is already taken`);
      error.status = 400
      next(error);
    } else {
      next(err);
    }
  }
  // Our register logic ends here
};

// Login
userController.login = async (req, res, next) => {

  // Our login logic starts here
  try {
    // Get user input
    // methodtype 1 = email , 2 = phone
    const { email, password, phoneNumber, methodType } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user =  methodType === 1 ?await User.findOne({ email }) :await User.findOne({ phoneNumber });

    if (!user) {
      const err = new Error(`The email ${methodType === 1 ? email : phoneNumber} was not found on our system`);
      err.status = 401;
      return next(err);
    }

    //Check the password
    user.isPasswordMatch(password, user.password, (err, matched) => {
      //  console.log(req.headers);
      if (matched) { //Generate JWT
        const secret = process.env.JWT_SECRET;
        const expire = process.env.JWT_EXPIRATION;
        console.log(user);
        const token = jwt.sign({ _id: user._id, ip: req.ip, userAgent: req.headers['user-agent'] }, secret, { expiresIn: expire });
        return res.send({
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          dateCreated: user.dateCreated,
          phoneNumber: user.phoneNumber,
          imagePath: user.imagePath,
          token: token,
          expiresIn: (3600 * 4000),
          role: user.role
        });
      }
      res.status(401).send({
        error: 'Invalid email or password'
      });

    });

  } catch (err) {
    console.log(err);
    next(e);
  }
  // Our register logic ends here
};
userController.logout = (req, res, next) => {
  try {
    res.status(200).send({ isLoggedOut: true });
  } catch (err) {
    console.log(err);
    next(e);
  }
};

userController.getUserInfo = (req, res, next) => {
  try {
    const { email } = req.params;
    User.findOne({ email: email }).then(doc => {
      res.status(200).send({ user: doc });
    }).catch(err => {
      res.status(500).send({ err: err });
    })
  } catch (err) {
    console.log(err);
    next(e);
  }
}

module.exports = userController
