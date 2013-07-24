
    var lis = document.querySelectorAll('#main_nav li');
	var n = 0;
	var fst = 0, lst = 0;
	var current_article = "";

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
		
		document.querySelector('#show #background').addEventListener('click', function () {
	        $('#show').fadeOut('fast');
			var nodo = document.querySelector('#compartir_article');
			while (nodo.firstChild){nodo.removeChild(nodo.firstChild);}
	    }, false);
		
		document.querySelector('#articles_left').addEventListener('click', function() { moverIzq(); }, false);
	    document.querySelector('#articles_right').addEventListener('click', function() { moverDer(); }, false);
		cargarBajarDePeso();
	}
	
	function cargarBajarDePeso(){
		var url="../xml/bebidasBajarDePeso.xml";
		var request= new XMLHttpRequest();
		
		request.addEventListener('load',procesarBajarDePeso,false);
		request.open("GET",url,true);
		request.send(null);
	}
	function moverIzq(){
	    n = n - 3;	    
		cargarBajarDePeso();
	}
	
	function moverDer(){
	    n = n + 3;	    	    
		cargarBajarDePeso();
	}
	function imprimir(id) {
		var divElements = document.getElementById(id).innerHTML;
		var oldPage = document.body.innerHTML;
		document.body.innerHTML = "<html><head><title></title></head><body>" +divElements + "</body>";
		window.print();
		document.body.innerHTML = oldPage;
		queBeberStart();
    }	

	function procesarBajarDePeso(e){
	
		var xml= e.target.responseXML;
		var descripcion = xml.documentElement.getElementsByTagName("bebida");
		while(seccion.firstChild){ seccion.removeChild(seccion.firstChild);}
		if (n < 0) { n = 0; }
	    if (n > descripcion.length - 3) { n = descripcion.length - 3; }
	    for (i = n; i < descripcion.length && i < (n + 3) ; i++){		
			titulo = descripcion[i].getElementsByTagName("titulo")[0].textContent;
			receta = descripcion[i].getElementsByTagName("receta")[0].textContent;
			
			article = document.createElement('article');
			h3 = document.createElement('h3');			
			p = document.createElement('p');			
			texto = document.createTextNode(titulo);
			h3.appendChild(texto);
			texto = document.createTextNode(receta);
			p.appendChild(texto);
						
			article.appendChild(h3);
			article.appendChild(p);
			
			article.header = titulo;
			article.recipe = receta;
	        article.addEventListener('click', function () {
	            $('#show').fadeIn('fast');
	            document.querySelector('#inner_article').innerHTML = '<h2>' + this.header + '</h2><br/>' + '<p>' + this.recipe + '</p><br><br>';
	            if (document.getElementById("but")) document.removeChild(document.getElementById("but"));
	            document.querySelector('#social').innerHTML += '<input id="but" type="button" style="background-color: rgb(140,200,0); padding-left:15px; padding-right:15px; padding-top: 5px; padding-bottom: 5px; color: white; font-size: 1em; margin-left:80px;" value="imprimir"/>';
	            document.getElementById("but").addEventListener('click', function () {
	                printDiv('inner_article');
	            }, true);
	        }, false);		
			seccion.appendChild(article);
		}
	}
	
	function printDiv(divName) {
	    var printContents = document.getElementById(divName).innerHTML;
	    var originalContents = document.body.innerHTML;
	    document.body.innerHTML = printContents;
	    window.print();
	    document.body.innerHTML = originalContents;
	    window.location.reload();
	}
	
	window.onload = queBeberStart();