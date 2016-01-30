

/*轮播*/
   
       $(function(){
       	 var imgs=$("img",".banner-right");
	       var btn=$(".yuan");
	       var index=0;
	       function demo(type){
	       	if(type=="r"){
	       		index++;
		       	if(index>=imgs.length){
		       		index=0;
		       	}
	       	}else if(type=="l"){
	       		index--;
		       	if(index<0){
		       		index=imgs.length-1;
		       	}

	       	}
	       
	       	imgs.hide();
	       	imgs.eq(index).fadeIn();
	       	btn.css({background:"#ccc"});
	       	btn.eq(index).css({background:"#333"})

	       }
	        var t=setInterval(function(){
	       	demo("r")
	       },2000);


	       $(".banner-right").hover(function(){
	       	clearInterval(t);
	       },function(){
	       	t=setInterval(function(){
	       		demo("r")
	       	},2000);
	       })

	       $("#left").click(function(){
		       	//t=setInterval(function(){
		       		demo("l")
		       
	       })

	        $("#right").click(function(){
		       //	t=setInterval(function(){
		       		demo("r")
		       	})
	       

	      btn.click(function(){
	 	var index1=$(this).index();
	 	imgs.hide();
		imgs.eq(index1).fadeIn();
		btn.css({background:"#ccc"});
		btn.eq(index1).css({background:"#333"});
	 	//demo("r");
 			//imgs.eq(index).fadeIn();
			//btn.eq(index).css({background:"#333"});
  	 	index=$(this).index();
	   })



/*下拉*/
   $(".nav-con").hover(function(){
   	    $(".erji").stop();
		$(this).find(".erji").slideDown();
	 },function(){
	 	$(".erji").stop();
		$(this).find(".erji").hide();
	 })










    $(".car-box").hover(function(){
    	$("div").stop();
		$(this).find("div").slideDown();
	 },function(){
	 	$("div").stop();
		$(this).find("div").hide();
	 })




     $(".liss").hover(function(){
    	$(".liss-1").stop();
		$(this).find(".liss-1").slideDown();
	 },function(){
	 	$(".liss-1").stop();
		$(this).find(".liss-1").hide();
	 })


/******************************************************************/
/* xiaomimingxing*/

 var n=setInterval(demo1,1000);
    function demo1(){
     $(".mxdp-bottom").eq(0).delay(2000).animate({marginLeft:-1220},600,function(){
          $(".mxdp-top>.mxdp-top-right1").css("background","url(images/3.png)")
          $(".mxdp-top>.mxdp-top-right2").css("background","url(images/4.png)")}
     ).delay(2000).animate({marginLeft:0},600,function(){ 
          $(".mxdp-top>.mxdp-top-right1").css("background","url(images/5.png)")
          $(".mxdp-top>.mxdp-top-right2").css("background","url(images/6.png)")}
          
     )
   } 
  

   $(".mxdp-top>.mxdp-top-right2").hover(function(){
    $(".mxdp-bottom").eq(0).stop(true,true);
    clearInterval(n)},function(){
  n=setInterval(demo1,1000);
}).click(function(){
  $(this).css("background","url(images/6.png)")
  $(this).siblings("div").css("background","url(images/5.png)")
  $(".mxdp-bottom").eq(0).animate({marginLeft:0})
})

$(".mxdp-top>.mxdp-top-right1").hover(function(){
  $(".mxdp-bottom").eq(0).stop(true,true);
  clearInterval(n)},function(){
  n=setInterval(demo1,1000);
}).click(function(){
   $(this).css("background","url(images/3.png)")
   $(this).siblings("div").css("background","url(images/4.png)")
  $(".mxdp-bottom").eq(0).animate({marginLeft:-1220})
})


//span滑上
 
 $(".select").hover(function(){
    $(this).find(".peitan").stop();
    $(this).find(".peitan").animate({height:76,opacity:1},300)
  },function(){
    $(this).find(".peitan").stop();
    $(this).find(".peitan").animate({height:0,opacity:0},300)
  })







//选项卡
$("#dp-ul1>.dp-li").hover(function(){
      var index2=$(this).index();
        $("#dpbox1>.dp-nr-topbox").hide();
        $("#dp-ul1>.dp-li>a").css({borderBottom:"none",
color:"black"})
        $("#dpbox1>.dp-nr-topbox").eq(index2).show();
        $("#dp-ul1>.dp-li>a").eq(index2).css({borderBottom:"2px solid #ff6700",
color:"#FF6700"})
    })





//为你推荐

var num=0;
$(".bbb").click(function(){
    var index5=$(this).index();
    //alert(index5)
      if(index5==1){
           num++;
           if(num>=2){
            num=2
            $(this).css("background","url(images/3.png)")
            $(this).siblings("div").css("background","url(images/4.png)")
           }
      }else{
        num--;
        if(num<=0){
          num=0;
          $(this).css("background","url(images/6.png)")
          $(this).siblings("div").css("background","url(images/5.png)")
        }
      }
      $(".tjs").animate({left:-1240*num})
  })




//内容
$(".ks-1").hover(function(){
	$(".ks-1>span").css("display","block")
},function(){
	$(".ks-1>span").css("display","none")
})



var val=0;

$(".ks-1>span").click(function(){
    var index6=$(this).index();
    //alert(index6)
      if(index6==3){
           val++;
           if(val>=4){
            val=3
           }
      }else{
        val--;
        if(val<0){
          val=0;
        }
      }
      $(".ks-1>#quans").css({border:"none",
background:"#ccc"})
      $(".ks-1>#quans").eq(val).css({border:"1px solid #FF6700",
background:"white"})
      $("#nr-tpbig1").animate({left:-296*val})
  })
	
	



$(".ks-1>#quans").click(function(){
    var index7=$(this).index();
    //alert(index7)
    $(".ks-1>#quans").css({border:"none",
background:"red"});
    $(this).css({border:"1px solid #FF6700",
background:"white"});
        $("#nr-tpbig1").animate({left:-296*index7});
        val=index7;

  })









})