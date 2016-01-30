$(function(){
	var car=$("#car")[0];
	var carGu=$("#gu")[0];
	var back=$(".leftback")[0];
	var arr=["#153166","#653538","#104F59","#161616","#665A5C"];

	//console.log(two)
	/*head car*/
	car.onmouseover=function(){
		carGu.style.display="block";
	}
	car.onmouseout=function(){
		carGu.style.display="none";
	}
	/*banner 轮播*/
	var img=$(".banner1");
	var btn=$(".yuan")
	//console.log(btn)
	back.style.background=arr[0];
	var t=setInterval(move,3000);
	var num=0;
	btn[0].style.background="#333";
	function move(){
		num++;
		if(num==img.length){
			num=0;
		}
		for(var i=0;i<img.length;i++){
			img[i].style.display="none";
			btn[i].style.background="";
		}
		img[num].style.display="block";
		back.style.background=arr[num];
		btn[num].style.background="#333";
	}
	/*banner xuangxiangka*/
	for(var i=0;i<btn.length;i++){
		btn[i].index=i;
		btn[i].onmouseover=function(){
			clearInterval(t);
			for(var j=0;j<img.length;j++){
				img[j].style.display="none";
				btn[j].style.background="";
			}

			img[this.index].style.display="block";
			btn[this.index].style.background="#333";
		}
		btn[i].onmouseout=function(){
			t=setInterval(move,3000);
		}
		
	}
	/*banner 左右选项卡*/
	// var stree=$(".stree")[0];
	// var two=$(".two")[0];
	// //console.log(two)
	// stree.onmouseover=function(){
	// 	two.style.display="block";
	// }
	// stree.onmouseout=function(){
	// 	two.style.display="none";
	// }

	// var leftbtn=$("#left")[0];
	// var rightbtn=$("#right")[0];
	// //console.log(leftbtn)
	// rightbtn.onclick=function(){
	// 	// for (var i = 0; i < img.length; i++) {
	// 	// 	img[i].style.display='block';
	// 	// }
	// 		t=setInterval(move,3000);
	// }
	
	// rightbtn.onmouseover=function(){
	// 	clearInterval(t);
	// }

	/*banner left选项卡*/
	var leftBtn=$(".outleft");
	var xuanOne=$(".xuanone");
	//console.log(xuanOne)

	for(var i=0;i<leftBtn.length;i++){
		leftBtn[i].index=i;
		leftBtn[i].onmouseover=function(){
			for(var j=0;j<xuanOne.length;j++){
				xuanOne[j].style.display="none";
			}
			xuanOne[this.index].style.display="block";
		}
		leftBtn[i].onmouseout=function(){
			xuanOne[this.index].style.display="none";
		}
	}
})