
/*Toda vez que é  executado algo na tag CANVAS, deve-se instanciar o objeto especificado na variável context abaixo
 * pertencente á própria tag CANVAS. 
 * */
function carregaContexto(id){
			var elemento = document.getElementById(id);
			var context = elemento.getContext("2d");
			if(context){
			return context;
			}else{
			return false;
			}
		}
	/* Função abaixo para desenhar um triângulo simples	*/
function drawTriangulo(x,y,tamX,tamY){
			var contexto = carregaContexto(document.getElementsByTagName('canvas')[0].id);
			x = parseInt(x);
			y = parseInt(y);
			tamX = parseInt(tamX);
			tamY = parseInt(tamY);
			if(contexto){
				contexto.fillStyle = "#00FF00";
				contexto.moveTo(x-tamX,tamY);
				contexto.lineTo(tamX+x,tamY);
				contexto.lineTo(x,y);
				contexto.fill();
			}
		}
/* Função abaixo necessário para desenhar rostos */
function drawRosto(x,y,r){
	x = parseInt(x);
	y = parseInt(y);
	r = parseInt(r);
	var contexto = carregaContexto(document.getElementsByTagName('canvas')[0].id);
	if(contexto){
		contexto.fillStyle = "#FFE4B5";
		contexto.moveTo(x,y);
		contexto.arc(x,y,r,0,Math.PI*2,false);
		contexto.fill();
		//Desenhando os olhos
		contexto.fillStyle = "#000000";
		contexto.moveTo(x-7,y-4);
		contexto.fillRect(x-7,y-4,4,4);
		contexto.moveTo(x+7,y-4);
		contexto.fillRect(x+7,y-4,4,4);
		//Desenhando a boca
		contexto.beginPath();
		contexto.strokeStyle = "#FF0000";
		contexto.moveTo(x-4,y+10);
		contexto.lineTo(x+5,y+10);
		contexto.stroke();
	}
}
/* Função para se desenhar qualquer forma quadrada */
function drawQuadrada(x,y,tamX,tamY,cor){
	x = parseInt(x);
	y = parseInt(y);
	tamX = parseInt(tamX);
	tamY = parseInt(tamY);
	var contexto = carregaContexto(document.getElementsByTagName('canvas')[0].id);
	if(contexto){
		contexto.fillStyle = cor;
		contexto.beginPath();
		contexto.moveTo(x,y);
		contexto.fillRect(x,y,tamX,tamY);
		contexto.fill();
	}
}

/* Função abaixo desenha um sapato */
function drawSapato(x,y,tamX,tamY,cor){
	x = parseInt(x);
	y = parseInt(y);
	tamX = parseInt(tamX);
	tamY = parseInt(tamY);
	var contexto = carregaContexto(document.getElementsByTagName('canvas')[0].id);
	if(contexto){
		contexto.fillStyle = cor;
		contexto.beginPath();
		contexto.moveTo(x,y);
		contexto.fillRect(x,y,tamX/2,tamY/2);
		contexto.fill();
		contexto.beginPath();
		contexto.moveTo(x+tamX/2,y-tamY/2);
		contexto.arc(x+tamX/2,y+7,9,Math.PI*1.5,Math.PI*0.5,false);
		contexto.fill();
	}
}

/* Função para desenhar mãos */
function drawMao(x,y,r,cor){
var contexto = carregaContexto(document.getElementsByTagName('canvas')[0].id);
	if(contexto){
		contexto.fillStyle = cor;
		contexto.beginPath();
		contexto.moveTo(x,y);
		contexto.arc(x,y,r,0,Math.PI*2,false);
		contexto.fill();
		contexto.beginPath();
		contexto.moveTo(x,y-r);
		contexto.quadraticCurveTo(x+50,y-50,x+2,y+5);
		contexto.moveTo(x,y-r);
		contexto.quadraticCurveTo(x+5,y-100,x-20,y+5);
		contexto.fill();
	}
}

/* Função para desenhar relógio*/
function drawRelogio(x,y,r,cor){
	x = parseInt(x);
	y = parseInt(y);
	r = parseInt(r);
	var contexto = carregaContexto(document.getElementsByTagName('canvas')[0].id);
	if(contexto){
		contexto.fillStyle = cor;
		contexto.beginPath();
		contexto.moveTo(x,y);
		contexto.arc(x,y,r,0,Math.PI*2,false);
		contexto.fill();
		//Marcando os números do relógio
		contexto.fillStyle = "#FFFF00";
		contexto.fillText("12",x,y-(r-10));
		contexto.fillText("3",x+(r-10),y);
		contexto.fillText("6",x,y+(r-10));
		contexto.fillText("9",x-(r-10),y);
		//Desenhando o ponteiro
	
	}

}

