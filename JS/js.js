
function login() {	
	var user = document.getElementById('user').value;
	var pass = document.getElementById('password').value;
	//window.location.href="dash.html";

	if (user == '' || pass == '') {			
			return;
	}
	 else {
	 	var result = verificarUser(user, pass);
	 	if (result == true) {
	 		guardarUserA(user, pass);
	 		alert("Entraste");
	 		window.close();
			window.open("dash.html");
			return;
	 	}

	}	
};
function mostrarUser () {
	var usuario = document.getElementById('usuario')
	var listaC = JSON.parse(localStorage['userAct']);
	usuario.innerHTML = listaC[0].User;
}


function solonumeros(e){
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
function dce(e) {
	return document.createElement(e);
}

function crearColumna(name, id, fila) {
	td =dce('td');
	input = dce('input');
	input.type = 'text';
	input.setAttribute('name', 'txt_' + name);
	input.setAttribute('id', 'txt_' + name + '_' + fila);
	td.appendChild(input);
	return td;
}
var n_fila = 0;
function agregarFila(){
	destino = document.getElementById('tbCuerpo');
	tr = dce('tr');
	tr.appendChild(crearColumna('id', n_fila));
	tr.appendChild(crearColumna('name', n_fila));

	destino.appendChild(tr);
	n_fila++;
};
function guardarUserA(user, pass){
	userAct = new Array();
	var objUser = {
			User: 0,
			Pass: ""
		};
	objUser.User=user;
	objUser.Pass=pass;
	userAct.splice(0, 1, objUser);
	localStorage['userAct']=JSON.stringify(userAct);
};
function verificarUser(user, pass){
	var result = false;
	if (localStorage.getItem('LUser') != null || (user=='admin' && pass == '$uper4dmin')) {		
		if (user=='admin' && pass == '$uper4dmin') {
			result =true;
			return result;
		}
		else {
			var listaC = JSON.parse(localStorage['LUser']);
			for (var i = 0; i < listaC.length; i++) {
				if (listaC[i].Id ==user && listaC[i].Pass1 == pass) {				
					result =true;
					return result;
				}
			}
			return result;
		}
	}
	else{
		return result;
	}
};




