// 把所有用于解决IE6~8兼容性的问题函数库

// getElementsByClassName  在IE6~8里不支持
//1、先去分，再进行不同的操作
// 2、先把所有的元素都获取
// 3、然后根据类名找我们需要的元素




// if (navigator.appName == 'Microsoft Internet Explorer') {   
//         document.getElementsByClassName = function() {   
//             var tTagName = "*";   
//             if (arguments.length > 1) {   
//                 tTagName = arguments[1];   
//             }   
//             if (arguments.length > 2) {   
//                 var pObj = arguments[2]   
//             } else {   
//                 var pObj = document;   
//             }   
//             var objArr = pObj.getElementsByTagName(tTagName);   
//             var tRObj = new Array();   
//             for ( var i = 0; i < objArr.length; i++) {   
//                 if (objArr[i].className == arguments[0]) {   
//                     tRObj.push(objArr[i]);   
//                 }   
//             }   
//             return tRObj;   
//         }   
//     } 

//1、通过类名获取


//方法1，获取类名

function getClass(selector,context){
    //假值：underfind  、 null 、 0 、“ ”  、false  、 NaN
        context=context||document;
        if (document.getElementsByClassName) {
        return context.getElementsByClassName(selector)
    }else{
        //获取全部元素(2种方法)
        // var all=document.all;  
        var all=context.getElementsByTagName("*")
        var newarr=[];
        for (var i = 0; i < all.length; i++) {
            // "one two"  "one"
            if(checkstr(all[i].className,selector))
                newarr.push(all[i])
            }
        }
    return newarr
} 
    
    // "one two"  "one"
    function checkstr(lstr,str){
        var arr=lstr.split(" ")
        for (var i = 0; i < arr.length; i++) {
           if(arr[i]==str){
            return true;
           }
        };
        return false
    }



//2、兼容的获取或者设置元素的文本内容
    // 1. 先判断浏览器
    // 2. 是获取还是设置
    // 3. 执行对应的操作

    function getText(obj,text){
         // 1. 先判断浏览器
        if (document.getElementsByClassName) {
            // 2. 是获取还是设置
            if (text==undefined) {
                return obj.textContent;
            }else{
                obj.textContent=text;
            }
        }else{
            if (text==undefined) {
                return obj.innerText;
            }else obj.innerText=text;
         }
    }

    //3、 兼容性的获取某一个对象的某一个样式的方式
    // window.getComputedStyle(one,null).width
    // one.currentStyle.width
            //one   "width"
    function getStyle(obj,attr){
        if(window.getComputedStyle){
            return window.getComputedStyle(obj,null)[attr]
        }else{
            return obj.currentStyle[attr]
        }
    }


    //通过多种方式获取元素
    function $(selector,context){
        context=context||document;   //context ← context;  context ←  document
        if (typeof selector=="string") {
            // div  .one   #aa
            if (selector.charAt(0)==".") {    //类名
                return getClass(selector.slice(1),context) //截取  从第一个开始
            }else if(selector.charAt(0)=="#") {    //ID  
                return document.getElementById(selector.slice(1))
            }else{
                return context.getElementsByTagName(selector)                           //标签名
            }
        }else if (typeof selector=="function") {
            window.onload=selector;
        }
    }

