var express=require("express");
var ejs=require("ejs");
var mysql=require("mysql");
var path=require("path");
var app=express();

var connnect=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"gg",
    port:"3306"
})
/*静态文件*/
 app.use(express.static(path.join(__dirname,"static")))

/*模板目录以及模板引擎*/

app.set("views",path.join(__dirname,"/template"));
app.set("view engine","ejs");


/*指定路由*/

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"/tpl/index.html"));
})
app.get("/select",function(req,res){
    connnect.query("select * from students",function(error,result){

        res.send(JSON.stringify(result));
    })
})

app.get("/update",function(req,res){

    var id=req.query.id;
    var val=req.query.val;
    var ziduan=req.query.ziduan;



    connnect.query(`update students set ${ziduan}='${val}' where id=${id}`,function(error,result){
      res.send("ok");
    })


})

app.get("/del",function(req,res){
    var id=req.query.id;

    connnect.query(`delete from students where id=${id}`,function(error,result){
        if(result.affectedRows>0){
            res.send("ok");
        }
    })
})
app.get("/addinfo",function (req,res) {
    var name=req.query.name;
    var sex=req.query.sex;
    var age=req.query.age;
    var classes=req.query.classes;
    console.log(name,sex);
    connnect.query(`insert into students (name,age,sex,classes) value ('${name}',${age},'${sex}','${classes}')`,function (error,result) {
        if(result.affectedRows>0){
           res.send("ok");
        }
    })
})


app.listen(8888);