var express=require("express");
var path=require("path");
var mysql=require("mysql");
var parser=require("body-parser");
var ejs=require("ejs");
var app=express();
app.listen(8888);
app.set('views',path.join(__dirname,'/template'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'/static')));
app.use(parser.urlencoded({ extended: true }));
var connect=mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : '',
    database : 'heiheihei'
});
app.get("/",function (req,res) {
        res.render("index");
})
app.get("/select",function (req,res) {
    connect.query("select * from stu",function (error,result) {
        res.send(result);
    })
})
app.get("/update",function (req,res) {
    var id=req.query.id;
    var val=req.query.val;
    var ziduan=req.query.ziduan;
    connect.query(`update stu set ${ziduan}='${val}' where id=${id}`,function (error,result) {
        if(result.affectedRows>0){
            res.send("ok");
        }
    })
})
app.get("/del",function (req,res) {
    var id=req.query.id;
    connect.query(`delete from stu where id=${id}`,function (error,result) {
        if(result.affectedRows>0){
            res.send("ok");
        }
    })
})
app.get("/addtable",function (req,res) {
    var name=req.query.names;
    var sex=req.query.sex;
    var age=req.query.age;
    var classes=req.query.classes;
    console.log(name,sex,age,classes);
    var sql=`insert into stu (name,sex,age,classes) values('${name}','${sex}',${age},${classes})`;
    connect.query(sql,function (error,result) {
        if(result.affectedRows>0){
            res.send("yes");
        }
    })
})