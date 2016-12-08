$(document).ready(function(){
	var canvas=$('#canvas').get(0);
	var ctx=canvas.getContext('2d');
	var sep=40;
	var sR=4;
	var bR=18;
	var qizi={};
	var audio=$('#audio').get(0);
	var kaiguan=true;
	var AI=false;
	var gamestate='pause';
	var bas={};
////////////////////////////////////////////////////
	function l(x){
		return (x+0.5) * sep + 0.5;
	}
	function circle(x,y){
		ctx.save();
		ctx.beginPath();
		ctx.arc(l(x),l(y),sR,0,Math.PI * 2)
		ctx.fill();
		ctx.closePath();
		ctx.restore();		
	}
	function qipan(){
		ctx.save();
		ctx.clearRect(0,0,600,600)
		ctx.beginPath();
		for(var i=0;i<15;i++){
			ctx.moveTo(l(0),l(i));
			ctx.lineTo(l(14),l(i));
			ctx.moveTo(l(i),l(0));
			ctx.lineTo(l(i),l(14));
		}		
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
		circle(3,3);
		circle(3,11);
		circle(7,7);
		circle(11,3);
		circle(11,11);
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){
				bas[link(i,j)]=true;
			}
		}
	}
	qipan();
	function luozi(x,y,color){
		ctx.save();
		ctx.beginPath();
		ctx.translate(l(x),l(y));
		var grad=ctx.createRadialGradient(-6,-3,0,0,0,18)
		if(color==='black'){
			grad.addColorStop(0.1,'#eee');
			grad.addColorStop(0.2,'#fff');
			grad.addColorStop(1,'#000');
		}else if(color==='white'){
			grad.addColorStop(0.1,'#fff');
			grad.addColorStop(1,'#ccd');
		}
		ctx.fillStyle=grad;
		ctx.arc(0,0,bR,0,Math.PI * 2);
		ctx.shadowOffsetX=2;
		ctx.shadowOffsetY=3;
		ctx.shadowBlur=4;
		ctx.shadowColor='rgba(0,0,0,0.5)';
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		qizi[x+"_"+y]=color;
		gamestate="play";
		delete bas[link(x,y)];
	}
	
	/////////////////////////
	var s=0;
	var canvas_one=$('#canvas_one').get(0);
	var ctx_one=canvas_one.getContext('2d');
	ctx_one.save();
	function hei(){   //黑方	
			ctx_one.clearRect(0,0,100,100);
			ctx_one.save();		
			ctx_one.translate(50,50);			
			ctx_one.rotate(Math.PI / 180 *6*s);
			ctx_one.beginPath();
			ctx_one.arc(0,0,5,0,Math.PI*2);
			ctx_one.fill()
			ctx_one.moveTo(0,5);
			ctx_one.lineTo(0,20);
			ctx_one.moveTo(0,-5);
			ctx_one.lineTo(0,-30);	
			ctx_one.closePath();
			ctx_one.strokeStyle='red';
			ctx_one.stroke()
			ctx_one.restore();
			s+=1;
			if(s==61){
				s=0;
			}
		}
//	else{
//			ctx_one.clearRect(0,0,100,100);
//		}
	hei();
	ctx_one.restore();
//	}

////////////////////////////////////////////
//	var canvas_two=$('#canvas_two').get(0);
//	var ctx_two=canvas_two.getContext('2d');
//	var w=0;
//	function bai(){   //白方	
//		w++;
//		if(w<60&&w>0){
//			ctx_two.clearRect(0,0,100,100);
//			ctx_two.save();		
//			ctx_two.translate(50,50);
//			ctx_two.beginPath();
//			ctx_two.rotate(Math.PI * 2 / 60 * w);
//			ctx_two.arc(0,0,5,0,Math.PI*2);
//			ctx_two.fillStyle='red'
//			ctx_two.fill()
//			ctx_two.moveTo(0,5);
//			ctx_two.lineTo(0,20);
//			ctx_two.moveTo(0,-5);
//			ctx_two.lineTo(0,-30);	
//			ctx_two.closePath();
//			ctx_two.strokeStyle='#000';
//			ctx_two.stroke()
//			ctx_two.restore();
//		}else{
//			ctx_two.clearRect(0,0,100,100);
//		}		
//	}
	/////////////////////////
	function link(a,b){
		return a+'_'+b;
	}
	function panduan(x,y,color){
		///横列
		var nheng=1;
		var i;
		i=1;while(qizi[link(x+i,y)]===color){nheng++;i++;}
		i=1;while(qizi[link(x-i,y)]===color){nheng++;i++;}
		/////竖列
		var nshu=1;
		i=1;while(qizi[link(x,y+i)]===color){nshu++;i++;}
		i=1;while(qizi[link(x,y-i)]===color){nshu++;i++;}
		////左斜
		var nzuo=1;
		i=1;while(qizi[link(x-i,y-i)]===color){nzuo++;i++;}
		i=1;while(qizi[link(x+i,y+i)]===color){nzuo++;i++;}		
		////右斜
		var nyou=1;
		i=1;while(qizi[link(x-i,y+i)]===color){nyou++;i++;}
		i=1;while(qizi[link(x+i,y-i)]===color){nyou++;i++;}
		return Math.max(nheng,nshu,nzuo,nyou);				
	}
///////棋谱////////////////////////////////////////////////
	function chessMenu(){
		ctx.save();
		ctx.font='20px 微软雅黑';
		ctx.textBaseline='middle';
		ctx.textAlign='center';
		var n=1;
		for(var j in qizi){
			var arr=j.split('_');
			if(qizi[j]==='white'){
				ctx.fillStyle='black';
			}else{
				ctx.fillStyle='white';
			}
			
			ctx.fillText(n++,l(parseInt(arr[0])),l(parseInt(arr[1])))
		}
		ctx.restore();
		$('<img>').attr('src',canvas.toDataURL()).appendTo('.canvas_box')
		$('<a>').attr('href',canvas.toDataURL()).attr('download','a.png').appendTo('.canvas_box')		
	}
