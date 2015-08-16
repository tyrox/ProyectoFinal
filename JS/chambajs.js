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
	var contador = 0;
	var LChambas = new Array();
	var objCham = {
		IdC: 0,
		Id: 0,
		Work: "",
		Date: "",
		Note:""
	};

	miChamb.funciones.guardarC = function (){		
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
				alert("Ingresar datos");
		}
	};
	miChamb.funciones.eliminar = function (pos){
		var posicion = pos;
		var cont = miChamb.funciones.tamannoC();
	    if (cont > 0)
	    {
	    	var lista = new Array();
	    	var lista = JSON.parse(localStorage['LChambas']);
	    	console.log(lista);
	    	lista.splice(posicion, posicion+1);
	    	console.log(lista);
	    	localStorage['LChambas']=JSON.stringify(lista);	    	
	    	console.log(lista);
	    	miChamb.funciones.cargarTablaC();
	    }
	    else {
	    	miChamb.funciones.cargarTablaC();
	    }
	    
	};
	miChamb.funciones.modificar = function (pos){
		var posicion = pos;
		var cont = miChamb.funciones.tamannoC();
		var nuevo = new Array();
		//
		fila = pos.parentNode;
		//fila.parentNode.removeChild(fila);
	    if (cont > 0)
	    {
	    	/*
	    	objCham.Id=id;
				objCham.Work=trabajo;
				objCham.Note=notes;
				objCham.Date=fecha;
				*/
	    	var lista = JSON.parse(localStorage['LChambas']);
	    	/*
	    	console.log(lista);
	    	lista.splice(posicion, posicion+1, objCham);
	    	console.log(lista);
	    	localStorage['LChambas']=JSON.stringify(lista);	    	
	    	*/
	    	
	    	console.log(fila);

	    	miChamb.funciones.cargarTablaC();
	    }
	    else {
	    	miChamb.funciones.cargarTablaC();
	    }
	    
	};

	miChamb.funciones.cargarTablaC = function () {
	    
	    var cont = miChamb.funciones.tamannoC();
	    if (cont > 0)
	    {
	      var render =  "<table class='responsive-table' Id ='tbl1'><thead><tr><th>Id Client</th><th>Id Chamba</th><th>Work Description</th><th>Date</th><th>Note</th></tr> </thead>";
	        render+="<tbody>";
	      var listaC = JSON.parse(localStorage['LChambas']);
	        for (i = 0; i < cont; i++) {
	            var obj =  listaC[i];
	                  render += "<tr onclick=miChamb.funciones.modificar(this);>";
	                  render += "<td>" + obj.Id + "</td>";
	                  render += "<td>" + obj.IdC + "</td>";
	                  render+= "<td>" + obj.Work + " </td>";
	                  render+= "<td>" + obj.Date + " </td>";
	                  render += "<td>" + obj.Note+ "</td>";
	                  render += "</tr>";
	        }
	          render+="</tbody";
	        render+="</table>";
	        dvcontainer.innerHTML = render;
	    }
	};
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
