angular.module("myapp",["ngRoute","ngAnimate"])
.config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"table.ejs",
        controller:"table"
    }).when("/add",{
        templateUrl:"add.ejs",
        controller:"add"
    })
})
.controller("table",["$scope","$http",function ($scope,$http) {
    //启动时获取数据库数据
    $http({url:"/select"}).then(function (data) {
        $scope.data=data.data;
    })
//修改用户数据
    $scope.tableblur=function (id,val,ziduan) {
        $http({url:"/update",params:{id:id,val:val,ziduan:ziduan}}).then(function (data) {
            if(data.data=="ok"){
                console.log("ok");
            }
        })
    }
//删除其中一条数据
    $scope.tabledel=function (id) {
        $http({url:"/del",params:{id:id}}).then(function (data) {
            if(data.data=="ok"){
                $scope.data.forEach(function (obj,index) {
                    if(obj.id==id){
                        $scope.data.splice(index,1);
                    }
                })
                alert("删除成功");
            }
        })
    }
    
}]).controller("add",["$scope","$http",function ($scope,$http) {
    $scope.name="张三";
    $scope.sex="男";
    $scope.age="22";
    $scope.classes="1610";
    $scope.addtable=function (name,sex,age,classes) {
        console.log(name,sex,age,classes);
        $http({
            method:"get",
            url:"/addtable",
            params:{
                names:name,
                sex:sex,
                age:age,
                classes:classes
            }
        }).then(function(data) {
            if(data.data=="yes"){
                window.location.href="#!/"
            }
        })
    }
}])