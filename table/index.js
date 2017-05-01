var express=require("express");
var path=require("path");
var ejs=require("ejs");
var mysql=require("mysql");
var bodyParser=require("body-parser");

var app=express();

/*连接数据库*/
var connection=mysql.createConnection({
    host:"sqld.duapp.com",
    port:"4050",
    user:"6db289559fc3427ab0aa2c88165d4ffc",
    password:"2f2ae6467f1a46d99c8cf86997a9f48e",
    database:"vPwozzEsphwdTTfKRpqv",
})
connection.connect();



/*设置静态文件*/
app.use(express.static(path.join(__dirname,"static")));

/*设置模板引擎*/
app.set("views","./template"); //设置编译目录
app.set("view engine","ejs");   //设置模板引擎

//设置引入的body-parser模块
// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/",function (req,res) {
    res.sendFile(path.join(__dirname,"template/index.html"));
})


/*获取数据*/
app.get("/select",function (req,res) {
    var sql="select * from student";
    connection.query(sql,function (error,results) {
        if(error){
            throw error;
        }
        res.send(JSON.stringify(results));
    })

})
/*跟新数据*/
app.get("/update",function (req,res) {
    var id=req.query.id;
    var val=req.query.val;
    var filed=req.query.field;
    var sql=`update student set ${filed}='${val}' where id=`+id;
    connection.query(sql,function (error,result) {
        if(result.affectedRows>0){
            res.send("yes");
        }
    })
})


/*删除数据*/
app.post("/delete",function (req,res) {
    var id=req.body.id;
    var sql="delete from student where id="+id;
    connection.query(sql,function (error,result) {
        if(result.affectedRows>0){
            res.send("yes");
        }
    })
})

/*添加数据*/
app.post("/addData",function (req,res) {
    var num=req.body.num;
    var name=req.body.name;
    var sex=req.body.sex;
    var age=req.body.age;
    var sql=`insert into student (num,name,sex,age) values('${num}','${name}','${sex}',${age})`;
    connection.query(sql,function (error,result) {
        if(error){
            throw error
        }else {
            res.send("yes");
        }
    })
})
app.listen(18080);