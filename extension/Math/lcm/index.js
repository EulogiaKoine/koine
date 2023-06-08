"use strict"

module.exports = function(pack){

const gcd = pack.gcd

function _lcm(a, b){
    return a*b/gcd(a,b)
}

/**
 * @name Math.lcm
 * @param {...number} n
 * @returns {number} least common multiple of numbers
 * @pre isInteger(...n) == true && ...n > 0
 */
function lcm(){
    if(arguments.length < 2)
        return arguments[0]

    let v = arguments[0]
    for(let i of Array.prototype.splice.call(arguments, 1))
        v = _lcm(v, i)
    return v
}

return lcm
}