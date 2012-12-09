/*
	Criando a classe que representa o heroi
*/

function Heroi(){
		var estados_possiveis = new Array();
		estados_possiveis[0] = "parado";
		estados_possiveis[1] = "andando1";
		estados_possiveis[2] = "andando2";
		estados_possiveis[3] = "pulando";
		estados_possiveis[4] = "morrendo2";
		estados_possiveis[5] = "morrendo22";
		estados_possiveis[6] = "socando";
		estados_possiveis[7] = "chutando";
		
		this.dX = 0;
		this.vX = 5;
		this.dY = 0;
		this.s = "d";
		this.estados_possiveis = estados_possiveis;
		this.img = null;
		this. imagens = new Array();
		this.pulando = false;
		this.minY = 30; //Altura máxima que pode alcançar pulando
		this.vY = 5;
		this.pi = null; //Ponto inicial do personagem na hora do pulo
}

/*
	Método que carrega  as imagens do heroi
*/

Heroi.prototype.carregaImagens = function(){
			for(i=0;i<this.estados_possiveis.length;i++){
					var imagem = new Image();
					imagem.src = "/html5/sprites/heroi_" + this.estados_possiveis[i] + ".png";
					imagem.onerror = function(e){
							console.log("Erro no carregamento da imagem" + e.target.src);
					};
					this.imagens[this.estados_possiveis[i]] = imagem;
			}
			return true;
}

/*
	Método abaixo define o posicionamento do herói
*/

Heroi.prototype.constroe = function(x,y){
	this.dX = x;
	this.dY = y;
}

/*

	Método abaixo seta a imagem do herói com base no estado passado
*/

Heroi.prototype.setaEstado = function(estado){
	this.img = this.imagens[estado];
}

/*
	Método abaixo faz o cara andar
*/

Heroi.prototype.andar = function(){
	if(this.s == "d"){
		this.dX += this.vX;
	}else if(this.s == "e"){
		this.dX -= this.vX;
	}
	this.setaEstado('andando1');
}

/*
	Método abaixo  seta o atributo s do objeto Heroi
*/

Heroi.prototype.setarSentido = function(s){
	this.s = s;
}

/*
	Método abaixo faz o herói socar
*/

Heroi.prototype.socar = function(){
	this.setaEstado("socando");
}

/*
	Método abaixo faz o herói chutar
*/

Heroi.prototype.chutar = function(){
	this.setaEstado('chutando');
}

Heroi.prototype.pular = function(pi){
	this.setaEstado('pulando');
	pi = parseInt(pi);
	this.pi = pi;
	this.checaStatusPulo();
}

Heroi.prototype.checaStatusPulo = function(){
	if(this.pi != null){
	var alcance = this.pi - this.minY;
	if(this.pulando == true){
		if(this.dY > (alcance)){
			this.dY -= this.vY;
		}else{
			this.pulando = false;
		}
	}
	
	if(this.pulando == false){
		if(this.dY < this.pi){
			this.dY  += this.vY;
		}
		
		if(this.dY >= this.pi){
			this.dY = this.pi;
			this.pi = null;
			}
		}
	}
}
