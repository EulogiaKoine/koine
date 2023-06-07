"use strict"
module.exports = function(){

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

return range
}