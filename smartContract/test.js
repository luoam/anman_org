"use strict";

var test = function () {

};
test.prototype={
    init:function () {

    },
    set:function () {
        LocalContractStorage.set("obj",{"name":"luo","age":"30","home":"zhejiang"});
        var arr=["a","b","c"];
        var ob ={};
        for (let i in arr) {
            ob[i]=arr[i];
        }

    },
    get:function () {
        var obj = LocalContractStorage.get("obj");
        var str = "";
        for (var i in obj){
            str += obj[i];
        }
        return str;
    }

};

module.exports=test;