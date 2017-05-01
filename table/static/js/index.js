angular.module("myapp",["ngRoute","ngAnimate"])
    .config(function($routeProvider){
        $routeProvider.when("/",{
            templateUrl:"main.html",
            controller:"index"
        })
        .when("/add",{
            templateUrl:"add.html",
            controller:"add"
        })
    })
    .controller("index",function ($scope,$http,$timeout) {
        $http({url:"/select"}).then(function (result) {
            $scope.data=result.data;
        });
        $scope.isshow=false;
        $scope.blur=function(val,id,ziduan){
            $scope.isshow=true;
            $http({url:"/update",params:{id:id,name:val,ziduan:ziduan}}).then(function(result){
                if(result.data=="ok"){
                    $timeout(function(){
                        $scope.isshow=false;
                    },2000)
                }
            })
        }
        $scope.del=function(id){
            $scope.isshow=true;
            $http({url:"/del",params:{id:id}}).then(function(result){
                if(result.data=="ok"){
                    angular.forEach($scope.data,function(val,index){
                        if(val.id==id){
                            $scope.data.splice(index,1);
                        }
                    })
                    $timeout(function(){
                        $scope.isshow=false;
                    },2000)
                }
            })
        }
    })
    .controller("add",function ($scope,$http) {
        $scope.name="";
        $scope.sex="";
        $scope.age="";
        $scope.classes="";
        $scope.add=function () {
            $http({url:"/add",params:{name:$scope.name?$scope.name:"",sex:$scope.sex?$scope.sex:"男",age:$scope.age?$scope.age:"",classes:$scope.classes?$scope.classes:""}}).then(function (result) {
                if(result.data=="ok"){
                    console.log(1)
                }
            })
        }
    })