module.exports = function($env, $prefix, $hash, $room, $MAX_REPLY_COUNT){

const env = $env
const $rp_constructor = require('./rp_constructor.js')
const $style_result = require('./style_result.js')
const $style_error = require('./style_error.js')
const $nanoTime = java.lang.System.nanoTime


function onMessage(chat){
    if(chat.isDebugRoom || chat.content.startsWith($prefix) && $room.indexOf(chat.room) !== -1
     && $hash.indexOf(java.lang.String(chat.author.avatar.getBase64()).hashCode()) !== -1){
        const rp = $rp_constructor(chat, $MAX_REPLY_COUNT.value)
        let $code = chat.content.slice($prefix.length)

        try{
            let $timeout
            const $result = eval(
                "void ($timeout = $nanoTime());\n"
                + $code
            )
            chat.reply($style_result(Math.max(0, $nanoTime() - $timeout - 10000) / 1000000000, $result))
        } catch(e) {
            chat.reply($style_error(e))
        }
    }
}

return onMessage.bind()
}