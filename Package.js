"use strict"

module.exports = function(_global){

const Module = require('./Module')(_global)
const PARENT_NAME = '$parent'

/**
 * @name Package
 * @param {string} name
 * @param {string} path 
 */
function Package(name, path){
    Object.defineProperties(this, {
        name: { value: name },
        path: { value: path },
        sub: { value: {} },
        getter: { value: {} }
    })

    this.apply()
}


Object.defineProperty(Package.prototype, 'apply', {
    value(){
        let pack = java.io.File(this.path)

        // 패키지가 존재하지 않을 경우 예외처리
        if(!pack.exists())
            throw new InternalError("package "+this.name+" doesn't exists")

        // 하위 폴더 이름 목록
        pack = pack.list().filter(v => java.io.File(this.path+'/'+v).isDirectory())

        // 하위 폴더 내의 config.json 여부와 type 속성을 확인하여 모듈/패키지 검사 및 추가
        let config, sub
        for(let content of pack){
            config = JSON.parse(FileStream.read(this.path+'/'+content+'/config.json'))
            if(config){
                if(config.type === "koinelib/module"){ // 모듈
                    this.sub[content] = sub = new Module(
                        content, this.path+'/'+content, 
                        config.requireInit || config.requireInit === void 0 && java.io.File(this.path+'/'+content+'/init.js').exists()
                    )
                    sub.setConfig(config)
                    Object.defineProperty(this.getter, content, {
                        get: ((s, pack) => () => s.import(pack))(sub, this.getter),
                        enumerable: true
                    })
                } else if(config.type === "koinelib/package"){ // 패키지
                    this.sub[content] = sub = new Package(content, this.path+'/'+content)
                    Object.defineProperty(this.getter, content, {
                        value: sub.getter,
                        enumerable: true
                    })
                    Object.defineProperty(sub.getter, PARENT_NAME, {
                        value: this.getter,
                        enumerable: true
                    })
                }
            }
        }
    }
})

Object.defineProperty(Package.prototype, 'init', {
    value(){
        let list = Array.from(arguments)

        // 아무것도 없다면, 패키지 전체를 init
        if(list.length === 0)
            list = Object.keys(this.sub)

        else if(list.some(v => !(v.includes('.')? v.split('.')[0] in this.sub: v in this.sub)))
            throw new Error("init must be called with an existing module or package or none(=all)")

        let sub
        for(let req of list){
            if(req.includes('.')){
                req = req.split('.')
                sub = this.sub[req[0]]
                if(sub instanceof Package)
                    sub.init(req.slice(1).join('.'))
                else
                    throw new Error("there is no package named "+req[0])
            } else {
                sub = this.sub[req]
                if(sub instanceof Package)
                    sub.init()
                else
                    sub.init(this.getter)
            }
        }
    },
    enumerable: true
})


Object.defineProperty(Package.prototype, 'getPackage', {
    value(req){
        if(typeof req !== 'string')
            throw new TypeError("packageName must be string")

        if(req.includes('.')){
            let split = req.indexOf('.')
            let sub = req.slice(0, split)
            if(sub in this.sub)
                return this.sub[sub].getPackage(req.slice(split))
        } else {
            return this.sub[req]
        }
    }
})





return Package
}