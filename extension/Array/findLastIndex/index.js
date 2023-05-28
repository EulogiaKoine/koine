"use strict"

module.exports = (function(){

function findLastIndex(finder){
    let i = this.length
    while(i--)
        if(finder(this[i], i, this))
            return i
}

return findLastIndex
})()