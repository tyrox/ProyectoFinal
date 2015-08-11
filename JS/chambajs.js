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

	var LChambas = new Array();
	var objCham = {
		Id: 0,
		Work: "",
		Date: "",
		Note:""
	};

	function guardarC(){		
		var id = document.getElementById('id').value;
		var fecha = document.getElementById('date').value;
		var notes = document.getElementById('note').value;
		var trabajo = document.getElementById('descrip').value;
		if (fecha != '' && id != '' && notes !='' && trabajo!='') {
			
			if ((localStorage.getItem('LChambas') == null)) {
				objCham = {
					Id: 0,
					Work: "",
					Date: "",
					Note:""
				};
				LChambas = new Array();
				objCham.Id=id;
				objCham.Work=trabajo;
				objCham.Note=notes;
				objCham.Date=fecha;
				LChambas.push(objCham);
				localStorage['LChambas']=JSON.stringify(LChambas);
				console.log(LChambas);
				cargarTablaC();
			}
			else{
				var LChambas=JSON.parse(localStorage['LChambas']);
				objCham.Id=id;
				objCham.Work=trabajo;
				objCham.Note=notes;
				objCham.Date=fecha;
				LChambas.push(objCham);
				localStorage['LChambas']=JSON.stringify(LChambas);
				console.log(LChambas);
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
	      var render =  "<table class='responsive-table' Id ='tbl1'><thead><tr><th>Id Client</th><th>Work Description</th><th>Date</th><th>Note</th></tr> </thead>";
	        render+="<tbody>";
	      var listaC = JSON.parse(localStorage['LChambas']);
	        for (i = 0; i < cont; i++) {
	            var obj =  listaC[i];
	                  render += "<tr>";
	                  render += "<td>" + obj.Id + "</td>";
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
	function tamannoC () {
		if (localStorage.getItem('LChambas') == null) {
			return 0;
		}
		else{
			var listaC = JSON.parse(localStorage['LChambas']);
	    	var cont = listaC.length;
			return cont;
		}
	};
