"use strict"

module.exports = function(){

function findLast(finder){
    let i = this.length
    while(i--)
        if(finder(this[i], i, this))
            return this[i]
}

return findLast
}