////////人机对弈////////////////////////////////////////	
	function intel(){
		var max=-Infinity;
		var pos={};
		for(var k in bas){
			var x=parseInt(k.split('_')[0]);
			var y=parseInt(k.split('_')[1]);
			var m=panduan(x,y,'black');
			if(m>max){
				max=m;
				pos.x=x;
				pos.y=y;
			}
		}
		var max1=-Infinity;
		var pos1={};
		for(var k in bas){
			var x=parseInt(k.split('_')[0]);
			var y=parseInt(k.split('_')[1]);
			var m=panduan(x,y,'white');
			if(m>max1){
				max1=m;
				pos1.x=x;
				pos1.y=y;
			}
		}
		if(max>max1){
			return pos;
		}else{
			return pos1;
		}
	}
////////////////////////////////////////////////////
	function moving(e){
		var x=Math.floor(e.offsetX/sep);
		var y=Math.floor(e.offsetY/sep);		
		if(qizi[x+'_'+y]){return;}
		audio.play()
		var t_hei;
		var t_bai;
		if(AI){
			
			luozi(x,y,"black");
			if(panduan(x,y,"black")>=5){
				$(canvas).off("click");
				$('.win').css('display','block');
				$('.win p').html('恭喜！黑棋胜利');
				clearInterval(t);
			};
			var p=intel();
			luozi(p.x,p.y,"white");
			if(panduan(p.x,p.y,"white")>=5){
				$(canvas).off("click");
				$('.win').css('display','block');
				$('.win p').html('恭喜！白棋胜利');
				clearInterval(t);
			}
			return false;
		}
		if(kaiguan){
			luozi(x,y,'black');
			if(panduan(x,y,'black')>=5){
				$('.win').css('display','block');
				$('.win p').html('恭喜！黑棋胜利');
				$(canvas).off('click');
				clearInterval(t);
				hei()
			}			
			$('#black').css('opacity','0.5')
			$('#white').css('opacity','1')
//			t_bai=setInterval(bai,100);
			
//			w=0;
		}else{
			luozi(x,y,'white');
			if(panduan(x,y,'white')>=5){
				$('.win').css('display','block');
				$('.win p').html('恭喜！白棋胜利');
				$(canvas).off('click');
				clearInterval(t);
			}
			$('#black').css('opacity','1')
			$('#white').css('opacity','0.5')			
//			t_hei=setInterval(hei,100);
			
//			b=0;
		}
		kaiguan=!kaiguan;
		flag2=true;
	    s=0;
		var t=setInterval(function(){
			if(flag2){
				hei();
			}
		},1000)
	}
////////////////////////////////////////////////////	
	function start(){
		qipan();
		$('.win').css('display','none');
		kaiguan=true;
		qizi={};
		$(canvas).on('click',moving);
		gamestate='pause';
	}
///////////////////////////////////////////////////
	$(canvas).on('click',moving);
	$('.again').on('click',start);
	$('.menu').on('click',function(){		
		chessMenu();
		$('.canvas_box').show()
	})
	$('.canvas_box .cha').on('click',function(){
		$('.canvas_box').css('display','none');
		qipan();
		$('.canvas_box img').remove();
		$('.canvas_box a').remove()
		for(var k in qizi){
			var x=parseInt(k.split('_')[0]);
			var y=parseInt(k.split('_')[1]);
			luozi(x,y,qizi[k]);
		}
	})
////////////////////////////////////////////////////////////	
	$('.mashine').on('click',function(){////单机模式
		if(gamestate==='play'){
			return;
		}
		$('.people').removeClass('active');
		$('.mashine').addClass('active');
		AI=true;
	})
	$('.people').on('click',function(){////人人模式
		if(gamestate==='play'){
			return;
		}
		$('.people').addClass('active');
		$('.mashine').removeClass('active');
		AI=false;
	})
	
//////////////////////////////////////////////////////////////////	
	//按钮点击
	$('.enter').on('click',function(){
		$('.zhao').css('display','none')
	})
	$('.start').on('click',function(){
		$('.start_blank').css('display','block');
	})
	$('.start_blank div:nth-of-type(1)').on('click',function(){
		$('.start_blank').css('display','none');
		start();
	})
	$('.start_blank div:nth-of-type(2)').on('click',function(){
		$('.start_blank').css('display','none')
	})
	$('.end').on('click',function(){
		$('.end_blank').css('display','block');
	})
	$('.end_blank div:nth-of-type(1)').on('click',function(){
		$('.end_blank').css('display','none')
	})
	$('.end_blank div:nth-of-type(2)').on('click',function(){
		$('.end_blank').css('display','none')
	})
	
	
})







//$(document).ready(function(){
	
//})
/////////公告轮播
$(document).ready(function(){
	var n=0;
	var T=setInterval(move,2000);
	function move(){
		if(n>=$('.img .img_p p').length){
			n=0;
		}
		$('.img .img_p p').css('display','none').eq(n).css('display','block');
		n++;
	}
	////////////////////////
	var n1=0;
	var T1=setInterval(move1,2000);
	function move1(){
		if(n1>=$('.img_p1 p').length){
			n1=0;
		}
		$('.img_p1 p').css('display','none').eq(n1).css('display','block');
		n1++;
	}
	////////////////
	var n2=0;
	var T2=setInterval(move2,2000);
	function move2(){
		if(n2>=$('.img_p2 p').length){
			n2=0;
		}
		$('.img_p2 p').css('display','none').eq(n2).css('display','block');
		n2++;
	}
})
