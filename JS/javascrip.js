
	function validateUser() {
		var username = document.getElementById('user').value;
		var password = document.getElementById('password').value;
		var errorElement = document.getElementById('error_msg');
		if (username == '12' && password == '12') {		
			window.location.href="dash.html";
		} else {
			alert("error");
		}	
	}

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
	}

	var LChambas = new Array();
	var objUser = {
		Id: 0,
		Nombre: "",
		Tel: ""
	};

	function guardarCh(){
		var cliente = document.getElementById('cliente').value;
		var descripcion = document.getElementById('descripcion').value;
		var date = document.getElementById('date').value;
		var note = document.getElementById('note').value;
		if (cliente == '' || descripcion == '' || date ==''|| note =='') {
			alert("Ingresar datos");
		}
		else if ((localStorage.getItem('LChambas') == null)) {
				objUser.cliente=cliente;
				objUser.descripcionv=descripcion;
				objUser.date=date;
				objUser.note=note;
				LChambas.push(objUser);
				localStorage['LChambas']=JSON.stringify(LChambas);
				console.log(LChambas);
			}
		else {
				var LClientes=JSON.parse(localStorage['LChambas']);
				objUser.cliente=cliente;
				objUser.descripcion=descripcion;
				objUser.date=date;
				objUser.note=note;
				LClientes.push(objUser);
				localStorage['LChambas']=JSON.stringify(LChambas);
				console.log(LChambas);
		}
	};

	var LClientes = new Array();
	var objUser = {
		Id: 0,
		Nombre: "",
		Tel: ""
	};

	function guardarC(){
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
				console.log(LClientes);
				cargarTablaC();
			}
			else{
				var LClientes=JSON.parse(localStorage['LClientes']);
				objUser.Id=id;
				objUser.Nombre=nombre;
				objUser.Tel=tel;
				LClientes.push(objUser);
				localStorage['LClientes']=JSON.stringify(LClientes);
				console.log(LClientes);
				cargarTablaC();
		}

		}
		else {
				alert("Ingresar datos");
		}
	};

	function cargarTablaC() {
	    
	    var cont = tamannoC();
	    if (cont > 0)
	    {
	      var render =  "<table class='tbdatos' Id ='tbl1'> <thead><tr><th>Id</th><th>Name</th><th>Phone</th></tr> </thead>";
	        render+="<tbody>";
	      var listaC = JSON.parse(localStorage['LClientes']);
	        for (i = 0; i < cont; i++) {
	            var obj =  listaC[i];
	                  render += "<tr>";
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
	function tamannoC () {
		if (localStorage.getItem('LClientes') == null) {
			return 0;
		}
		else{
			var listaC = JSON.parse(localStorage['LClientes']);
	    	var cont = listaC.length;
			return cont;
		}
	};


/*	var list = function(){
		if (!window.localStorage) {
		  Object.defineProperty(window, "localStorage", new (function () {
		    var aKeys = [], oStorage = {};
		    Object.defineProperty(oStorage, "getItem", {
		      value: function (sKey) { return sKey ? this[sKey] : null; },
		      writable: false,
		      configurable: false,
		      enumerable: false
		    });
		    Object.defineProperty(oStorage, "key", {
		      value: function (nKeyId) { return aKeys[nKeyId]; },
		      writable: false,
		      configurable: false,
		      enumerable: false
		    });
		    Object.defineProperty(oStorage, "setItem", {
		      value: function (sKey, sValue) {
		        if(!sKey) { return; }
		        document.cookie = escape(sKey) + "=" + escape(sValue);
		      },
		      writable: false,
		      configurable: false,
		      enumerable: false
		    });
		    Object.defineProperty(oStorage, "length", {
		      get: function () { return aKeys.length; },
		      configurable: false,
		      enumerable: false
		    });
		    Object.defineProperty(oStorage, "removeItem", {
		      value: function (sKey) {
		        if(!sKey) { return; }
		        document.cookie = escape(sKey);
		      },
		      writable: false,
		      configurable: false,
		      enumerable: false
		    });
		    this.get = function () {
		      var iThisIndx;
		      for (var sKey in oStorage) {
		        iThisIndx = aKeys.indexOf(sKey);
		        if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
		        else { aKeys.splice(iThisIndx, 1); }
		        delete oStorage[sKey];
		      }
		      for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
		      for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s); nIdx < aCouples.length; nIdx++) {
		        aCouple = aCouples[nIdx].split(/\s*=\s);
		        if (aCouple.length > 1) {
		          oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
		          aKeys.push(iKey);
		        }
		      }
		      return oStorage;
		    };
		    this.configurable = false;
		    this.enumerable = true;
		  })());
		}}

	 var newClient = function(pId,pFirstName,pLastName,pPhone){
		
		var pId=document.getElementById("demo").value();
		this.firstName = pFirstName;
	  	this.LastName = pLastName;
	  	this.Phone = pPhone;

		var text = {"ID:"this.Id,
					"FirstName:"FirstName,
					"LastName:"LastName,
					"Phone:"this.Phone};
		var obj = JSON.parse(text);
	}

	var newChamba = function(pClient,pDescrption,pDate,pNote){
		this.client = pClient;
		this.descrption= pDescrption;
		this.date=pDate;
		this.note=pNote;

		var text = {
			"client: "this.client;
			"descrption: "this.descrption;
			"date: "this.date;
			"note: "this.note;
		} 
		var obj = JSON.parse(text);
	}
	var newInvoice = function (pClient,pDescrption,pDate,pNote){
		this.client = pClient;
		this.descrption= pDescrption;
		this.date=pDate;
		this.note=pNote;
	}

	var newUser  = function(pID,pFirstName,pLastName,pPhone){
		this.Id=pId;
		this.firstName = pFirstName;
		this.LastName = pLastName;
		this.Phone = pPhone;

		var text = {"ID:"this.Id,
			"FirstName:"FirstName,
			"LastName:"LastName,
			"Phone:"this.Phone};
		var obj = JSON.parse(text);
	}

	var dce =function (e) {
		return document.createElement(e);
	}

	var crearColumna = function (name, id, fila) {
		td =dce('td');
		input = dce('input');
		input.type = 'text';
		input.setAttribute('name', 'txt_' + name);
		input.setAttribute('id', 'txt_' + name + '_' + fila);
		td.appendChild(input);
		return td;
	}

	var n_fila = 0;

	var agregarFila = function (){
		destino = document.getElementById('tbCuerpo');
		tr = dce('tr');
		tr.appendChild(crearColumna('id', n_fila));
		tr.appendChild(crearColumna('name', n_fila));

		destino.appendChild(tr);
		n_fila++;
	}
}*/		
