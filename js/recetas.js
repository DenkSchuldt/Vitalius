
    var lis = document.querySelectorAll('#main_nav li');
    var imagenes, ingredientes, pasos, calificaciones, recetas;
    var receta_actual = "";

    /*
	 * Description:
	 * Initial function.
	 */
	function recetasStart(){		
	    lis[3].setAttribute('class', 'option');
	    document.querySelector('#show #background').addEventListener('click', function () {
	        $('#show').fadeOut('fast');	        
	    }, false);
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
		cargarRecetas();
	}
	

	function cargarRecetas() {
	    $.when($.ajax("../xml/recetas/imagenes.xml"),
               $.ajax("../xml/recetas/ingredientes.xml"),
               $.ajax("../xml/recetas/pasos.xml"),
               $.ajax("../xml/recetas/recetas.xml")).done(function (a1, a2, a3, a4) {
                   imagenes = a1[0].getElementsByTagName('imagen');
                   console.log(imagenes);
                   ingredientes = a2[0].getElementsByTagName('ingrediente');
                   console.log(ingredientes);
                   pasos = a3[0].getElementsByTagName('paso');
                   console.log(pasos);
                   recetas = a4[0].getElementsByTagName('receta');
                   console.log(recetas);
                   parseRecetas();
	    });	    
	}	

	function parseRecetas() {	    	    
	    for (var i = 0; i < recetas.length; i++) {
	        var recetaID = recetas[i].getAttribute('RecetaID');
	        receta_actual = recetas[i].getElementsByTagName('url')[0].childNodes[0].nodeValue;	        

	        for (var j = 0; j < imagenes.length; j++) {
	            if (imagenes[j].getAttribute('RecetaID') == recetaID) {
	                var imagen = imagenes[j];
	                break;
	            }
	        }
	        var ingredientesArray = [];
	        for (var j = 0; j < ingredientes.length; j++) {
	            if (ingredientes[j].getAttribute('RecetaID') == recetaID) {
	                ingredientesArray[ingredientesArray.length] = ingredientes[j];
	            }
	        }
	        var pasosArray = [];
	        for (var j = 0; j < pasos.length; j++) {
	            if (pasos[j].getAttribute('RecetaID') == recetaID) {
	                pasosArray[pasosArray.length] = pasos[j];
	            }
	        }

	        var titulo = recetas[i].querySelector('titulo').childNodes[0].nodeValue;
	        var descripcion = recetas[i].querySelector('descripcion').childNodes[0].nodeValue;
	        var porcion = recetas[i].querySelector('porcion').childNodes[0].nodeValue;
	        var tiempo = recetas[i].querySelector('tiempo').childNodes[0].nodeValue;

	        var h3 = document.createElement('h3');
	        var p_descripcion = document.createElement('p');
	        var p_porcion = document.createElement('p');
	        var p_tiempo = document.createElement('p');
	        var p_leer = document.createElement('p');

	        var texto = document.createTextNode(titulo);
	        h3.appendChild(texto);	        
	        texto = document.createTextNode(descripcion);
	        p_descripcion.appendChild(texto);
	        texto = document.createTextNode("Porcion(es): " + porcion);
	        p_porcion.appendChild(texto);
	        texto = document.createTextNode("Tiempo de preparacion: " + tiempo);
	        p_tiempo.appendChild(texto);
	        texto = document.createTextNode("Leer mas...");
	        p_leer.appendChild(texto);	        

	        p_leer.header = titulo;
	        p_leer.description = descripcion;
	        p_leer.portions = porcion;
	        p_leer.time = tiempo;
	        p_leer.ingredients = new Array();
	        p_leer.ingredients = ingredientesArray.slice();
	        p_leer.steps = new Array();
	        p_leer.steps = pasosArray.slice();
	        p_leer.url = receta_actual;
	        p_leer.addEventListener('click', function () {
	            $('#show').fadeIn('fast');
	            var query = document.querySelector('#inner_article');	            
	            query.innerHTML += '<h2 style="text-align:center; color: rgb(140,200,0);">' + this.header + '</h2><br/>';
	            query.innerHTML += '<p style="text-align:justify;">' + this.description + '</p>';
	            query.innerHTML += '<p style="text-align:justify;">Porcion(es): ' + this.portions + '</p>';
	            query.innerHTML += '<p style="text-align:justify;">Tiempo de preparacion:' + this.time + '</p>';
	            query.innerHTML += '<h4 style="color: rgb(140,200,0);">Ingredientes:</h4><ul>';
	            console.log(this.ingredients);
	            for (var j = 0; j < this.ingredients.length;j++){
	                query.innerHTML += '<li>' + this.ingredients[j].childNodes[1].childNodes[0].nodeValue + '. (' + this.ingredients[j].childNodes[0].childNodes[0].nodeValue + ')</li>';
	            }
	            query.innerHTML += '</ul><h4 style="color: rgb(140,200,0);">Preparacion:</h4><ol>';
	            console.log(this.steps);
	            for (var j = 0; j < this.steps.length; j++) {
	                query.innerHTML += '<p>' + this.steps[j].getAttribute('PasoNum') + ': ' + this.steps[j].childNodes[0].nodeValue + '</p>';
	            }	            
	            loadSocialLinks(this.url);
				document.getElementById("but").addEventListener('click',function(){
				printDiv('inner_article');
				},true);
	        }, false);

	        var receta = document.createElement('article');
	        receta.setAttribute('class', 'receta');

	        var img = document.createElement('img');
	        img.setAttribute('src', imagen.childNodes[0].childNodes[0].nodeValue);
	        img.setAttribute('alt', imagen.childNodes[1].childNodes[0].nodeValue);
	        receta.appendChild(img);

	        var contenedor = document.createElement('div');
			
			
	        contenedor.setAttribute('class', 'texto');
	        contenedor.appendChild(h3).style.display = "block";
	        contenedor.innerHTML += '<div class="fb-like" data-href="' + receta_actual + 'data-send="false" data-layout="button_count" data-width="450" data-show-faces="true" style="margin-right: 10px;"></div>';
	        contenedor.innerHTML += '<a href="https://twitter.com/share" class="twitter-share-button" data-lang="en" data-url="' + receta_actual + '" data-text="' + h3.innerHTML+ ' - ">Tweet</a>';
	        contenedor.appendChild(p_descripcion);
	        contenedor.appendChild(p_porcion);
	        contenedor.appendChild(p_tiempo);
	        contenedor.appendChild(p_leer);	  
	        receta.appendChild(contenedor);

	        document.querySelector('section').appendChild(receta);
	    }
	}	

	function loadSocialLinks(url) {	    
	    document.querySelector('#social').innerHTML = '<h4 style="margin-top:0;">Compartir en:</4><br>';
	    var facebook = document.createElement('img');
	    facebook.setAttribute("src", "../images/various/facebook.png");
	    facebook.setAttribute('class', 'generic');
	    var twitter = document.createElement('img');
	    twitter.setAttribute("src", "../images/various/twitter.png");
	    twitter.setAttribute('class', 'generic');
	    facebook.addEventListener('click', function () {
	        newwindow = window.open("https://www.facebook.com/sharer/sharer.php?u=" + url, 'Compartir en Facebook', 'height=500,width=500');
	        if (window.focus) { newwindow.focus(); }
	    }, false);
	    twitter.addEventListener('click', function () {
	        newwindow = window.open("http://twitter.com/home?status=Acabo de leer un articulo en Vitalius: " + url, 'Compartir en Twitter', 'height=300,width=500');
	        if (window.focus) { newwindow.focus(); }
	    }, false);	    
	    document.querySelector('#social').appendChild(facebook);
	    document.querySelector('#social').appendChild(twitter);
	    document.querySelector('#social').innerHTML += '<br><input id="but" type="button" style="background-color: rgb(140,200,0); padding-left:15px; padding-right:15px; padding-top: 5px; padding-bottom: 5px; color: white; font-size: 1em;" value="imprimir" />';
	}
	function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;
     window.print();
     document.body.innerHTML = originalContents;
	window.location.reload(); 
	}


	window.onload = recetasStart();