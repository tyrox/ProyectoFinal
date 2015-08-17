var miClient || miClient {
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

	var LClient = new Array();
	var objClient = {
		Id: 0,
		firtName: "",
		lastName: "",
		phone:0
	};

	function guardarC(){		
		var id = document.getElementById('id').value;
		var firtName = document.getElementById('firtName').value;
		var lastName = document.getElementById('lastName').value;
		var phone = document.getElementById('phone').value;
		if (fecha != '' && id != '' && notes !='' && trabajo!='') {
			
			if ((localStorage.getItem('LClient') == null)) {
				objClient = {
					Id: 0,
					firtName: "",
					lastName: "",
					phone:0
				};
				LClient = new Array();
				objClient.Id=id;
				objClient.firtName=firtName;
				objClient.lastName=lastName;
				objClient.phone=phone;
				LClient.push(objClient);
				localStorage['LClient']=JSON.stringify(LClient);
				console.log(LClient);
				cargarTablaC();
			}
			else{
				var LClient=JSON.parse(localStorage['LClient']);
				objClient.Id=id;
				objClient.firtName=firtName;
				objClient.lastName=lastName;
				objClient.phone=phone;
				LClient.push(objClient);
				localStorage['LClient']=JSON.stringify(LClient);
				console.log(LClient);
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
	      var render =  "<table class='responsive-table' Id ='tbl1'><thead><tr><th>Id</th><th>firtName</th><th>lastName</th><th>phone</th></tr> </thead>";
	        render+="<tbody>";
	      var listaC = JSON.parse(localStorage['LClient']);
	        for (i = 0; i < cont; i++) {
	            var obj =  listaC[i];
	                  render += "<tr>";
	                  render += "<td>" + obj.Id + "</td>";
	                  render+= "<td>" + obj.firtName + " </td>";
	                  render+= "<td>" + obj.lastName + " </td>";
	                  render += "<td>" + obj.phone+ "</td>";
	                  render += "</tr>";
	        }
	          render+="</tbody";
	        render+="</table>";
	        dvcontainer.innerHTML = render;
	    }
	};
	
	function tamannoC () {
		if (localStorage.getItem('LClient') == null) {
			return 0;
		}
		else{
			var listaC = JSON.parse(localStorage['LClient']);
	    	var cont = listaC.length;
			return cont;
		}
	};
}