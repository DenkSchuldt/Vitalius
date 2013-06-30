
    var n = 0, seccion;
    var fst = 0, lst = 0;

	/*	
	 * Description:
	 * Initial function.
	 */
	function inicioStart() {	    
	    seccion = document.querySelector('#articles section');
	    document.querySelector('#show #background').addEventListener('click', function () {
	        $('#show').fadeOut('fast');	        
	    }, false);
	    document.querySelector('#articles_left').addEventListener('click', function () {
	        moverIzq();
	    }, false);
	    document.querySelector('#articles_right').addEventListener('click', function () {
	        moverDer();
	    }, false);
		cargarArticulos();
		lis[0].setAttribute('class','option');
		lis[0].addEventListener('click', function () {
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
	    n = n - 3;	    
		cargarArticulos();
	}
	
	function moverDer(){
	    n = n + 3;	    	    
		cargarArticulos();
	}

	function cargarArticulos(){
		var url = "./xml/articulos.xml";
		var request = new XMLHttpRequest();
		request.addEventListener('load',procesarArticulos,false);
		request.open("GET",url,true);
		request.send(null);
	}   

	function mostrarNoticia(evt) {
	    var texto = evt.target.responseText;
	    fst = texto.indexOf('<div class="field-item even" property="schema:articleBody content:encoded">');
	    lst = texto.indexOf('</article>');
	    texto = texto.slice(fst, lst + 10);
	    var footer = texto.slice(texto.indexOf('<footer>'), texto.indexOf('</footer>') + 9);
	    texto = texto.replace(footer, "");	    
	    document.querySelector('#articulo').innerHTML += texto;
	}

	function procesarArticulos(e) {	    
	    var xml = e.target.responseXML;	    
	    noticias = xml.querySelectorAll('item');
	    seccion.innerHTML = "";
	    if (n < 0) { n = 0; }
	    if (n > noticias.length - 3) { n = noticias.length - 3; }
	    for (i = n; i < noticias.length && i < (n + 3) ; i++) {
	        var titulo = noticias[i].querySelector('title').childNodes[0].nodeValue;
	        var link = noticias[i].querySelector('link').childNodes[0].nodeValue;
	        var descripcion = noticias[i].querySelector('description').childNodes[0].nodeValue;
	        var date = noticias[i].querySelector('pubDate').childNodes[0].nodeValue;

	        var article = document.createElement('article');
	        var h3 = document.createElement('h3');
	        var h5 = document.createElement('h5');
	        var p = document.createElement('p');
	        var label = document.createElement('label');
	        var d = new Date(date);
	        var fecha = document.createTextNode(parseDay(d.getDay()) + ", " + parseMonth(d.getMonth()) + " " + d.getDay() + " de " + d.getFullYear());
	        var texto = document.createTextNode(titulo);
	        var enlace = document.createTextNode(link);
	        h3.appendChild(texto);
	        h5.appendChild(fecha);
	        label.appendChild(enlace);

	        var texto = document.createTextNode(descripcion);
	        p.appendChild(texto);

	        article.url = link;
	        article.header = titulo;
	        article.addEventListener('click', function () {
	            var link = this.url;
	            var request = new XMLHttpRequest();
	            request.open("GET", "http://chimecho.nixiweb.com/DAW/AJAX_XML/gethtml.php?URL=" + escape(link), true);	            
	            $('#show').fadeIn('fast');
	            document.querySelector('#articulo').innerHTML = '<br/><h2>' + this.header + '</h2><br/>';
	            //document.querySelector('#comentarios div').setAttribute('data-href', link);
	            request.addEventListener('load', mostrarNoticia, false);
	            request.send(null);
	        }, false);
	        article.appendChild(h3).setAttribute('class', 'titulo');
	        article.appendChild(p).setAttribute('class', 'descripcion');
	        article.appendChild(h5).setAttribute('class', 'fecha');
	        seccion.appendChild(article).setAttribute('class', 'articulo');
	    }
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
	            return "Miércoles";
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

	window.onload = inicioStart();