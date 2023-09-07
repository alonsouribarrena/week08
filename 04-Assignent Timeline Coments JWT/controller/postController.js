const postModel = require('../model/postModel')
const userModel = require('../model/userModel')

const homePage = (req, res)=>{
  postModel.find()
  .populate('comments', '_id comment')
  .populate('user_id', 'firstName')
  
  .sort({date: -1})
  .then(data=> {
    res.render('index',{
      err: '',
      posts: data
    })
  })
  .catch(err=>{
    console.log(err);
  })
}

const createNewPost = (req, res)=>{
  res.render('index', {
    err: ''
  })
}

const submitPost = (req, res)=>{
  if(req.body.post === ''){
    res.render('index',{
      err: 'all fields required'
    })
  } else  {
    let newPost = {
      post: req.body.post,
      user_id: req.params.id
    }

    let post = new postModel(newPost)

    post.save()
    .then(()=>{
      userModel.findById(req.params.id)
      .then(user=>{
        user.posts.push(post._id)
        user.save()
        .then(() => {
          res.redirect('/')
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch(err=>{
        console.log(err);
      })
      .catch(err=>console.log(err))
    })
    }
  }

module.exports = {
  homePage,
  createNewPost,
  submitPost
}