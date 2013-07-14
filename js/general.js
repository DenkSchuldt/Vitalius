	
	var divs = document.querySelectorAll('#content div');
	var lis = document.querySelectorAll('#main_nav li');
	
	$(function () {
	    var pull = $('#pull');
	    var menu = $('#main_nav ul');
	    var menuHeight = menu.height();
	    $(pull).on('click', function (e) {	        
	        e.preventDefault();
	        menu.slideToggle();	        
	    });	    
	});

	/*
	 * Description:
	 * Determines if the nav bar is located at the top of the page. If so, changes is position to fixed,
	 * so that the 'floating' effect will be shown.
	 */
	$(function () {  		
		var msie6 = $.browser == 'msie' && $.browser.version < 7;  
		if (!msie6) {
			var top = $('#main_nav').offset().top - parseFloat($('#main_nav').css('margin-top').replace(/auto/, 0));
			$(window).scroll(function (event) {						
				var y = $(this).scrollTop();            
				if (y >= top) {        
					$('#main_nav').addClass('fixed');
					$('#title').fadeIn();
				} else {        
					$('#main_nav').removeClass('fixed');
					$('#title').fadeOut();
				}
			});
		}  
	});

	/*
	 * Description:
	 * Animates the page, scrolling to a selected item.
	 */
	function moveVerticalTo(pos,velocidad){
		$('html, body').animate({scrollTop: pos}, velocidad);
	}
	
	/*
	 * Description:
	 * Returns the new coordinates of the element passed as parameter.
	 */
	function position(elem){
		var offset = $('#'+elem).offset();
		return(offset.top);
	}	
		

	function parseDay(day) {
	    switch (day) {
	        case 0:
	            return "Lunes";
	            break;
	        case 1:
	            return "Martes";
	            break;
	        case 2:
	            return "Miercoles";
	            break;
	        case 3:
	            return "Jueves";
	            break;
	        case 4:
	            return "Viernes";
	            break;
	        case 5:
	            return "Sabado";
	            break;
	        case 6:
	            return "Domingo";
	            break;
	    }
	}

	function parseMonth(month) {
	    switch (month) {
	        case 0:
	            return "Enero";
	            break;
	        case 1:
	            return "Febrero";
	            break;
	        case 2:
	            return "Marzo";
	            break;
	        case 3:
	            return "Abril";
	            break;
	        case 4:
	            return "Mayo";
	            break;
	        case 5:
	            return "Junio";
	            break;
	        case 6:
	            return "Julio";
	            break;
	        case 7:
	            return "Agosto";
	            break;
	        case 8:
	            return "Septiembre";
	            break;
	        case 9:
	            return "Octubre";
	            break;
	        case 10:
	            return "Noviembre";
	            break;
	        case 11:
	            return "Diciembre";
	            break;
	    }
	}

	function animate(elem, style, unit, from, to, time) {
	    if (!elem) return;
	    var start = new Date().getTime(),
        timer = setInterval(function () {
            var step = Math.min(1, (new Date().getTime() - start) / time);
            elem.style[style] = (from + step * (to - from)) + unit;
            if (step == 1)
                clearInterval(timer);
        }, 25);
	    elem.style[style] = from + unit;
	}