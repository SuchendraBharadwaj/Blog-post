const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose= require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogDB",{useNewUrlParser:true});

const postschema={
  title:String,
  content : String
};

const Post= mongoose.model("Post",postschema);


app.get("/",function(req,res){

  // passing const to the ejs templates in the respective ejs file

  Post.find({}).then( function( posts){
    res.render("home", {
      content_home: homeStartingContent,
      posts: posts
      });
  });

});

app.get("/about",function(req,res){

  res.render("about",{content_about:aboutContent});
});

app.get("/contact",function(req,res){

  res.render("contact",{content_contact:contactContent});
});

app.get("/compose",function(req,res){

  res.render("compose");
});

app.post("/compose",function(req,res){

 const post = new Post({

  title :req.body.title_name,
    content:req.body.post_body

 });

 
  post.save().then(function(){
    res.redirect("/");
  });;
  
});

// creating seperate pages for posts

app.get("/posts/:post_id",function(req,res){


const required_post_id= req.params.post_id;

Post.findOne({_id:required_post_id}).then(function(post){

  res.render("post",{title:post.title, post_content:post.content});

});



/*
  // routing parameter and storing it in var
 //using lodash so upper or lower case doesn't matter

  var post_title=_.lowerCase(req.params.post_name);
  
  for(var i=0;i<post_arr.length;i++){
    var element=_.lowerCase(post_arr[i].title)

    // if matches with post title then send you  to a page with that post

    if(element==post_title){
      
      // sents you to post page where post exists by passing post contents to templates
      res.render("post",{title:post_arr[i].title,post_content:post_arr[i].post_content});
      
      
    } 
    
  } */
  
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
