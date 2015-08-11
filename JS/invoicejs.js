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

	var LInvoice = new Array();
	var objInv = {
		Id: 0,
		Work: "",
		Date: "",
		Amount:0
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
				console.log(LInvoice);
				cargarTablaC();
			}
			else{
				var LInvoice=JSON.parse(localStorage['LInvoice']);
				objInv.Id=id;
				objInv.Work=trabajo;
				objInv.Amount=monto;
				objInv.Date=fecha;
				LInvoice.push(objInv);
				localStorage['LInvoice']=JSON.stringify(LInvoice);
				console.log(LInvoice);
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
	      var render =  "<table class='tbdatos' Id ='tbl1'><thead><tr><th>Id Client</th><th>Description</th><th>Date</th><th>Amount $</th></tr> </thead>";
	        render+="<tbody>";
	      var listaC = JSON.parse(localStorage['LInvoice']);
	        for (i = 0; i < cont; i++) {
	            var obj =  listaC[i];
	                  render += "<tr>";
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
	function tamannoC () {
		if (localStorage.getItem('LInvoice') == null) {
			return 0;
		}
		else{
			var listaC = JSON.parse(localStorage['LInvoice']);
	    	var cont = listaC.length;
			return cont;
		}
	};
