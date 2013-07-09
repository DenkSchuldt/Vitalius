
    var lis = document.querySelectorAll('#main_nav li');
	var n=0,seccion, section2,footer;
	var m=0;
	/*
	 * Description:
	 * Initial function.
	 */
	function queComerStart(){		
	seccion = document.getElementById('articles_left');
	section2 = document.getElementById('articles_right');
	footer = document.getElementById("div_debajo");	
		
var izq=document.getElementById("izquierda");
var der=document.getElementById("derecha");
var izq2=document.getElementById("izquierda2");
var der2=document.getElementById("derecha2");

document.getElementById("cortina").addEventListener('click',function(e){
	document.getElementById("cortina").style.display="none";
	document.getElementById("debajo").setAttribute("class","debajoOff");
	queComerStart();
	},false);

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

		var texto,titulo,descripcion,enlace,imagen,article,h2,p;	
		while(seccion.firstChild) {
			seccion.removeChild(seccion.firstChild);
		}
		if(footer.getElementsByTagName("p")[0]){
			footer.removeChild(footer.getElementsByTagName("p")[0]);
		}
		var xml = e.target.responseXML;
		var articulos=xml.documentElement.getElementsByTagName("comida");	
		var sabias=xml.documentElement.getElementsByTagName("sabias");
		if(m<0){
		m=0;
		}
		if(m>sabias.length-1){
		m=sabias.length-1;
		}
		var pf=document.createElement('p');
		
		pf.appendChild(document.createTextNode(sabias[m].textContent));
		footer.appendChild(pf);
		if(n < 0){
			n = 0;
		}
		if(n > articulos.length-3){
			n = articulos.length-3;
		}
		for(i=n;i<articulos.length&&i<(n+3);i++){
			var titulo=articulos[i].getElementsByTagName("titulo")[0].textContent;
			var descripcion=articulos[i].getElementsByTagName("descripcion")[0].textContent;
			var imagen=articulos[i].getElementsByTagName("imagen")[0].textContent;
			var ul=document.createElement('ul');
			var article=document.createElement('span');
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
			
			texto = document.createTextNode(titulo);
			h2.appendChild(texto);
			texto=document.createTextNode(descripcion);
			p.appendChild(texto);
			p.style.textAlign = "justify";
			var imgfig= document.createElement('img');
			imgfig.src=imagen;
			imgfig.width="200";
			imgfig.height="200";
			var fig=document.createElement('fig');
			fig.appendChild(imgfig);
			h2.style.color="#000000";
			article.appendChild(h2);	
			article.appendChild(fig);
			article.appendChild(p);
			article.id=i;
			ul.appendChild(article);
			seccion.appendChild(ul);
			
			article.addEventListener('click',function(){
			cort=document.getElementById("cortina");
				cort.style.display="inline";
				deb=document.getElementById("debajo");
				while(deb.firstChild) {
					deb.removeChild(deb.firstChild);
				}
				
				deb.setAttribute("class","debajoOn");
				cort.appendChild(deb);
				but= document.createElement('input');
				but.type="button";
				but.addEventListener('click',function(){
				printDiv("debajo");
				},true);
				but.value="imprimir";
				titulo=articulos[this.getAttribute("id")].getElementsByTagName("titulo")[0].textContent;
				descripcion=articulos[this.getAttribute("id")].getElementsByTagName("descripcion")[0].textContent;
				imagen=articulos[this.getAttribute("id")].getElementsByTagName("imagen")[0].textContent;
				texto = document.createTextNode(titulo);
				h2.appendChild(texto);
				texto=document.createTextNode(descripcion);
				p.appendChild(texto);
				imgfig= document.createElement('img');
				imgfig.src=imagen;
				imgfig.width="200";
				imgfig.height="200";
				fig=document.createElement('fig');
				fig.appendChild(imgfig);
				var art=document.createElement('article');
				art.appendChild(h2);	
				art.appendChild(fig);
				art.appendChild(p);
				
				deb.appendChild(but);
				deb.style.width="600px";
				deb.appendChild(art);
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