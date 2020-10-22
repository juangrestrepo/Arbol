var ingreso, n, i, w, x, primero, ultimo, pil, p, s="",raiz, termina = false, termiGrad=false, prim, gradoD, z=0; 

//Crea árbol representado como lista generalizada de acuerdo al texto ingresado
function crear(){
	var y = 1;
	ingreso = document.getElementById("ingreso").value;
	primero = new nodoLg();
	pil = new pila();
	primero.asignaDato(ingreso[1]);
	ultimo = primero;
	n = ingreso.length;
	if (n == 2) return;
	i = 3;
	while(i <= n-3){
		y++;
		x = new nodoLg();
		ultimo.asignaLiga(x);
		ultimo=x;
		if (ingreso[i+1] == "(") {
			ultimo.asignaSw(1);
			pil.apilar(ultimo);
			x = new nodoLg();
			x.asignaDato(ingreso[i]);
			ultimo.asignaDato(x);
			ultimo = x;
			i = i + 2;
		}else{
			ultimo.asignaDato(ingreso[i]);
			if(ingreso[i+1] == ")"){
				i++;
				while(i < n && ingreso[i] == ")" && !pil.esVacia()){
					ultimo = pil.desapilar();
					i++;
				}if (ingreso[i] == ",") {
					i++;
				}
			}else{
				i = i + 2;
			}
		}
	}
	document.getElementById("sub").innerHTML= "Cantidad de subárboles: "+y;
	var imp = ba(primero,0);
	document.getElementById("ar").innerHTML= "Arbol ingresado: "+imp;
	s = "";
	creaBi(primero);
}


function ba(x,b){
	var r;
	prim = null;
	pil = new pila();
	if (b == 0) {
		s = s+"("+x.retornaDato();
		if (x.retornaLiga() == null) {
			s=s+"(";
			return;
		}
		s=s+"(";
		prim = x;
	}
	r = x.retornaLiga();
	while(r != null){
		if(r.retornaSw() == 0){
			s = s + r.retornaDato();
		}else{
			q = r.retornaDato();
			s = s + q.retornaDato() + "(";
			ba(r.retornaDato(),1);
		}
		if (r.retornaLiga()!=null) {
			s=s + ",";
		}
		r = r.retornaLiga();
	}
	s = s + ")";
	if (prim == x) {s=s+')';}
	return s;
}

//Crea árbol binario a partir del arbol representado como lista generalizada y llama a sus métodos correspondientes
function creaBi(a){
	var z = 1;
	pil = new pila();
	p = primero;
	x = new nodoDoble(p.retornaDato());
	raiz = x;
	ultimo = x;
	p = p.retornaLiga();
	while(p!=null){
		z++;
		if(p.retornaSw() == 0){
			x = new nodoDoble(p.retornaDato());
		}else{
			q = p.retornaDato();
			x = new nodoDoble(q.retornaDato());
			pil.apilar(x);
			pil.apilar(q.retornaLiga());
		}
		ultimo.asignaLi(x);
		ultimo = x;
		p = p.retornaLiga();
		while(p!=null){
			if(p.retornaSw() == 0){
				x = new nodoDoble(p.retornaDato());
			}else{
				q = p.retornaDato();
				x = new nodoDoble(q.retornaDato());
				pil.apilar(x);
				pil.apilar(q.retornaLiga());
			}
			ultimo.asignaLd(x);
			ultimo = x;
			p = p.retornaLiga();
		}
		if (!pil.esVacia()) {
			p = pil.desapilar();
			ultimo = pil.desapilar();
		}
	}cadenaInorden="";cadenaPosorden="";cadenaPreorden="";
	var hoj = hojasArbol(raiz);
	document.getElementById("hojas").innerHTML= "Número de hojas: "+hoj;
	var alt = alturaArbol(raiz);
	document.getElementById("alt").innerHTML= "Altura del arbol: "+alt;
	var grad = gradoArbol(raiz);
	document.getElementById("gra").innerHTML= "Grado del arbol: "+grad;
	recorridoPorNiveles();
	recorridoInorden(raiz);
	escribirInorden();
	recorridoPosorden(raiz);
	escribirPosorden();
	recorridoPreorden(raiz);
	escribirPreorden();
}

