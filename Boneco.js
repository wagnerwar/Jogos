
/*
	Criando o objeto Boneco, que será o responsável pelas movimentações no cenário(boneco.html)
*/


function Boneco(cor){
	this.cor = cor;
	this.dX = 0; //Coordenada X atual do objeto
	this.dY = 0; // Coordenada Y atual do objeto
	this.s = "d"; //Sentido do objeto: Pode ser d(Direito) ou e(Esquerdo)
	this.minY = 240; // Coordenada Y m[inima(Ponto Y do chão)
	this.sY = "C"; //Sentido horizontal do objeto
	this.maxY = 0;
}
/*Gambiarra abaixo para associar o método constroe á classe Boneco
 * Forma alternativa de definir métodos á uma classe
 * */
Boneco.prototype.constroe = function(x,y){
	this.dX = x;
	this.dY = y;
	this.maxY = 320;
	var contexto = carregaContexto(document.getElementsByTagName('canvas')[0].id);
	if(contexto){
		contexto.beginPath();
		contexto.fillStyle = this.cor;
		contexto.arc(x,y,20,0,2*Math.PI,false);
		contexto.fill();
		//Desenhando os olhos
		contexto.beginPath();
		contexto.fillStyle = "#FFFFFF";
		contexto.moveTo(x+2,y-2);
		contexto.arc(x+2,y-2,3,0,2*Math.PI,false);
		contexto.fill();
		
		contexto.beginPath();
		contexto.fillStyle = "#FFFFFF";
		contexto.moveTo(x+8,y-4);
		contexto.arc(x+8,y-4,3,0,2*Math.PI,false);
		contexto.fill();
	}
}

/*
	Método abaixo executa move o objeto Boneco para os lados. Quando o objeto está no limite(Final do caminho), seu sentido é alterado(Esquerdo ou Direito).
	Como terceiro parâmetro,  recebe o array de obstáculos a serem ultrapassados.
	Se x estiver entre propriedades minX e maxX
		Se for menor ou igual á minY do obstáculo
			Seta atributo dY como sendo equivalente á minY.
		Senão
			Se sentido é igual á direito
				Seta dx como equivalente á minX
			Senão
				Seta dx como equivalente á maxX
	Senão
		Se dx for maior do que maxX e sentido for D OR se dx for menor do que minX e sentido for E
			Seta dY como maxY(Toca o solo)
		
*/

Boneco.prototype.andar = function(dx,s,obstaculos){
	var  maxX = document.getElementsByTagName('canvas')[0].width;
	this.s = s;
	if(this.dX >= maxX){
			this.s = "e";
		}else if(this.dX <= 10){
			this.s = "d";
		}
			for(obs in obstaculos){
				if( (obstaculos[obs].minX <= this.dX)  &&   ( this.dX <= obstaculos[obs].maxX)){
					if(this.dY <= obstaculos[obs].minY){
						this.dY = obstaculos[obs].minY;
					}else{
						if(this.s == "d"  && (this.dX <= obstaculos[obs].minX + obstaculos[obs].width/2)){
							this.dX -= 2*dx;
							return;
						}else if(this.s == "e" && (this.dX >= obstaculos[obs].maxX - obstaculos[obs].width/2)){
							this.dX += 2*dx;
							return;
						}
					}
				}else if((this.dX > obstaculos[obs].maxX && this.s == "d") || (this.dX < obstaculos[obs].minX && this.s == "e")){
					this.dY = this.maxY;
				}
			}
	if(this.s == "d"){
		this.dX += dx;
	}else{
		this.dX -= dx;
	}
}

/*
	Método abaixo faz o objeto pular. Quando o usuário clica na barra de espaço, o usuário pula á uma altura maior do que a caixa 
*/

Boneco.prototype.pular = function(){
	var maxY = this.maxY;
		if(this.dY >= maxY){
			this.sY = "C";
		}else if(this.dY <= this.minY){
			//this.dY = this.minY;
			this.sY = "B";
		}
		if(this.sY == "C"){
			this.dY -= 20;
		}else if(this.sY == "B"){
			this.dY += 20;
		}
}


/*
	Método abaixo serve para criar obstáculos na tela.
*/

function Obstaculo(x,y,lar,tam,cor){
	lar = parseInt(lar);
	x = parseInt(x);
	y = parseInt(y);
	//Desenhando o objeto
	drawQuadrada(x,y,lar,tam,cor);
	this.minY = y;
	this.minX = x;
	this.maxX = x+lar;
	this.width = lar;
	this.altura = tam;
}