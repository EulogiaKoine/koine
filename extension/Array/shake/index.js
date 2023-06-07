"use strict"
module.exports = function(){

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


return shake
}