module.exports = function($env, $prefix, $hash, $room, $MAX_REPLY_COUNT){

const env = $env
const $rp_constructor = require('./rp_constructor.js')
const $style_result = require('./style_result.js')
const $style_error = require('./style_error.js')
const $nanoTime = java.lang.System.nanoTime


function response(room, msg, sender, isGroupChat, replier, imageDB, packageName, isDebugRoom, isMention){
    if(isDebugRoom || msg.startsWith($prefix) && !(isGroupChat && $room.indexOf(room) === -1) && $hash.indexOf(imageDB.getProfileHash()) !== -1){
        const rp = $rp_constructor(replier, $MAX_REPLY_COUNT.value)
        let $code = msg.slice($prefix.length)

        try{
            let $timeout
            const $result = eval(
                "void ($timeout = $nanoTime());\n"
                + $code
            )
            replier.reply($style_result(Math.max(0, $nanoTime() - $timeout - 10000) / 1000000000, $result))
        } catch(e) {
            replier.reply($style_error(e))
        }
    }
}

response = response.bind()


function legacy_listen_adaptor(chat){
    response(
        chat.room,
        chat.content,
        chat.author.name,
        chat.isGroupChat,
        chat,
        Object.assign(chat.author.avatar, { getProfileHash(){
            return java.lang.String(this.getBase64()).hashCode()
        } }),
        chat.packageName,
        chat.isDebugRoom,
        chat.isMention
    )
}



return legacy_listen_adaptor
}