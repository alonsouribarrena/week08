const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')

const loginPage = (req, res) =>{
  res.render('login', {
    err: ""
  })
}

const createUser = (req, res) =>{
  if (req.body.password !== "") {
    let hashedPass = bcrypt.hashSync(req.body.password, 12);
    let userObj ={
      ...req.body,
      password: hashedPass
    }
    let newUser = userModel(userObj)
    newUser.save()
    .then(() => {
      res.render('login', {
        err: "user has been created, you can login"
      })
    }).catch((err) => {
      console.log(err);
    });
  }
}

const loginUser = (req, res)=>{
  userModel.findOne({email: req.body.email})
  .then((user) => {
    if (user !== null ) {
      let correctPass = bcrypt.compareSync(req.body.password, user.password);
        if (correctPass ) {
          res.cookie('userLoggedIn', 'true');
          res.cookie('userInfo', user);
          res.redirect('/');
        } else{
          res.render('login',{
            err: 'password is wrong'
        })
    }
    } else {
      res.render('login',{
        err: 'user is not in the DB yet, signup first'
      })
    }
  })
  .catch((err) => {
    console.log(err);
  });
}


const LogOut = (req, res)=>{
  res.clearCookie('userLoggedIn');
  res.clearCookie('userInfo')
  res.redirect('/login')
}

module.exports = {
  loginPage,
  createUser,
  loginUser,
  LogOut
}