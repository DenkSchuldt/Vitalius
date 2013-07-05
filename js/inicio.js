
    var n = 0, seccion;
    var fst = 0, lst = 0;
	var phraseToDisplay = new Array();
	var numFrases = 0;
	var current_article = "";

	/*	
	 * Description:
	 * Initial function.
	 */
	function inicioStart() {	    
	    seccion = document.querySelector('#articles section');
	    document.querySelector('#show #background').addEventListener('click', function () {
	        $('#show').fadeOut('fast');
	        var social = document.querySelector('#social');
	        document.querySelector('body').removeChild(social);
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
		cita = document.getElementById('inicio');
		cargarFrases();		
	}

	function cargarFrases(){
		var url="./xml/frases.xml";
		var request= new XMLHttpRequest();		
		request.addEventListener('load',procesarFrases,false);
		request.open("GET",url,true);
		request.send(null);
	}

	function procesarFrases(e){			
			var descripcion,autor,article,p,strong,texto;
			var xml= e.target.responseXML;
			var frase = xml.documentElement.getElementsByTagName("frase");
			numFrases= frase.length;			
			for(i=0;i<frase.length;i++){								
				descripcion = frase[i].getElementsByTagName("descripcion")[0].textContent;
				autor = frase[i].getElementsByTagName("autor")[0].textContent;

				p = document.createElement('p');
				strong = document.createElement('strong');				
				texto = document.createTextNode(descripcion);
				p.appendChild(texto);

				texto = document.createTextNode(autor);
				strong.appendChild(texto);
				p.appendChild(document.createElement('br'));
				p.appendChild(document.createElement('br'));
				p.appendChild(strong);
				phraseToDisplay.push(p);
		}
		choosePhrase();
	}

	function choosePhrase(){
		num = Math.floor((Math.random()*numFrases)+1) - 1;
		cita.appendChild(phraseToDisplay[num]);	
	}

	function moverIzq(){
	    n = n - 3;	    
		cargarArticulos();
	}
	
	function moverDer(){
	    n = n + 3;	    	    
		cargarArticulos();
	}

	function cargarArticulos() {
	    var online = navigator.onLine;
	    var url = "";
	    if (online) url = "http://chimecho.nixiweb.com/DAW/AJAX_XML/gethtml.php?URL=http://www.eluniverso.com/rss/salud.xml";
		else url = "./xml/articulos.xml";
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
	    document.querySelector('#inner_article').innerHTML += texto;
	    document.querySelector('#inner_article').innerHTML += "<br><br><strong>El Universo.com</strong><br><br>Compartir en<br><br>";
	    loadSocialLinks();
	}

	function loadSocialLinks() {
	    var social = document.createElement('div');
        social.style.display = "inline-block";
	    var facebook = document.createElement('img');
	    facebook.setAttribute("src", "./images/various/facebook.png");
	    facebook.setAttribute('class', 'generic');
	    var twitter = document.createElement('img');
	    twitter.setAttribute("src", "./images/various/twitter.png");
	    twitter.setAttribute('class', 'generic');	    

	    facebook.addEventListener('click', function () {
	        newwindow = window.open("https://www.facebook.com/sharer/sharer.php?u=" + current_article,'Compartir en Facebook','height=500,width=500');
	        if (window.focus) { newwindow.focus(); }
	    }, false);
	    twitter.addEventListener('click', function () {
	        newwindow = window.open("http://twitter.com/home?status=Acabo de leer un articulo en Vitalius: "+current_article,'Compartir en Twitter', 'height=300,width=500');
	        if (window.focus) { newwindow.focus(); }
	    }, false);	    
	    document.querySelector('#inner_article').appendChild(facebook);
	    document.querySelector('#inner_article').appendChild(twitter);	    
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
	            current_article = this.url;
	            var request = new XMLHttpRequest();
	            request.open("GET", "http://chimecho.nixiweb.com/DAW/AJAX_XML/gethtml.php?URL=" + escape(link), true);	            
	            $('#show').fadeIn('fast');
	            document.querySelector('#inner_article').innerHTML = '<h2>' + this.header + '</h2><br/>';
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