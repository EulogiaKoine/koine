"use strict"

module.exports = function(){
return function count(v){
    let n = 0
    for(let i of this)
        if(i === v) n++
    return n
}
}