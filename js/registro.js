
    var lis = document.querySelectorAll('#main_nav li');    

    /*
	 * Description:
	 * Initial function.
	 */
	function registroStart(){		
		lis[5].setAttribute('class','option');
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
			if(i == 4){
				lis[i].addEventListener('click',function(){
					location.href = "./calendario_dieta.html";
				},true);		
			}
		}
				
		document.registry.addEventListener("invalid", validarFormulario, true);
		document.getElementById("btnEnviar").addEventListener("click", enviar, false);
		
		nombre   = document.getElementById("txtNombre");
		nombre.addEventListener("input", validar, false);
 
		apellido = document.getElementById("txtApellido");
		apellido.addEventListener("input", validar, false);
		
		fecha = document.getElementById("txtFecha");
		fecha.addEventListener("input", validar, false);
		
		email = document.getElementById("txtEmail");
		email.addEventListener("input", validar, false);
		
		usuario = document.getElementById("txtUsuario");
		usuario.addEventListener("input", validar, false);
		
		contrasena = document.getElementById("txtContrasena");
		contrasena.addEventListener("input", validar, false);
		
		repContrasena = document.getElementById("txtRepContrasena");
		repContrasena.addEventListener("input", validar, false);
		
		peso = document.getElementById("txtPeso");
		peso.addEventListener("input", validar, false);
		
		estatura = document.getElementById("txtEstatura");
		estatura.addEventListener("input", validar, false);
		
		$('#txtEstatura').keyup(function (){		    
		    if ($.trim($("#txtPeso").val())) {		        
		        var p = parseFloat($("#txtPeso").val()).toFixed(2);
		        var e = parseFloat($("#txtEstatura").val()).toFixed(2);
		        p = (p / 2.2).toFixed(2);
		        e = (e / 100).toFixed(2);
		        e = (e * e).toFixed(2);
		        var valor = (p / e).toFixed(2);
		        document.querySelector('#imc').innerHTML = valor + " kg/m<sup>2</sup>";
		    }
		});

		$('#txtPeso').keyup(function () {
		    if ($.trim($("#txtEstatura").val())) {
		        var p = parseFloat($("#txtPeso").val()).toFixed(2);
		        var e = parseFloat($("#txtEstatura").val()).toFixed(2);
		        p = (p / 2.2).toFixed(2);
		        e = (e / 100).toFixed(2);
		        e = (e * e).toFixed(2);
		        var valor = (p / e).toFixed(2);
		        document.querySelector('#imc').innerHTML = valor + " kg/m<sup>2</sup>";
		    }
		});

		validar();
	}
	
	function validar(){
		if(nombre.value==''){
		  nombre.setCustomValidity('Ingresar su nombre');
		  nombre.style.background='rgb(217,226,119)';
		}
		else{
		  nombre.setCustomValidity('');
		  nombre.style.background='#FFFFFF';
		}

		if(apellido.value==''){
		 apellido.setCustomValidity('Ingresar su apellido');
		 apellido.style.background='rgb(217,226,119)';
		}
		else{
		 apellido.setCustomValidity('');
		 apellido.style.background='#FFFFFF';
		}
		
		
		if(fecha.value==''){
		  fecha.setCustomValidity('Ingresar la fecha');
		  fecha.style.background='rgb(217,226,119)';
		}
		else{
		  fecha.setCustomValidity('');
		  fecha.style.background='#FFFFFF';
		}
		
		if(email.value==''){
		  email.setCustomValidity('Ingresar su Correo Electronico');
		  email.style.background='rgb(217,226,119)';
		}
		else{
		  email.setCustomValidity('');
		  email.style.background='#FFFFFF';
		}
		
		if(usuario.value==''){
		  usuario.setCustomValidity('Ingresar su Usuario');
		  usuario.style.background='rgb(217,226,119)';
		}
		else{
		  usuario.setCustomValidity('');
		  usuario.style.background='#FFFFFF';
		}
		
		if(contrasena.value==''){
		  contrasena.setCustomValidity('Ingresar su Contrasena');
		  contrasena.style.background='rgb(217,226,119)';
		}
		else{
		  contrasena.setCustomValidity('');
		  contrasena.style.background='#FFFFFF';
		}
		
		if(repContrasena.value==''){
		  repContrasena.setCustomValidity('Ingresar su Contrasena');
		  repContrasena.style.background='rgb(217,226,119)';
		}
		else{
			if(repContrasena.value!=contrasena.value){
				repContrasena.setCustomValidity('Las contrasenas deben coincidir');
				repContrasena.value=='';
				}
			else{
			  repContrasena.setCustomValidity('');
			  repContrasena.style.background='#FFFFFF';
		  }
		}
		
		if(peso.value==''){
		  peso.setCustomValidity('Ingresar su Peso');
		  peso.style.background='rgb(217,226,119)';
		}
		else{
		  peso.setCustomValidity('');
		  peso.style.background='#FFFFFF';
		}
		
		if(estatura.value==''){
		  estatura.setCustomValidity('Ingresar su Estatura');
		  estatura.style.background='rgb(217,226,119)';
		}
		else{
		  estatura.setCustomValidity('');
		  estatura.style.background='#FFFFFF';
		}
	}
	function enviar(){
		var valido=document.registry.checkValidity();
	 
		if(valido){
			document.registry.submit();
		}
	}
	function validarFormulario(e){
		var elem=e.target;
		elem.style.background='rgb(217,226,119)';
	}	


	window.onload = registroStart();