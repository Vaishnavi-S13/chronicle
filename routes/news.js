require("dotenv").config();
const express = require("express");
const router = express.Router()
router.use(express.static("public"));
const axios = require('axios');
const moment = require('moment');
const math = require('math');


router.get('/',async(req,res)=>{
    try {
        var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=in&' +
          'apiKey='+ process.env.NEWS_APIKEY;

        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
            res.render("/")
        }
    }
})

router.post('/search',async(req,res)=>{
    const search=req.body.search
    // console.log(req.body.search)

    try {
        var url = "http://newsapi.org/v2/everything?q="+search+"&apiKey="+ process.env.NEWS_APIKEY;
        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
})
router.get('/general',async(req,res)=>{
    try {
        var url= 'https://newsapi.org/v2/top-headlines?' +
              'q=general&' +
              'apiKey='+ process.env.NEWS_APIKEY;
        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
});
router.get('/science',async(req,res)=>{
    try {
        var url= 'https://newsapi.org/v2/top-headlines?' +
              'q=science&' +
              'apiKey='+ process.env.NEWS_APIKEY;
        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
});
router.get('/tech',async(req,res)=>{
    try {
        var url= 'https://newsapi.org/v2/everything?' +
              'q=technology&' +
              'apiKey='+ process.env.NEWS_APIKEY;
        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
});
router.get('/entertainment',async(req,res)=>{
    try {
        var url= 'https://newsapi.org/v2/everything?' +
              'q=entertainment&' +
              'apiKey='+ process.env.NEWS_APIKEY;
        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
});
router.get('/health',async(req,res)=>{
    try {
        var url= 'https://newsapi.org/v2/top-headlines?' +
              'q=health&' +
              'apiKey='+ process.env.NEWS_APIKEY;
        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
});
router.get('/sports',async(req,res)=>{
    try {
        var url= 'https://newsapi.org/v2/top-headlines?' +
              'q=sports&' +
              'apiKey='+ process.env.NEWS_APIKEY;
        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
});
module.exports = router
