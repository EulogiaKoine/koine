"use strict"
module.exports = function style_error(e){
    // e = 에러 객체

    if(e.stack) e.stack = e.stack.split('\n').slice(0, -2).join('\n')
    return "☢ " + e.name + " ··· " + Math.max(0, (e.lineNumber - 1)) + "\n " + e.message + (e.stack.trim()? "\u200b".repeat(500) + "\n" + e.stack: '')
}