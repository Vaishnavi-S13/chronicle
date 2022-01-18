const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  content: {
    type:String,
    required: true
},
 count: {
  type: Number,
  required: true
},
 createdAt: {
  type: Date,
  required: true,
  default: Date.now
},
 coverImage: {
   type: Buffer
   // required: true
 },
 coverImageType: {
   type: String
   // required: true
 }
});
blogSchema.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
});

module.exports =  mongoose.model("Blog", blogSchema);
