
    var lis = document.querySelectorAll('#main_nav li');

    /*
	 * Description:
	 * Initial function.
	 */
	function calendarioStart(){
		lis[4].setAttribute('class','option');
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
			if(i == 5){
				lis[i].addEventListener('click',function(){
					location.href = "./registro.html";
				},true);		
			}
		}
		
		crear_dias();

	}
	
	function crear_dias(){

	cargarRecetasPreferidas();
	var dias = document.getElementById('etiquetas_dias');
	
			var dia1 = document.createElement('th');
			var dia2 = document.createElement('th');
			var dia3 = document.createElement('th');
			var dia4 = document.createElement('th');
			var dia5 = document.createElement('th');
			var dia6 = document.createElement('th');			
			var dia7 = document.createElement('th');

			var texto1 = document.createTextNode("DOMINGO");
			var texto2 = document.createTextNode("LUNES");
			var texto3 = document.createTextNode("MARTES");
			var texto4 = document.createTextNode("MIERCOLES");
			var texto5 = document.createTextNode("JUEVES");
			var texto6 = document.createTextNode("VIERNES");
			var texto7 = document.createTextNode("SABADO");
			

			dia1.appendChild(texto1);
			dia2.appendChild(texto2);
			dia3.appendChild(texto3);
			dia4.appendChild(texto4);
			dia5.appendChild(texto5);
			dia6.appendChild(texto6);
			dia7.appendChild(texto7);


		dias.appendChild(dia1);
		dias.appendChild(dia2);
		dias.appendChild(dia3);
		dias.appendChild(dia4);
		dias.appendChild(dia5);
		dias.appendChild(dia6);
		dias.appendChild(dia7);
		dia_seleccionado = 0;
		dia1.addEventListener('click',function(){
										dia_seleccionado = 1;
										mostrardiv()},false);
		dia2.addEventListener('click',function(){
										dia_seleccionado = 2;
										mostrardiv()},false);
		dia3.addEventListener('click',function(){
										dia_seleccionado = 3;
										mostrardiv()},false);
		dia4.addEventListener('click',function(){
										dia_seleccionado = 4;
										mostrardiv()},false);
		dia5.addEventListener('click',function(){
										dia_seleccionado = 5;
										mostrardiv()},false);
		dia6.addEventListener('click',function(){
										dia_seleccionado = 6;
										mostrardiv()},false);
		dia7.addEventListener('click',function(){
										dia_seleccionado = 7;
										mostrardiv()},false);
}

function mostrardiv(){
	var seccion_inicio = document.getElementById('div');
	div_principal = document.createElement('div');
	div_principal.setAttribute("id",'div_principal');
	div_principal.setAttribute('class','div_principal');
	
	seccion_inicio.appendChild(div_principal);
	cargarArticulos();

}
	
	window.onload = calendarioStart();