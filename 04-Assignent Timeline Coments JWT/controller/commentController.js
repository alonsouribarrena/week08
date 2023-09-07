const commentModel = require('../model/commentModel') 
const postModel = require('../model/postModel')

const addComment = (req, res)=>{
  if(req.body.comment === ""){
    res.redirect('/')
    } else {
    let newComment = {
      comment: req.body.comment,
      post_id: req.params.id
    }
    let comment = new commentModel(newComment)
    
    comment.save()
    .then(()=>{
      postModel.findById(req.params.id)
        .then(post=>{
          post.comments.push(comment._id)
          post.save()
            .then(()=>{
              res.redirect('/')
            })
            .catch(err=>{
              console.log(err);
            })
        })
        .catch(err=>{
          console.log(err);
        })
    })
    .catch(err=>{
      console.log(err);
    })
  }
}

module.exports = {
  addComment
}