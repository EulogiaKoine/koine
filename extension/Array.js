"use strict"

/**
 * @license none
 * @version 0.1 2023. 5. 3
 */

module.exports = (function(){

/**
 * @name Array.range
 * @param {number} [start=0] if p2 == undefined, p1 is endpoint; else startpoint
 * @param {number} [end=0] endpoint
 * @param {number} [step=1]
 * @pre step != 0
 * @returns {Array}
 */
function range(start, end, step){
    step = +step || 1
    if(end === void 0) {
        end = start
        start = 0
    }
    const output = []
    while(step > 0 ? start < end : start > end) {
        output.push(start)
        start += step
    }
    return output
}


/**
 * @name Array.prototype.at
 * 
 * @param {int} index
 * @returns {*} index >= 0 ? element indexed (index) : element indexed (length-|index|)
 */
function at(index){
    return this[(index >>= 0) < 0? this.length+index: index]
}


/**
 * @name Array.prototype.toReversed
 * 
 * @pre this = Array or Array-like object
 * @returns {Array} reversed Array
 */
function toReversed(){
    return Array.from(this).reverse()
}


/**
 * @name Array.prototype.toSorted
 * @param {function(*, *): int} compareFn
 * @pre this instanceof Array || Array-like object
 * @returns {Array} sorted Array
 */
function toSorted(compareFn){
    return Array.from(this).sort(compareFn)
}


/**
 * @name Array.prototype.with
 * @param {int} index
 * @param {*} value
 * @pre 0 <= index < this.length
 * @returns {Array} copy of original with change the this[index] to (value)
 * @throws {RangeError} if precondition doesn't satisfied
 */
function _with(index, value){
    if((index >>= 0) < 0 || index >= this.length){
        let e = new RangeError("Invalid index: "+index)
        Error.captureStackTrace(e)
        throw e
    }
    return Array.from(this).splice(index, 1, value)
}


/**
 * @name Array.prototype.random
 * @param {number} [start=0]
 * @param {number} [end=this.length]
 * @returns {*} random element of this
 * 
 * @pre start & end == undefined | integer
 * @pre start >= 0 && end <= this.length
 */
function random(start, end){
    start = start >> 0 || 0
    end = end >> 0 || this.length
    return this[Math.random() * (end - start) + start]
}


/**
 * @name Array.prototype.shake
 * @param {number} [start=0]
 * @param {number} [end=this.length]   
 * @returns {Array} original
 * 
 * @pre start & end == undefined | integer
 * @pre start >= 0 && end <= this.length
 * @post elements' indexes in range<start, end> are scambled(shaken)
 */
function shake(start, end){
    start >>= 0
    end = end >> 0 || this.length
    const shaken = this.slice(start, end)
    let r, t
    for(let i in shaken){
        r = Math.random() * shaken.length >> 0
        if(r){
            t = shaken[r]
            shaken[r] = shaken[i]
            shaken[i] = t
        }
    }
    this.splice(start, shaken.length, shaken)
    return this
}


/**
 * @name Array.prototype.toShaken
 */
function toShaken(start, end){
    return this.slice(start >> 0, end >> 0 || this.length).shake()
}


const extensions = {
    static: {
        range: range
    },

    prototype: {
        at: at,
        toReversed: toReversed,
        toSorted: toSorted,
        with: _with,
    
        // personal addition
        random: random,
        shake: shake,
        toShaken: toShaken
    }
}

extensions.init = require('./_init.js').bind(extensions, Array)


return extensions
})()