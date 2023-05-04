"use strict"

/**
 * @license none
 * @version 0.1 2023. 5. 3
 */

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

/**
 * @name Math.lcm
 * @param {...number} n
 * @returns {number} least common multiple of numbers
 * @pre isInteger(...n) == true && ...n > 0
 */
function lcm(){
    const d = gcd.apply(this, arguments)
    let r = 1
    for(let i = 0; i < arguments.length; i++)
        r *= arguments[i]
    return r / d
}


/**
 * @name Math.clamp
 * @param {number} value
 * @param {number} min the lowest limit of result
 * @param {number} max the highest limit of result
 * @returns {number} returns value within limited range
 */
function clamp(value, min, max){
    return value < min? min: max < value? max: value
}


const extensions = {
    static: {
        gcd: gcd,
        lcm: lcm,
        clamp: clamp
    },

    prototype: {}
}

extensions.init = require('./_init.js').bind(extensions, Math)


return extensions
})()