/*
    模块
*   双向数据绑定  mvvm
*
*   控制器  controller
 *
 *  过滤器  filter
 *
 *  服务    factory
 *
 *  依赖注入到任何场景
*
* */

angular.module("service",[])
.factory("one",function(){
    return {
        name:"zhangsan"
    }
}).factory("two",function(){
    return function () {
        alert("two");
    }
})