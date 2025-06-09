let express=require("express");
let app = express();
var methodOverride = require('method-override')
let path=require("path")
let port=8080;

app.use(express.urlencoded({extended:true}));
app.set("viewengine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(methodOverride('_method'))
const { v4: uuidv4 } = require('uuid');







let posts=[{
    username:"apnacollege",
    id:uuidv4(),
    content:"I love coding"
},{
    username:"flipkart",
    id:uuidv4(),
    content:"come have crazy deals"
},{
    username:"upstox",
    id:uuidv4(),
    content:"trade and earn"
}
]



app.listen(port,()=>{
    console.log("port is listening to 8080");
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({username,id,content});
    
    res.redirect("/posts");
})


app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id); 
    console.log(post);
    res.render("show.ejs",{post});
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id); 
    res.render("edit.ejs",{post})

})



app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id!==p.id); 
    
    res.redirect("/posts");

})