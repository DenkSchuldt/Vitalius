function inicializar(){
	seccion = document.getElementById('sectionInicio');
	cargar();
}

function cargar(){
	var url="xml/imagenes.xml";
	var request= new XMLHttpRequest();	
	request.addEventListener('load',procesar,false);
	request.open("GET",url,true);
	request.send(null);
}

function procesar(e){
	
	var nombre,url,figure,img;
	var xml= e.target.responseXML;
	var elemento = xml.documentElement.getElementsByTagName("imagen");
	for(i=0;i<elemento.length;i++){
		
		nombre = elemento[i].getElementsByTagName("nombre")[0].textContent;
		url = elemento[i].getElementsByTagName("url")[0].textContent;
	
		
		figure = document.createElement('figure');
		img = document.createElement('img');
		
		img.setAttribute("src",url);
		img.setAttribute("alt","Imagen "+ nombre +" no encontrada");
				
		figure.appendChild(img);
		
		seccion.appendChild(figure);
	}

}


window.addEventListener('load',inicializar,false);