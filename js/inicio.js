
    var n = 0, seccion, section2;

	/*	
	 * Description:
	 * Initial function.
	 */
	function inicioStart() {	    
		seccion = document.getElementById('articles_left');
		section2 = document.getElementById('articles_right');
		cargarArticulos();
		lis[0].setAttribute('class','option');
		document.getElementById('up').addEventListener('click',function(){
			moveVerticalTo(position('main_header'),1000);
		});
		for(var i=1; i<lis.length; i++){
			if(i == 1){
				lis[i].addEventListener('click',function(){
					location.href = "./pages/que_comer.html";
				},true);		
			}
			if(i == 2){
				lis[i].addEventListener('click',function(){
					location.href = "./pages/que_beber.html";
				},true);		
			}
			if(i == 3){
				lis[i].addEventListener('click',function(){
					location.href = "./pages/recetas.html";
				},true);		
			}
			if(i == 4){
				lis[i].addEventListener('click',function(){
					location.href = "./pages/calendario_dieta.html";
				},true);		
			}
			if(i == 5){
				lis[i].addEventListener('click',function(){
					location.href = "./pages/registro.html";
				},true);		
			}
		}		
	}	
	
	function moverIzq(){
		n=n-3;
		cargarNoticias();
	}
	
	function moverDer(){
		n=n+3;
		cargarNoticias();
	}

	function cargarArticulos(){
		var url = "./xml/articulos.xml";
		var request = new XMLHttpRequest();
		request.addEventListener('load',procesarArticulos,false);
		request.open("GET",url,true);
		request.send(null);
	}

	function procesarArticulos(e){
		var texto,titulo,descripcion,enlace,imagen,article,h2,p;	
		while(seccion.firstChild) {
			seccion.removeChild(seccion.firstChild);
		}
		var xml = e.target.responseXML;
		var articulos=xml.documentElement.getElementsByTagName("articulo");	
		if(n < 0){
			n = 0;
		}
		if(n > articulos.length-3){
			n = articulos.length-3;
		}
		for(i=0;i<articulos.length&&i<(n+3);i++){
			var titulo=articulos[i].getElementsByTagName("titulo")[0].textContent;
			var descripcion=articulos[i].getElementsByTagName("descripcion")[0].textContent;
			var imagen=articulos[i].getElementsByTagName("imagen")[0].textContent;
			var ul=document.createElement('ul');
			var article=document.createElement('article');
			var h2=document.createElement('h2');
			var p=document.createElement('p');
			ul.setAttribute("class","out");
			ul.setAttribute("id",imagen);
			article.setAttribute("class","out");
			ul.addEventListener('mouseover',function(){
				this.setAttribute("class","on");
			},false);
			ul.addEventListener('mouseout',function(){
				this.setAttribute("class","out");
			},false);
			ul.addEventListener('click',function(){
				while(section2.firstChild) {
					section2.removeChild(section2.firstChild);
				}
				var h1 = document.createElement("h1");
				h1.innerHTML = "Articulo no encontrado";				
				section2.appendChild(h1);
			},false);
			texto = document.createTextNode(titulo);
			h2.appendChild(texto);
			texto=document.createTextNode(descripcion);
			p.appendChild(texto);
			p.style.textAlign = "justify";
			article.appendChild(h2);			
			article.appendChild(p);
			article.appendChild(document.createElement('hr'));
			ul.appendChild(article);
			seccion.appendChild(ul);
		}
	}
	
	window.onload = inicioStart();