
    var lis = document.querySelectorAll('#main_nav li');

    /*
	 * Description:
	 * Initial function.
	 */
	function queBeberStart(){		
		lis[2].setAttribute('class','option');
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
			if(i == 5){
				lis[i].addEventListener('click',function(){
					location.href = "./registro.html";
				},true);		
			}
		}
		seccion = document.getElementById('nutritivoSection');
		cargarBajarDePeso();
	}
	
	function cargarBajarDePeso(){
		var url="../xml/bebidasBajarDePeso.xml";
		var request= new XMLHttpRequest();
		
		request.addEventListener('load',procesarBajarDePeso,false);
		request.open("GET",url,true);
		request.send(null);
	}
	
	function procesarBajarDePeso(e){
	
		var xml= e.target.responseXML;
		var descripcion = xml.documentElement.getElementsByTagName("bebida");
		//numNot=receta.length;
		for(i=0;i<descripcion.length;i++){
		
			titulo = descripcion[i].getElementsByTagName("titulo")[0].textContent;
			receta = descripcion[i].getElementsByTagName("receta")[0].textContent;
			
			article = document.createElement('article');
			h3 = document.createElement('h3');
			h4 = document.createElement('h4');
			p = document.createElement('p');
			
			texto = document.createTextNode(titulo);
			h3.appendChild(texto);
			texto = document.createTextNode(receta);
			p.appendChild(texto);
						
			article.appendChild(h3);
			article.appendChild(p);
		
			seccion.appendChild(article);
		}

	}
	
	window.onload = queBeberStart();