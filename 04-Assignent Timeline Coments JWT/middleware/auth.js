const userAuth = (req, res, next)=>{
  // console.log(req.cookies.userInfo);
  if (req.cookies.userLoggedIn ) {
    res.locals.userFirstName = `${req.cookies.userInfo.firstName}`
    res.locals.userFullName = `${req.cookies.userInfo.firstName} ${req.cookies.userInfo.lastName}`
    res.locals.userId = req.cookies.userInfo._id
    next()
  } else {
    res.redirect('/login')
  }
}

const loginAuth = (req, res, next)=>{
  console.log(req.cookies);
  if (req.cookies.userLoggedIn) {
    res.redirect('/')
  } else {
    next()
  }
}

module.exports = {
  userAuth,
  loginAuth
}