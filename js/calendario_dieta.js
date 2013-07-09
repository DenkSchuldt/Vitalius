
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


	function cargarArticulos(){
		var url = "../xml/recetas.xml";
		var request = new XMLHttpRequest();
		request.addEventListener('load',procesarArticulos,false);
		request.open("GET",url,true);
		request.send(null);
	}

	function procesarArticulos(e){

	var xml=e.target.responseXML;
	var recetas= xml.querySelectorAll('receta');
	
	
	
	for(i=0;i<recetas.length;i++){
	
		var titulo = recetas[i].querySelector('titulo').childNodes[0].nodeValue;
		var id = recetas[i].querySelector('id').childNodes[0].nodeValue;
		var imagen = recetas[i].querySelector('imagen').childNodes[0].nodeValue;
		
		var article = document.createElement('article');
		var h2 = document.createElement('h1');
			
		var texto = document.createTextNode(titulo);
		h2.appendChild(texto);
		
		img=imagen;
		
		var imgfig= document.createElement('img');
		imgfig.src=img;
		imgfig.width="200";
		imgfig.height="200";
		var fig=document.createElement('fig');
			
		fig.appendChild(imgfig);
		
		h2.setAttribute('class','titulo');
		
		
		article.appendChild(h2);
		article.appendChild(fig);
		article.setAttribute('class','receta');
		article.addEventListener('click',function(){
											this.setAttribute('class','cambia_fondo_articulo');
										},false);
		
		
		div_principal.appendChild(article);

		}
		
		var boton_cerrar=document.createElement('input');
		boton_cerrar.setAttribute('type','button');
		//boton_cerrar.setAttribute('class','boton_cerrar');
		boton_cerrar.setAttribute('value','CerrarDiv');
		boton_cerrar.addEventListener('click', function(){
										div_principal.setAttribute('class','cerrar_div');
										});

		
		var boton_aceptar=document.createElement('input');
		boton_aceptar.setAttribute('type','button');
		boton_aceptar.setAttribute('value','Agregar Recetas');
		
		boton_aceptar.addEventListener('click', agregar_Recetas,false);
	
	
	
		div_principal.appendChild(boton_aceptar);
		div_principal.appendChild(boton_cerrar);
		
		}
		
				
function agregar_Recetas(){	
	div_principal.setAttribute("class","esconder_div");
	recetas_div = document.getElementsByClassName('cambia_fondo_articulo');
	
	
	for (i=0; i<recetas_div.length;i++){	
		if (dia_seleccionado == 1){
				div_calendar = document.getElementById("domingo");
				div_calendar.appendChild(recetas_div[i]);
			}
			if (dia_seleccionado == 2){
				div_calendar = document.getElementById("lunes");
				div_calendar.appendChild(recetas_div[i]);
			}
			if (dia_seleccionado == 3){
				div_calendar = document.getElementById("martes");
				div_calendar.appendChild(recetas_div[i]);
			}
			if (dia_seleccionado == 4){
				div_calendar = document.getElementById("miercoles");
				div_calendar.appendChild(recetas_div[i]);
			}
			if (dia_seleccionado == 5){
				div_calendar = document.getElementById("jueves");
				div_calendar.appendChild(recetas_div[i]);
			}
			if (dia_seleccionado == 6){
				div_calendar = document.getElementById("viernes");
				div_calendar.appendChild(recetas_div[i]);
			}
			if (dia_seleccionado == 7){
				div_calendar = document.getElementById("sabado");
				div_calendar.appendChild(recetas_div[i]);
			}	
			
			recetas_div[i].addEventListener("ondragstart",drag,false);
			recetas_div[i].setAttribute('draggable','true');
			//recetas_div[i].setAttribute('class','cambia_fondo_articulo_2');	
			
		}
		
		
		/*
					contador = contador + 1;
			
			if (contador > 0){
				quitar_clase();
			}*/
}		

		
function allowDrop(ev)
{
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
}

function drag(ev)
{
	ev.dataTransfer.setData("Text",ev.target.id);
	ev.dataTransfer.effectAllowed = 'move';
}

function drop(ev)
{
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
	ev.target.appendChild(document.getElementById(data));
}

function cargarRecetasPreferidas(){
		var url_p =  "../xml/recetas_preferidas.xml";
		var request = new XMLHttpRequest();
		request.addEventListener('load',procesarRecetasPreferidas,false);
		request.open("GET",url_p,true);
		request.send(null);

}

function procesarRecetasPreferidas(e){

	var sectionPreferidas = document.getElementById('div_preferidas');
	var xml=e.target.responseXML;
	var recetas= xml.querySelectorAll('receta');
	
	
	
	for(i=0;i<recetas.length;i++){
	
		var titulo = recetas[i].querySelector('titulo').childNodes[0].nodeValue;
		var id = recetas[i].querySelector('id').childNodes[0].nodeValue;
		var imagen = recetas[i].querySelector('imagen').childNodes[0].nodeValue;
		
		var article = document.createElement('div');
		var h2 = document.createElement('h1');
			
		var texto = document.createTextNode(titulo);
		h2.appendChild(texto);
		
		img=imagen;
		
		var imgfig= document.createElement('img');
		imgfig.src=img;
		imgfig.width="100";
		imgfig.height="100";
		var fig=document.createElement('fig');
			
		fig.appendChild(imgfig);
		
		h2.setAttribute('class','titulo');
		
		
		article.appendChild(h2);
		article.appendChild(fig);
		article.setAttribute('class','receta');
		article.addEventListener('click',function(){
											this.setAttribute('class','cambia_fondo_articulo');
											},false);
		
		article.addEventListener('ondragstart',drag,true);
		article.setAttribute('class','over');
		sectionPreferidas.appendChild(article);
		

		}
}

	
	window.onload = calendarioStart();