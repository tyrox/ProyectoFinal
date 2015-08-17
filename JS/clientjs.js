var miClient = miClient || {};
miClient.funciones = miClient.funciones || {};
		
	miClient.funciones.validateUser = function() {
		var username = document.getElementById('user').value;
		var password = document.getElementById('password').value;
		var errorElement = document.getElementById('error_msg');
		if (username == '12' && password == '12') {		
			window.location.href="dash.html";
		} else {
			alert("error");
		}	
	};

	miClient.funciones.solonumeros = function (e){
		key=e.keycode || e.which;
		teclado=String.fromCharCode(key);
		numeros="0123456789";
		especiales="8-37-38-46";//en esta parte pusiste espeeciales, osea lo pusiste con doble e y más abajo utilizas solo con una e.
		teclado_especial=false;
		for(var i in especiales){
			if(key==especiales[i]){
				teclado_especial=true;
			}
		}

		if(numeros.indexOf(teclado)==-1 && !teclado_especial){// en esta parte pusiste indexof todo con minusculas y debe ser el Of con mayuscula
			return false;
		}
	};

	var LClientes = new Array();
	var objUser = {
		Id: 0,
		Nombre: "",
		Tel: ""
	};
	//variables globales
	var LClientes = new Array();
	var objUser = {
		Id: 0,
		Nombre: "",
		Tel: ""
	};
	var temporal;
	var posicionAct;

	miClient.funciones.guardarC = function(){
		var nombre = document.getElementById('nombre').value;
		var id = document.getElementById('id').value;
		var tel = document.getElementById('tel').value;
		if (nombre != '' && id != '' && tel !='') {
			
			if ((localStorage.getItem('LClientes') == null)) {
				objUser = {
					Id: 0,
					Nombre: "",
					Tel: ""
				};
				LClientes = new Array();
				objUser.Id=id;
				objUser.Nombre=nombre;
				objUser.Tel=tel;
				LClientes.push(objUser);
				localStorage['LClientes']=JSON.stringify(LClientes);
				miClient.funciones.cargarTablaC();
			}
			else{
				var LClientes=JSON.parse(localStorage['LClientes']);
				objUser.Id=id;
				objUser.Nombre=nombre;
				objUser.Tel=tel;
				LClientes.push(objUser);
				localStorage['LClientes']=JSON.stringify(LClientes);
				console.log(LClientes);
				miClient.funciones.cargarTablaC();
		}

		}
		else {
				alert("Faltan datos!");
		}
	};

	miClient.funciones.cargarTablaC = function() {
	    
	    var cont = miClient.funciones.tamannoC();
	    if (cont > 0)
	    {
	      var render =  "<table class='responsive-table' Id ='tbl1'> <thead><tr><th>Id</th><th>Name</th><th>Phone</th></tr> </thead>";
	        render+="<tbody>";
	      var listaC = JSON.parse(localStorage['LClientes']);
	        for (i = 0; i < cont; i++) {
	            var obj =  listaC[i];
	                  render += "<tr onclick=miClient.funciones.cargar(this);>";
	                  render += "<td>" + obj.Id + "</td>";
	                  render+= "<td>" + obj.Nombre + " </td>";
	                  render += "<td>" + obj.Tel+ "</td>";
	                  render += "</tr>";
	        }
	          render+="</tbody";
	        render+="</table>";
	        dvcontainer.innerHTML = render;
	    }
	};
	miClient.funciones.tamannoC = function() {
		if (localStorage.getItem('LClientes') == null) {
			return 0;
		}
		else{
			var listaC = JSON.parse(localStorage['LClientes']);
	    	var cont = listaC.length;
			return cont;
		}
	};
	miClient.funciones.eliminar = function (pos){
		var posicion = posicionAct;
		console.log(posicion);
		var cont = miClient.funciones.tamannoC();
	    if (posicion >= 0 && cont>0)
	    {
	    	var lista = new Array();
	    	var lista = JSON.parse(localStorage['LClientes']);	    	
	    	if (posicion == 0) {
	    		lista.shift();
	    		localStorage['LClientes']=JSON.stringify(lista);
	    	}
	    	else {	    	
	    		lista.splice(posicion, posicion);
	    		console.log(lista);
	    		localStorage['LClientes']=JSON.stringify(lista);	    	
	    		miClient.funciones.cargarTablaC();	    	
	    	}
	    }
	    else {	    	
	    	
	    }
	    window.location.href="client.html";
	    
	};
	miClient.funciones.cargar = function (pos){
		if (temporal!=null) {
			temporal.style.backgroundColor="#b2dfdb"; 	
		}		
		temporal = pos;
		posicionAct= $(pos).closest("tr").index();		
		console.log(posicionAct);
		pos.style.backgroundColor="#4db6ac"; 
		miClient.funciones.miVarlor(temporal);
	};
	miClient.funciones.modificar = function (pos){
		
		var cont = miClient.funciones.tamannoC();
		var nuevo = new Array();
		objUser.Id =document.getElementById('id').value;
		objUser.Nombre =document.getElementById('nombre').value;
		objUser.Tel =document.getElementById('tel').value;
		var posicion = posicionAct;
		//fila.parentNode.removeChild(fila);
	    if (cont > 0)
	    {
	    	if (objUser.Id !="" && objUser.Nombre !="" && objUser.Tel !="") {
	    		console.log(objUser);
	    		var lista = new Array();
	    		var lista = JSON.parse(localStorage['LClientes']);	    	
	    		if (posicion == 0) {
	    			lista.shift();
	    			lista.splice(posicion, posicion, objUser);
	    			localStorage['LClientes']=JSON.stringify(lista);
	    		}
	    		else {	    	
	    			lista.splice(posicion, posicion, objUser);
	    			console.log(lista);
	    			localStorage['LClientes']=JSON.stringify(lista);	    	
	    			miClient.funciones.cargarTablaC();	    	
	    		}
	    		Materialize.toast('<span>Item modificado</span><a class=&quot;btn-flat yellow-text&quot; href=&quot;#!&quot;><a>', 5000);
	    	}
	    	else{
	    	miClient.funciones.cargarTablaC();
	   	 }
	    }
	    else {
	    	miClient.funciones.cargarTablaC();
	    }
	    posicionAct=-1;
	    miClient.funciones.limpiar();
	    miClient.funciones.cargarTablaC();
	};
	miClient.funciones.miVarlor = function  (pos) {
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
 			document.getElementById('tel').value=fila;
 			return fila;
 		})
	};
	miClient.funciones.limpiar = function  () {
		// limpia campos
		document.getElementById('id').value="";
		document.getElementById('nombre').value="";
		document.getElementById('tel').value="";
	}

	
