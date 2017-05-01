var express=require("express");
var app=express();
var path=require("path");
var ejs=require("ejs");
var mysql=require("mysql");

app.set("views",path.join(__dirname,"template"));
app.engine("html",ejs.renderFile);
app.set("view engine","html");
app.use(express.static(path.join(__dirname,"static")));
//连接数据库
var connect=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"student"
})
//进入主页
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"template/index.html"));
})
app.get("/select",function(req,res){
    connect.query("select * from student",function(error,result){
        res.send(JSON.stringify(result));
    })
})
app.get("/update",function(req,res){
    var id=req.query.id;
    var value=req.query.value;
    var ziduan=req.query.ziduan;
    var yuju="update student set "+ziduan+"='"+value+"' where id="+id;
    connect.query(yuju,function(error,result){
        res.send(result.affectedRows.toString());
    })
})
app.get("/del",function(req,res){
    var id=req.query.id;
    connect.query("delete from student where id="+id,function(error,result){res.send(result.affectedRows.toString());
    })
})
app.get("/add",function(req,res){
    var num=req.query.num;
    var name=req.query.name;
    var sex=req.query.sex;
    var age=req.query.age;
    connect.query("insert into student (num,name,sex,age) values ('"+num+"','"+name+"','"+sex+"','"+age+"')",function(error,result){
        res.send(result.insertId.toString());
    })
})
app.listen(7777);