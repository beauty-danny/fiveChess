///////////////计时///////////////
	var clock = $('#clock').get(0);
	var d = 0
	var firtime = 0

	function sZhen(can) {
		var ctx1 = can.getContext('2d');
		ctx1.clearRect(0, 0, 200, 200)
		ctx1.save();
		ctx1.translate(100, 100);
		ctx1.lineWidth = 2
		var data = new Date()
		var s = data.getSeconds()
		ctx1.rotate(Math.PI / 180 * 6 * d)
		ctx1.beginPath();
		ctx1.arc(0, 0, 4, 0, Math.PI * 2);
		ctx1.moveTo(0, 4);
		ctx1.lineTo(0, 10);
		ctx1.moveTo(0, -4);
		ctx1.lineTo(0, -50);
		ctx1.closePath();
		ctx1.strokeStyle = '#000000'
		ctx1.stroke();
		ctx1.restore();
		d += 1
		if(d == 61) {
			d = 0
		}
	}
	sZhen(clock)
	var fir = 0
	var sec = 0
	var t1 = setInterval(function() {
		if(flag2) {
			if(kg1) {
				fir += 1
				var s = fir % 60
				s=(s < 10) ? ('0' + s) : s
				var m = Math.floor(fir / 60)
				m=(m<10)?('0'+m):m
				$('.first').html(m + ":" + s)
			}
		}
	}, 1000)
	var t2 = setInterval(function() {
			if(flag2) {
				if(kg2) {
					sec += 1
					var s = sec % 60
					s=(s < 10) ? ('0' + s) : s
					var m = Math.floor(sec / 60)
				m=(m<10)?('0'+m):m
					$('.secend').html(m + ":" + s)
				}
			}
		}, 1000)
		///////////////点击落子///////////
	var flag = true;
	var flag2 = false;
	var kg1 = true
	var kg2 = true
	$(canvas).on('click', function(e) {
		var x = Math.floor(e.offsetX / sep)
		var y = Math.floor(e.offsetY / sep)
		if(qzwz[x + '_' + y]) {
			return;
		}
		if(flag) {
			audio.currentTime = 0
			audio.play()
			qizi(x, y, 'black')
			$('.s-img').show()
			$('.f-img').hide()
			kg2 = true
			kg1 = false
		} else {
			audio.currentTime = 0
			audio.play()
			qizi(x, y, 'white')
			$('.f-img').show()
			$('.s-img').hide()
			kg1 = true
			kg2 = false
		}
		flag = !flag
		flag2 = true
		d = 0
	})
	var t = setInterval(function() {
		if(flag2) {
			sZhen(clo ck)
		}
	}, 1000)
