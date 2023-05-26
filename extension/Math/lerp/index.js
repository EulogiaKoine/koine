"use strict"
module.exports = (function(){

return function lerp(a, b, t){
    return (b-a)*t+a
}
})()