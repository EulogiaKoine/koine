"use strict"

module.exports = function rp_constructor(replierOrChat, count){
    let i = count
    return msg => {
        if(i-- > 0) replierOrChat.reply(msg)
    }
}