//通过$函数传参实现获取元素的功能，实现window.onload 实现创建元素的功能 
//selector 选择器 可传入类名，id 标签名、html标签，
//obj 范围 上下文
 /*   通过$函数传参  实现 获取元素的功能，实现window.onload，实现创建元素的功能
 *
 * selector  选择器 [类名 id  标签名   html标签  函数]
 *
 * obj  上下文
 *
 * */
 function $(selector){//构建$函数
    if(typeof selector=="string") {//判断选择器类型是否为字符串

        if(/^<[a-z][1-6a-z]{0,10}>$/.test(selector)){//判断选择器是否符合'<  >'该正则规范
            return document.createElement(selector.slice(1,-1))//返回创建指定类型节点
        }
        var s = selector.match(/[\.#]?[a-z][1-6a-z]{0,10}/g);//调用字符串match方法 获取属于该正则规范的字符串 正则（首字符可以为'.' '#'可以为1个（尽量少取）后续字符为[a-z][1-6a-z]长度为0-10 模式为全局）
        //获取元素
        var newarr = [];//定义新数组 升级为二维数组 储存内部元素集
        for (var i = 0; i < s.length; i++) {//循环遍历s 用以获取元素集
            if (i == 0) {//当i为0时 它的上下文为document 因此单独提出
                newarr[i] = getEle(s[i], [document])
            } else {//后续循环获取元素集赋值给newarr（二维数组）
                newarr[i] = getEle(s[i], newarr[i - 1])
            }
        }
        return newarr[newarr.length - 1];//返回下标为长度-1的元素集  ps：循环最后获取的集合为指定集
    }else if(typeof selector=="function"){//当选择器的类型为function  执行操作
        addEvent(window,"load",function(){
        selector();
     		})
        }
    }
function getEle(selector,obj){//构建getEle函数  该函数封装元素集获取方法
    var arr=[];//定义数组
    if(selector.charAt(0)=="#"){//判断选择器首字符是否为#  ID
        arr.push(document.getElementById(selector.substr(1)))//从document中获取该ID元素添加到arr数组中

    }else if(selector.charAt(0)=="."){//判断选择器首字符是否为'.'  Class
        for(var i=0;i<obj.length;i++){//循环遍历指定上下文（第一个父元素 即选择器中的第一个选择器字符串）
           var obj1= getClass(selector.substr(1),obj[i]);//将类名元素集赋给obj1数组
            for(var j=0;j<obj1.length;j++){//循环遍历上下文（下一个父元素 即选择器中的下个选择器字符串）
                arr.push(obj1[j])//
            }
        }
    }else if(/^[a-z][1-6a-z]{0,10}$/.test(selector)){
        for(var i=0;i<obj.length;i++){
            var obj1= obj[i].getElementsByTagName(selector);
            for(var j=0;j<obj1.length;j++){
                arr.push(obj1[j])
            }
        }
    }
    return arr;
}
/*
获取类名的标签
classname要获取的类名 
obj可传可不传 要确定的上下文（确定范围）
*/

function getClass(classname,obj){
	var obj=obj||document;//判断是否要传对象,不传参数2默认为document
	if(!(document.getElementsByClassName==undefined)){//判断这个浏览器是否支持这个getElementsByClassName这个属性
		//alert(1);	
		 return obj.getElementsByClassName(classname);//如果支持返回
	}else{
		//alert(0);//这个getElementsByClassName属性在ie6-8中支持
		 var all=obj.getElementsByTagName("*");//获取页面中所有的标签
		 var arr=[];//定义一个新数组，把获取到的相同的类名的标签放到这个数组中
		 for(i=0;i<all.length;i++){//循环取出所有的标签
		 	if(checkClass(all[i].className,classname)){ 
		 		arr.push(all[i]);//把把相同的类名的标签添加到数组arr的末尾
		 	}
		 }
		 return arr;//返回这个数组arr
	}
}


//objclass是用来获取的class
//newaclass我们需要获取的class
function checkClass(objclass,newclass){
	var  al=objclass.split(" ");
		var flag=false;
		for(i=0;i<al.length;i++){
			if(al[i]==newclass){
				flag=true;
			}
		 }
		return flag;
}

// 获取内容
  // obj  要获取或者设置  内容的对象
    // val  要修改的内容
/*
1. function
2. obj.innerText
    对象没有innerText  这个属性  它的值为undefined
3.Boolean 转换规则  隐式转换
4.if(){}else(){}
*/  
/*
获取内容、、重点理解的
*/
function getText(obj,val){//获取
	if(obj.innerText!=undefined){//判断这个属性是不是这个对象的，不是的话为undefined
		if(val==undefined){//判断这个参数的值是不是undefined
			return obj.innerHTML;//把内容返回对象
		}else{
		 obj.innerText=val;//把要改的参数的（内容）值赋值给对象内容
		}
		
	}else{//判断这个属性是不是这个对象的
			if(val==undefined){//判断这个参数的值是不是undefined
				return textContent;
			}else{
				 obj.textContent=val;//把要改的参数的（内容）值赋值给对象内容
			}	
		}
}


//获取行内样式，外部引用样式，解决兼容

function getStyle(obj,attr){///obj-对象   val-属性  eg:getStyle(box,'width')
	if(obj.currentStyle){//ie 判断是否是这个浏览器的属性,
		return obj.currentStyle[attr];///如果支持  返回ie属性
	}else{
		return getComputedStyle(obj,null)[attr];//否则返回ff属性
	}
}

//alert(1)

//去空白
// function trim(str){
// 	return  str.replace(/^\s*|\s*$/g,"")
// }
/*去除字符串指定位置的空白
去除空白，用正则的方法
type 可传可不传  a去除所有的空格  s去除字符串两边的空白  l去除字符串左边的空白 r去除字符串右边的空白
*/

function trim(str,type){
	var type=type||"s";
	var newstr="";
	switch(type){		
		case "s":newstr=str.replace(/^\s*|\s*$/g,"");break;		//去除左右两边的空白
		case "l":newstr=str.replace(/^\s*/g,"");break;			//去除左边的空白
		case "r":newstr=str.replace(/\s*$/,"");break;			//去除右边的空白
		case "a":newstr=str.replace(/\s*/g,"");break;			//去除所有的空白
    case "m":
            var lreg=/^\s*/;
            var rreg=/\s*$/;
            var l=lreg.exec(str)[0];
            var r=rreg.exec(str)[0];
            var m=str.replace(/\s*/g,'');
            newstr=l+m+r;
            break;
	}			
	return newstr;
}
/*
parent  父元素
[type]  true默认值去掉所有的文本节点 
		false只去掉空白的文本节点
*/
function getChild(parent,type){
	var val=val==undefined?true:type;
	var sons=parent.childNodes;
	var arr=[];
	for(i=0;i<sons.length;i++){
		if(type==true){
			if(!(sons[i].nodeType==3||sons[i].nodeType==8)){
				arr.push(sons[i]);
			}
		}else{
			if(!((sons[i].nodeType==3&&trim(sons[i].nodeValue)=="")||sons[i].nodeType==8)){
				arr.push(sons[i])
			}
		}
	}
	return arr;
}
function   getFirst(parent,type){
    var childs=getChilds(parent,type);
    return childs[0];
}
/*获取最后一个节点
 * parent  父元素
 * [type]   true 默认值    不包含文本节点
 *          false         包含不是空白的文本节点
 * */


function   getLast(parent,type){
    var childs=getChilds(parent,type);
    return childs[childs.length-1];
}

/*获取第n个节点
 * parent  父元素
 * [type]   true 默认值    不包含文本节点
 *          false         包含不是空白的文本节点
 * */


function   getNum(parent,num,type){
    var childs=getChilds(parent,type);
    return childs[num];
}

/*获得下一个节点
obj         当前对象
*[type]     true 默认值    不包含文本节点
 *          false         包含不是空白的文本节点
*
* */


function getNext(obj,type){
    var type=type===undefined?true:type;
    var next=obj.nextSibling;
    if(next==null){
        return false;
    }

    if(type==true) {
        while (next.nodeType == 3 || next.nodeType == 8) {
            next = next.nextSibling;
            if (next == null) {
                return false;
            }
        }
    }else{
        while ((next.nodeType == 3&&trim(next.nodeValue)=="") || next.nodeType == 8) {
            next = next.nextSibling;
            if (next == null) {
                return false;
            }
        }
    }
    return next;
}

/*获得上一个节点
  obj        当前对象
 *[type]     true 默认值    不包含文本节点
 *           false         包含不是空白的文本节点
 *
 * */


function getUp(obj,type){
    var type=type===undefined?true:type;
    var up=obj.previousSibling
    if(up==null){
        return false;
    }

    if(type==true) {
        while (up.nodeType == 3 || up.nodeType == 8) {
            up = up.previousSibling;
            if (up == null) {
                return false;
            }
        }
    }else{
        while ((up.nodeType == 3&&trim(up.nodeValue)=="") || up.nodeType == 8) {
            up = up.previousSibling;
            if (up == null) {
                return false;
            }
        }
    }
    return up;
}


/*
*  插入到某个元素的最后
* obj  要插入的元素
* parent  父元素
*
* */

function append(obj,parent){
  parent.appendChild(obj);
}
/*
 *  插入到某个元素的最前面
 * obj  要插入的元素
 * parent  父元素
 *
 * */
function preappend(obj,parent){
    var first=getFirst(parent);
    if(first) {
        parent.insertBefore(obj, first);
    }else{
        parent.appendChild(obj);
    }
}
/*
 *  插入到某个元素的前面
 * obj   要插入的元素
 * obj1  指定的前面的元素
 *
 * */
function insertBefore(obj,obj1){
   var parent=obj1.parentNode;
    parent.insertBefore(obj,obj1);
}


/*
 *  插入到某个元素的后面
 * obj   要插入的元素
 * obj1  指定的后面的元素
 *
 * */
function insertAfter(obj,obj1){
    var parent=obj1.parentNode;
    var next=getNext(obj1);
    if(next){
        parent.insertBefore(obj,next);
    }else{
        parent.appendChild(obj);
    }
}

//对一个事件绑定的兼容程序
//obj 要绑定的对象，event要绑定的事件，fn 要处理的事件处理程序  事件绑定
/*事件绑定
*  obj   要绑定的事件源
*  event 要绑定的事件
*  fn    要处理的事件处理程序
* */
function addEvent(obj,event,fn){
     if(obj.addEventListener){
         obj.addEventListener(event,fn,false)
     }else{
         obj.attachEvent("on"+event,fn);
     }
}

/*解除事件绑定
 *  obj   要解除绑定的事件源
 *  event 要解除绑定的事件
 *  fn    要解除绑定的事件处理程序
 * */

function removeEvent(obj,event,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(event,fn,false)
    }else{
        obj.detachEvent("on"+event,fn);
    }
}

/*获取对象的样式的属性值*/
function getStyle(obj,attr){
    if(window.getComputedStyle){
        return getComputedStyle(obj,null)[attr];
    }else{
       return obj.currentStyle[attr];
    }
}

/*获得相对于body左上角的位置
*
* obj  要获取的对象
* */
function offset(obj){
    var arr=[obj];
    var parent=obj.parentNode;
    var result={left:0,top:0};
    while(parent.nodeName!=="BODY"){
        var val=getStyle(parent,"position");
        if(val=="absolute"||val=="relative"||val=="fixed"){
            arr.push(parent);
        }
        parent=parent.parentNode;
    }
    for(var i=0;i<arr.length;i++){
        var borderL=0,borderT=0;
        if(i>0) {
            borderL= parseInt(getStyle(arr[i], "borderLeftWidth")) || 0;
            borderT = parseInt(getStyle(arr[i], "borderTopWidth")) || 0;
        }

        result.left+=borderL+arr[i].offsetLeft;
        result.top+=borderT+arr[i].offsetTop;

    }
    return result;
}

/*工厂模式
* obj  要拖拽的对象
* options 拖拽的选项
*
* */



function drag(obj,options){         //创建工厂
    return new drags(obj,options);  //实例化对象
}
function drags(obj,options){        //构造函数
    this.obj=obj;                   //初始化事件源
    this.dragx=options.dragx==undefined?true:options.dragx;                           //初始化拖拽方向（x）
    this.dragy=options.dragy==undefined?true:options.dragy;                           //初始化拖拽方向（y)
    this.sidex=options.sidex==undefined?false:options.sidex;                          //初始化范围（x）
    this.sidey=options.sidey==undefined?false:options.sidey;                          //初始化范围（y）
    this.animate=options.animate==undefined?true:options.animate;       //初始化动画效果
    this.speed=0.7;             //设置速度因子
    this.start();               //调用开始方法
}
drags.prototype={               //原型方法
    start:function(){           //开始方法
        this.mousedown();       //调用鼠标按下方法
    },
    mousedown:function(){       //构造鼠标按下方法
        var that=this;          //保存指向
        this.obj.onmousedown=function(e){   //鼠标按下方法
           var ev=that.getEv(e);        //鼠标事件对象
           that.ox=that.getOx(ev);      //获取鼠标到事件源的位置(x)
           that.oy=that.getOy(ev);      //获取鼠标到事件源的位置（y）
           that.startx=that.ox;        //获取开始位置(x)
           that.starty=that.oy;        //获取开始位置(y)
           that.mousemove();           //调用鼠标移动方法
           that.mouseup();             //调用鼠标抬起方法
        }
    },
    mousemove:function(){           //构造鼠标移动方法
        var that=this;              //保存this指针
        document.onmousemove=function(e){      //鼠标移动方法（设置在document上：调节问题）
            var ev=that.getEv(e);       //获取鼠标移动事件
            that.cx=ev.clientX;         //获取鼠标到浏览器窗口的位置（x）
            that.cy=ev.clientY;       //获取鼠标到浏览器窗口的位置（y）
            that.endx=that.cx;        //获取当前结束位置（x）
            that.endy=that.cy;        //获取当前结束位置（y）
            var lefts=that.cx-(offset(that.obj).left-that.obj.offsetLeft)-that.ox;   //获取事件源横向移动位置
            var tops=that.cy-(offset(that.obj).top-that.obj.offsetTop)-that.oy;         //获取事件源纵向移动位置
            if(that.sidex){        //判断是否设置了x方向的区间
                if(lefts<that.sidex[0]){    //如果lefts值小于指定的区间
                    lefts=that.sidex[0]//让lefts始终等于最小值
                }
                if(lefts>that.sidex[1]){//如果lefts值大于指定的区间
                    lefts=that.sidex[1]//让lefts始终等于最大值
                }
            }

            if(that.sidey){//和以上判断x方向区间同理
                if(tops<that.sidey[0]){
                    tops=that.sidey[0]
                }
                if(tops>that.sidey[1]){
                    tops=that.sidey[1]
                }

            }
            if(that.dragx) {//判断是否让事件源在x方向拖拽
                that.obj.style.left = lefts + "px";
            }
            if(that.dragy) {//判断是否让事件源在y方向拖拽
                that.obj.style.top = tops + "px";
            }

            that.chax=that.endx-that.startx;//计算出当前鼠标移动速度的快慢(通过前后两个点得差值计算)
            that.chay=that.endy-that.starty;//计算出当前鼠标移动速度的快慢(通过前后两个点得差值计算)
            that
            that.startx=that.endx;//让前后点调换位置
            that.starty=that.endy;
        }
    },
    mouseup:function(){ //鼠标抬起的方法
        var that=this;  //用that保存this的指针
        document.onmouseup=function(){//注册document的鼠标抬起的方法
            document.onmousemove=null;//当鼠标抬起时注销鼠标移动事件
            document.onmouseup=null;//当鼠标抬起时注销本身事件
            if(!that.animate){//判断当鼠标抬起时是否执行动画
                return;
            }
            that.animation();//如果 animate属性值为真，那么开始运行动画
        }
    },
    animation:function(){   //动画的方法
      var that=this;//用that保存this的指针
      var t=setInterval(function(){//用定时器开启动画
          if(Math.abs(that.chax)>Math.abs(that.chay)){//如果x方向的动画后运行完，要依照x的值来停止动画
              if(Math.abs(that.chax)<1){
                  clearInterval(t);
              }
          }else{//如果y方向的动画后运行完，要依照x的值来停止动画
              if(Math.abs(that.chay)<1){
                  clearInterval(t);
              }
          }
          //让x的差值 不断的乘以 速度因子
          that.chax*=that.speed;
          //让y的差值 不断的乘以 速度因子
          that.chay*=that.speed;
          //让事件源当前的位置+差值的速度=当前事件源应该在的位置
          var lefts=that.obj.offsetLeft+that.chax;
          var tops=that.obj.offsetTop+that.chay;

          /*以下的代码和mousemove里面的代码同理，都是对参数的判断*/
          if(that.sidex){
              if(lefts<that.sidex[0]){
                  lefts=that.sidex[0]
              }
              if(lefts>that.sidex[1]){
                  lefts=that.sidex[1]
              }
          }

          if(that.sidey){
              if(tops<that.sidey[0]){
                  tops=that.sidey[0]
              }
              if(tops>that.sidey[1]){
                  tops=that.sidey[1]
              }

          }
          if(that.dragx) {
              that.obj.style.left = lefts + "px";
          }
          if(that.dragy) {
              that.obj.style.top = tops + "px";
          }

      },50)

    },
    getEv:function(e){//解决事件对象兼容性的问题
        return e||window.event;
    },
    getOx:function(e){//解决获取相对于事件源位置兼容性的问题
        return e.layerX|| e.offsetX||0;
    },
    getOy:function(e){//解决获取相对于事件源位置兼容性的问题
        return e.layerY|| e.offsetY||0;
    }

}
//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
    if(getEvent(e).type=="mouseover"){
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
            !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
    }else{
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
            !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
}


//鼠标移入移除事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
    if(overfun){
        obj.onmouseover=function  (e) {

            if(checkHover(e,obj)){
                overfun.call(obj,getEvent(e));
            }
        }
    }
    if(outfun){
        obj.onmouseout=function  (e) {
            if(checkHover(e,obj)){
                outfun.call(obj,getEvent(e));
            }
        }
    }
}
//鼠标移入移除事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
    if(overfun){
        obj.onmouseover=function  (e) {

            if(checkHover(e,obj)){
                overfun.call(obj,getEvent(e));
            }
        }
    }
    if(outfun){
        obj.onmouseout=function  (e) {
            if(checkHover(e,obj)){
                outfun.call(obj,getEvent(e));
            }
        }
    }
}






















