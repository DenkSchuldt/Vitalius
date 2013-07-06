
    var lis = document.querySelectorAll('#main_nav li');
    var imc = "";
    var peso_dado = "";
    var peso_ideal = "";
    var ganar_perder = "";
    var hombre = false, mujer = false;
    var sexo = false;
    var peso_checked = false;
    var estatura_checked = false;

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
		
        $("#Masculino, #Femenino").change(function () {
            if ($('#Femenino').is(':checked')) mujer = true;
            if ($('#Masculino').is(':checked')) hombre = true;
            sexo = true;
        });

        $("#lb, #kg").change(function () {
            peso_checked = true;
            if (sexo) {
                if(estatura_checked){
                    calcularIMC();
                    calcularPesoIdeal();
                }
            }
            else alert("Debe especificar un sexo");
        });

        $("#m, #cm").change(function () {
            estatura_checked = true;
            if (sexo) {
                if (peso_checked) {
                    calcularIMC();
                    calcularPesoIdeal();
                }
            }
            else alert("Debe especificar un sexo");
        });

        $('#txtEstatura').keyup(function () {
            if ($.trim($("#txtPeso").val())) {
                if (sexo) {
                    if(peso_checked && estatura_checked){
                        calcularIMC();
                        calcularPesoIdeal();
                    }
                }
                else alert("Debe especificar un sexo");
            }            
		});

        $('#txtPeso').keyup(function () {
            if ($.trim($("#txtEstatura").val())) {
                if (sexo) {
                    if(peso_checked && estatura_checked){
                        calcularIMC();
                        calcularPesoIdeal();
                    }
                }
                else alert("Debe especificar un sexo");
            }
		});
		validar();
	}

    function calcularIMC(){
        peso_dado = parseFloat($("#txtPeso").val()).toFixed(2);
        var e = parseFloat($("#txtEstatura").val()).toFixed(2);
        if (document.getElementById('lb').checked) peso_dado = (peso_dado / 2.2).toFixed(2);
        if (document.getElementById('cm').checked) e = (e / 100).toFixed(2);
        e = (e * e).toFixed(2);
        imc = (peso_dado / e).toFixed(2);
        document.querySelector('#imc').innerHTML = imc + " kg/m<sup>2</sup>";
    }	

	function calcularPesoIdeal() {
	    var imci = 0;
	    if(mujer) imci = 22;
	    if(hombre) imci = 26;
	    peso_ideal = ((imci) * (peso_dado / imc)).toFixed(2);
	    document.querySelector('#ideal').innerHTML = peso_ideal + " kg";
	    if (peso_dado > peso_ideal) {
	        document.querySelector('#resultado').innerHTML = "perder ";
	        document.querySelector('#resultado').style.color = "red";
	        document.querySelector('#kilos').innerHTML = (peso_dado - peso_ideal).toFixed(2) + " kg";
	    }
	    else if (peso_ideal > peso_dado) {
	        document.querySelector('#resultado').innerHTML = "ganar ";
	        document.querySelector('#resultado').style.color = "green";
	        document.querySelector('#kilos').innerHTML = (peso_ideal - peso_dado).toFixed(2) + " kg";
	    }
	    else if (peso_dado == peso_ideal) {	        
	        document.querySelector('#ideal').innerHTML = "Mantenerse en forma. ;)";
	    }
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
		else {
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