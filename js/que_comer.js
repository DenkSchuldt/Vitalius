
    var lis = document.querySelectorAll('#main_nav li');
	var n = 0, seccion, saber;
	var m=0;

    /*
	 * Description:
	 * Initial function.
	 */
	function queComerStart(){		
	    seccion = document.getElementById('queComer_articulos');	    
	    saber = document.getElementById("div_debajo");	
		
	    document.querySelector('#show #background').addEventListener('click', function () {
	        $('#show').fadeOut('fast');
	    }, false);

        var izq = document.getElementById("izquierda");
        var der = document.getElementById("derecha");
        var izq2 = document.getElementById("izquierda2");
        var der2 = document.getElementById("derecha2");    

        izq.addEventListener('click',function(e){
	        m--;
	        cargarArticulos();
	    },false);
	
        der.addEventListener('click',function(e){
	        m++;
	        cargarArticulos();
	    },false);
	
        izq2.addEventListener('click',function(e){
	        n--;
	        cargarArticulos();
	    },false);

        der2.addEventListener('click',function(e){
	        n++;
	        cargarArticulos();
	    },false);
		
        cargarArticulos();

		lis[1].setAttribute('class','option');
		for(var i=0; i<lis.length; i++){
			if(i == 0){
				lis[i].addEventListener('click',function(){
					location.href = "../index.html";
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
			if(i == 5){
				lis[i].addEventListener('click',function(){
					location.href = "./registro.html";
				},true);		
			}
		}
	}

	function cargarArticulos(){
		var url = "../xml/que_comer.xml";
		var request = new XMLHttpRequest();
		request.addEventListener('load',procesarArticulos,false);
		request.open("GET",url,true);
		request.send(null);
	}

	function procesarArticulos(e){
		var texto, titulo, descripcion, enlace, imagen, article, h2, p;	
		while(seccion.firstChild) {
			seccion.removeChild(seccion.firstChild);
		}
		if(saber.getElementsByTagName("p")[0]){
			saber.removeChild(saber.getElementsByTagName("p")[0]);
		}
		var xml = e.target.responseXML;
		var articulos = xml.documentElement.getElementsByTagName("comida");	
		var sabias = xml.documentElement.getElementsByTagName("sabias");
		if(m < 0) m = 0;
		if (m > sabias.length - 1) m = sabias.length - 1;

		var pf = document.createElement('p');		
		pf.appendChild(document.createTextNode(sabias[m].textContent));
		saber.appendChild(pf);

		if(n < 0) n = 0;		
		if (n > articulos.length - 3) n = articulos.length - 3;

		for(i=n; i<articulos.length&&i<(n+3); i++){
			var titulo = articulos[i].getElementsByTagName("titulo")[0].textContent;
			var descripcion = articulos[i].getElementsByTagName("descripcion")[0].textContent;
			var imagen = articulos[i].getElementsByTagName("imagen")[0].textContent;			
			var article = document.createElement('span');
			var h2 = document.createElement('h2');
			var p = document.createElement('p');
						
			article.setAttribute("class","out");					
			texto = document.createTextNode(titulo);
			h2.appendChild(texto);
			h2.style.color = "black";
			texto = document.createTextNode(descripcion);
			p.appendChild(texto);
			p.style.textAlign = "justify";
			var imgfig = document.createElement('img');
			    imgfig.src = imagen;
			    imgfig.width = "200";
			    imgfig.height = "200";			
			article.appendChild(h2);	
			article.appendChild(imgfig);
			article.appendChild(p);
			article.id = i;			
			article.header = titulo;
			article.text = descripcion;
			article.img = imagen;
			seccion.appendChild(article);
			article.addEventListener('click', function () {
			    $('#show').fadeIn('fast');
			    var query = document.querySelector('#inner_article');
			    query.innerHTML += '<h2 style="text-align:center; color: rgb(140,200,0);">' + this.header + '</h2><br/>';
			    query.innerHTML += '<center><img src="' + this.img + '" alt="img"/></center><br/>';
			    query.innerHTML += '<p style="text-align:justify;">' + this.text + '</p>';			    
			    document.querySelector('#social').innerHTML += '<input id="but" type="button" style="background-color: rgb(140,200,0); padding-left:15px; padding-right:15px; padding-top: 5px; padding-bottom: 5px; color: white; font-size: 1em; margin-left:80px;" value="imprimir"/>';
			    document.getElementById("but").addEventListener('click', function () {
			        printDiv('inner_article');
			    }, true);
			},true);			
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

	window.onload = queComerStart();