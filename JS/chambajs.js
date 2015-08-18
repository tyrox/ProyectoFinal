var miChamb = miChamb || {};
miChamb.funciones = miChamb.funciones || {};

	miChamb.funciones.solonumeros = function (e){
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
	//variables globales
	var contador = 0;
	var LChambas = new Array();
	var objCham = {
		IdC: 0,
		Id: 0,
		Work: "",
		Date: "",
		Note:""
	};
	var temporal;
	var posicionAct = -1;

	miChamb.funciones.guardarC = function (){	
	//funcion utilizada para guardar todos los datos en el localstorage	
		var id = document.getElementById('id').value;
		var fecha = document.getElementById('date').value;
		var notes = document.getElementById('note').value;
		var trabajo = document.getElementById('descrip').value;
		if (fecha != '' && id != '' && notes !='' && trabajo!='') {
			if ((localStorage.getItem('LChambas') == null)) {
				objCham = {
					IdC: 0,
					Id: 0,
					Work: "",
					Date: "",
					Note:""
				};
				localStorage['contCh']=JSON.stringify(contador);
				LChambas = new Array();
				objCham.IdC=contador;				
				objCham.Id=id;
				objCham.Work=trabajo;
				objCham.Note=notes;
				objCham.Date=fecha;
				LChambas.push(objCham);
				localStorage['LChambas']=JSON.stringify(LChambas);
				console.log(LChambas);
				miChamb.funciones.cargarTablaC();
			}
			else{
				contador = JSON.parse(localStorage['contCh']) +1;
				var LChambas=JSON.parse(localStorage['LChambas']);
				objCham.IdC=contador;
				objCham.Id=id;
				objCham.Work=trabajo;
				objCham.Note=notes;
				objCham.Date=fecha;
				LChambas.push(objCham);
				localStorage['contCh']=JSON.stringify(contador);
				localStorage['LChambas']=JSON.stringify(LChambas);
				console.log(LChambas);
				miChamb.funciones.cargarTablaC();
		}

		}
		else {
				alert("Faltan datos!");
		}
		miChamb.funciones.limpiar();
	};
	miChamb.funciones.eliminar = function (pos){
		//funcion  utilizada para eliminar los datos y colocar 
		var posicion = posicionAct;
		var cont = miChamb.funciones.tamannoC();
	    if (posicion >= 0 && cont>0)
	    {
	    	var lista = new Array();
	    	var lista = JSON.parse(localStorage['LChambas']);	    	
	    	if (posicion == 0) {
	    		lista.shift();
	    		localStorage['LChambas']=JSON.stringify(lista);
	    	}
	    	else {
	    		console.log(posicion, $(pos).closest("tr").index());
	    		lista.splice(posicion, 1);	    		
	    		localStorage['LChambas']=JSON.stringify(lista);	    	
	    		miChamb.funciones.cargarTablaC();	    	
	    	}
	    }
	    else {	    	
	    	miChamb.funciones.cargarTablaC();
	    }
	    miChamb.funciones.cargarTablaC();
	    posicionAct=-1;
	    miChamb.funciones.limpiar();
	    
	};
	
	miChamb.funciones.cargar = function (pos){
		//funcion que se utiliza para cargar los datos y colocarlos en la tabla
		if (temporal!=null) {
			temporal.style.backgroundColor="#b2dfdb"; 	
		}		
		temporal = pos;
		posicionAct= $(pos).closest("tr").index();		
		console.log(posicionAct);
		pos.style.backgroundColor="#4db6ac"; 
		miChamb.funciones.miVarlor(temporal);
	};
	miChamb.funciones.modificar = function (pos){
		//funcion q se utiliza para modificar los los datos 
		var cont = miChamb.funciones.tamannoC();
		var nuevo = new Array();
		objCham.Id =document.getElementById('id').value;
		objCham.Note =document.getElementById('note').value;
		objCham.Work =document.getElementById('descrip').value;
		objCham.Date =document.getElementById('date').value;
		var posicion = posicionAct;
		//fila.parentNode.removeChild(fila);
	    if (cont > 0 && posicion >=0)
	    {
	    	if (objCham.Id !="" && objCham.Note !="" && objCham.Work !="" && objCham.Date !="") {
	    		var lista = new Array();
	    		var lista = JSON.parse(localStorage['LChambas']);    	
	    		var tempo = lista.splice(posicion, 1, objCham);	    			    			
	    		localStorage['LChambas']=JSON.stringify(lista);	    	
	    		miChamb.funciones.cargarTablaC();	    		    		
	    		Materialize.toast('<span>Chamba modificada</span><a class=&quot;btn-flat yellow-text&quot; href=&quot;#!&quot;><a>', 5000);
	    	}
	    	else{
	    	miChamb.funciones.cargarTablaC();
	   	 }
	    }
	    else {
	    	miChamb.funciones.cargarTablaC();
	    }
	    posicionAct=-1;
	    miChamb.funciones.limpiar();
	    miChamb.funciones.cargarTablaC();
	};
	miChamb.funciones.miVarlor = function  (pos) {
		//busca el valor de la segunda columna (id)
 		$(pos).find('td:eq(0)').each(function (){
 			fila = $(this).html();
 			document.getElementById('id').value=fila;
 			return fila;
 		})
 		$(pos).find('td:eq(3)').each(function (){
 			fila = $(this).html();
 			document.getElementById('note').value=fila;
 			return fila;
 		})
 		$(pos).find('td:eq(2)').each(function (){
 			fila = $(this).html();
 			document.getElementById('date').value=fila;
 			return fila;
 		})
 		$(pos).find('td:eq(1)').each(function (){
 			fila = $(this).html();
 			document.getElementById('descrip').value=fila;
 			return fila;
 		})
	};

	miChamb.funciones.cargarTablaC = function () {
	    
	    var cont = miChamb.funciones.tamannoC();
	    if (cont > 0)
	    {
	      var render =  "<table class='responsive-table' Id ='tbl1'><thead><tr><th>Id Client</th><th>Work Description</th><th>Date</th><th>Note</th></tr> </thead>";
	        render+="<tbody>";
	      var listaC = JSON.parse(localStorage['LChambas']);
	        for (i = 0; i < cont; i++) {
	            var obj =  listaC[i];
	            //onmouseover="miChamb.funciones.cambiar_color_over(this);" onmouseout="miChamb.funciones.cambiar_color_out(this);"
	                  render += '<tr onclick=miChamb.funciones.cargar(this);>'
	                  render += '<td >' + obj.Id + "</td>";	              
	                  render+= "<td>" + obj.Work + " </td>";
	                  render+= "<td>" + obj.Date + " </td>";
	                  render += "<td>" + obj.Note+ "</td>";
	                  //render += "<td>" + '<button class="waves-effect waves-light btn modal-trigger" href="#modal1">x</button>' + "</td>";
	                  render += "</tr>";
	        }
	          render+="</tbody";
	        render+="</table>";
	        dvcontainer.innerHTML = render;
	    }
	};
	/* cambiar de color
	miChamb.funciones.cambiar_color_over = function(celda){ 
   		celda.style.backgroundColor="#4db6ac" 
	}; 
	miChamb.funciones.cambiar_color_out = function (celda){ 
   		celda.style.backgroundColor="#b2dfdb" 
	};*/
		miChamb.funciones.tamannoC = function () {
		if (localStorage.getItem('LChambas') == null) {
			return 0;
		}
		else{
			var listaC = JSON.parse(localStorage['LChambas']);
	    	var cont = listaC.length;
			return cont;
		}
	};
	miChamb.funciones.limpiar = function  () {
		// limpia campos
		document.getElementById('id').value="";
		document.getElementById('date').value="";
		document.getElementById('note').value="";
		document.getElementById('descrip').value="";
	}
