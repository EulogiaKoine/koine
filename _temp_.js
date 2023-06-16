(function() {
    "use strict"
    const Sign = {
        "+" : {
            "fn" : function(a, b) {return a + b},
            "type" : "operator",
            "prior" : 3
        },
        "-" : {
            "fn" : function(a, b) {return a - b},
            "type" : "operator",
            "prior" : 3
        },
        "*" : {
            "fn" : function(a, b) {return a * b},
            "type" : "operator",
            "prior" : 2
        },
        "/" : {
            "fn" : function(a, b) {return a / b},
            "type" : "operator",
            "prior" : 2
        },
        "÷" : {
            "fn" : function(a, b) {return a / b},
            "type" : "operator",
            "prior" : 2
        },
        "^" : {
            "fn" : function(a, b) {return Math.pow(a, b)},
            "type" : "operator",
            "prior" : 1,
            "order" : "right"
        },
        "π" : {
            "value" : Math.PI,
            "type" : "value"
        },
        "e" : {
            "value" : Math.E,
            "type" : "value"
        },
        "PI" : {
            "value" : Math.PI,
            "type" : "value"
        },
        "sin" : {
            "fn" : function(a) {return Math.sin(a)},
            "type" : "function"
        },
        "cos" : {
            "fn" : function(a) {return Math.cos(a)},
            "type" : "function"
        },
        "tan" : {
            "fn" : function(a) {return Math.tan(a)},
            "type" : "function"
        },
        "sqrt" : {
            "fn" : function(a) {return Math.sqrt(a)},
            "type" : "function"
        },
        "abs" : {
            "fn" : function(a) {return Math.abs(a)},
            "type" : "function"
        },
        "log" : {
            "fn" : function(a) {return Math.log(a)},
            "type" : "function"
        },
        "ln" : {
            "fn" : function(a) {return Math.ln(a)},
            "type" : "function"
        },
        "minus" : {
            "fn" : function(a) {return -a},
            "type" : "system"
        },
        "**": {
            "fn": function(a, b){ return Math.pow(a, b) },
            "type": "operator",
            "prior": 1,
            "order": "right"
        },
        "%": {
            "fn": function(a, b){ return a % b },
            "type": "opretaor",
            "prior": 2
        }
    }

    function Calculator(msg) {
        let signs = Object.keys(Sign).concat([",", "(", ")"]).sort().reverse().map(v => this.escapeRegExp(v))
        let pattern = new RegExp("(" + signs.join("|") + ")", "g")
        msg = msg.split(pattern).map(v => v.trim())
        msg = msg.filter(v => v !== "")
        this.msg = msg
        this.fn = this.makeFn(msg)
        this.var = {}
    }

    Calculator.prototype.escapeRegExp = function(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    Calculator.prototype.setVar = function(name, value) {
        this.var[name] = value
    }

    Calculator.prototype._cal = function(num) {
        if(!isNaN(num)) {
            return Number(num)
        } else if(typeof num === "function") {
            return num()
        } else {
            return Number(this.var[num])
        }
    }

    Calculator.prototype.cal = function(simbol, args) {
        if(args.some(v => isNaN(v))) {
            return () => Sign[simbol].fn.apply(null, args.map(v => this._cal(v)))
        }
        args = args.map(v => Number(v))
        return Sign[simbol].fn.apply(null, args)
    }

    Calculator.prototype.preProceed = function() {
        let value = Object.keys(Sign).filter(v => Sign[v].type === "value")
        for(let i = 0; i < value.length; i++) {
            this.msg = this.msg.map(v => v === value[i] ? Sign[value[i]].value : v)
        }
    }

    Calculator.prototype._operatorCal = function(msg, operators, way) { 
        for(let i = 0; i < msg.length; i++) {
            let j = way === "left" ? i : msg.length - 1 - i
            if(operators.includes(msg[j])) {
                if(j === 0 || j === msg.length-1) {
                    throw new Error("계산식이 이상합니다.")
                }
                let a = this.cal(msg[j], [msg[j-1], msg[j+1]])
                msg.splice(j-1, 3, a)
                i -= 2
            }
        }
        return msg
    }

    Calculator.prototype.operatorCal = function(msg) {
        let operatorName = Object.keys(Sign).filter(v => Sign[v].type === "operator")
        let operator = operatorName.map(v => Sign[v])
        while(operator.length != 0) {
            let prior = operator.map(v => v.prior)
            let min = Math.min.apply(null, prior)
            let now = operator.filter(v => v.prior === min)
            operator = operator.filter(v => v.prior !== min)

            let way = now[0].order || "left"
            if(now.some(v => (v.order || "left") !== way)) {
                throw new Error("연산자의 방향을 제대로 지정하세요");
            }
            now = operatorName.filter(v => Sign[v].prior === min)
            msg = this._operatorCal(msg, now, way)
        }
        if(msg.length !== 1) {
            throw new Error("계산식이 이상합니다.");
        }
        return msg[0]
    }

    Calculator.prototype.minusCal = function(msg) {
        for(let i = 0; i < msg.length; i++) {
            if(msg[i] === "-") {
                if(i === 0 || msg[i-1] in Sign) {
                    msg.splice(i, 2, this.cal("minus", [msg[i+1]]))
                } else {
                    msg.splice(i, 2, "+", this.cal("minus", [msg[i+1]]))
                }
            }
        }
        return this.operatorCal(msg)
    }

    Calculator.prototype.bracketCal = function(msg) {
        msg = msg === undefined ? this.msg : msg
        let openBracket = [];
        for(let i = 0; i < msg.length; i++) {
            if(msg[i] === "(") {
                openBracket.push(i);
            }
            else if(msg[i] === ")") {
                let a = openBracket.pop();
                if(a === undefined) {
                    throw new Error("괄호에서 에러 발생");
                }
                let b = msg.slice(a+1, i);
                msg.splice(a, i-a+1, this.minusCal(b))
                i -= i-a;
            }
        }
        if(openBracket.length !== 0) {
            throw new Error("괄호에서 에러 발생");
        }
        return this.minusCal(msg);
    }
    Calculator.prototype.functionCal = function(msg, simbol) {
        msg = msg.slice()
        let functions = Object.keys(Sign).filter(v => Sign[v].type === "function")
        for(let i = 0; i < msg.length; i++) {
            if(functions.includes(msg[i])) {
                if(msg[i+1] !== "(") {
                    throw new Error("함수 연산에서 에러 발생");
                }
                let count = 1;
                let j = i+2
                for(; j < msg.length; j++) {
                    if(msg[j] === "(") {
                        count++;
                    } else if(msg[j] === ")") {
                        count--;
                    }
                    if(count == 0) {
                        break;
                    }
                }
                if(count !== 0) {
                    throw new Error("함수 연산에서 에러 발생");
                }
                let c = msg.slice(i+2, j);
                msg.splice(i, j-i+1, this.functionCal(c, msg[i]));
            }
        }

        if(simbol === undefined) {
            return this.bracketCal(msg)
        }

        if(msg[msg.length-1] === ",") {
            throw new Error("쉼표에서 에러 발생")
        }
        
        let result = []
        while(true) {
            let index = msg.indexOf(",")
            if(index === -1) {
                result.push(msg)
                break
            }

            result.push(msg.slice(0, index))
            msg = msg.slice(index+1)
        }
        result = result.map(v => this.bracketCal(v))
        return this.cal(simbol, result)
    }
    Calculator.prototype.makeFn = function() {
        if(this.msg.length == 1) {
            if(isNaN(this.msg[0])) {
                throw new Error("계산식이 이상합니다")
            }
            return this.msg[0]
        }
        this.preProceed()
        return this.functionCal(this.msg)
    }
    Calculator.prototype.calculate = function(obj) {
        let temp = null
        let result
        if(obj && typeof obj == "object") {
            temp = this.var
            this.var = obj
        }

        if(typeof this.fn === "function") {
            result = this.fn()
        } else {
            result = Number(this.fn)
        }

        if(temp !== null) {
            this.var = temp
        }
        return result
    }

    module.exports = {
        Calculator : Calculator,
        Sign : Sign
    }
})()