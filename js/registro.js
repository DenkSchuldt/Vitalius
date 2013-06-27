
    var lis = document.querySelectorAll('#main_nav li');

    /*
	 * Description:
	 * Initial function.
	 */
	function registroStart(){		
		lis[5].setAttribute('class','option');
		for(var i=0; i<lis.length; i++){
			if(i == 0){
				lis[i].addEventListener('click',function(){
					location.href = "../index.html";
				},true);		
			}
			if(i == 1){
				lis[i].addEventListener('click',function(){
					location.href = "./que_comer.html";
				},true);		
			}
			if(i == 2){
				lis[i].addEventListener('click',function(){
					location.href = "./que_beber.html";
				},true);		
			}
			if(i == 3){
				lis[i].addEventListener('click',function(){
					location.href = "./recetas.html";
				},true);		
			}			
			if(i == 4){
				lis[i].addEventListener('click',function(){
					location.href = "./calendario_dieta.html";
				},true);		
			}
		}
	}
	
	window.onload = registroStart();