//Determina el número de hojas del árbol n-ario a partir del árbol binario
function hojasArbol(x){
	var h = 0;
	colaPadres = new cola();
	colaPadres.encolar(x);
	while(!colaPadres.esVacia()){
		x = colaPadres.desencolar();
		p = x.retornaLi();
		while (p!==null) {
			if (p.retornaLi() != null) {colaPadres.encolar(p)}
			else h++;
			p = p.retornaLd();
		}
	}
	return h;
}

//Determina la altura del árbol n-ario a partir del árbol binario
function alturaArbol(x){
	i = 0;
	var vAlt = []; var mayor = 0;
	vAlt[0] = 1;
	colaPadres = new cola();
	x = x.retornaLi();
	colaPadres.encolar(x);
	pad=0;
	while(!colaPadres.esVacia() && !termina){
		
		while (x!==null && !termina) {
			if (vAlt[i] == undefined) {vAlt[i]=1;}
			vAlt[i] = vAlt[i] + 1;
			if (x.retornaLd() != null) {colaPadres.encolar(x)}
			x = x.retornaLi();
		}
		x = colaPadres.desencolar();
		x = x.retornaLd();
		i++;
	}
	for (var i = 0; i < vAlt.length; i++) {
		if (vAlt[i] > mayor) {mayor = vAlt[i];}
	}
	return mayor;
}

//Determina grado del árbol n-ario a partir del árbol binario
function gradoArbol(x){
	i = 0;
	var v = []; var mayor = 0;
	v[0] = 0;
	colaPadres = new cola();
	colaPadres.encolar(x);
	pad=0;
	while(!colaPadres.esVacia()){
		x = colaPadres.desencolar();
		p = x.retornaLi();
		while (p!==null) {
			if (v[i] == undefined) {v[i]=0;}
			v[i] = v[i] + 1;
			if (p.retornaLi() != null) {colaPadres.encolar(p)}
			p = p.retornaLd();
		}
		i++;
	}
	for (var i = 0; i < v.length; i++) {
		if (v[i] > mayor) {mayor = v[i];}
	}
	return mayor;
}

//Se activa cuando se presiona el 2 botón
function btn2(){
	ancestros();
	gradoDato();
}

//Determina el padre de un dato en el árbol n-ario a partir del árbol binario
function padre(x,dato){
	termina = false;
	if (x.retornaObjeto() == dato) {
		document.getElementById("ancestros").innerHTML= "El dato es la raíz, no tiene ancestros";
		return null;}
	colaPadres = new cola();
	colaPadres.encolar(x);
	pad=0;
	while(!colaPadres.esVacia() && !termina){
		x = colaPadres.desencolar();
		p = x.retornaLi();
		while (p!==null && !termina) {
			if (p.retornaObjeto() == dato) {
				document.getElementById("ancestros").innerHTML= x.retornaObjeto();
				termina=true;
				if (z == 0) {gradoD = p;}
				z++;
				return x.retornaObjeto(); 
			}	
			if (p.retornaLi() != null) {colaPadres.encolar(p)}
			p = p.retornaLd();
		}
	}
}

//Determina los ancestros de un dato en el árbol n-ario a partir del árbol binario
function ancestros(){
	cadena="";
	var dato=document.getElementById("ancestrosDe").value;
	pilaAncestros=new pila();
	if (dato == raiz.retornaObjeto()) {
		document.getElementById("ancestros").innerHTML= "El dato es la raíz, no tiene ancestros";
		return;
	}
	p = padre(raiz,dato);
	while (p!=null) {
		pilaAncestros.apilar(p);
		p=padre(raiz,p);		
	}
	while (!pilaAncestros.esVacia()) {
		p=pilaAncestros.desapilar();
		cadena+=" "+ p +",";
	}
	document.getElementById("ancestros").innerHTML= cadena;
}

