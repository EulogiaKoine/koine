"use strict"
module.exports = function(gcd){
    if(!Math.gcd){
        if(typeof assert === void 0)
            throw new Error("gcd.init - this function nees base.assert in global")
        Math.gcd = gcd
    }
}