"use strict";

var ClosedItem = function (text) {
    if (text){
        var obj = JSON.parse(text);
        this.key = obj.timestamp;
        this.value = obj.value;
        this.author = obj.author;
        this.flag = obj.flag;
    } else{
        this.key = "";
        this.author = "";
        this.value = "";
        this.flag = "0";
    }
}

ClosedItem.prototype = {
    toString:function () {
        return JSON.stringify(this);
    }
}



var AnmanContract = function () {
   LocalContractStorage.defineMapProperty(this, "arrayMap");
   LocalContractStorage.defineMapProperty(this, "dataMap",{
       parse:function (text) {
           return new ClosedItem(text);
       },
       stringify:function (o) {
           return o.toString();
       }
   });
   LocalContractStorage.defineProperty(this, "size");
};

AnmanContract.prototype = {
    init: function () {
        this.size = 0;
    },

    set: function (key, value) {
        var index = this.size;
        key = key.trim();
        value = value.trim();
        if (key === "" || value === ""){
            throw new Error("empty key / value");
        }
        if (value.length > 20 || key.length > 20){
            throw new Error("key / value exceed limit length")
        }
        var from = Blockchain.transaction.from;
        var closedItem = this.repo.get(key);
        if (closedItem){
            throw new Error("value has been occupied");
        }
        closedItem = new ClosedItem();
        closedItem.author = from;
        closedItem.key = key;
        closedItem.value = value;
        closedItem.flag = "1";
        this.arrayMap.set(index, key);
        this.dataMap.set(key, closedItem);
        this.size +=1;
    },

    get: function (key) {
        return this.dataMap.get(key);
    },

    len:function(){
      return this.size;
    },

    forEach: function(limit, offset){
        limit = parseInt(limit);
        offset = parseInt(offset);
        if(offset>this.size){
           throw new Error("offset is not valid");
        }
        var number = offset+limit;
        if(number > this.size){
          number = this.size;
        }
        var result  = "";
        for(var i=offset;i<number;i++){
            var key = this.arrayMap.get(i);
            var object = this.dataMap.get(key);
            result += "index:"+i+" key:"+ key + " value:" +object+"_";
        }
        return result;
    }
};

module.exports = AnmanContract;
