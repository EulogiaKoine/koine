"use strict"
module.exports = function(lerp){
    if(!Math.lerp)
        Math.lerp = lerp
}