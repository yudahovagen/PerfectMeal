const express = require("./node_modules/express");
const bodyParser = require("./node_modules/body-parser");
const cookieParser = require("./node_modules/cookie-parser");
const mongoose = require("mongoose");
//config
const app = express();
const database = "mongodb://localhost:27017/perfectMeal";
//connecting to mongoose trought config.database
mongoose.Promise = global.Promise;
//useCreateIndex is set to true in order to deal with "collection.ensureIndex is deprecated" error
//test it again in production
mongoose.connect(database, { useCreateIndex: true });

const { User } = require("./models/user");
const { auth } = require("./middleware/auth");

app.use(bodyParser.json());
app.use(cookieParser());

//only on production
// app.use(express.static("client/build"));

// ************METHODES***************

//GET
//get authentication
app.get("/api/auth", auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
  });
});
//logout user
app.get("/api/logout", auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});
//get users
app.get("/api/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(400).send(err);
    res.status(200).send(users);
  });
});
//POST
//post a new user:
app.post("/api/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false });
    res.status(200).json({
      success: true,
      user: doc,
    });
  });
});
//post email and password to login
app.post("/api/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(401).send("didnt work");
    }
    if (!user) {
      console.log(user);
      console.log(req.body.email);
      return res.status(402).json({
        isAuth: false,
        message: "Auth failed, email not found",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: "Worng Password",
        });
    });
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("auth", user.token).json({
        isAuth: true,
        id: user._id,
        email: user.email,
      });
    });
  });
});

//UPDATE

//DELETE
app.delete("/api/delete_user", (req, res) => {
  //api/delete_user?id=a1b2c3d4e5
  let id = req.query.id;
  User.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(true);
  });
});
//in production:
// const path = require("path");
//   app.get("/*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
//   });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server Running on port 3001");
});
