$(document).ready(function(){
	var canvas=$('#canvas').get(0);
	var ctx=canvas.getContext('2d');
	var sep=40;
	var sR=4;
	var bR=18;
	var qizi={};
	var audio=$('#audio').get(0);
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
	}
	qipan();
	function luozi(x,y,color){
		ctx.save();
		ctx.beginPath();
		ctx.translate(l(x),l(y));
		var grad=ctx.createRadialGradient(-6,-3,0,0,0,18)
		if(color=='black'){
			grad.addColorStop(0.1,'#eee');
			grad.addColorStop(0.2,'#fff');
			grad.addColorStop(1,'#000');
		}else{
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
		qizi[x+'_'+y]=color;
		ctx.closePath();
		ctx.restore();	
	}
	var kaiguan=true;
	$(canvas).on('click',function(e){
		var x=Math.floor(e.offsetX/sep);
		var y=Math.floor(e.offsetY/sep);		
		if(qizi[x+'_'+y]){return;}
		audio.play()
		if(kaiguan){
			luozi(x,y,'black');
			$('#black').css('opacity','0.5')
			$('#white').css('opacity','1')
			var t=setInterval(function(){
				render2()
			},100);
			clearInterval(t0)
		}else{
			luozi(x,y,'white');
			$('#black').css('opacity','1')
			$('#white').css('opacity','0.5')
			clearInterval(t)
			var t0=setInterval(function(){
				render()
			},100);
		}
		kaiguan=!kaiguan;
	})
	/////////////////////////

	var canvas_one=$('#canvas_one').get(0);
	var ctx_one=canvas_one.getContext('2d');
	
	function miaozhen(){
		var date=new Date();
		var s=date.getSeconds();
		ctx_one.save();
		ctx_one.beginPath();
//		for(var i=0;i<s;i++){
			ctx_one.rotate(Math.PI / 180 * 6 * s);
//		}
		
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
		/////////////////////	
	}
	function render(){
		ctx_one.save();
		ctx_one.clearRect(0,0,100,100);
		ctx_one.translate(50,50);
		miaozhen();
		ctx_one.restore();
		
	}
	var t0=setInterval(function(){
		render()
	},100);
	var canvas_two=$('#canvas_two').get(0);
	var ctx_two=canvas_two.getContext('2d');
	function miaozhen2(){   //白方
		var date=new Date();
		var s=date.getSeconds();
		ctx_two.save();		
		
		ctx_two.beginPath();
//		for(var i=0;i<300;i++){
			ctx_two.rotate(Math.PI / 180 * 6 * s );
//		}
		ctx_two.arc(0,0,5,0,Math.PI*2);
		ctx_two.fillStyle='red'
		ctx_two.fill()
		ctx_two.moveTo(0,5);
		ctx_two.lineTo(0,20);
		ctx_two.moveTo(0,-5);
		ctx_two.lineTo(0,-30);	
		ctx_two.closePath();
		ctx_two.strokeStyle='#000';
		ctx_two.stroke()
		ctx_two.restore();
	}
	function render2(){
		ctx_two.save();
		ctx_two.clearRect(0,0,100,100);
		ctx_two.translate(50,50);
		miaozhen2();
		ctx_two.restore();
	}
	
	var t=setInterval(function(){
		render2()
	},100);
})
