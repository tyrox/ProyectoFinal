var miInvo = miInvo || {}
miInvo.funciones = miInvo.funciones || {};

	var solonumeros = function (e){
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
	var LInvoice = new Array();
	var objInv = {
		Id: 0,
		Work: "",
		Date: "",
		Amount:0
	};	
	var temporal;
	var posicionAct= -1;

	function cargarDataL () {
		if (JSON.parse(localStorage['LClientes']) != null) {			
			var mycars = new Array();
			$(document).ready( function() {
    			$(mycars).each( function(index, item) {
        			var option = $('<option value="'+item+'"></option>');
        			$('#id').append(option);
    			})
			})
			var LClientes=JSON.parse(localStorage['LClientes']);
			$(document).ready( function() {
    			$(LClientes).each( function(index, item) {
        			var option = $('<option value="'+item.Id+'"></option>');
        			$('#id').append(option);
    			})
			})
		}
	};

	function guardarC(){		
		var id = document.getElementById('id').value;
		var fecha = document.getElementById('date').value;
		var monto = document.getElementById('amount').value;
		var trabajo = document.getElementById('descrip').value;
		if (fecha != '' && id != '' && monto !='' && trabajo!='') {
			
			if ((localStorage.getItem('LInvoice') == null)) {
				objInv = {
					Id: 0,
					Work: "",
					Date: "",
					Amount:0
				};
				LInvoice = new Array();
				objInv.Id=id;
				objInv.Work=trabajo;
				objInv.Amount=monto;
				objInv.Date=fecha;
				LInvoice.push(objInv);
				localStorage['LInvoice']=JSON.stringify(LInvoice);
				miInvo.funciones.cargarTablaC();
			}
			else{
				var LInvoice=JSON.parse(localStorage['LInvoice']);
				objInv.Id=id;
				objInv.Work=trabajo;
				objInv.Amount=monto;
				objInv.Date=fecha;
				LInvoice.push(objInv);
				localStorage['LInvoice']=JSON.stringify(LInvoice);				
				miInvo.funciones.cargarTablaC();
		}

		}
		else {
				alert("Faltan datos!");
		}
		posicionAct=-1;
	    miInvo.funciones.limpiar();
	    
	};
	miInvo.funciones.cargar = function (pos){
		if (temporal!=null) {
			temporal.style.backgroundColor="#b2dfdb"; 	
		}		
		temporal = pos;
		posicionAct= $(pos).closest("tr").index();		
		console.log(posicionAct);
		pos.style.backgroundColor="#4db6ac"; 
		miInvo.funciones.miVarlor(temporal);
	};
	miInvo.funciones.modificar = function (pos){
		
		var cont = miInvo.funciones.tamannoC();
		var nuevo = new Array();
		objInv.Id =document.getElementById('id').value;
		objInv.Amount =document.getElementById('amount').value;
		objInv.Work =document.getElementById('descrip').value;
		objInv.Date =document.getElementById('date').value;
		var posicion = posicionAct;
		//fila.parentNode.removeChild(fila);
	    if (cont > 0 && posicion >=0)
	    {
	    	if (objInv.Id !="" && objInv.Amount !="" && objInv.Work !="" && objInv.Date !="") {
	    		var lista = new Array();
	    		var lista = JSON.parse(localStorage['LInvoice']);    	
	    		lista.splice(posicion, 1, objInv);
	    		localStorage['LInvoice']=JSON.stringify(lista);	    	
	    		miInvo.funciones.cargarTablaC();	    		    		
	    		Materialize.toast('<span>Invoice modificado</span><a class=&quot;btn-flat yellow-text&quot; href=&quot;#!&quot;><a>', 5000);
	    	}
	    	else{
	    	
	   	 }
	    }
	    else {
	    	
	    }
	    posicionAct=-1;
	    miInvo.funciones.limpiar();
	    miInvo.funciones.cargarTablaC();
	};
	miInvo.funciones.eliminar = function (pos){
		var posicion = posicionAct;
		var cont = miInvo.funciones.tamannoC();
	    if (posicion >= 0 && cont>0)
	    {
	    	var lista = new Array();
	    	var lista = JSON.parse(localStorage['LInvoice']);	    	
	    	if (posicion == 0) {
	    		lista.shift();
	    		localStorage['LInvoice']=JSON.stringify(lista);
	    	}
	    	else {	    	
	    		lista.splice(posicion, 1);
	    		localStorage['LInvoice']=JSON.stringify(lista);	    	
	    		miInvo.funciones.cargarTablaC();	    	
	    	}
	    }
	    else {	    	
	    	
	    }
	    window.location.href="invoices.html";	    
	};
	miInvo.funciones.miVarlor = function  (pos) {
		//busca el valor de la segunda columna (id)
 		$(pos).find('td:eq(0)').each(function (){
 			fila = $(this).html();
 			document.getElementById('id').value=fila;
 			return fila;
 		})
 		$(pos).find('td:eq(1)').each(function (){
 			fila = $(this).html();
 			document.getElementById('descrip').value=fila;
 			return fila;
 		})
 		$(pos).find('td:eq(2)').each(function (){
 			fila = $(this).html();
 			document.getElementById('date').value=fila;
 			return fila;
 		})
 		$(pos).find('td:eq(3)').each(function (){
 			fila = $(this).html();
 			document.getElementById('amount').value=fila;
 			return fila;
 		})
	};
	miInvo.funciones.cargarTablaC = function() {
	    
	    var cont = miInvo.funciones.tamannoC();
	    if (cont > 0)
	    {
	    	//cargarDataL();
	      	var render =  "<table class='responsive-table' Id ='tbl1'><thead><tr><th>Id Client</th><th>Description</th><th>Date</th><th>Amount $</th></tr> </thead>";
	        render+="<tbody>";
	      	var listaC = JSON.parse(localStorage['LInvoice']);
	        for (i = 0; i < cont; i++) {
	            var obj =  listaC[i];
	                  render += "<tr onclick=miInvo.funciones.cargar(this);>";
	                  render += "<td>" + obj.Id + "</td>";
	                  render+= "<td>" + obj.Work + " </td>";
	                  render+= "<td>" + obj.Date + " </td>";
	                  render += "<td>" + obj.Amount+ "</td>";
	                  render += "</tr>";
	        }
	          render+="</tbody";
	        render+="</table>";
	        dvcontainer.innerHTML = render;
	    }
	};
	miInvo.funciones.tamannoC = function () {
		if (localStorage.getItem('LInvoice') == null) {
			return 0;
		}
		else{
			var listaC = JSON.parse(localStorage['LInvoice']);
	    	var cont = listaC.length;
			return cont;
		}
	};
	miInvo.funciones.limpiar = function  () {
		// limpia campos
		document.getElementById('id').value="";
		document.getElementById('date').value="";
		document.getElementById('amount').value="";
		document.getElementById('descrip').value="";
	}
