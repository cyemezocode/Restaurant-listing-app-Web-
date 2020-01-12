$(document).ready(function(){
	$.ajax({
		type:'GET',
		url:'https://developers.zomato.com/api/v2.1/search',
		beforeSend:function(data){
			data.setRequestHeader('user-key','b2df27e628f389853aa2116b34543922');
		},
		success:function(data){
			var res =data.restaurants;
			var i=0;
			$(res).each(function(){
				var fin = $(this);
				i++;
				$(fin).each(function(){
					var div='<div class="sliderPane" data-id="'+this['restaurant']['id']+'">'+
			'<div class="thumb">'+
				'<img image" src="'+this['restaurant']['thumb']+'">'+
			'</div>'+
			'<div class="info">'+
				'<div class="icon">'+
					'<img src="'+this['restaurant']['thumb']+'">'+
				'</div>'+
				'<h2>'+this['restaurant']['name']+'</h2>'+
				'<span>$$$ '+this['restaurant']['location']['locality']+'</span>'+
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
		
				})

			})
		$('.left').first().hide();
		$('.right').eq(-1).hide();
		openRestaurant();
		}

	})
	$('.top span').click(function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	})
	$('#infos').click(function(){
		$('#info').show();
		$('#rating').hide();
	})
	$('#rates').click(function(){
		$('#rating').show();
		$('#info').hide();
	})
	function openRestaurant(){
		$('.sliderPane').click(function(){
			$.cookie('resto_id', $(this).data('id'));
			window.location='resto_details.html';
		})		
	}
	var id = $.cookie('resto_id');
	$.ajax({
		type:'GET',
		url:'https://developers.zomato.com/api/v2.1/restaurant?res_id='+id+'',
		beforeSend:function(data){
			data.setRequestHeader('user-key','b2df27e628f389853aa2116b34543922');
		},
		success:function(data){
			$(data).each(function(){
				$('.restoinfo h1').text(this['name']);
				$('.restoinfo span').text(this['location']['locality']);
				$('#thumb').attr('src',this['thumb']);
				$('#name').text(this['name']);
				$('#phone').text(this['phone_numbers']);
				$('#website').text(this['url']);
				$('#location').text(this['location']['locality']);
				$('#delivery').text(this['has_online_delivery']);
				$('#booking').text(this['has_table_booking']);
				$('#cousine').text(this['cuisines']);
				$('#range').text(this['price_range']);
				$('#currency').text(this['currency']);
				var rate='<div class="userrate">'+
					'<div class="thumb">'+
						'<img src="assets/restaurant.png">'+
					'</div>'+
					'<div class="details"><b>Username</b><br>'+
					'<label>'+this.user_rating.aggregate_rating+' Stars</label><br>'+
					'<p>'+this.user_rating.rating_text+'</p></div>'+
				'</div>';
				$('#rating').append(rate);
			})
		}
	})
	var id = $.cookie('resto_id');
	$.ajax({
		type:'GET',
		url:'https://developers.zomato.com/api/v2.1/dailymenu?res_id='+id+'',
		beforeSend:function(data){
			data.setRequestHeader('user-key','b2df27e628f389853aa2116b34543922');
		},
		success:function(data){
			if(data==''){
			$('.breakfast').append('<li>'+this.message+'</li>');

			}
			$(data).each(function(){
			var dish = this['daily_menus'];
			$(dish).each(function(){
			$('.breakfast').append('<li>'+this['daily_menu']['name']+' <span>'+this['daily_menu']['dishes'][0]['dish']['price']+'</span></li>');

			})

			})
		}
	})
	$('.searchingbtn').click(function(){
		$.cookie('q',$('#q').val());
		window.location='search_result.html';
	})
	var q=$.cookie('q');
		$.ajax({
		type:'GET',
		url:'https://developers.zomato.com/api/v2.1/search?entity_type=city&q='+q+'',
		beforeSend:function(data){
			data.setRequestHeader('user-key','b2df27e628f389853aa2116b34543922');
		},
		success:function(data){
			if(data==''){
				$('.slider').html('<h1>No restaurant found<h1>');
			}
			var res =data.restaurants;
			var i=0;
			$(res).each(function(){
				var fin = $(this);
				i++;
				$(fin).each(function(){
					var div='<div class="sliderPane" data-id="'+this['restaurant']['id']+'">'+
			'<div class="thumb">'+
				'<img image" src="'+this['restaurant']['thumb']+'">'+
			'</div>'+
			'<div class="info">'+
				'<div class="icon">'+
					'<img src="'+this['restaurant']['thumb']+'">'+
				'</div>'+
				'<h2>'+this['restaurant']['name']+'</h2>'+
				'<span>$$$ '+this['restaurant']['location']['locality']+'</span>'+
			'</div>'+
		'</div>';
		$('.slider.search').append(div);
		})
			})
			$('.searching h1').text(data.results_shown+ ' found restaurants');
			openRestaurant();
			setHeight();
		}
		})
		$('#q').val($.cookie('q'));
		$('#q').keydown(function(e){
			if(e.which==13){
				$('.searchingbtn').trigger('click');
			}
		})
function setHeight(){
	var height=0;
	$('.sliderPane').each(function(){
		if($(this).height()>height){
			height=$(this).height();
			console.log(height);
		}
			console.log($(this).height());
	})
			console.log('last'+height);

	$('.sliderPane').css('height',height+'px');
}
})