/*Função abaixo move o braço do boneco com base no clique na mão do mesmo */

function moveBraco(x,y,tamB,bX,bY){
	var contexto = carregaContexto(document.getElementsByTagName('canvas')[0].id);
	if(contexto){
		x = parseInt(x);
		y = parseInt(y);
		tamB = parseInt(tamB);
		
		
		if(y >= bY){
			if(x >= bX){
				c = 2;
			}else{
				c = 4;
			}
		}else{
			if(x >= bX){
				c = 8;
			}else{
				c = 6;
			}
		}
		
		var minX = bX - tamB-15;
		var minY = bY-tamB;
		var maxX = bX + tamB-15;
		var maxY = bY+tamB;
		cX = (x<minX?minX:(x>maxX?maxX:x));
		cY = (y<minY?minY:(y>maxY?maxY:y));
		//Rotação do braço com base nas coordenadas
		drawQuadradaComRotacao(bX,bY,cX,cY,tamB,"#2F4F4F");
		//alert(cX + "-" + minX);
		drawMao(cX,cY,20,"#F0E68C");
	}
}
/*Desenhando o braço, para que sei posicionamento esteja relativo ao posicionamento da mão*/
function drawQuadradaComRotacao(x,y,cX,cY,tamB,cor){
	x = parseInt(x); //Coordenadas do braço
	y = parseInt(y);
	cX = parseInt(cX); // Coordenadas c são coordenadas da mão. São passadas como parâmetro para que o braço possa acompanhar a mão
	cY = parseInt(cY);
	tamB = parseInt(tamB); // Tamanho do braço
	var contexto = carregaContexto(document.getElementsByTagName('canvas')[0].id);
	if(contexto){
		contexto.fillStyle = cor;
		contexto.beginPath();
		contexto.moveTo(x,y);
		//Setar a coordenada do braço para que acompanhe a mão
		contexto.lineTo(cX,(cY-2));
		contexto.lineTo(cX,(cY-2) + tamB);
		contexto.lineTo(x,y + tamB);
		contexto.fill();
	}
}

/*Desenhando um corpo inteiro*/
function desenhoCorpo(){
	var contexto = carregaContexto(document.getElementsByTagName('canvas')[0].id);
	if(contexto){
	
	//Desenho de um corpo humano
			drawRosto(165,50,25);
			//Pesco词
			drawQuadrada(150,70,30,20,"#FFE4B5");
			//Barriga
			
			drawQuadrada(80,100,45,30,"#2F4F4F");
			
			//Perna direita
			drawQuadrada(130,210,30,100,"#000000");
			
			
			//P顥squerdo
			drawSapato(130,310,60,30,"#A52A2A");
			//M䯠direita
			drawMao(75,115,20,"#F0E68C");
			//Barriga
			drawQuadrada(125,90,80,120,"#2F4F4F");
			
			
			//Perna esquerda
			/*drawQuadrada(170,210,30,100,"#000000");
			//Pé ireito
			drawSapato(170,310,60,30,"#A52A2A");*/
			//Ch䯍
			drawQuadrada(0,325,document.getElementsByTagName('canvas')[0].width,document.getElementsByTagName('canvas')[0].height-310,'#8B4513');
			
		
	}
	
}

/* Função para mover o pé */
function movePe(x,y,tamX,tamY,cX,cY){
	var contexto = carregaContexto(document.getElementsByTagName('canvas')[0].id);
	if(contexto){
		//Desenhando a perna com base nas coordenadas c
		contexto.fillStyle =  "#000000";
		contexto.moveTo(x,y);
		contexto.lineTo(cX,cY);
		contexto.lineTo(cX+tamX,cY);
		contexto.lineTo(x+tamX,y);
		contexto.fill();
		drawSapato(cX,cY,60,30,"#A52A2A");
		
	}
}
/*Limpar a tela inteira. Executada quando se encerra o jogo, ou para que tudo se inicie do zero*/
function limpaTela(){

	drawQuadrada(0,0,document.getElementsByTagName('canvas')[0].width,document.getElementsByTagName('canvas')[0].height,'#FFFFFF');
}



