
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
	      var render =  "<table class='responsive-table' Id ='tbl1'> <thead><tr><th>Id</th><th>Name</th><th>Phone</th></tr> </thead>";
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


	
