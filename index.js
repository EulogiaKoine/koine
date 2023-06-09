"use strict"

module.exports = function(_global, libPath){
if(typeof _global !== "object" || !_global.Object)
    throw new InternalError("koineLib - input global object as a 1st argument of lib")

libPath = typeof libPath === "string"? libPath
            : String(com.xfl.msgbot.utils.SharedVar.Companion.getBotsPath())
                .split('/').slice(0,-1).join('/')+'/global_modules/koine'

//  라이브러리 존재 여부 검사
if(java.io.File(libPath).list().indexOf("LICENSE") === -1)
    throw new InternalError("koineLib - library path is WRONG!")

const Package = require('./Package')(_global)
const root = new Package('koine', libPath)

// base 패키지는 존재 시 자동 init
if(root.getPackage("base"))
    root.init('base')

if(!_global.kpack)
    _global.kpack = root
if(!_global.klib)
    _global.klib = root.getter

/*
const koine = {
    PackageManager: root,
    lib: root.getter
}

return koine
*/

return void 0
}