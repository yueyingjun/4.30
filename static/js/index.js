angular.module("myapp",["ngRoute","ngAnimate"])
.config(function ($routeProvider) {
    $routeProvider.when("/",{
        templateUrl:"/html/table.html",
        controller: 'table'
    }).when("/add",{
        templateUrl:"/html/add.html",
        controller: 'add'
    })
}).controller("table",function ($scope,$http) {
$http({url:"/url"}).then(function (data) {
    $scope.data=data.data;
});
// 编辑
$scope.update=function (id,key,val) {
    $http({url:"/update",params:{id:id,key:key,val:val}}).then(function (data) {
        if(data.data=="ok"){
            console.log("修改成功！");
        }
    })
    $scope.data.forEach(function (val,index) {
        if(val.id==id){
            val.key=val.val;
        }
    })
};
// 删除
$scope.del=function (id) {
    $http({url:"/del",params:{id:id}}).then(function (data) {
        if(data.data=="ok"){
            console.log("删除成功！");
        }
    });
    $scope.data.forEach(function (val,index) {
        if(val.id==id){
            $scope.data.splice(index,1);
        }
    })
}
}).controller("add",function ($scope,$http) {
    $scope.num="";
    $scope.name="";
    $scope.old="";
    $scope.sex="";
    $scope.add=function () {
        $http({url:"/add",params:{num:$scope.num,name:$scope.name,old:$scope.old,sex:$scope.sex}}).then(function (data) {
            if(data.data=="ok"){
                console.log("添加成功！");
            }
        })
    }
});