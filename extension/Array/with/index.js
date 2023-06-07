"use strict"
module.exports = function(){
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

return _with
}