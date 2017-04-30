var express=require("express");
var ejs=require("ejs");
var mysql=require("mysql");
var path=require("path");
var app=express();

var connnect=mysql.createConnection({
  host:"localhost",
  port:"3306",
  user:"root",
  password:"root",
  database:"uek1610"
})
/*静态文件*/
 app.use(express.static(path.join(__dirname,"static")))

/*模板目录以及模板引擎*/

app.set("views",path.join(__dirname,"tpl"));
app.set("view engine","ejs");


/*指定路由*/

app.get("/",function(req,res){
    res.render("index",{name:"aa"})
})
app.get("/select",function(req,res){
    connnect.query("select * from stuinfo",function(error,result){

        res.send(JSON.stringify(result));
    })
})

app.get("/update",function(req,res){

    var id=req.query.id;
    var val=req.query.val;
    var ziduan=req.query.ziduan;



    connnect.query(`update stuinfo set ${ziduan}='${val}' where id=${id}`,function(error,result){
      res.send("ok");
    })


})

app.get("/del",function(req,res){
    var id=req.query.id;

    connnect.query("delete from stuinfo where id="+id,function(error,result){
        if(result.affectedRows>0){

            res.send("ok");
        }
    })
})

app.get("/add",function(req,res){
      connnect.query("insert into stuinfo (name,sex,age,classes) values ('','','','')",function(error,result){
            res.send(result.insertId.toString());
      })
})

app.listen(8888);