//Determina el grado de un dato ingresado por el usuario
function gradoDato(){
	w=0;
	termina = false;
	var dato=document.getElementById("ancestrosDe").value;
	x = raiz;
	colaPadres = new cola();
	colaPadres.encolar(x);
	pad=0;
	while(!colaPadres.esVacia() && !termina){
		x = colaPadres.desencolar();
		p = x.retornaLi();
		while (p!==null && !termina) {
			if (p.retornaObjeto() == dato) {
				p = p.retornaLi();
				while(p != null){
					w++;
					p = p.retornaLd();
				}
				document.getElementById("gradoNodo").innerHTML= w;
				return x.retornaObjeto(); 
			}	
			if (p.retornaLi() != null) {colaPadres.encolar(p)}
			p = p.retornaLd();
		}
	}
}

//Recorre el árbol binario por niveles
function recorridoPorNiveles() {
	cadenaNiveles="";
	colaNiveles=new cola();
	colaNiveles.encolar(raiz);
	while (!colaNiveles.esVacia()) {
		p=colaNiveles.desencolar();
		cadenaNiveles+=" " + p.retornaObjeto() + ",";
		if (p.retornaLi()!==null) {
			colaNiveles.encolar(p.retornaLi())
		}
		if (p.retornaLd()!==null) {
			colaNiveles.encolar(p.retornaLd())			
		}
	}
	document.getElementById("recorridoPorNiveles").innerHTML=cadenaNiveles;
}

//Hace el recorrido inorden del árbol
function recorridoInorden(r) {
	if (r!==null) {
		recorridoInorden(r.retornaLi());
		escribirIn(r.retornaObjeto());
		recorridoInorden(r.retornaLd())
	}
}

//Escribe el recorrido inorden del árbol
function escribirIn(dato) {
	cadenaInorden+=" "+dato+",";
}

//Escribe el recorrido inorden del árbol 
function escribirInorden(){
	document.getElementById("recorridoInorden").innerHTML=cadenaInorden;
}

//Hace el recorrido posorden
function recorridoPosorden(r) {
	if (r!==null) {
		recorridoPosorden(r.retornaLi());
		recorridoPosorden(r.retornaLd());
		escribirPos(r.retornaObjeto());
	}
}

function escribirPos(dato) {
	cadenaPosorden+=" "+dato+",";
}


function escribirPosorden(){
	document.getElementById("recorridoPosorden").innerHTML=cadenaPosorden;
}

function recorridoPreorden(r) {
	if (r!==null) {
		escribirPre(r.retornaObjeto());
		recorridoPreorden(r.retornaLi());
		recorridoPreorden(r.retornaLd());
	}
}


function escribirPre(dato) {
	cadenaPreorden+=" "+dato+",";
}


function escribirPreorden(){
	document.getElementById("recorridoPreorden").innerHTML=cadenaPreorden;
}

//Clase de los nodos del árbol como lista generalizada
class nodoLg{
	constructor(){
		this.sw=0;
		this.dato=null;
		this.liga=null;
	}
	asignaDato(x){this.dato=x;}
	asignaLiga(x){this.liga=x;}
	asignaSw(x){this.sw=x;}
	retornaDato(){return this.dato;}
	retornaLiga(){return this.liga;}
	retornaSw(){return this.sw;}
}

//Clase de pila
class pila{
	constructor(){
		this.v = [];
		this.tope = 0;
	}
	apilar(x){
		this.tope = this.tope + 1;
		this.v[this.tope] = x;
	}
	desapilar(){
		var d = this.v[this.tope];
		this.tope = this.tope - 1;
		return d;
	}
	esVacia(){return this.tope === 0;}
}


class cola{
	constructor(){
		this.v = [];
		this.primero = 0;
		this.ultimo = this.primero;
	}
	encolar(x){
		this.ultimo = this.ultimo + 1;
		this.v[this.ultimo] = x;
	}
	desencolar(){
		this.primero = this.primero + 1;
		return this.v[this.primero];
	}
	esVacia(){
		return this.primero == this.ultimo;
	}
}

//Clase de nodos del árbol binario
class nodoDoble {
    constructor(objeto) {
        this.LigaIzquierda=null;
        this.Objeto=objeto;
        this.LigaDerecha=null;
    }
    retornaObjeto(){return this.Objeto}
    retornaLd(){return this.LigaDerecha}
    retornaLi(){return this.LigaIzquierda}
    asignaLd(Ld){this.LigaDerecha=Ld}
    asignaLi(Li){this.LigaIzquierda=Li}
}
