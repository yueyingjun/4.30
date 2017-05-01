var express=require("express");
var ejs=require("ejs");
var mysql=require("mysql");
var path=require("path");
var app=express();
app.set("views",path.join(__dirname,"temple"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"static")));
var connect=mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"",
    database:"node"
})
connect.connect();
app.get("/",function(req,res){
    connect.query("select * from stu",function(error,result){
        res.render("index",{result:result});
    })
})
app.get("/select",function(req,res){
    connect.query("select * from stu",function(error,result){
        res.send(JSON.stringify(result));
    })
})
app.get("/update",function(req,res){
    var id=req.query.id;
    var val=req.query.name;
    var ziduan=req.query.ziduan;
    connect.query(`update stu set ${ziduan}='${val}' where id=${id}`,function(error,result){
        if(result.affectedRows>0){
            res.send("ok");
        }
    })
})
app.get("/del",function(req,res){
    var id=req.query.id;
    connect.query("delete from stu where id="+id,function(error,result){
        if(result.affectedRows>0){
            res.send("ok");
        }
    })
})
app.get("/add",function (req,res) {
    var name=req.query.name;
    var sex=req.query.sex;
    var age=req.query.age;
    var classes=req.query.classes;
    console.log(name,sex,age);
    connect.query(`insert into stu (name,age,sex,classes) values ('${name}','${age}','${sex}','${classes}')`,function (error,result) {
        if(result.affectedRows>0){
            res.send("ok");
        }
    });
})
app.listen(8888);