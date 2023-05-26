"use strict"
module.exports = (function(){

/**
 * @name Math.gcd
 * @param {...number} n
 * @returns {number} greatest common factor of arguments
 * @pre isInteger(...n) == true && ...n > 0
 */
function gcd(a, b, c){
    if(a !== 0 && b === void 0) return a
    assert(!(a === 0 && b === 0), "arguments sholdn't equal with 0", 1)

    let r = a % b
    while(r){
        a = b
        b = r
        r = a % b
    }

    if(c) return gcd.apply(this, [].concat(Array.prototype.splice.call(arguments, 1)))
    return b
}

return gcd
})()