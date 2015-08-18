var miUser = miUser || {}
miUser.funciones = miUser.funciones || {};
	//variables globales
	var LUser = new Array();
	var objUser = {
		Id: 0,
		Nombre: "",
		Pass1: "",
		Pass2: ""
	};
	var temporal;
	var posicionAct= -1;

<<<<<<< HEAD
	function guardarC(){
=======
	miUser.funciones.guardarC = function(){
		var nombre = document.getElementById('nombre').value;
>>>>>>> origin/master
		var id = document.getElementById('id').value;
		var nombre = document.getElementById('nombre').value;
		var pass1 = document.getElementById('pass1').value;
		var pass2 = document.getElementById('pass2').value;
		if (nombre != '' && id != '' && pass1 !='' && pass2 !='') {
			if (pass1 == pass2) {
				if ((localStorage.getItem('LUser') == null)) {
						objUser = {
						Id: 0,
						Nombre: "",
						Pass1: "",
						Pass2: ""
					}
					LUser = new Array();
					objUser.Id=id;
					objUser.Nombre=nombre;
					objUser.Pass1=pass1;
					objUser.Pass2=pass2;
					LUser.push(objUser);
					localStorage['LUser']=JSON.stringify(LUser);		
					miUser.funciones.cargarTablaC();
					miUser.funciones.limpiar();
				}
				else{
					var LUser=JSON.parse(localStorage['LUser']);
					objUser.Id=id;
					objUser.Nombre=nombre;
					objUser.Pass1=pass1;
					objUser.Pass2=pass2;
					LUser.push(objUser);
					localStorage['LUser']=JSON.stringify(LUser);
					miUser.funciones.cargarTablaC();
					miUser.funciones.limpiar();
				}
			}
			else {
				alert("Verifique la contraseña!");
			}

		}
		else {
				alert("Faltan datos!");
		}
		posicionAct=-1;	    
	};
	miUser.funciones.modificar = function (pos){
		
		var cont = miUser.funciones.tamannoC();
		var nuevo = new Array();
		objUser.Id =document.getElementById('id').value;
		objUser.Nombre =document.getElementById('nombre').value;
		objUser.Pass1 =document.getElementById('pass1').value;
		objUser.Pass2 =document.getElementById('pass2').value;
		var posicion = posicionAct;
		//fila.parentNode.removeChild(fila);
	    if (cont > 0 && posicion >=0)
	    {
	    	if (objUser.Id !="" && objUser.Nombre !="" && objUser.Pass1 !="" && objUser.Pass2 !="" && objUser.Pass2 == objUser.Pass1) {
	    		var lista = new Array();
	    		var lista = JSON.parse(localStorage['LUser']);    	
	    		lista.splice(posicion, 1, objUser);
	    		localStorage['LUser']=JSON.stringify(lista);	    	
	    		miUser.funciones.cargarTablaC();	    		    		
	    		Materialize.toast('<span>User modificado</span><a class=&quot;btn-flat yellow-text&quot; href=&quot;#!&quot;><a>', 5000);
	    	}
	    	else{
	    		alert("Verifique la contraseña!");
	   	 }
	    }
	    else {
	    	miUser.funciones.cargarTablaC();
	    }
	    posicionAct=-1;
	    miUser.funciones.limpiar();
	    miUser.funciones.cargarTablaC();
	};
	miUser.funciones.eliminar = function (pos){
		var posicion = posicionAct;
		var cont = miUser.funciones.tamannoC();
	    if (posicion >= 0 && cont>0)
	    {
	    	var lista = new Array();
	    	var lista = JSON.parse(localStorage['LUser']);	    	
	    	if (posicion == 0) {
	    		lista.shift();
	    		localStorage['LUser']=JSON.stringify(lista);
	    	}
	    	else {	    	
	    		lista.splice(posicion, 1);
	    		localStorage['LUser']=JSON.stringify(lista);	    	
	    		miUser.funciones.cargarTablaC();	    	
	    	}
	    }
	    else {	    	
	    	
	    }
	    window.location.href="user.html";	    
	};
	miUser.funciones.cargarTablaC = function() {
	    
	    var cont = miUser.funciones.tamannoC();
	    if (cont > 0)
	    {
	      var render =  "<table class='responsive-table' Id ='tbl1'> <thead><tr><th>User</th><th>Name</th><th>pass1</th><th>pass2</th></tr> </thead>";
	        render+="<tbody>";
	      var listaC = JSON.parse(localStorage['LUser']);
	        for (i = 0; i < cont; i++) {
	            var obj =  listaC[i];
	                  render += "<tr onclick=miUser.funciones.cargar(this);>";
	                  render += "<td>" + obj.User + "</td>";
	                  render+= "<td>" + obj.Nombre + " </td>";
	                  render += "</tr>";
	        }
	          render+="</tbody";
	        render+="</table>";
	        dvcontainer.innerHTML = render;
	    }
	};
	miUser.funciones.cargar = function (pos){
		if (temporal!=null) {
			temporal.style.backgroundColor="#b2dfdb"; 	
		}		
		temporal = pos;
		posicionAct= $(pos).closest("tr").index();		
		console.log(posicionAct);
		pos.style.backgroundColor="#4db6ac"; 
		miUser.funciones.miVarlor(temporal);
	};
	miUser.funciones.miVarlor = function  (pos) {
		//busca el valor de la segunda columna (id)
 		$(pos).find('td:eq(0)').each(function (){
 			fila = $(this).html();
 			document.getElementById('id').value=fila;
 			return fila;
 		})
 		$(pos).find('td:eq(1)').each(function (){
 			fila = $(this).html();
 			document.getElementById('nombre').value=fila;
 			return fila;
 		})
 		$(pos).find('td:eq(2)').each(function (){
 			fila = $(this).html();
 			document.getElementById('pass1').value=fila;
 			return fila;
 		})
 		$(pos).find('td:eq(3)').each(function (){
 			fila = $(this).html();
 			document.getElementById('pass2').value=fila;
 			return fila;
 		})
	};
	miUser.funciones.tamannoC = function() {
		if (localStorage.getItem('LUser') == null) {
			return 0;
		}
		else{
			var listaC = JSON.parse(localStorage['LUser']);
	    	var cont = listaC.length;
			return cont;
		}
	};
	miUser.funciones.limpiar = function  () {
		// limpia campos
		document.getElementById('id').value='';
		document.getElementById('nombre').value='';
		document.getElementById('pass1').value='';
		document.getElementById('pass2').value='';
	}

	
