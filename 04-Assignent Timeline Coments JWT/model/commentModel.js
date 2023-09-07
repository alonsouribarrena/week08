const moment = require('moment/moment');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  comment:{
    type: String,
    required: true
  },
  post_id:{
    type: mongoose.Types.ObjectId,
    ref: "post"
  },
  created_at:{
    type: Date,
    default: Date.now()
  },
  date:{
    type: Date,
    default:Date.now,
    get: function(createAt){
      return moment (createAt).format('MMM Do YY, h:mm a')
    }
  }
})

module.exports = mongoose.model('comment', commentSchema);