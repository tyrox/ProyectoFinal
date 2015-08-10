
function login() {
	var username = document.getElementById('user').value;
	var password = document.getElementById('password').value;
	//window.location.href="dash.html";

	if (username != '12' || password != '12') {		
			alert("Error");
			return;
	}
	 else {
		alert("Entraste");
		window.open("dash.html");
		return;
		
	}	
};

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
}
