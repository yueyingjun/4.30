var app=angular.module("myApp",["ngRoute","ngAnimate"]);

app.config(function ($routeProvider) {
    $routeProvider.when('/',{
        templateUrl:"/publick/table.html",
        controller:"table"
    }).when('/add',{
        templateUrl:"/publick/add.html",
        controller:"add"
    })
}).controller("table",["$scope","$http","$timeout",function ($scope,$http,$timeout) {
    $scope.show=false;
    /*取出数据库的数据*/
    $http({
        url:"/select",
        method:"get"
    }).then(function successCallback(res) {
        $scope.data=res.data;
        // console.log(res);
    },function errorCallback(res) {

    })

    /*修改数据*/
    $scope.update=function (id,val,field) {
        $scope.show=true;
        $http({
            url:"/update",
            params:{id:id,val:val,field:field}
        }).then(function successCallback(res) {
            if(res.data==="yes"){
                console.log("成功");

                    $scope.show=false;

            }else{
                console.error("跟新失败");
            }
        })
    }

    /*删除数据*/
    $scope.del=function (id) {
        $scope.show=true;
        $http({
            method:"post",
            url:"/delete",
            data:{
                id:id
            }
        }).then(function successCallback(res) {
            console.log(res.data);
            if(res.data==="yes"){
                /*删除视图里面的数据*/
                angular.forEach($scope.data,function (obj,index) {
                    if(obj.id===id){
                        $scope.data.splice(index,1);
                    }
                })


                    $scope.show=false;

            }


        },function errorCallback(res) {

        })
    }

}]).controller("add",["$scope","$http",function ($scope,$http) {
        $scope.num="";
        $scope.name="";
        $scope.sex="";
        $scope.age="";
        $scope.addData=function (num,name,sex,age) {

                $http({
                    method:"post",
                    url:"/addData",
                    data:{
                        num:num,
                        name:name,
                        sex:sex,
                        age:age
                    }
                }).then(function successCallback(res) {
                    console.log(res.data);
                })
            }
}])

