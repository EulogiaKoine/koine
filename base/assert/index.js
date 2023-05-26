"use strict"

/**
 * @license none
 * @version 1.0 2023. 5. 3
 */

module.exports = (function(){

let ignoranceLevel = 0 // ignore nothing

/**
 * @function assert
 * 
 * @param {boolean|function} condition assertion that must be TRUE
 * @param {string} msg error msg if condition is FALSE
 * @param {number=} [level=Infinity] assertion importance level
 * 
 * @throws {Error}
 * 
 * @pre int get assert.ignoranceLevel >= 1
 * @pre int level >= 1
 * @pre typeof(condition) == "function" => condition returns {boolean}
 * @post condition == false && level >= ignoranceLevel => error is throwed with traced stack
 */
function assert(condition, msg, level){
    if(level === void 0 || level >= ignoranceLevel){
        if(typeof condition === "function"){
            if(!condition()){
                let e = new Error(msg)
                Error.captureStackTrace(e)
                e.stack = e.stack.split('\n').slice(1).join('\n')
                throw e
            }
        } else if(!condition){
            let e = new Error(msg)
            Error.captureStackTrace(e)
            e.stack.split('\n').slice(1).join('\n')
            throw e
        }
    }
}

/**
 * @interface
 */
Object.defineProperty(assert, 'ignoranceLevel', {
    get(){
        return ignoranceLevel
    },
    set(level){
        level = +level >> 0
        assert(typeof level === "number" && level >= 0, "level must be an integer that equals or greater than 0")
        ignoranceLevel = level
    },
    enumerable: true,
    configurable: true
})


return assert
})()