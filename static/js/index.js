angular.module("myapp",["service"])
.controller("stu",["$scope","$http","$timeout","one","two",function($scope,$http,$timeout,one,two){

   two();

        $scope.isshow=false;

        $http({url:"/select"}).then(function(data){
          $scope.data=data.data
        });


        $scope.blur=function(id,val,ziduan){
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
        
        $scope.add=function () {
             $http({url:"/add"}).then(function(e){
                 if(e.data){
                     var obj={};
                     obj.id=e.data;
                     obj.name="";
                     obj.sex="";
                     obj.classes="";
                     obj.age="";
                     $scope.data.push(obj);
                 }

             })
        }


}])