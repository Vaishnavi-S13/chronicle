const express = require("express");
const blog = express.Router()
const Blog = require("../models/blog");
blog.use(express.static("public"));
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']


blog.get("/", function(req, res, hasError = false){
  Blog.find({}, function(err, blogs){
    res.render("blog",  {
       blogs:blogs
     });
  });
});


blog.get("/new", function(req, res){
   res.render("newblog");
 });


blog.post("/new", function(req, res){

   const blogs = new Blog({
     title: req.body.title,
     content: req.body.content,
     count : req.body.count,


   });
   saveCover(blogs, req.body.cover)
   blogs.save(function(err){
     if(!err){
       console.log(blogs);
       res.redirect("/main/blog");
     }
   });
 });
blog.get("/:blogId",function(req, res){
  const reqBlogId = req.params.blogId;
  
  Blog.findOne({count: reqBlogId},function(err,blog){
    res.render("full", {
      title:blog.title,
      content: blog.content,
      count: blog.count,
      createdAt:blog.createdAt.toLocaleDateString(),
      cover:blog.coverImagePath

    });

    // saveCover(blogs, req.body.cover)
  });
});

 function saveCover(blogs, coverEncoded) {
   if (coverEncoded == null) return
   const cover = JSON.parse(coverEncoded)
   if (cover != null && imageMimeTypes.includes(cover.type)) {
     blogs.coverImage = new Buffer.from(cover.data, 'base64')
     blogs.coverImageType = cover.type
   }
 }
module.exports = blog
