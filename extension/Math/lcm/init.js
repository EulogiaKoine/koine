"use strict"
module.exports = function(lcm){
    if(!Math.lcm){
        if(typeof assert === void 0)
            throw new Error("lcm.init - this function nees base.assert in global")
        Math.lcm = lcm
    }
}