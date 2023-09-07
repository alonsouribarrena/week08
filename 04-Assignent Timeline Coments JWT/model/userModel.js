const mongoose = require('mongoose')
const Schema = mongoose.Schema



const userSchema = new Schema ({
  firstName:{
    type: String
  },
  lastName:{
    type: String
  },
  email:{
    type: String
  },
  password:{
    type: String
  },
  posts:[
    {
      type: mongoose.Types.ObjectId,
      ref: "post"
    }
  ]
})

module.exports = mongoose.model('user', userSchema)