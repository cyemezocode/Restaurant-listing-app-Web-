for (var i = 1 ; i <= 20; i++) {
		j++;
		var div='<div class="sliderPane" data-i="'+i+'">'+
			'<div class="thumb">'+
				'<img src="assets/food.png">'+
			'</div>'+
			'<div class="info">'+
				'<div class="icon">'+
					'<img src="assets/restaurant.png">'+
				'</div>'+
				'<h2>RESTO'+i+'</h2>'+
				'<span>KIMIHRURA</span>'+
			'</div>'+
		'</div>';
		if(i%5==1){
			$('.slideHolder').append('<div class="scroll" data-i="'+i+'"><i class="left"><</i><i class="right">></i></dvi>');
		}
		$('.scroll').append(div);
		$('.scroll').each(function(){
		$(this).find('.sliderPane').eq(4).nextAll().remove();
		})
		$('.scroll').first().addClass('active');
	$('.right').click(function(){
		var cont = $(this).parent();
		cont.addClass('disactive');
		cont.removeClass('active');
		cont.removeClass('activee');
		cont.next().removeClass('disactivee');
		cont.next().addClass('active');
	})
	$('.left').click(function(){
		var cont = $(this).parent();
		cont.addClass('disactivee');
		cont.prev().removeClass('disactive');
		cont.prev().addClass('activee');
		cont.removeClass('active');
		cont.removeClass('activee');
	})
	}