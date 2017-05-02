angular.module("myapp",["ngRoute","ngAnimate"]).config(function ($routeProvider) {
    $routeProvider.when("/",{
        templateUrl:"/template/select.html",
        controller:"table"
    }).when("/add",{
        templateUrl:"/template/add.html",
        controller:"add"
    })
})
.controller("table",["$scope","$http","$timeout",function($scope,$http,$timeout){

        $scope.isshow=false;

        $http({url:"/select"}).then(function(data){
          $scope.data=data.data
        });


        $scope.blur=function(id,ziduan,val){
            $scope.isshow=true;
            $http({url:"/update",method:"get",params:{id:id,val:val,ziduan:ziduan}}).then(function(data){
                if(data.data=="ok"){
                    $timeout(function(){
                        $scope.isshow=false;
                    },2000)
                }
            });
        }

        $scope.del=function(id){
            $scope.isshow=true;
           $http({url:"/del",params:{id:id}}).then(function(e){
                if(e.data=="ok"){
                    $scope.isshow=false;
                    $scope.data.forEach(function(obj,index){
                    if(obj.id==id){
                        $scope.data.splice(index,1);
                    }
                    })
                }
            })
        }




}])
.controller("add",["$scope","$http",function ($scope,$http) {
    $scope.name="";
    $scope.sex="";
    $scope.age=0;
    $scope.classes="";
    $scope.add=function (name,sex,age,classes) {
        console.log(name,sex,age,classes);
    $http({url:"/addinfo",params:{name:name,sex:sex,age:age,classes:classes}}).then(function (data) {
            if(data.data=="ok"){
                window.location.href="#!/";

            }
        })
     }

}])