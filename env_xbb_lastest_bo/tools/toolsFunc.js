//主要用来保护伪造的函数 让其更难被识破
/*
保存原函数
修改原函数为自定义函数
自定义函数里面修改逻辑然后调用原函数
*/
;;
!function () {
    bodavm.toolsFunc.getNodeType=function (node){
        switch (node.nodeName) {
            case '#document':
              return 9; // Document Node
            case '#text':
              return 3; // Text Node
            case '#comment':
              return 8; // Comment Node
            case '#documentType':
              return 10; // DocumentType Node
            case '#documentFragment':
              return 11; // DocumentFragment Node
            case '#cdata-section':
              return 4; // CDATA Section Node
            case '#entity':
              return 6; // Entity Node
            case '#entityReference':
              return 5; // EntityReference Node
            case '#processingInstruction':
              return 7; // ProcessingInstruction Node
            default:
              return 1; // Element Node
          }
    }
    bodavm.toolsFunc.getParentElement=function (node){
        const parentNode = node.parentNode;
      
        if (parentNode && parentNode.nodeName !== '#document') {
          if (parentNode.nodeName === '#document-fragment') {
            return bodavm.toolsFunc.getParentElement(parentNode);
          } else {
            return parentNode;
          }
        }
      
        return null;
      }
      
    bodavm.toolsFunc.traverseGetParent=function (node){
        if (node.parentNode){
            return bodavm.toolsFunc.traverseGetParent(node.parentNode)
        }else{
            return node
        }
    }

    bodavm.toolsFunc.traverse2=function(node, callback) {
        if (!node.childNodes) {
            return;
        }
        if (node.nodeName=='script' &&bodavm.memory.domParserScriptFlag){
            // if (node.parentNode){
                callback(node.parentNode);
            // }

        }else{
            callback(node)
        }
        // debugger
        if (!node.childNodes){
            debugger
        }

        for (let i = 0; i < node.childNodes.length; i++) {
            bodavm.toolsFunc.traverse2(node.childNodes[i], callback);
        }
    }
    bodavm.toolsFunc.traverse=function(node, callback) {
        if (!node.childNodes) {
            return;
        }

        callback(node)
        
        // debugger
        for (let i = 0; i < node.childNodes.length; i++) {
            bodavm.toolsFunc.traverse(node.childNodes[i], callback);
        }
    }

    bodavm.toolsFunc.symbolProperty=function (obj,value){
        if (bodavm.config.issymbolProperty ==false){
            return obj
        };
        Object.defineProperty(obj,bodavm.memory.symbolProperty,{
            configurable:false,
            enumerable:false,
            value:value?value:1,
            writable:false
        },'bobo')
        
    }
    bodavm.toolsFunc.setProto=function setpro(dom){
        //设置原型链
        let tagpro=dom.toUpperCase()
        switch (tagpro) {
            case 'TEXT':
                return new Text('bobo')
            case "B":
                return new HTMLElement('bobo')
            case "AUDIO":
                return new HTMLAudioElement('bobo')
            case "#COMMENT":
                return new Comment("bobo")
            case "#TEXT":
                return new Text("bobo")
            case "DIV":
                return new HTMLDivElement('bobo')
            case "SCRIPT":
                return  new HTMLScriptElement('bobo')
            case "TITLE":
                return  new HTMLTitleElement('bobo')
            case "HEAD":
                return new HTMLHeadElement('bobo')
            case 'META':
                return new HTMLMetaElement('bobo')
            case 'LINK':
                return new HTMLLinkElement('bobo')
            case "A":
                return  new HTMLAnchorElement('bobo')
            case "SPAN":
                return new HTMLSpanElement('bobo')
            case "P":
                return new HTMLParagraphElement('bobo')
            case "LI":
                return new HTMLLIElement('bobo')
            case "UL":
                return new HTMLUListElement('bobo')
            case 'IFRAME':
                return new HTMLIFrameElement('bobo')
            case 'IMG':
                return new HTMLImageElement('bobo')
            case "H1":
                return new HTMLHeadingElement('bobo')
            case "H4":
                return new HTMLHeadingElement('bobo')
            case "H2":
                return new HTMLHeadingElement('bobo')
            case "NOSCRIPT":
                return  new HTMLElement('bobo')
            case 'INPUT':
                return new HTMLInputElement('bobo')
            case 'FORM':
                return new HTMLFormElement('bobo')
            case 'STYLE':
                return new HTMLStyleElement('bobo')
            case 'VIDEO':
                return new HTMLVideoElement('bobo')
            case 'BODY':
                return new HTMLBodyElement('bobo')
            case 'HTML':
                return new HTMLHtmlElement('bobo')
            case "CANVAS":
                return  new HTMLCanvasElement('bobo')
            case "SECTION":
                return new HTMLElement('bobo')
            case "I":
                return new HTMLElement('bobo')
            case "FONT":
                return new HTMLFontElement('bobo')
            case "EM":
                return new HTMLElement('bobo')
            case "H6":
                return new HTMLHeadingElement('bobo')
            case "OPTION":
                return new HTMLOptionElement('bobo')
            case "SELECT":
                return new HTMLSelectElement('bobo')
            case "BR":
                return new HTMLBRElement('bobo')
            case "CLOB":
                return new HTMLUnknownElement('bobo')
            case "MARQUEE":
                return new HTMLMarqueeElement('bobo')
            case "STRONG":
                return new HTMLElement('bobo')
            case "BUTTON":
                return   new HTMLButtonElement('bobo')
            case 'LEGEND':
                return new HTMLLegendElement('bobo')
            case 'OPTGROUP':
                return new HTMLOptGroupElement('bobo')
            case "FIELDSET":
                return  new HTMLFieldSetElement('bobo')
            case 'SUP':
                return new HTMLElement('bobo')
            case "H3":
                return  new HTMLHeadingElement('bobo')
            case "ADDRESS":
                return new HTMLElement('bobo')

            default:
                console.log(`setProto属性${tagpro}未实现`)
                break;
        }
    }


    //解析url
    bodavm.toolsFunc.parseUrl = function parseUrl(str) {
        if (!parseUrl || !parseUrl.options) {
            parseUrl.options = {
                strictMode: false,
                key: ["href", "protocol", "host", "userInfo", "user", "password", "hostname", "port", "relative", "pathname", "directory", "file", "search", "hash"],
                q: {
                    name: "queryKey",
                    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                },
                parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                }
            };
        }
        if (!str) {
            return '';
        }
        var o = parseUrl.options,
            m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
            urlJson = {},
            i = 14;
        while (i--) urlJson[o.key[i]] = m[i] || "";
        urlJson[o.q.name] = {};
        urlJson[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
            if ($1) urlJson[o.q.name][$1] = $2;
        });
        delete urlJson["queryKey"];
        delete urlJson["userInfo"];
        delete urlJson["user"];
        delete urlJson["password"];
        delete urlJson["relative"];
        delete urlJson["directory"];
        delete urlJson["file"];
        urlJson["protocol"] += ":";
        urlJson["origin"] = urlJson["protocol"] + "//" + urlJson["host"];
        urlJson["search"] = urlJson["search"] && "?" + urlJson["search"];
        urlJson["hash"] = urlJson["hash"] && "#" + urlJson["hash"];
        return urlJson;
    }
 


    //获取原型对象上自身属性值
    bodavm.toolsFunc.getProtoAttr = function getProtoAttr(key) {
        return this[bodavm.memory.symbolData] && this[bodavm.memory.symbolData][key];
    }
    bodavm.toolsFunc.setProtoAttr = function setProtoAttr(key, value) {
        if (!(bodavm.memory.symbolData in this)) {
            Object.defineProperty(this, bodavm.memory.symbolData, {
                enumerable: false,
                configurable: false,
                writable: true,
                value: {},
            },'bobo'),
            Object.defineProperty(this,bodavm.memory.symbolProperty,{
                value:1,
                enumerable:false,
                writable:false,
                configurable:false
            },'bobo')

        }
        this[bodavm.memory.symbolData][key] = value;
    }

    //获取对象类型
    bodavm.toolsFunc.getType = function getType(obj) {
        return Object.prototype.toString.call(obj);
    }
    //过滤代理属性
    bodavm.toolsFunc.filterProxyProp = function filterProxyProp(prop) {
        for (let i = 0; i < bodavm.memory.filterProxyProp.length; i++) {
            if (bodavm.memory.filterProxyProp[i] === prop) {
                return true;
            }
        }
        return false
    }

    bodavm.toolsFunc.proxy2 = function (obj, objName) {
        let handler = {
            get(target, prop, receiver) {
                // let 
                
                let result = Reflect.get(target, prop, receiver)
                if (bodavm.toolsFunc.filterProxyProp(prop)) {
                    return result;
                }
                console.log_copy('['+objName+']', '   获取属性:   ', prop, '   value:   ', result,);
                
                return result;
            },
            set(target, propKey, value, receiver) {
                if (propKey=='isTrusted'){
                    console.log('['+objName+']', "   设置属性:   ", propKey, "   value:   ", false);

                    return false
                }
                console.log('['+objName+']', "   设置属性:   ", propKey, "   value:   ", value);

                let res=Reflect.set(target, propKey, value, receiver);
                return res
            },
            // has(target, prop) {
            //     console.log('['+objName+']',`->  has -> 正在判断对象是否具有属性${prop}`);
            //     return Reflect.has(target, prop);
            //   },
              deleteProperty(target, prop) {
                console.log('['+objName+']',`-> deleteProperty -> 正在删除属性${prop}`);
                return Reflect.deleteProperty(target, prop);
              },
              ownKeys(target) {
                // if (target._boContentWindow){
                //     let resKeys=Reflect.ownKeys(target)
                //     // debugger    
                //     console.log('['+objName+']',' ->ownKeys -> contentWindow_keys 正在获取对象的所有属性 ->',target,`-> res ->`,resKeys );
                //     return resKeys
                // }
                console.log('['+objName+']',' ->ownKeys -> 正在获取对象的所有属性 ->',target );
                return Reflect.ownKeys(target);
              },
            //   getOwnPropertyDescriptor(target, prop) {
            //     console.log('['+objName+']',`正在获取属性${prop}的描述符`);
            //     return Reflect.getOwnPropertyDescriptor(target, prop);
            //   },
            //   defineProperty(target, prop, descriptor) {
            //     console.log('['+objName+']',`-> defineProperty -> 正在定义属性${prop}`);
            //     return Reflect.defineProperty(target, prop, descriptor);
            //   },
              preventExtensions(target) {
                console.log('['+objName+']','-> preventExtensions -> 正在禁止对象扩展');
                return Reflect.preventExtensions(target);
              },
            //   getPrototypeOf(target) {
            //     debugger
            //     console.log('['+objName+']','正在获取对象的原型');
            //     return Reflect.getPrototypeOf(target);
            //   },
              setPrototypeOf(target, proto) {
                console.log('['+objName+']','正在设置对象的原型');
                return Reflect.setPrototypeOf(target, proto);
              },
              apply(target, thisArg, argArray) {
                console.log('['+objName+']','正在调用函数');
                return Reflect.apply(target, thisArg, argArray);
              },
              construct(target, argArray, newTarget) {
                console.log('['+objName+']','正在创建对象实例');
                return Reflect.construct(target, argArray, newTarget);
              }
        };
        // debugger
        let proxyObj = new Proxy(obj, handler);
        // Object.defineProperty(obj, bodavm.memory.symbolProxy, {
        //     configurable:false,
        //     enumerable:false,
        //     writable:false,
        //     value:proxyObj
        // },'bobo');
        return proxyObj;
    }
    // //proxy代理
    bodavm.toolsFunc.proxy = function (obj, objName) {
        // bodavm.toolsFunc.symbolProperty(obj)
        // bodavm.memory.globalobj[objName]=obj
        // if (bodavm.config.proxy == false) { return obj };
        // if(bodavm.memory.symbolProxy in obj){// 判断对象obj是否是已代理的对象
        //     return obj[bodavm.memory.symbolProxy];
        // }
        let handler = {
            get(target, prop, receiver) {
                // debugger
                // if(prop =='_createHelper'){debugger}
                // if (prop == 'onmessage'){debugger}
                let result = Reflect.get(target, prop, receiver)
                let cacheVal=bodavm.memory.proxyCache[prop]
                // if (target ==window.$_ts._$Aw){return result }
                // if (bodavm.toolsFunc.filterProxyProp(prop)) {
                //     return result;
                // }
                // if (prop ==hasOwnProperty){debugger}
                // let mylog=
                if (cacheVal){
                    console.log_copy('['+objName+']', '   获取属性:   ', prop, '   value:   ', cacheVal,);

                }else{
                    console.log_copy('['+objName+']', '   获取属性:   ', prop, '   value:   ', result,);

                }

                    if (typeof result =='function' ){
                        myloglist.push({ 'type': 'get:'+objName , 'prop0': prop, 'prop1': result.toString() })

                    }
                    else {
                        if (!result){
                            myundefinedlist.push({ 'type': 'get:'+objName , 'prop0': prop, 'prop1': result })

                        }
                        myloglist.push({ 'type': 'get:'+objName , 'prop0': prop, 'prop1': result })


                    }

                if (result instanceof Object) {
                        // bodavm.toolsFunc.symbolProperty(result)

                        return bodavm.toolsFunc.proxy(result, `${objName}.${prop.toString()}`)
                }

                return result;
            },
            set(target, propKey, value, receiver) {
                // debugger
                // if (objName=='window' && propKey){
                //     bodavm.memory.window[propKey]=value
                bodavm.memory.proxyCache[propKey]=value
                // }
                console.log('['+objName+']', "   设置属性:   ", propKey, "   value:   ", value);
                    if (typeof value =='function' ){
                        myloglist.push({ 'type': 'set:'+ objName, 'prop0': propKey, 'prop1': value.toString() })

                    }
                    else{
                        if (!value){
                            myundefinedlist.push({ 'type':'set:'+ objName , 'prop0': propKey, 'prop1': value })

                        }
                        myloglist.push({ 'type':'set:'+ objName , 'prop0': propKey, 'prop1': value })
                    }
                    
                    let res=Reflect.set(target, propKey, value, receiver);
                    // bodavm.toolsFunc.symbolProperty(res)
                return res
            }
        };
        // debugger
        let proxyObj = new Proxy(obj, handler);
        // Object.defineProperty(obj, bodavm.memory.symbolProxy, {
        //     configurable:false,
        //     enumerable:false,
        //     writable:false,
        //     value:proxyObj
        // },'bobo');
        return proxyObj;
    }

    // return bodavm.toolsFunc.dispatch(this,Document.prototype,"Document","implementation_get",arguments,)
    //env函数分发器
    bodavm.toolsFunc.dispatch = function dispatch(self, obj, objName, funcName, argList, defaultValue) {
        //obj Document.prototype
        //obj loction
        // debugger
        //bodavm.toolsFunc.dispatch(this,Document.prototype,"Document","write",arguments)}});
        let name = `${objName}_${funcName}`
        //实现r={} ,r.__proto__=Document.prototype ,r.location 报错
       
          //实现Document.prototype.activeElement()调用报错
        if (Object.getOwnPropertyDescriptor(obj, "constructor") !== undefined) {
            if (Object.getOwnPropertyDescriptor(self, "constructor") !== undefined) {
                return bodavm.toolsFunc.throwError("TypeError", "Illegal invocation")
            }
        }
        try {

            // if (bodavm.config.issymbolProperty){
            //     if(self[bodavm.memory.symbolProperty] ==undefined){
            //         debugger
            //         console.log(self,`  bodavm.toolsFunc.dispatch1 执行出错`,funcName);
            //         return bodavm.toolsFunc.throwError("TypeError", "Illegal invocation")
        
            //     }
            //     //实现r={} ;r.__proto__=document ,r.location 报错
            //     if (self.__proto__.constructor == self.__proto__.__proto__.constructor){
            //         debugger
            //         console.log(self,`  bodavm.toolsFunc.dispatch2  执行出错`,funcName);
            //         return bodavm.toolsFunc.throwError("TypeError", "Illegal invocation")
            //     }
    
            // }
     
            return bodavm.envFunc[name].apply(self, argList)


        } catch (e) {
            // 
                // debugger
                let log__ = `'[${name}]正在执行,错误信息${e.message}'`
                console.log(log__);
                bodavm.toolsFunc.printLog(log__)
            }
    }


    //定义对象属性 defineProperty
    bodavm.toolsFunc.defineProperty = function defineProperty(obj, prop, OldDescriptior) {
        // if (obj ==window){debugger}
        let newDescriptior = {};
        newDescriptior.configurable = bodavm.config.proxy || OldDescriptior.configurable;//如果开启代理必须是true
        newDescriptior.enumerable = OldDescriptior.enumerable;
        if (OldDescriptior.hasOwnProperty("writable","boboflag")) {
            newDescriptior.writable = bodavm.config.proxy || OldDescriptior.writable;//如果开启代理必须是true
        }
        if (OldDescriptior.hasOwnProperty("value","boboflag")) {
            let value = OldDescriptior.value;
            if (typeof value == "function") {
                    bodavm.toolsFunc.safeFunc(value, prop)
            }
            newDescriptior.value = value;
        }
        if (OldDescriptior.hasOwnProperty("get","boboflag")) {
            let get = OldDescriptior.get;
            if (typeof get == "function") {
                bodavm.toolsFunc.safeFunc(get, `get ${prop}`)
            }
            newDescriptior.get = get;
        }
        if (OldDescriptior.hasOwnProperty("set","boboflag")) {
            let set = OldDescriptior.set;
            if (typeof set == "function") {
                bodavm.toolsFunc.safeFunc(set, `set ${prop}`)
            }
            newDescriptior.set = set;
        }
            Object.defineProperty(obj, prop, newDescriptior,'bobo')

    };
    ;;
    //保护函数
    (() => {
        "use strict";
        const $toString = Function.toString;  //hook Function.toString 且命名为myToString
        //变量名取随机数防检测
        const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36)));

        //自定义函数
        //逻辑与短路运算      &&    如果表达式1结果为真,则返回表达式2,
        //逻辑或短路运算      ||    如果表达式1结果为真,则返回表达式1,
        //1 && 0 || 3    3

        /*如果this的类型为function 则返回this[myFunction_toString_symbol]
        然后判断this[myFunction_toString_symbol]是否为真,
        为真则返回this[myFunction_toString_symbol]的结果.
        */

        //如果this的类型不是function,则直接返回$toString.call(this)

        //$toString.call(this)就是对原函数调用

        const myToString = function () {
            return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);   //谁调用这个方法,this就是谁,比如boda调用,这个this就是boda
        };


        function set_native(func, key, value) {
            //定义描述符
            Object.defineProperty(func, key, {
                "enumerable": false,
                "configurable": true,
                "writable": true,
                "value": value
            },'bobo')
        };
        delete Function.prototype['toString']; //删除原型链上的toString
        set_native(Function.prototype, "toString", myToString); //自己定义个getter方法

        //myToString的 myFunction_toString_symbol属性设置为  function toString() { [native code] }
        //myFunction_toString_symbol= function toString() { [native code] }
        set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }"); //套个娃 保护一下我们定义的toString 否则就暴露了


        bodavm.toolsFunc.safefunction = (func, name) => {
            set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol, name || ''}() { [native code] }`);
            set_native(func, 'name', `${myFunction_toString_symbol, name || ''}`);
            // }
        }; //导出函数到globalThis
    }).call(this);

    //对象重命名
    bodavm.toolsFunc.reNameObj = function reNameObj(obj, obname) {
        Object.defineProperty(obj.prototype, Symbol.toStringTag, {
            value: obname,
            configurable: true,
            writable: false,
            enumerable: false
        },'bobo')
    };
    //函数重命名 
    bodavm.toolsFunc.reNameFunc = function reNameFunc(func, name) {
        Object.defineProperty(func, "name", {
            value: name,
            configurable: true,
            writable: false,
            enumerable: false
        },'bobo')
    }
    //合并 保护方法
    bodavm.toolsFunc.safeFunc = function safeFunc(func, name) {
        bodavm.toolsFunc.safefunction(func, name)
        bodavm.toolsFunc.reNameFunc(func, name)
    }
    //合并 保护原型
    bodavm.toolsFunc.safeProto = function safeProto(obj, name) {
        // bodavm.memory.globalobj[name]=obj
        // bodavm.toolsFunc.symbolProperty(obj)
        bodavm.toolsFunc.safefunction(obj, name)
        bodavm.toolsFunc.reNameObj(obj, name)
        // debugger
        // Object.defineProperty(globalThis,name,{
        //     enumerable: false
        // })
        // debugger
        // try{
        //     Object.defineProperty(globalThis,name,{
        //                 enumerable: false
        //             },'bobo')
        // }catch (e){
        //     e.message
        //     e.stac
        //     debugger
        // }
    }


    //抛错
    bodavm.toolsFunc.throwError = function throwError(name, message) {
        let e = new Error();
        e.message = message;
        e.name = name;
        e.stack = `${name}: ${message}at <anonymous>:1:1`
        throw e
    }


    // base64编码解码
    bodavm.toolsFunc.base64 = {};
    bodavm.toolsFunc.base64.base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    bodavm.toolsFunc.base64.base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    bodavm.toolsFunc.base64.base64encode = function base64encode(str) {
        var out, i, len;
        var c1, c2, c3;

        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += bodavm.toolsFunc.base64.base64EncodeChars.charAt(c1 >> 2);
                out += bodavm.toolsFunc.base64.base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += bodavm.toolsFunc.base64.base64EncodeChars.charAt(c1 >> 2);
                out += bodavm.toolsFunc.base64.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += bodavm.toolsFunc.base64.base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += bodavm.toolsFunc.base64.base64EncodeChars.charAt(c1 >> 2);
            out += bodavm.toolsFunc.base64.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += bodavm.toolsFunc.base64.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += bodavm.toolsFunc.base64.base64EncodeChars.charAt(c3 & 0x3F);
        };
        console.log(`bs64编码:${str}`,`编码后${out}`);
        return out;
    }
    bodavm.toolsFunc.base64.base64decode = function base64decode(str) {
        var c1, c2, c3, c4;
        var i, len, out;

        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            /* c1 */
            do {
                c1 = bodavm.toolsFunc.base64.base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1)
                break;

            /* c2 */
            do {
                c2 = bodavm.toolsFunc.base64.base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1)
                break;

            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = bodavm.toolsFunc.base64.base64DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1)
                break;

            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = bodavm.toolsFunc.base64.base64DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    }
}();


