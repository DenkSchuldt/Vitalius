	
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
					document.getElementById('title').style.visibility = 'visible';					
				} else {        
					$('#main_nav').removeClass('fixed');
					document.getElementById('title').style.visibility = 'hidden';					
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
		