const moment = require('moment/moment');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  post:{
    type: String,
    required: true
  },
  comments:[
    {
      type: mongoose.Types.ObjectId,
      ref: "comment"
    }
  ],
  created_at:{
    type: Date,
    default: Date.now('MMM Do YY, h:mm a')
  },
  user_id:{
      type: mongoose.Types.ObjectId,
      ref: "user"
  },
  date:{
    type: Date,
    default:Date.now,
    get: function(createAt){
      return moment (createAt).format('MMM Do YY, h:mm a')
    }
  }
})

module.exports = mongoose.model('post', postSchema);